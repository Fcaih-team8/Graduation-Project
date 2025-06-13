import React from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { colors } from '../../utils/colors';

interface ModelSettingsProps {
  modelId: string;
  onSave: (settings: ModelSettings) => void;
}

interface ModelSettings {
  threshold: number;
  interval: number;
  sensitivity: number;
}

const defaultSettings: Record<string, ModelSettings> = {
  ml: { threshold: 0.75, interval: 30, sensitivity: 0.8 },
  dl: { threshold: 0.85, interval: 15, sensitivity: 0.9 },
  hybrid: { threshold: 0.8, interval: 20, sensitivity: 0.85 },
  realtime: { threshold: 0.7, interval: 5, sensitivity: 0.95 },
  predictive: { threshold: 0.65, interval: 60, sensitivity: 0.75 },
  quantum: { threshold: 0.9, interval: 10, sensitivity: 0.95 }
};

export function ModelSettings({ modelId, onSave }: ModelSettingsProps) {
  const [settings, setSettings] = React.useState<ModelSettings>(defaultSettings[modelId]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSave = () => {
    onSave(settings);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings[modelId]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Settings className="h-5 w-5" style={{ color: colors.primary.main }} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
              Model Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Detection Threshold
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.threshold}
                  onChange={(e) => setSettings({ ...settings, threshold: parseFloat(e.target.value) })}
                  className="w-full mt-1"
                />
                <div className="text-sm text-gray-500 mt-1">{settings.threshold}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Update Interval (seconds)
                </label>
                <input
                  type="number"
                  value={settings.interval}
                  onChange={(e) => setSettings({ ...settings, interval: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model Sensitivity
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.sensitivity}
                  onChange={(e) => setSettings({ ...settings, sensitivity: parseFloat(e.target.value) })}
                  className="w-full mt-1"
                />
                <div className="text-sm text-gray-500 mt-1">{settings.sensitivity}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-md text-sm font-medium text-white flex items-center"
                style={{ backgroundColor: colors.primary.main }}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}