import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { time: '00:00', pps: 1200 },
  { time: '04:00', pps: 2400 },
  { time: '08:00', pps: 3600 },
  { time: '12:00', pps: 4800 },
  { time: '16:00', pps: 3200 },
  { time: '20:00', pps: 2800 },
  { time: '24:00', pps: 1600 }
];

export function PacketsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Packets per Second (PPS)
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
            <Line 
              type="monotone" 
              dataKey="pps" 
              stroke={colors.charts.lines.pps} 
              name="Packets/s"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}