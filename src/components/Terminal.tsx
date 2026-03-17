import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minus, Square, Shield } from 'lucide-react';
import { Theme } from '../types';
import { PROJECTS, CERTIFICATES, INITIAL_FILESYSTEM } from '../constants';

interface TerminalProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
  initialCommand?: string;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const Terminal: React.FC<TerminalProps> = ({ theme, onThemeChange, onClose, initialCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/wlixin');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const themeColors = {
    green: 'text-green-500 border-green-500/30',
    pink: 'text-pink-500 border-pink-500/30',
    purple: 'text-purple-500 border-purple-500/30',
    blue: 'text-blue-500 border-blue-500/30',
  };

  const glowClasses = {
    green: 'terminal-glow-green',
    pink: 'terminal-glow-pink',
    purple: 'terminal-glow-purple',
    blue: 'terminal-glow-blue',
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Initial welcome message
    handleCommand('neofetch', true);
    handleCommand('help', true);

    if (initialCommand) {
      setTimeout(() => handleCommand(initialCommand), 100);
    }
  }, []);

  const handleCommand = (cmd: string, silent = false) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const baseCmd = args[0];
    let output: React.ReactNode = null;

    if (!silent) {
      setCommandHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
    }

    switch (baseCmd) {
      case 'neofetch':
        output = (
          <div className="flex flex-col md:flex-row gap-8 py-4 animate-scroll-up">
            <div className="text-blue-400 font-bold leading-tight whitespace-pre">
{`       .
      / \\
     /   \\
    /     \\
   /       \\
  /  _   _  \\
 /  / \\ / \\  \\
/  /   V   \\  \\`}
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-bold text-blue-400">wlixin@portfolio</span></p>
              <p>----------------</p>
              <p><span className="font-bold text-blue-400">OS:</span> Arch Linux x86_64</p>
              <p><span className="font-bold text-blue-400">Host:</span> WLixin-Mainframe-X1</p>
              <p><span className="font-bold text-blue-400">Kernel:</span> Linux 6.12.0-quantum-edition</p>
              <p><span className="font-bold text-blue-400">Uptime:</span> 42 days, 13 hours, 37 mins</p>
              <p><span className="font-bold text-blue-400">Packages:</span> 2048 (pacman), 64 (flatpak)</p>
              <p><span className="font-bold text-blue-400">Shell:</span> zsh 5.9</p>
              <p><span className="font-bold text-blue-400">DE:</span> KDE Plasma 6.9.0</p>
              <p><span className="font-bold text-blue-400">WM:</span> KWin (Wayland)</p>
              <p><span className="font-bold text-blue-400">Theme:</span> Catppuccin-Mocha [Qt]</p>
              <p><span className="font-bold text-blue-400">Icons:</span> Papirus-Dark [Qt]</p>
              <p><span className="font-bold text-blue-400">Terminal:</span> konsole 25.12.3</p>
              <p><span className="font-bold text-blue-400">CPU:</span> Quantum-Core i99-15900K (256) @ 8.40 GHz</p>
              <p><span className="font-bold text-blue-400">GPU:</span> NVIDIA RTX 9090 Super Titan [256GB VRAM]</p>
              <p><span className="font-bold text-blue-400">Memory:</span> 512 GiB / 1024 GiB (50%)</p>
              <p><span className="font-bold text-blue-400">Disk (/):</span> 1.2 TiB / 100 TiB (1%) - zfs</p>
              <p><span className="font-bold text-blue-400">Local IP:</span> 10.0.0.1/24</p>
              <p><span className="font-bold text-blue-400">Locale:</span> en_US.UTF-8</p>
              <div className="flex gap-2 mt-2">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-red-500"></div>
                <div className="w-4 h-4 bg-green-500"></div>
                <div className="w-4 h-4 bg-yellow-500"></div>
                <div className="w-4 h-4 bg-blue-500"></div>
                <div className="w-4 h-4 bg-magenta-500"></div>
                <div className="w-4 h-4 bg-cyan-500"></div>
                <div className="w-4 h-4 bg-white"></div>
              </div>
            </div>
          </div>
        );
        break;

      case 'help':
        output = (
          <div className="space-y-6 py-2 animate-scroll-up">
            <div className="border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(137,220,235,0.1)]">
              <div className="bg-blue-500/20 px-4 py-2 border-b border-blue-500/30 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Core Navigation</p>
                <span className="text-[10px] opacity-50">PRIORITY: HIGH</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand('about')}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                    <span className="font-bold text-blue-400 group-hover:underline">about</span>
                  </div>
                  <span className="opacity-60 text-xs">User profile & background</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand('skills')}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                    <span className="font-bold text-blue-400 group-hover:underline">skills</span>
                  </div>
                  <span className="opacity-60 text-xs">Technical expertise & certs</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand('projects')}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                    <span className="font-bold text-blue-400 group-hover:underline">projects</span>
                  </div>
                  <span className="opacity-60 text-xs">Portfolio of work</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand('certs')}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                    <span className="font-bold text-blue-400 group-hover:underline">certs</span>
                  </div>
                  <span className="opacity-60 text-xs">Certifications & achievements</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand('contact')}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                    <span className="font-bold text-blue-400 group-hover:underline">contact</span>
                  </div>
                  <span className="opacity-60 text-xs">Get in touch</span>
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-lg overflow-hidden opacity-80">
              <div className="bg-white/5 px-4 py-1 border-b border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50">System Utilities</p>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">neofetch</span>
                  <span className="opacity-50 text-xs">Display system info</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">theme [color]</span>
                  <span className="opacity-50 text-xs">Switch UI themes</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">ls</span>
                  <span className="opacity-50 text-xs">List directory contents</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">cat [file]</span>
                  <span className="opacity-50 text-xs">Read file content</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">clear</span>
                  <span className="opacity-50 text-xs">Clear terminal screen</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-bold">exit</span>
                  <span className="opacity-50 text-xs">Logout of session</span>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="flex flex-col md:flex-row gap-6 p-4 border border-current/20 rounded-lg animate-scroll-up">
            <div className="w-32 h-32 bg-current/10 rounded-full flex items-center justify-center border border-current/30">
              <Shield size={48} />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">WLixin</p>
              <p className="opacity-80 text-blue-400">Networking Specialist & System Administrator</p>
              <p><span className="opacity-50">Age:</span> 17</p>
              <p><span className="opacity-50">Certifications:</span> Cisco Networking Certificate</p>
              <p><span className="opacity-50">Experience:</span> 4y Networking, 3y SysAdmin, 5y Minecraft Dev</p>
              <p className="italic text-sm mt-2">"Building and securing digital infrastructures."</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-scroll-up">
            <div className="p-3 border border-current/20 rounded bg-current/5">
              <p className="font-bold text-blue-400 mb-2 underline">Networking</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Cisco Networking Certified</li>
                <li>4 Years Practical Experience</li>
                <li>Infrastructure Management</li>
                <li>Hosting Infrastructure Setup</li>
              </ul>
            </div>
            <div className="p-3 border border-current/20 rounded bg-current/5">
              <p className="font-bold text-blue-400 mb-2 underline">Development</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Java (Minecraft Plugins - 5y)</li>
                <li>HTML / CSS (Web Dev)</li>
                <li>Server Optimization (5y)</li>
                <li>Terraform (IaC)</li>
              </ul>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-4 animate-scroll-up">
            {PROJECTS.map(p => (
              <div key={p.id} className="border-l-2 border-current pl-4 py-1">
                <p className="font-bold text-lg text-blue-400">{p.title}</p>
                <p className="text-sm opacity-80">{p.description}</p>
                <div className="flex gap-2 mt-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-1 border border-current/30 rounded">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certificates':
        output = (
          <div className="space-y-4 animate-scroll-up">
            <p className="opacity-50 italic text-blue-400">Verified Credentials:</p>
            {CERTIFICATES.map(cert => (
              <div key={cert.id} className="border-l-2 border-blue-500 pl-4 py-1 hover:bg-blue-500/5 transition-colors group">
                <p className="font-bold text-lg text-blue-400">{cert.title}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">{cert.issuer} • {cert.date}</p>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 underline opacity-0 group-hover:opacity-100 transition-opacity">View Certificate</a>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-2 animate-scroll-up">
            <p className="text-blue-400">Transmission Channels:</p>
            <p><span className="opacity-50">Email:</span> wlixin@devsh.de</p>
            <p><span className="opacity-50">Discord:</span> WLixin#0001</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'theme':
        const newTheme = args[1] as Theme;
        if (['green', 'pink', 'purple', 'blue'].includes(newTheme)) {
          onThemeChange(newTheme);
          output = `Theme updated to ${newTheme}.`;
        } else {
          output = "Invalid theme. Try: blue, green, pink, purple";
        }
        break;

      case 'ls':
        output = "about.md  skills.txt  certificates.txt  contact.txt";
        break;

      case 'cd':
        if (!args[1] || args[1] === '~') {
          setCurrentDir('/home/wlixin');
        } else {
          output = `cd: ${args[1]}: No such directory`;
        }
        break;

      case 'cat':
      case 'open':
        if (args[1] === 'about.md' || args[1] === 'about') {
          output = "Name: WLixin\nAge: 17\nRole: Networking Specialist & SysAdmin\nExperience: 4 years Networking (Cisco Cert), 3 years SysAdmin.";
        } else if (args[1] === 'skills.txt' || args[1] === 'skills') {
          handleCommand('skills', true);
          return;
        } else if (args[1] === 'certificates.txt' || args[1] === 'certs') {
          handleCommand('certs', true);
          return;
        } else if (args[1] === 'contact.txt' || args[1] === 'contact') {
          output = "Discord: WLixin#0001\nEmail: wlixin@devsh.de";
        } else if (args[1] === 'projects') {
          handleCommand('projects', true);
          return;
        } else if (args[1] === 'blog') {
          handleCommand('blog', true);
          return;
        } else {
          output = `${baseCmd}: ${args[1] || ''}: No such file or page`;
        }
        break;

      case 'exit':
        window.location.reload();
        return;

      case '':
        break;

      default:
        output = `Command not found: ${baseCmd}. Type 'help' for assistance.`;
    }

    if (!silent) {
      setHistory(prev => [...prev, {
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } else if (output) {
      setHistory(prev => [...prev, {
        command: '',
        output,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className={`flex-1 flex flex-col bg-black/90 border-2 ${themeColors[theme]} rounded-lg overflow-hidden shadow-2xl relative`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${themeColors[theme]} bg-current/5`}>
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">WLixin OS v1.0</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full border border-current/30 flex items-center justify-center cursor-pointer hover:bg-current/10"><Minus size={8} /></div>
          <div className="w-3 h-3 rounded-full border border-current/30 flex items-center justify-center cursor-pointer hover:bg-current/10"><Square size={8} /></div>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full border border-red-500/50 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-500/20"
          >
            <X size={8} />
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm md:text-base space-y-4 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {history.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 animate-scroll-up"
            >
              {item.command && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">wlixin@portfolio</span>
                  <span className="opacity-50">:</span>
                  <span className="text-purple-400">{currentDir}</span>
                  <span className="opacity-50">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className={`pl-4 ${glowClasses[theme]}`}>
                {item.output}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-blue-400">wlixin@portfolio</span>
          <span className="opacity-50">:</span>
          <span className="text-purple-400">{currentDir}</span>
          <span className="opacity-50">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-current"
            autoFocus
          />
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="scanline" />
    </div>
  );
};
