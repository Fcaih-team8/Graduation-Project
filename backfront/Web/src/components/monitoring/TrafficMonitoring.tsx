import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', traffic: 2.4 },
  { time: '04:00', traffic: 1.8 },
  { time: '08:00', traffic: 3.2 },
  { time: '12:00', traffic: 5.6 },
  { time: '16:00', traffic: 4.2 },
  { time: '20:00', traffic: 6.8 },
];

export function TrafficMonitoring() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Traffic Monitoring
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="traffic" 
              stroke="#4F46E5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}