<p align="center">
  <h1>🚀 Smart Home IoT Dashboard 🏠📊</h1>

  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask"/>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/MQTT-FF6F00?style=for-the-badge&logo=mosquitto&logoColor=white" alt="MQTT"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Clever_Cloud-00AEEF?style=for-the-badge&logo=clever-cloud&logoColor=white" alt="Clever Cloud"/>
</p>

<p align="center">
  Proud to share our <b>end-to-end Smart Home IoT project</b>, designed to simulate, transport, store, and visualize <b>real-time sensor data</b>, while enabling <b>bidirectional control</b> of home actuators — all deployed in the cloud 🚀
</p>



## 🏗️ Architecture Overview
**Python Sensor Emulation ➝ MQTT ➝ Cloud Backend ➝ Angular Dashboard**

- ✅ Python-based sensor simulation (Temperature, Humidity, Luminosity, Presence)  
- ✅ Real-time data transport using MQTT (Mosquitto Broker)  
- ✅ Flask backend as an MQTT Subscriber & REST API provider  
- ✅ Cloud deployment on Clever Cloud  
- ✅ Angular Dashboard for real-time visualization & actuator control  
- ✅ Bidirectional communication (Sensors ↔ Dashboard ↔ Actuators)



## ☁️ Cloud & IoT Services Used
- 🔹 **Clever Cloud (PaaS)** – Backend & database hosting  
- 🔹 **Mosquitto MQTT Broker** – Lightweight real-time messaging  
- 🔹 **Flask Backend** – MQTT ingestion, REST API & SocketIO  
- 🔹 **MySQL Database** – Persistent time-series storage  
- 🔹 **Angular Dashboard** – Live monitoring & control interface  



## 🔄 Smart Home Data Pipeline
1️⃣ **Sensor Emulation (Edge)**: Python scripts simulate home sensors and publish data every few seconds  
2️⃣ **Real-Time Transport**: Data sent via MQTT to Mosquitto broker (Pub/Sub model)  
3️⃣ **Cloud Processing**: Flask backend subscribes to MQTT topics, stores data, and broadcasts updates  
4️⃣ **Visualization & Control**: Angular dashboard displays real-time values, historical charts, alerts, and controls  
5️⃣ **Bidirectional Control**: User commands (LED, Fan, Buzzer) sent back via MQTT to simulated actuators  



## 💻 Full Tech Stack
**Python • Flask • MQTT • Mosquitto • Clever Cloud • MySQL • Angular • SocketIO**



## ✅ Key Takeaways
- Smart Home systems can be fully simulated without physical devices  
- MQTT enables lightweight & real-time IoT communication  
- Cloud platforms simplify deployment, scalability & availability  
- Angular dashboards turn raw sensor data into actionable insights  
- Bidirectional IoT architectures enable both monitoring & control  

