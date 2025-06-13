import React from 'react';
import { colors } from '../../utils/colors';

interface ModelCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
}

export function ModelCard({ title, description, icon: Icon, onClick }: ModelCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full text-left"
    >
      <div className="flex items-center space-x-4">
        <div
          className="p-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.primary.gradient.start} 0%, ${colors.primary.gradient.middle} 100%)`
          }}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold" style={{ color: colors.primary.main }}>
            {title}
          </h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
}