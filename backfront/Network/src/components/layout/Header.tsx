import React from 'react';
import { Shield, Settings, ArrowLeft } from 'lucide-react';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { colors } from '../../utils/colors';

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export function Header({ onBack, showBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200" 
      style={{ 
        background: `linear-gradient(135deg, ${colors.primary.gradient.start} 0%, ${colors.primary.gradient.middle} 50%, ${colors.primary.gradient.end} 100%)`,
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </button>
            )}
            <Shield className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white"><a href='http://localhost:5714/'>SntriNet</a></span>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Settings className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}