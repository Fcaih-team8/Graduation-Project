import React from 'react';
import { Bell, X, Shield, AlertTriangle, Info } from 'lucide-react';
import { colors } from '../../utils/colors';

interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    message: 'Critical security threat detected from IP 192.168.1.100',
    timestamp: '2 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    message: 'Unusual network activity detected on port 8080',
    timestamp: '15 minutes ago',
    read: false
  },
  {
    id: '3',
    type: 'info',
    message: 'System update available: Security patches ready to install',
    timestamp: '1 hour ago',
    read: true
  }
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return Shield;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
  }
};

const getTypeColor = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return colors.severity.high;
    case 'warning':
      return colors.severity.medium;
    case 'info':
      return colors.primary.main;
  }
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Bell className="h-6 w-6 text-white" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs rounded-full text-white"
            style={{ backgroundColor: colors.severity.high }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium" style={{ color: colors.primary.main }}>
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              const typeColor = getTypeColor(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="p-2 rounded-full"
                      style={{ backgroundColor: `${typeColor}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: typeColor }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              className="w-full px-4 py-2 text-sm font-medium rounded-md text-white transition-colors"
              style={{ backgroundColor: colors.primary.main }}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}