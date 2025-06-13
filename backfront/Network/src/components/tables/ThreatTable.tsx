import { colors } from '../../utils/colors';

type Severity = 'high' | 'medium' | 'low';

interface Threat {
  id: number;
  sourceIp: string;
  destIp: string;
  type: string;
  severity: Severity;
  timestamp: string;
}

const threats: Threat[] = [
  {
    id: 1,
    sourceIp: '192.168.1.100',
    destIp: '10.0.0.5',
    type: 'SQL Injection',
    severity: 'high',
    timestamp: '2024-03-15 14:23:45'
  },
  {
    id: 2,
    sourceIp: '172.16.0.50',
    destIp: '10.0.0.10',
    type: 'Port Scan',
    severity: 'medium',
    timestamp: '2024-03-15 14:22:30'
  },
  {
    id: 3,
    sourceIp: '192.168.1.150',
    destIp: '10.0.0.15',
    type: 'XSS Attack',
    severity: 'high',
    timestamp: '2024-03-15 14:20:15'
  }
];

const severityColors: Record<Severity, string> = {
  high: colors.severity.high,
  medium: colors.severity.medium,
  low: colors.severity.low
};

export function ThreatTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Recent Threats
      </h3>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source IP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination IP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threat Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {threats.map((threat) => (
            <tr key={threat.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{threat.sourceIp}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{threat.destIp}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{threat.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  style={{
                    color: severityColors[threat.severity],
                    backgroundColor: `${severityColors[threat.severity]}15`
                  }}
                >
                  {threat.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{threat.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}