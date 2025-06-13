import React from 'react';
import { DashboardStats } from './DashboardStats';
import { TrafficMonitoring } from '../monitoring/TrafficMonitoring';
import { ThreatTable } from '../tables/ThreatTable';
import { ThreatMap } from '../maps/ThreatMap';
import { BlockedIPs } from './BlockedIPs';
import { SuspiciousPackets } from './SuspiciousPackets';
import { ModelSwitcher } from "./ModelSwitcher";
import { ModelSettings } from './ModelSettings';
import { ModelSpecificCharts } from './ModelSpecificCharts';

interface DashboardProps {
  initialModelId: string;
  onModelChange: (modelId: string) => void;
}

export function Dashboard({ initialModelId, onModelChange }: DashboardProps) {
  const handleSettingsSave = (settings: any) => {
    console.log('Model settings saved:', settings);
    // Here you would typically update the backend with new settings
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <ModelSwitcher currentModel={initialModelId} onModelChange={onModelChange} />
        <ModelSettings modelId={initialModelId} onSave={handleSettingsSave} />
      </div>

      <DashboardStats />

      <div className="mt-8">
        <ModelSpecificCharts modelId={initialModelId} />
      </div>

      <div className="mt-8">
        <TrafficMonitoring />
      </div>

      <div className="mt-8">
        <ThreatTable />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ThreatMap />
        <div className="space-y-6">
          <BlockedIPs />
          <SuspiciousPackets />
        </div>
      </div>
    </div>
  );
}