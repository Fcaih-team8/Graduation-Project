import { ModelSwitcher } from './ModelSwitcher';
import { ModelPerformanceCharts } from '../charts/ModelPerformanceCharts';

interface DashboardProps {
  initialModelId: string;
  onModelChange: (modelId: string) => void;
}

export function Dashboard({ initialModelId, onModelChange }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <ModelSwitcher currentModel={initialModelId} onModelChange={onModelChange} />
      </div>

      <div className="mt-8">
        <ModelPerformanceCharts modelId={initialModelId} />
      </div>
    </div>
  );
}