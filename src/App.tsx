import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { Terminal } from './components/Terminal';
import { NetworkGraph } from './components/NetworkGraph';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomBar } from './components/layout/BottomBar';
import { Theme } from './types';

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
            <TopBar theme={theme} time={time} />

            <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
              <Sidebar 
                theme={theme} 
                onThemeChange={setTheme} 
                onNavigate={handleNodeClick} 
              />

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

            <BottomBar theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
