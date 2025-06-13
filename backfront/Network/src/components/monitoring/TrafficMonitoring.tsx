import React from 'react';
import { PacketsChart } from '../charts/PacketsChart';
import { BandwidthChart } from '../charts/BandwidthChart';
import { ThreatLevelChart } from '../charts/ThreatLevelChart';
import { colors } from '../../utils/colors';

export function TrafficMonitoring() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6" style={{ color: colors.primary.main }}>
        Traffic Monitoring
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <PacketsChart />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <BandwidthChart />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <ThreatLevelChart />
        </div>
      </div>
    </div>
  );
}