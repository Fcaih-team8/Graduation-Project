import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { colors } from '../../utils/colors';

const suspiciousPackets = [
  {
    id: '1',
    protocol: 'TCP',
    size: '1.2KB',
    flags: 'SYN-ACK',
    reason: 'Unusual packet size',
    timestamp: '2024-03-15 14:23:45'
  },
  {
    id: '2',
    protocol: 'UDP',
    size: '2.5KB',
    flags: 'N/A',
    reason: 'Unknown destination',
    timestamp: '2024-03-15 14:22:30'
  },
  {
    id: '3',
    protocol: 'TCP',
    size: '0.8KB',
    flags: 'FIN',
    reason: 'Suspicious payload',
    timestamp: '2024-03-15 14:20:15'
  }
];

export function SuspiciousPackets() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-5 w-5 mr-2" style={{ color: colors.severity.medium }} />
        <h3 className="text-lg font-medium" style={{ color: colors.primary.main }}>
          Suspicious Packets
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Flags</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suspiciousPackets.map((packet) => (
              <tr key={packet.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{packet.protocol}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{packet.size}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{packet.flags}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{packet.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}