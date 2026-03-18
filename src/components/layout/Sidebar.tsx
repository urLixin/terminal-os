import React from 'react';
import { Theme } from '../../types';
import { GlassPanel } from '../ui/GlassPanel';

interface SidebarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onNavigate: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ theme, onThemeChange, onNavigate }) => {
  return (
    <GlassPanel theme={theme} className="hidden lg:flex w-64 flex-col gap-4 p-4">
      <div className="text-center mb-4">
        <pre className="text-[8px] leading-none mb-2 opacity-80">
{`
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝ 
  ╚═════╝ ╚══════╝  ╚═══╝  
`}
        </pre>
        <p className="text-xs font-bold opacity-50">WLIXIN_OPERATOR</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Navigation</p>
          <ul className="space-y-1 text-sm">
            {['about', 'skills', 'projects', 'certs', 'contact'].map((item) => (
              <li 
                key={item}
                onClick={() => onNavigate(item)} 
                className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors"
              >
                /root/wlixin/{item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Themes</p>
          <div className="flex gap-2">
            {(['blue', 'green', 'pink', 'purple'] as Theme[]).map((t) => (
              <button 
                key={t}
                onClick={() => onThemeChange(t)} 
                className={`w-4 h-4 rounded-full border border-white/20 ${
                  t === 'blue' ? 'bg-blue-500' : 
                  t === 'green' ? 'bg-green-500' : 
                  t === 'pink' ? 'bg-pink-500' : 'bg-purple-500'
                }`} 
                title={`${t.charAt(0).toUpperCase() + t.slice(1)} Theme`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-current/20">
        <p className="text-[10px] opacity-50">Uptime: 00:42:15</p>
        <p className="text-[10px] opacity-50">Load: 0.12, 0.08, 0.05</p>
      </div>
    </GlassPanel>
  );
};
