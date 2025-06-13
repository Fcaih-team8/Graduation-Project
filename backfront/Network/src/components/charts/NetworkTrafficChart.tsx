import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { time: '00:00', traffic: 2.4 },
  { time: '03:00', traffic: 1.8 },
  { time: '06:00', traffic: 3.2 },
  { time: '09:00', traffic: 5.6 },
  { time: '12:00', traffic: 4.2 },
  { time: '15:00', traffic: 6.8 },
  { time: '18:00', traffic: 4.5 },
  { time: '21:00', traffic: 3.2 },
];

export function NetworkTrafficChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Network Traffic (24h)
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.charts.area.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.charts.area.end} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="traffic" 
              stroke={colors.primary.main}
              fillOpacity={1} 
              fill="url(#trafficGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}