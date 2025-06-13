import React from 'react';
import { AlertCard } from './AlertCard';

const alerts = [
  {
    severity: 'high',
    title: 'Potential SQL Injection Detected',
    timestamp: '2 minutes ago',
    description: 'Multiple SQL injection attempts detected from IP 192.168.1.100'
  },
  {
    severity: 'medium',
    title: 'Unusual Network Traffic',
    timestamp: '15 minutes ago',
    description: 'Spike in outbound traffic detected on port 8080'
  },
  {
    severity: 'low',
    title: 'Failed Login Attempts',
    timestamp: '1 hour ago',
    description: 'Multiple failed login attempts from user admin'
  }
] as const;

export function RecentAlerts() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.title} {...alert} />
        ))}
      </div>
    </div>
  );
}