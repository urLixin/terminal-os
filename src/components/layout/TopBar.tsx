import React from 'react';
import { Shield, Wifi, Clock, Battery, Settings } from 'lucide-react';
import { Theme } from '../../types';
import { GlassPanel } from '../ui/GlassPanel';

interface TopBarProps {
  theme: Theme;
  time: Date;
}

export const TopBar: React.FC<TopBarProps> = ({ theme, time }) => {
  return (
    <GlassPanel theme={theme} className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield size={16} />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Secure Session</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={16} />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Connected</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-bold">
        <Clock size={16} />
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Battery size={16} />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">100%</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <Settings size={16} />
        </div>
      </div>
    </GlassPanel>
  );
};
