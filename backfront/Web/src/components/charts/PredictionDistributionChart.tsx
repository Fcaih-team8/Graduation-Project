import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { colors } from '../../utils/colors';

// Mock data with large numbers to match backend integration
const mockData = [
  { label: 'DoS', actual: 33500, predicted: 33800 },
  { label: 'DDoS', actual: 33800, predicted: 33600 },
  { label: 'SQL Injection', actual: 34200, predicted: 36500 },
  { label: 'Heartbleed', actual: 33600, predicted: 33800 },
  { label: 'Infiltration', actual: 33800, predicted: 33600 },
  { label: 'FTP-Patator', actual: 33600, predicted: 33800 },
  { label: 'DoS slowloris', actual: 34000, predicted: 33200 },
  { label: 'PortScan', actual: 33800, predicted: 31500 },
  { label: 'DoS Hulk', actual: 33600, predicted: 33800 },
  { label: 'DoS GoldenEye', actual: 33400, predicted: 33600 },
  { label: 'DoS slowhttptest', actual: 33600, predicted: 33800 },
  { label: 'Benign', actual: 33200, predicted: 33600 }
];

interface PredictionDistributionChartProps {
  data?: Array<{
    label: string;
    actual: number;
    predicted: number;
  }>;
}

export function PredictionDistributionChart({ data = mockData }: PredictionDistributionChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4\" style={{ color: colors.primary.main }}>
        Actual vs Predicted Label Counts
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="label" 
              stroke={colors.primary.main}
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.primary.main}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
                return value.toString();
              }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: `1px solid ${colors.primary.light}`,
                borderRadius: '4px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'actual') return [value.toLocaleString(), 'Actual'];
                if (name === 'predicted') return [value.toLocaleString(), 'Predicted'];
                return [value.toLocaleString(), name];
              }}
            />
            <Legend />
            <Bar 
              dataKey="actual" 
              fill={colors.primary.main}
              name="Actual"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="predicted" 
              fill={colors.severity.medium}
              name="Predicted"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}