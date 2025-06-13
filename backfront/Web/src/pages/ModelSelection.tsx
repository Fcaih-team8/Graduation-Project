import { Brain, Network, Cpu, Activity } from 'lucide-react';

const models = [
  {
    id: 'xgboost',
    title: 'Extreme Defender',
    description: 'Extreme Gradient Boosting for high-performance threat detection',
    icon: Brain
  },
  {
    id: 'randomforest',
    title: 'Quick Scan',
    description: 'Ensemble learning method for robust pattern recognition',
    icon: Network
  },
  {
    id: 'cnn',
    title: 'Smart Predictor',
    description: 'Convolutional Neural Network for complex threat analysis',
    icon: Cpu
  }
];

interface ModelSelectionProps {
  onModelSelect: (modelId: string) => void;
}

export function ModelSelection({ onModelSelect }: ModelSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Select Analysis Model
          </h1>
          <p className="text-xl text-gray-600">
            Choose the AI model that best suits your security monitoring needs
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <button
                key={model.id}
                onClick={() => onModelSelect(model.id)}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1">
                
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-4 rounded-lg bg-indigo-600">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {model.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{model.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Real-time Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-700">Live threat detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-700">Instant model updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-700">Dynamic visualization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}