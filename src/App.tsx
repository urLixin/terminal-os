import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { Terminal } from './components/Terminal';
import { NetworkGraph } from './components/NetworkGraph';
import { Theme } from './types';
import { Clock, Wifi, Battery, Shield, Settings } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<'boot' | 'login' | 'os'>('boot');
  const [theme, setTheme] = useState<Theme>('blue');
  const [time, setTime] = useState(new Date());
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalCommand, setTerminalCommand] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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

  const handleLogin = React.useCallback(() => {
    console.log("Switching to OS stage...");
    setStage('os');
  }, []);

  const handleNodeClick = (id: string) => {
    if (id === 'center') {
      setTerminalCommand(undefined);
    } else {
      setTerminalCommand(id);
    }
    setIsTerminalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-black transition-colors duration-1000 ${themeColors[theme]}`}>
      <div className="crt-overlay" />
      
      <AnimatePresence mode="wait">
        {stage === 'boot' && (
          <BootSequence key="boot" onComplete={() => setStage('login')} />
        )}
        
        {stage === 'login' && (
          <LoginScreen key="login" onLogin={handleLogin} />
        )}

        {stage === 'os' && (
          <motion.div
            key="os"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-screen flex flex-col p-2 md:p-4 gap-4"
          >
            {/* Top Bar */}
            <div className={`flex items-center justify-between px-4 py-2 border-2 ${themeColors[theme]} ${bgColors[theme]} rounded-lg`}>
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
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
              {/* Sidebar / Quick Links */}
              <div className={`hidden lg:flex w-64 flex-col gap-4 border-2 ${themeColors[theme]} ${bgColors[theme]} rounded-lg p-4`}>
                <div className="text-center mb-4">
                  <pre className="text-[8px] leading-none mb-2 text-blue-500">
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
                      <li onClick={() => handleNodeClick('about')} className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors">/root/wlixin/about</li>
                      <li onClick={() => handleNodeClick('skills')} className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors">/root/wlixin/skills</li>
                      <li onClick={() => handleNodeClick('projects')} className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors">/root/wlixin/projects</li>
                      <li onClick={() => handleNodeClick('certs')} className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors">/root/wlixin/certs</li>
                      <li onClick={() => handleNodeClick('contact')} className="cursor-pointer hover:bg-current/10 p-1 rounded transition-colors">/root/wlixin/contact</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Themes</p>
                    <div className="flex gap-2">
                      <button onClick={() => setTheme('blue')} className="w-4 h-4 rounded-full bg-blue-500 border border-white/20" title="Baby Blue" />
                      <button onClick={() => setTheme('green')} className="w-4 h-4 rounded-full bg-green-500 border border-white/20" title="Matrix Green" />
                      <button onClick={() => setTheme('pink')} className="w-4 h-4 rounded-full bg-pink-500 border border-white/20" title="Cyber Pink" />
                      <button onClick={() => setTheme('purple')} className="w-4 h-4 rounded-full bg-purple-500 border border-white/20" title="Neon Purple" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-current/20">
                  <p className="text-[10px] opacity-50">Uptime: 00:42:15</p>
                  <p className="text-[10px] opacity-50">Load: 0.12, 0.08, 0.05</p>
                </div>
              </div>

              {/* Terminal Area */}
              <AnimatePresence mode="wait">
                {isTerminalOpen ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col"
                  >
                    <Terminal 
                      theme={theme} 
                      onThemeChange={setTheme} 
                      onClose={() => setIsTerminalOpen(false)}
                      initialCommand={terminalCommand}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="graph"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    <NetworkGraph onNodeClick={handleNodeClick} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Bar */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
