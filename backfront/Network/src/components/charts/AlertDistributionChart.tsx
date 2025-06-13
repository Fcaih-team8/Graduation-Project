import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { name: 'High Severity', value: 12 },
  { name: 'Medium Severity', value: 24 },
  { name: 'Low Severity', value: 36 },
];

const COLORS = [colors.severity.high, colors.severity.medium, colors.severity.low];

export function AlertDistributionChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Alert Distribution
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: `1px solid ${colors.primary.light}`,
                borderRadius: '4px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}