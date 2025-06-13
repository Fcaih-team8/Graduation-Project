import { AlertDistributionChart } from '../charts/AlertDistributionChart';
import { NetworkTrafficChart } from '../charts/NetworkTrafficChart';
import { SystemHealthChart } from '../charts/SystemHealthChart';
import { PacketsChart } from '../charts/PacketsChart';
import { BandwidthChart } from '../charts/BandwidthChart';
import { ThreatLevelChart } from '../charts/ThreatLevelChart';

interface ModelSpecificChartsProps {
  modelId: string;
}

export function ModelSpecificCharts({ modelId }: ModelSpecificChartsProps) {
  const renderCharts = () => {
    switch (modelId) {
      case 'ml':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertDistributionChart />
            <NetworkTrafficChart />
            <SystemHealthChart />
          </div>
        );
      case 'dl':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThreatLevelChart />
            <PacketsChart />
            <BandwidthChart />
          </div>
        );
      case 'hybrid':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AlertDistributionChart />
            <ThreatLevelChart />
            <NetworkTrafficChart />
          </div>
        );
      case 'realtime':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PacketsChart />
            <BandwidthChart />
            <NetworkTrafficChart />
          </div>
        );
      case 'predictive':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThreatLevelChart />
            <SystemHealthChart />
            <AlertDistributionChart />
          </div>
        );
      case 'quantum':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ThreatLevelChart />
            <AlertDistributionChart />
            <SystemHealthChart />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {renderCharts()}
    </div>
  );
}