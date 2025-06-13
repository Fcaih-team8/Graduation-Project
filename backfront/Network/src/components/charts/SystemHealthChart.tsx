import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { time: 'Mon', cpu: 85, memory: 78, disk: 92 },
  { time: 'Tue', cpu: 88, memory: 82, disk: 91 },
  { time: 'Wed', cpu: 92, memory: 85, disk: 90 },
  { time: 'Thu', cpu: 87, memory: 83, disk: 89 },
  { time: 'Fri', cpu: 86, memory: 80, disk: 88 },
  { time: 'Sat', cpu: 82, memory: 76, disk: 87 },
  { time: 'Sun', cpu: 84, memory: 78, disk: 86 },
];

export function SystemHealthChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        System Health Metrics
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="time" stroke={colors.primary.main} />
            <YAxis stroke={colors.primary.main} />
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: `1px solid ${colors.primary.light}`,
                borderRadius: '4px'
              }}
            />
            <Line type="monotone" dataKey="cpu" stroke={colors.charts.lines.cpu} name="CPU" />
            <Line type="monotone" dataKey="memory" stroke={colors.charts.lines.memory} name="Memory" />
            <Line type="monotone" dataKey="disk" stroke={colors.charts.lines.disk} name="Disk" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}