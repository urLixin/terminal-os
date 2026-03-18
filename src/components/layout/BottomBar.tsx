import React from 'react';
import { Theme } from '../../types';

interface BottomBarProps {
  theme: Theme;
}

export const BottomBar: React.FC<BottomBarProps> = ({ theme }) => {
  const themeColors = {
    green: 'text-green-500 border-green-500/30',
    pink: 'text-pink-500 border-pink-500/30',
    purple: 'text-purple-500 border-purple-500/30',
    blue: 'text-blue-500 border-blue-500/30',
  };

  const bgColors = {
    green: 'bg-green-500/5',
    pink: 'bg-pink-500/5',
    purple: 'bg-purple-500/5',
    blue: 'bg-blue-500/5',
  };

  return (
    <div className={`flex items-center justify-between px-4 py-1 border-2 ${themeColors[theme]} ${bgColors[theme]} rounded-lg text-[10px] uppercase tracking-widest opacity-70`}>
      <div className="flex gap-4">
        <span>TTY1</span>
        <span>UTF-8</span>
        <span>ZSH</span>
      </div>
      <div className="flex gap-4">
        <span>CPU: 12%</span>
        <span>MEM: 1.4GB / 256GB</span>
        <span>DISK: 12%</span>
      </div>
    </div>
  );
};
