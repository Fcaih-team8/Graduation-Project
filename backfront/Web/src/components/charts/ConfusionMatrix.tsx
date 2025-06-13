import React from 'react';
import { colors } from '../../utils/colors';

interface ConfusionMatrixProps {
  data?: number[][];
  labels?: string[];
}

// Real data from the screenshot
const realConfusionMatrix = [
  [37502, 142, 103, 154, 160, 0, 0], // BENIGN
  [0, 0, 0, 0, 0, 0, 0], // Bot
  [0, 15040, 0, 0, 0, 0, 0], // DDoS
  [0, 0, 6810, 0, 0, 0, 0], // DoS GoldenEye
  [0, 169, 27055, 0, 0, 0, 0], // DoS Hulk
  [486, 0, 0, 0, 0, 0, 0], // DoS Slowhttptest
  [0, 0, 44063, 0, 0, 7545, 0], // DoS slowloris
  [0, 0, 0, 0, 0, 5100, 0], // FTP-Patator
  [332, 3121, 0, 4, 7838, 0, 0], // Heartbleed
  [0, 0, 0, 0, 0, 3100, 0], // Infiltration
  [341, 320, 0, 0, 0, 67622, 394], // PortScan
  [0, 4, 0, 33, 562, 0, 0], // SSH-Patator
  [0, 0, 0, 0, 0, 0, 0], // Web Attack - Brute Force
  [0, 0, 0, 0, 0, 0, 0], // Web Attack - Sql Injection
  [0, 0, 0, 0, 0, 0, 0]  // Web Attack - XSS
];

const realLabels = [
  'BENIGN', 'Bot', 'DDoS', 'DoS GoldenEye', 'DoS Hulk', 
  'DoS Slowhttptest', 'DoS slowloris', 'FTP-Patator', 
  'Heartbleed', 'Infiltration', 'PortScan', 'SSH-Patator',
  'Web Attack - Brute Force', 'Web Attack - Sql Injection', 'Web Attack - XSS'
];

export function ConfusionMatrix({ data = realConfusionMatrix, labels = realLabels }: ConfusionMatrixProps) {
  const maxValue = Math.max(...data.flat());

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4 text-gray-900">Confusion Matrix </h3>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid" style={{ 
            gridTemplateColumns: `200px ${labels.map(() => '60px').join(' ')}`,
            gap: '0px'
          }}>
            {/* Empty top-left cell */}
            <div className="h-6 w-48 flex items-center justify-center pb-2">
              <span className="text-sm font-medium text-gray-700">Predicted label</span>
            </div>
            
            {/* Predicted labels (top) */}
            {labels.map((label) => (
              <div 
                key={`pred-${label}`} 
                className="h-12 flex items-end justify-center pb-6"
              >
                <div 
                  className="text-xs font-medium text-center transform -rotate-90 origin-bottom"
                  style={{ color: colors.primary.main, width: '60px' }}
                >
                  {label}
                </div>
              </div>
            ))}

            {/* True label header */}
            <div className="flex items-center justify-center" style={{ gridRow: `2 / ${labels.length + 2}` }}>
              <div className="transform -rotate-90 text-sm font-medium text-gray-700">
                True label
              </div>
            </div>

            {/* Actual labels (left) + matrix cells */}
            {labels.map((actualLabel, i) => (
              <React.Fragment key={`row-${actualLabel}`}>
                {/* Actual label */}
                <div 
                  className="w-48 flex items-center justify-end pr-4 font-medium text-xs"
                  style={{ color: colors.primary.main }}
                >
                  {actualLabel}
                </div>
                
                {/* Matrix cells */}
                {labels.map((predLabel, j) => {
                  const value = data[i]?.[j] || 0;
                  const intensity = maxValue > 0 ? value / maxValue : 0;
                  
                  return (
                    <div
                      key={`${actualLabel}-${predLabel}`}
                      className="h-12 w-14 flex items-center justify-center relative group text-xs"
                      style={{
                        backgroundColor: value > 0 ? `rgba(65, 88, 208, ${Math.max(0.1, intensity * 0.8)})` : '#f8f9fa',
                        border: '1px solid rgba(65, 88, 208, 0.1)',
                        color: value > 0 ? (intensity > 0.5 ? 'white' : colors.primary.main) : '#666'
                      }}
                    >
                      <span className="font-medium">
                        {value > 0 ? value.toLocaleString() : '0'}
                      </span>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 whitespace-nowrap">
                        Predicted: {predLabel}<br />
                        Count: {value.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  
}