import React from 'react';
import { Theme } from '../../types';

interface GlassPanelProps {
  theme: Theme;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ theme, children, className = '', onClick }) => {
  const themeColors = {
    green: 'border-green-500/30 text-green-500',
    pink: 'border-pink-500/30 text-pink-500',
    purple: 'border-purple-500/30 text-purple-500',
    blue: 'border-blue-500/30 text-blue-500',
  };

  const bgColors = {
    green: 'bg-green-500/5',
    pink: 'bg-pink-500/5',
    purple: 'bg-purple-500/5',
    blue: 'bg-blue-500/5',
  };

  return (
    <div 
      onClick={onClick}
      className={`border-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${themeColors[theme]} ${bgColors[theme]} ${className}`}
    >
      {children}
    </div>
  );
};
