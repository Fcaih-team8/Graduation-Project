import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchModelMetrics, fetchFeatureImportance } from '../../lib/api';
import { colors } from '../../utils/colors';
import { AlertTriangle, Loader } from 'lucide-react';
import { PredictionDistributionChart } from './PredictionDistributionChart';
import { ClassificationReport } from './ClassificationReport';

interface ModelMetricsProps {
  modelId: string;
}

export function ModelPerformanceCharts({ modelId }: ModelMetricsProps) {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ['modelMetrics', modelId],
    queryFn: () => fetchModelMetrics(modelId),
    refetchInterval: 5000 // Real-time updates every 5 seconds
  });

  const { data: importance, isLoading: importanceLoading, error: importanceError } = useQuery({
    queryKey: ['featureImportance', modelId],
    queryFn: () => fetchFeatureImportance(modelId),
    enabled: modelId === 'randomforest' || modelId === 'xgboost',
    refetchInterval: 5000 // Real-time updates every 10 seconds
  });

  if (metricsLoading || importanceLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-3 text-gray-600">Loading model performance data...</span>
      </div>
    );
  }

  if (metricsError || importanceError) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg shadow">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <span className="ml-3 text-red-600">Error loading model data. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Status Indicator */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          </div>
          <span className="text-sm text-gray-600">
            Model: {modelId.toUpperCase()} | Last Update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Classification Report */}
      <ClassificationReport data={metrics?.classificationReport} />
      {/* Model Accuracy Chart - Only for CNN */}
      {modelId === 'cnn' && metrics?.accuracyData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Model Accuracy</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis domain={[0.7, 1]} />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(3), '']}
                  labelFormatter={(label) => `Epoch: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke={colors.primary.main}
                  name="Train Accuracy"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="val_accuracy" 
                  stroke={colors.severity.medium}
                  name="Validation Accuracy"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Model Loss Chart - Only for CNN */}
      {modelId === 'cnn' && metrics?.lossData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Model Loss</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.lossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis domain={[0.05, 0.6]} />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(3), '']}
                  labelFormatter={(label) => `Epoch: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="loss" 
                  stroke={colors.primary.main}
                  name="Train Loss"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="val_loss" 
                  stroke={colors.severity.medium}
                  name="Validation Loss"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      
      {/* Prediction Distribution Chart - For all models */}
      <PredictionDistributionChart data={metrics?.predictionDistribution} />

      {/* Feature Importance (only for ML models) */}
      {(modelId === 'randomforest' || modelId === 'xgboost') && importance && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-900">
            Test Data {modelId.toUpperCase()}
          </h3>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={importance.featureData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1]} />
                <YAxis dataKey="feature" type="category" width={200} />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(3), 'Importance']}
                />
                <Bar 
                  dataKey="importance" 
                  fill={modelId === 'xgboost' ? colors.primary.main : colors.primary.main}
                  name="Feature Importance"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}