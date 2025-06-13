# IDS Dashboard Backend

This is the backend server for the IDS (Intrusion Detection System) dashboard. It provides real-time updates and REST endpoints for the dashboard's functionality.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python main.py
   ```

The server will start on http://localhost:8000

## API Endpoints

- `GET /api/stats` - Dashboard statistics
- `GET /api/alerts` - Recent alerts
- `GET /api/threats` - Threat locations
- `GET /api/traffic` - Traffic data
- `GET /api/blocked-ips` - List of blocked IPs
- `GET /api/suspicious-packets` - Suspicious network packets

## WebSocket

Connect to `/ws` for real-time updates