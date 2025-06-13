import { StatCard } from './StatCard';
import { Shield, AlertTriangle, Activity, Network } from 'lucide-react';

const mockStats = [
  {
    id: 1,
    type: 'alerts',
    title: 'Active Alerts',
    value: 24,
    trend: {
      value: 12,
      isPositive: false
    }
  },
  {
    id: 2,
    type: 'blockedAttacks',
    title: 'Blocked Attacks',
    value: 856,
    trend: {
      value: 23,
      isPositive: true
    }
  },
  {
    id: 3,
    type: 'networkTraffic',
    title: 'Network Traffic',
    value: '2.4 GB/s',
    trend: {
      value: 8,
      isPositive: true
    }
  },
  {
    id: 4,
    type: 'systemHealth',
    title: 'System Health',
    value: '98%',
    trend: {
      value: 5,
      isPositive: true
    }
  }
];

const iconMap = {
  alerts: AlertTriangle,
  blockedAttacks: Shield,
  networkTraffic: Network,
  systemHealth: Activity,
};

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {mockStats.map((stat) => (
        <StatCard 
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={iconMap[stat.type as keyof typeof iconMap]}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}