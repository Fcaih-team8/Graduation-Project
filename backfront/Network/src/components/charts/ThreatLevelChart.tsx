import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { time: '00:00', level: 2 },
  { time: '04:00', level: 4 },
  { time: '08:00', level: 7 },
  { time: '12:00', level: 5 },
  { time: '16:00', level: 8 },
  { time: '20:00', level: 6 },
  { time: '24:00', level: 3 }
];

export function ThreatLevelChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Threat Level Over Time
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="threatLevelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.severity.high} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.severity.high} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="time" stroke={colors.primary.main} />
            <YAxis stroke={colors.primary.main} domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: `1px solid ${colors.primary.light}`,
                borderRadius: '4px'
              }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke={colors.severity.high}
              fill="url(#threatLevelGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}