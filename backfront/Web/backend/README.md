# IDS Dashboard Backend

This is the backend server for the IDS (Intrusion Detection System) dashboard with real ML model integration.

## Features

- **Real ML Models**: XGBoost, Random Forest, and CNN models
- **Real-time Predictions**: Live threat detection and analysis
- **Model Performance Metrics**: Accuracy, loss, confusion matrix
- **Feature Importance**: For tree-based models
- **WebSocket Support**: Real-time dashboard updates

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Place your trained models in the `backend/models/` directory:
   - `xgboost_model.pkl` - XGBoost model
   - `Random_Forest_model.pkl` - Random Forest model
   - `cic_model.h5` - CNN model

3. Run the server:
   ```bash
   python main.py
   ```

The server will start on http://localhost:3000

## API Endpoints

### Model Endpoints
- `GET /api/model/metrics/{model_id}` - Get model performance metrics
- `GET /api/model/importance/{model_id}` - Get feature importance (XGBoost/RF only)
- `POST /api/model/predict/{model_id}` - Make predictions
- `GET /api/model/realtime/{model_id}` - Get real-time model data
- `GET /api/model/status` - Get status of all models

### Dashboard Endpoints
- `GET /api/stats` - Dashboard statistics
- `GET /api/alerts` - Recent alerts
- `GET /api/threats` - Threat locations
- `GET /api/traffic` - Traffic data
- `GET /api/blocked-ips` - List of blocked IPs
- `GET /api/suspicious-packets` - Suspicious network packets

### WebSocket
Connect to `/ws` for real-time updates

## Model Integration

The backend automatically loads your trained models and provides:

1. **Preprocessing**: Handles feature scaling and data preparation
2. **Predictions**: Real-time threat classification
3. **Metrics**: Performance visualization data
4. **Feature Analysis**: Importance scores for interpretability

## Data Format

Expected input format for predictions:
```json
{
  "flow_duration": 1000.0,
  "total_fwd_packets": 10,
  "total_backward_packets": 5,
  "flow_bytes_s": 2048.0,
  "flow_packets_s": 100.0,
  ...
}
```

## Model IDs
- `xgboost` - XGBoost Classifier
- `randomforest` - Random Forest Classifier  
- `cnn` - Convolutional Neural Network