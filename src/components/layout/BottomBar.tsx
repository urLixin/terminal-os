import React, { useState, useEffect } from 'react';
import { Theme } from '../../types';

interface BottomBarProps {
  theme: Theme;
}

export const BottomBar: React.FC<BottomBarProps> = ({ theme }) => {
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(1.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * (28 - 8 + 1)) + 8);
      setMem(parseFloat((Math.random() * (2.1 - 1.2) + 1.2).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <span className="transition-opacity duration-500">CPU: {cpu}%</span>
        <span className="transition-opacity duration-500">MEM: {mem}GB / 32GB</span>
        <span>DISK: 420GB / 2TB</span>
      </div>
    </div>
  );
};
