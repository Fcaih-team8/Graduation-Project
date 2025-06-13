import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../utils/colors';

const data = [
  { time: '00:00', inbound: 120, outbound: 80 },
  { time: '04:00', inbound: 240, outbound: 160 },
  { time: '08:00', inbound: 360, outbound: 240 },
  { time: '12:00', inbound: 480, outbound: 320 },
  { time: '16:00', inbound: 320, outbound: 240 },
  { time: '20:00', inbound: 280, outbound: 200 },
  { time: '24:00', inbound: 160, outbound: 120 }
];

export function BandwidthChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Bandwidth Usage
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.charts.area.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.charts.area.start} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.charts.area.end} stopOpacity={0.8}/>
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
              dataKey="inbound"
              stroke={colors.charts.area.start}
              fill="url(#inboundGradient)"
              name="Inbound"
            />
            <Area
              type="monotone"
              dataKey="outbound"
              stroke={colors.charts.area.end}
              fill="url(#outboundGradient)"
              name="Outbound"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}