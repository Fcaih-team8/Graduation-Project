from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from datetime import datetime, timedelta
import random
from faker import Faker
from models import ModelManager
from typing import Dict, Any

app = FastAPI(title="IDS Dashboard API", version="1.0.0")
fake = Faker()
model_manager = ModelManager()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connections store
active_connections: list[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            await asyncio.sleep(5)
            await send_updates()
    except:
        active_connections.remove(websocket)

async def send_updates():
    for connection in active_connections:
        try:
            await connection.send_json({
                "type": "stats:update",
                "data": generate_dashboard_stats()
            })
        except:
            active_connections.remove(connection)

# Model API Endpoints
@app.get("/api/model/metrics/{model_id}")
async def get_model_metrics(model_id: str):
    """Get model performance metrics including classification report"""
    if model_id not in ['xgboost', 'randomforest', 'cnn']:
        raise HTTPException(status_code=404, detail="Model not found")
    
    metrics = model_manager.get_model_metrics(model_id)
    return metrics

@app.get("/api/model/classification-report/{model_id}")
async def get_classification_report(model_id: str):
    """Get detailed classification report for the model"""
    if model_id not in ['xgboost', 'randomforest', 'cnn']:
        raise HTTPException(status_code=404, detail="Model not found")
    
    report = model_manager.get_classification_report(model_id)
    return report

@app.get("/api/model/importance/{model_id}")
async def get_feature_importance(model_id: str):
    """Get feature importance for tree-based models"""
    if model_id not in ['xgboost', 'randomforest']:
        raise HTTPException(status_code=404, detail="Feature importance not available for this model")
    
    importance = model_manager.get_feature_importance(model_id)
    return importance

@app.post("/api/model/predict/{model_id}")
async def predict(model_id: str, data: Dict[str, float]):
    """Make prediction using specified model"""
    if model_id not in ['xgboost', 'randomforest', 'cnn']:
        raise HTTPException(status_code=404, detail="Model not found")
    
    try:
        result = model_manager.predict(data, model_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/model/realtime/{model_id}")
async def get_realtime_data(model_id: str):
    """Get real-time model data"""
    if model_id not in ['xgboost', 'randomforest', 'cnn']:
        raise HTTPException(status_code=404, detail="Model not found")
    
    return model_manager.get_real_time_data(model_id)

@app.get("/api/model/status")
async def get_models_status():
    """Get status of all models"""
    return {
        'models': {
            'xgboost': {'status': 'loaded' if model_manager.models['xgboost'] else 'not_loaded'},
            'randomforest': {'status': 'loaded' if model_manager.models['randomforest'] else 'not_loaded'},
            'cnn': {'status': 'loaded' if model_manager.models['cnn'] else 'not_loaded'}
        },
        'timestamp': datetime.now().isoformat()
    }

# Existing endpoints
@app.get("/api/stats")
async def get_stats():
    return generate_dashboard_stats()

@app.get("/api/alerts")
async def get_alerts():
    return generate_alerts()

@app.get("/api/threats")
async def get_threats():
    return generate_threats()

@app.get("/api/traffic")
async def get_traffic():
    return generate_traffic_data()

@app.get("/api/blocked-ips")
async def get_blocked_ips():
    return generate_blocked_ips()

@app.get("/api/suspicious-packets")
async def get_suspicious_packets():
    return generate_suspicious_packets()

# Helper functions
def generate_dashboard_stats():
    return [
        {
            "id": 1,
            "type": "alerts",
            "title": "Active Alerts",
            "value": random.randint(5, 50),
            "trend": {
                "value": random.randint(1, 20),
                "isPositive": random.choice([True, False])
            }
        },
        {
            "id": 2,
            "type": "blockedAttacks",
            "title": "Blocked Attacks",
            "value": random.randint(100, 1000),
            "trend": {
                "value": random.randint(1, 30),
                "isPositive": True
            }
        },
        {
            "id": 3,
            "type": "networkTraffic",
            "title": "Network Traffic",
            "value": f"{random.randint(1, 100)} GB/s",
            "trend": {
                "value": random.randint(1, 15),
                "isPositive": random.choice([True, False])
            }
        },
        {
            "id": 4,
            "type": "systemHealth",
            "title": "System Health",
            "value": f"{random.randint(85, 100)}%",
            "trend": {
                "value": random.randint(1, 10),
                "isPositive": True
            }
        }
    ]

def generate_alerts():
    severity_levels = ['high', 'medium', 'low']
    alerts = []
    
    for _ in range(random.randint(3, 8)):
        alerts.append({
            "severity": random.choice(severity_levels),
            "title": fake.sentence(nb_words=4),
            "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 60))).strftime("%Y-%m-%d %H:%M:%S"),
            "description": fake.sentence(nb_words=10)
        })
    
    return alerts

def generate_threats():
    threats = []
    for _ in range(random.randint(5, 15)):
        threats.append({
            "id": fake.uuid4(),
            "lat": float(fake.latitude()),
            "lng": float(fake.longitude()),
            "location": fake.city(),
            "intensity": random.random()
        })
    return threats

def generate_traffic_data():
    current_time = datetime.now()
    data_points = []
    
    for i in range(24):
        time = (current_time - timedelta(hours=23-i)).strftime("%H:00")
        data_points.append({
            "time": time,
            "traffic": round(random.uniform(1.0, 10.0), 2)
        })
    
    return data_points

def generate_blocked_ips():
    blocked_ips = []
    for _ in range(random.randint(3, 8)):
        blocked_ips.append({
            "id": fake.uuid4(),
            "ip": fake.ipv4(),
            "reason": random.choice([
                "Brute force attempt",
                "SQL injection",
                "DDoS participation",
                "Port scanning",
                "Malware communication"
            ]),
            "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 60))).strftime("%Y-%m-%d %H:%M:%S")
        })
    return blocked_ips

def generate_suspicious_packets():
    protocols = ['TCP', 'UDP', 'ICMP']
    flags = ['SYN', 'ACK', 'FIN', 'RST', 'PSH']
    
    packets = []
    for _ in range(random.randint(3, 8)):
        packets.append({
            "id": fake.uuid4(),
            "protocol": random.choice(protocols),
            "size": f"{random.randint(1, 10)}KB",
            "flags": random.choice(flags),
            "reason": random.choice([
                "Unusual packet size",
                "Invalid flags combination",
                "Unknown destination",
                "Suspicious payload",
                "Protocol violation"
            ]),
            "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 60))).strftime("%Y-%m-%d %H:%M:%S")
        })
    return packets

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=3000, reload=True)