import { useState } from 'react';
import { Brain, Network, Cpu, ChevronDown, Activity } from 'lucide-react';

const models = [
  { 
    id: 'xgboost',
    name: 'Extreme Defender',
    icon: Brain,
    description: 'Extreme Gradient Boosting for high-performance detection'
  },
  { 
    id: 'randomforest',
    name: 'Quick Scan',
    icon: Network,
    description: 'Ensemble learning for robust pattern recognition'
  },
  {
    id: 'cnn',
    name: 'Smart Predictor',
    icon: Cpu,
    description: 'Convolutional Neural Network for complex analysis'
  }
];

interface ModelSwitcherProps {
  currentModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSwitcher({ currentModel, onModelChange }: ModelSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentModelData = models.find(m => m.id === currentModel) || models[0];
  const Icon = currentModelData.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Icon className="h-5 w-5 text-indigo-600" />
        <span className="font-medium text-gray-900">{currentModelData.name}</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600">Live</span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-2">
            {models.map((model) => {
              const ModelIcon = model.icon;
              return (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    model.id === currentModel ? 'bg-gray-50' : ''
                  }`}
                >
                  <ModelIcon className="h-5 w-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <div className="flex items-center justify-between">
                      <span className="block font-medium text-gray-900">{model.name}</span>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600">Real-time</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{model.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}