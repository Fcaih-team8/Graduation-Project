# SentriNet

An Intelligent Network Intrusion Detection System (IDS) powered by AI.  
Built for detecting malicious network behavior and web attacks using machine learning & deep learning models.



## Overview

**SentriNet** is a graduation project developed by a team of passionate students at [Your University].  
The system is capable of:
- Detecting network-based intrusions.
- Identifying web application attacks.
- Visualizing results through an interactive dashboard.
- Providing real-time feedback via an integrated chatbot.



##  Tech Stack

###  Backend:
- **FastAPI** – for API and server-side logic
- **Django** – for database and admin management
- **Python** – for model training, data processing, and APIs
- **Scikit-learn**, **XGBoost**, **Keras**, **TensorFlow** – for ML/DL models

###  Frontend:
- **React.js**
- **Chart.js** – for data visualization
- **Tailwind CSS**

###  Database:
- **PostgreSQL**

###  ML Models:
- Logistic Regression
- CNN
- XGBoost
- MLP (initially used)
- Random Forest


##  Datasets

- **CICIDS2017** – for web intrusion detection.
- **UNSW-NB15** – for network-based intrusion detection.



##  Project Structure
SentriNet/
│
├── Backend/ # FastAPI + ML models
├── Frontend/ # React Dashboard
├── Database/ # Django setup
├── DataPreparation/ # Preprocessing notebooks & scripts
└── README.md # This file 



##  Team Members

| Role           | Name              |
|----------------|-------------------|
| Backend        | Omar Hamdy |
| ML&DL Algorithms | Shahd Tamer, Omar Yasser |
| Frontend       | Abdullah Mahmoud, Shams Samir, Reem Yasser |



##  Demo Screenshots



##  How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Fcaih-team8/SentriNet.git

# Backend
cd Home
python manage.py runserver 127.0.0.1:5714

cd../Network
cd backend/
pip install -r requirements.txt
python -m uvicorn main:app

cd ../../Web
cd backend/
python main.py

# Frontend
cd ../Web
npm install
npm run dev

cd ../Network
npm install
npm run dev
```
# Loacl Hosts
- Home:"http://localhost:5714"
- Net.back: "http://localhost:8000"
- Net.front: "http://localhost:5173"
- Web.back: "http://localhost:3000"
- Web.front: "http://localhost:5174"
