import paho.mqtt.client as mqtt
import random
import time
import json

BROKER = "localhost"   # Mosquitto est installé localement 
PORT = 1883
TOPIC_CAPTEURS = "maison/salon/capteurs"
TOPIC_ACTIONS = "maison/salon/actionneurs"

def on_action(client, userdata, msg):
    try:
        action = json.loads(msg.payload.decode())
        print(f"Action reçue : {action}")

        # Exemple : contrôle LED
        if action.get("device") == "LED":
            if action.get("command") == "ON":
                print("LED allumée ✅")
            elif action.get("command") == "OFF":
                print("LED éteinte ❌")

    except Exception as e:
        print("Erreur lors du traitement de l'action :", e)
 

client = mqtt.Client() # Connexion au broker MQTT
client.connect(BROKER, PORT, 60)

client.subscribe(TOPIC_ACTIONS)
client.message_callback_add(TOPIC_ACTIONS, on_action)

print("Connecte au broker MQTT :", BROKER)
print("Envoi des donnees des capteurs... (Ctrl+C pour arreter)")
print("Emulateur capteurs pret. Generation des donnees et ecoute des actions...")

while True:
    temperature = round(random.uniform(20, 40), 2)   # 20°C à 40°C
    humidite = random.randint(10, 80)                # 10% à 80%
    luminosite = random.randint(80, 900)            # 80 à 900 lux
    presence = random.choice([True, False])          # Présence détectée ou non
    data = {
        "temperature": temperature,
        "humidite": humidite,
        "luminosite": luminosite,
        "presence": presence
    }

    message = json.dumps(data)

    client.publish(TOPIC_CAPTEURS, message)
    print(f"Donnees envoyees : {message}")

    client.loop(timeout=1.0)

    time.sleep(5)
