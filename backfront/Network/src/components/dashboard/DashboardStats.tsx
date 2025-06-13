import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../../lib/api';
import { StatCard } from './StatCard';
import { Shield, AlertTriangle, Activity, Network } from 'lucide-react';

type StatType = 'alerts' | 'blockedAttacks' | 'networkTraffic' | 'systemHealth';

interface Stat {
  id: string | number;
  type: StatType;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const iconMap: Record<StatType, React.ElementType> = {
  alerts: AlertTriangle,
  blockedAttacks: Shield,
  networkTraffic: Network,
  systemHealth: Activity,
};

export function DashboardStats() {
  const { data: stats = [] } = useQuery<Stat[]>({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard 
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={iconMap[stat.type]}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}