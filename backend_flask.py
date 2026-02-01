# type: ignore
from flask import Flask, jsonify, request
import paho.mqtt.client as mqtt
import json
import threading
from collections import deque
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from flask_cors import CORS

# ---------------- CONFIGURATION ----------------
BROKER = "localhost"
PORT = 1883
TOPIC = "maison/salon/capteurs"

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:4200",
        "methods": ["GET", "POST", "OPTIONS", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://uukd0ke5u7gox0np:sI4wwdtxmX7M9bYlVQcd@bbudwe6ihqho0hwa1vyp-mysql.services.clever-cloud.com:3306/bbudwe6ihqho0hwa1vyp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# ---------------- MODELE SQLALCHEMY ----------------
class Mesures(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float)
    humidite = db.Column(db.Integer)
    luminosite = db.Column(db.Integer)
    presence = db.Column(db.Boolean)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# ---------------- HISTORIQUE & DERNIERES VALEURS ----------------
dernieres_valeurs = {"temperature": None, "humidite": None, "luminosite": None, "presence": None}
historique_mesures = deque(maxlen=100)

# ---------------- CALLBACK MQTT ----------------
def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode()) 
        timestamp = datetime.now()

        # Mettre à jour les dernières valeurs
        for key in data:
            if key in dernieres_valeurs:
                dernieres_valeurs[key] = data[key]

        # Ajouter à l’historique
        data_with_time = {"timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S"), **data}
        historique_mesures.append(data_with_time)

        # Enregistrement dans MySQL
        with app.app_context():
            mesure = Mesures(
                temperature=data.get("temperature"),
                humidite=data.get("humidite"),
                luminosite=data.get("luminosite"),
                presence=data.get("presence"),
                timestamp=timestamp
            )
            db.session.add(mesure)
            db.session.commit()

        print(f"Donnees recues et stockees : {data_with_time}")

        # Envoi temps réel via WebSocket
        socketio.emit('sensor_update', data_with_time)

    except json.JSONDecodeError:
        print("Erreur : message non JSON")
    except Exception as e:
        print("Erreur lors de la réception :", e)

# ---------------- CLIENT MQTT GLOBAL ----------------
mqtt_client = mqtt.Client(protocol=mqtt.MQTTv311)
mqtt_client.on_message = on_message
mqtt_client.connect(BROKER, PORT, 60)
mqtt_client.subscribe(TOPIC)

# ---------------- THREAD MQTT ----------------
def mqtt_thread():
    mqtt_client.loop_forever()

# ---------------- ROUTES REST ----------------
@app.route('/api/sensors', methods=['GET'])
def get_sensors():
    return jsonify(dernieres_valeurs)

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify(list(historique_mesures))

@app.route('/api/action', methods=['POST'])
def send_action():
    try:
        data = request.get_json()
        print(f"Commande reçue depuis dashboard : {data}")
        mqtt_client.publish("maison/salon/actionneurs", json.dumps(data))
        return jsonify({"status": "commande envoyée", "action": data})
    except Exception as e:
        return jsonify({"status": "erreur", "message": str(e)}), 400

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    with app.app_context():
        total = Mesures.query.count()
        last = Mesures.query.order_by(Mesures.id.desc()).first()
        avg_temp = db.session.query(db.func.avg(Mesures.temperature)).scalar()
        avg_hum = db.session.query(db.func.avg(Mesures.humidite)).scalar()
        return jsonify({
            "total_mesures": total,
            "moyenne_temperature": round(avg_temp, 2) if avg_temp else 0,
            "moyenne_humidite": round(avg_hum, 2) if avg_hum else 0,
            "derniere_mesure": {
                "temperature": last.temperature,
                "humidite": last.humidite,
                "luminosite": last.luminosite,
                "presence": last.presence,
                "timestamp": last.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            } if last else None
        })

@app.route('/api/history/<string:date>', methods=['GET'])
def get_history_by_date(date):
    with app.app_context():
        start = datetime.strptime(date, "%Y-%m-%d")
        end = start.replace(hour=23, minute=59, second=59)
        mesures = Mesures.query.filter(Mesures.timestamp.between(start, end)).all()
        return jsonify([
            {
                "temperature": m.temperature,
                "humidite": m.humidite,
                "luminosite": m.luminosite,
                "presence": m.presence,
                "timestamp": m.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            } for m in mesures
        ])

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    alerts = []
    with app.app_context():
        last = Mesures.query.order_by(Mesures.id.desc()).first()
        if not last:
            return jsonify([])
        if last.temperature > 35:
            alerts.append("High temperature !")
        if last.humidite < 20:
            alerts.append("Humidity too low !")
        if last.luminosite < 100:
            alerts.append("Low luminosity detected.")
        if last.presence:
            alerts.append("Motion detected in the living room.")
    return jsonify(alerts)

@app.route('/api/history/db', methods=['GET'])
def get_db_history():
    mesures = Mesures.query.order_by(Mesures.timestamp.asc()).all()
    return jsonify([
        {
            "temperature": m.temperature,
            "humidite": m.humidite,
            "luminosite": m.luminosite,
            "presence": m.presence,
            "timestamp": m.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }
        for m in mesures
    ])

@app.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    try:
        with app.app_context():
            num_deleted = Mesures.query.delete()
            db.session.commit()
        return jsonify({"status": "success", "deleted": num_deleted})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

# ---------------- WEBSOCKET ----------------
@socketio.on('connect')
def handle_connect():
    print("Nouveau client connecté")
    emit('init_data', list(historique_mesures))

@socketio.on('disconnect')
def handle_disconnect():
    print("Client déconnecté")

# ---------------- LANCEMENT DU SERVEUR ----------------
if __name__ == "__main__":
    # Thread MQTT
    thread = threading.Thread(target=mqtt_thread)
    thread.daemon = True
    thread.start()
    print("Thread MQTT démarré ✅")

    # Flask + WebSocket
    print("Serveur Flask + WebSocket démarré sur http://localhost:5000")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, use_reloader=False)
