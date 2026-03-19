import React, { useState, useEffect } from 'react';
import { Theme } from '../../types';
import { GlassPanel } from '../ui/GlassPanel';
import { 
  Folder, 
  Terminal, 
  Cpu, 
  Activity, 
  Globe, 
  Github, 
  User, 
  Award, 
  Mail, 
  Code, 
  FileText,
  Settings,
  Monitor,
  Command
} from 'lucide-react';

interface SidebarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onNavigate: (id: string) => void;
  startTime: Date;
}

export const Sidebar: React.FC<SidebarProps> = ({ theme, onThemeChange, onNavigate, startTime }) => {
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      setUptime(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'certs', label: 'Certs', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const utilityItems = [
    { id: 'neofetch', label: 'neofetch', icon: Monitor },
    { id: 'htop', label: 'htop', icon: Activity },
    { id: 'uptime', label: 'uptime', icon: Cpu },
    { id: 'whoami', label: 'whoami', icon: User },
    { id: 'motd', label: 'motd', icon: FileText },
    { id: 'log', label: 'log', icon: FileText },
  ];

  const extendedItems = [
    { id: 'github', label: 'github', icon: Github },
    { id: 'resume', label: 'resume', icon: FileText },
  ];

  return (
    <GlassPanel theme={theme} className="hidden lg:flex w-64 flex-col gap-6 p-5 overflow-y-auto scrollbar-hide">
      <div className="text-center">
        <pre className="text-[7px] leading-none mb-3 opacity-80 font-mono inline-block mx-auto">
{`
 ██╗    ██╗██╗     ██╗██╗  ██╗██╗███╗   ██╗
 ██║    ██║██║     ██║╚██╗██╔╝██║████╗  ██║
 ██║ █╗ ██║██║     ██║ ╚███╔╝ ██║██╔██╗ ██║
 ██║███╗██║██║     ██║ ██╔██╗ ██║██║╚██╗██║
 ╚███╔███╔╝███████╗██║██╔╝ ██╗██║██║ ╚████║
  ╚══╝╚══╝ ╚══════╝╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
`}
        </pre>
        <div className="flex items-center justify-center gap-2 opacity-40">
          <div className="h-[1px] w-4 bg-current"></div>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase">Operator Interface</p>
          <div className="h-[1px] w-4 bg-current"></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Navigation */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Folder size={12} className="opacity-50" />
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Navigation</p>
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => onNavigate(item.id)} 
                className="group flex items-center gap-3 cursor-pointer hover:bg-current/10 p-2 rounded-md transition-all duration-200"
              >
                <item.icon size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs opacity-70 group-hover:opacity-100">/root/{item.id}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Utilities */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Command size={12} className="opacity-50" />
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">System Utils</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {utilityItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigate(`utility:${item.id}`)} 
                className="group flex items-center gap-2 cursor-pointer hover:bg-current/10 p-1.5 rounded transition-all text-[10px] opacity-60 hover:opacity-100"
              >
                <item.icon size={12} className="opacity-40 group-hover:opacity-100" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Extended */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Globe size={12} className="opacity-50" />
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Extended</p>
          </div>
          <ul className="space-y-1">
            {extendedItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => onNavigate(`utility:${item.id}`)} 
                className="group flex items-center gap-3 cursor-pointer hover:bg-current/10 p-2 rounded-md transition-all text-xs opacity-60 hover:opacity-100"
              >
                <item.icon size={14} className="opacity-40 group-hover:opacity-100" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Themes */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Settings size={12} className="opacity-50" />
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Appearance</p>
          </div>
          <div className="flex items-center justify-between bg-current/5 p-2 rounded-lg border border-current/10">
            <span className="text-[10px] opacity-50 uppercase tracking-tighter">Color Matrix</span>
            <div className="flex gap-2">
              {(['blue', 'green', 'pink', 'purple'] as Theme[]).map((t) => (
                <button 
                  key={t}
                  onClick={() => onThemeChange(t)} 
                  className={`w-4 h-4 rounded-sm border transition-all duration-300 ${
                    t === theme ? 'border-current scale-110 shadow-[0_0_8px_rgba(var(--current-color),0.5)]' : 'border-transparent opacity-40 hover:opacity-100'
                  } ${
                    t === 'blue' ? 'bg-blue-500' : 
                    t === 'green' ? 'bg-green-500' : 
                    t === 'pink' ? 'bg-pink-500' : 'bg-purple-500'
                  }`} 
                  title={`${t.charAt(0).toUpperCase() + t.slice(1)} Theme`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto pt-4 border-t border-current/10 space-y-2">
        <div className="flex items-center justify-between text-[9px] opacity-40 font-mono">
          <div className="flex items-center gap-1">
            <Activity size={10} />
            <span>UPTIME</span>
          </div>
          <span>{uptime}</span>
        </div>
        <div className="flex items-center justify-between text-[9px] opacity-40 font-mono">
          <div className="flex items-center gap-1">
            <Cpu size={10} />
            <span>LOAD</span>
          </div>
          <span>0.12 0.08 0.05</span>
        </div>
      </div>
    </GlassPanel>
  );
};

