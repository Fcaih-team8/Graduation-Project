import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlockedIPs } from '../../lib/api';
import { Shield } from 'lucide-react';
import { colors } from '../../utils/colors';

export function BlockedIPs() {
  const { data: blockedIPs = [] } = useQuery({
    queryKey: ['blockedIPs'],
    queryFn: fetchBlockedIPs
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2" style={{ color: colors.primary.main }} />
        <h3 className="text-lg font-medium" style={{ color: colors.primary.main }}>
          Blocked IPs
        </h3>
      </div>
      <div className="space-y-4">
        {blockedIPs.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border"
            style={{ borderColor: `${colors.primary.main}30` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{item.ip}</p>
                <p className="text-sm text-gray-600">{item.reason}</p>
              </div>
              <span className="text-xs text-gray-500">{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}