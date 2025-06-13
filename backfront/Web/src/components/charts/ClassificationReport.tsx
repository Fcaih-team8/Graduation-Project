
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

interface ClassificationReportProps {
  data?: {
    overall_metrics: {
      overall_accuracy: number;
      macro_avg: {
        precision: number;
        recall: number;
        f1_score: number;
      };
      weighted_avg: {
        precision: number;
        recall: number;
        f1_score: number;
      };
      total_samples: number;
    };
    model_name: string;
    dataset_size: number;
  };
}

export function ClassificationReport({ data }: ClassificationReportProps) {
  if (!data || !data.overall_metrics) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Classification Report</h3>
        <p className="text-gray-500">No classification data available</p>
      </div>
    );
  }

  const { overall_metrics, model_name, dataset_size } = data;

  // Prepare data for chart
  const chartData = [
    {
      metric: 'Macro Avg',
      precision: overall_metrics.macro_avg.precision,
      recall: overall_metrics.macro_avg.recall,
      f1_score: overall_metrics.macro_avg.f1_score
    },
    {
      metric: 'Weighted Avg',
      precision: overall_metrics.weighted_avg.precision,
      recall: overall_metrics.weighted_avg.recall,
      f1_score: overall_metrics.weighted_avg.f1_score
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-900">
          {model_name} Model - Overall Performance
        </h3>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(overall_metrics.overall_accuracy * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-blue-600">Overall Accuracy</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {(overall_metrics.macro_avg.f1_score * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-green-600">Macro F1-Score</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(overall_metrics.weighted_avg.f1_score * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-purple-600">Weighted F1-Score</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-600">
              {overall_metrics.total_samples.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Samples</div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="h-[300px] mb-6">
        <h4 className="text-md font-medium mb-3 text-gray-800">Model Performance Metrics</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="metric" 
              stroke={colors.primary.main}
            />
            <YAxis 
              stroke={colors.primary.main}
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 0.98).toFixed(0)}%`}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: `1px solid ${colors.primary.light}`,
                borderRadius: '4px'
              }}
              formatter={(value: number, name: string) => [
                `${(value * 0.98).toFixed(2)}%`,
                name.charAt(0).toUpperCase() + name.slice(1).replace('_', '-')
              ]}
            />
            <Bar 
              dataKey="precision" 
              fill={colors.primary.main}
              name="Precision"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="recall" 
              fill={colors.severity.medium}
              name="Recall"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="f1_score" 
              fill={colors.severity.low}
              name="F1 Score"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Metrics Table */}
      <div className="overflow-x-auto">
        <h4 className="text-md font-medium mb-3 text-gray-800">Detailed Metrics</h4>
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Average Type</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Precision</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Recall</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">F1-Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Macro Average</td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.macro_avg.precision * 0.98).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.macro_avg.recall * 0.98).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.macro_avg.f1_score * 0.98).toFixed(2)}%
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Weighted Average</td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.weighted_avg.precision * 0.98).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.weighted_avg.recall * 0.98).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-900">
                {(overall_metrics.weighted_avg.f1_score * 0.98).toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Model Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Model: <strong>{model_name}</strong></span>
          <span>Dataset Size: <strong>{dataset_size.toLocaleString()} samples</strong></span>
        </div>
      </div>
    </div>
  );
}