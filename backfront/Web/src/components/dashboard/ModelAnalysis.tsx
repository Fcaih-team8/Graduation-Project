import React from 'react';
import { useModelService } from '../../hooks/useModelService';
import { AlertTriangle, Shield, Activity, BarChart } from 'lucide-react';
import { colors } from '../../utils/colors';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ModelAnalysisProps {
  modelId: string;
  trafficData: any;
}

export function ModelAnalysis({ modelId, trafficData }: ModelAnalysisProps) {
  const { isLoading, error, analyzeTraffic } = useModelService(modelId);
  const [analysis, setAnalysis] = React.useState<any>(null);

  React.useEffect(() => {
    if (!isLoading && !error && trafficData) {
      analyzeTraffic(trafficData).then(setAnalysis);
    }
  }, [trafficData, isLoading, error, analyzeTraffic]);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-center">
          <Activity className="h-6 w-6 animate-spin" style={{ color: colors.primary.main }} />
          <span className="ml-2">Loading model...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center text-red-500">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <BarChart className="h-6 w-6 mr-2" style={{ color: colors.primary.main }} />
        <h3 className="text-lg font-medium" style={{ color: colors.primary.main }}>
          Random Forest Analysis Results
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {analysis.map((result: any) => (
            <div
              key={result.category}
              className="p-4 rounded-lg border"
              style={{
                borderColor: `${colors.primary.main}30`,
                backgroundColor: result.severity === 'high' ? `${colors.severity.high}15` :
                              result.severity === 'medium' ? `${colors.severity.medium}15` :
                              `${colors.severity.low}15`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" style={{ 
                    color: result.severity === 'high' ? colors.severity.high :
                           result.severity === 'medium' ? colors.severity.medium :
                           colors.severity.low 
                  }} />
                  <span className="font-medium">{result.category}</span>
                </div>
                <span className="text-sm font-semibold">
                  {(result.probability * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={analysis}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                domain={[0, 1]}
              />
              <Tooltip
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.primary.light}`,
                }}
              />
              <Bar
                dataKey="probability"
                fill={colors.primary.main}
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}