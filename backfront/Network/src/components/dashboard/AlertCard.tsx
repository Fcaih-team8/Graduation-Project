import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import { colors } from '../../utils/colors';

type AlertSeverity = 'high' | 'medium' | 'low';

interface AlertCardProps {
  severity: AlertSeverity;
  title: string;
  timestamp: string;
  description: string;
}

const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: colors.severity.high,
    bg: `${colors.severity.high}15`,
    border: `${colors.severity.high}30`
  },
  medium: {
    icon: AlertCircle,
    color: colors.severity.medium,
    bg: `${colors.severity.medium}15`,
    border: `${colors.severity.medium}30`
  },
  low: {
    icon: Shield,
    color: colors.severity.low,
    bg: `${colors.severity.low}15`,
    border: `${colors.severity.low}30`
  }
};

export function AlertCard({ severity, title, timestamp, description }: AlertCardProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className="p-4 rounded-lg border" style={{
      background: config.bg,
      borderColor: config.border
    }}>
      <div className="flex items-start">
        <div className="p-2 rounded-full" style={{ background: config.bg }}>
          <Icon style={{ color: config.color }} className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium" style={{ color: config.color }}>{title}</h3>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}