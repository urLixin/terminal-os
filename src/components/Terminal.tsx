import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import { Theme } from '../types';
import { useTerminalCommands } from '../hooks/useTerminalCommands';

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

  const { handleCommand } = useTerminalCommands(
    onThemeChange,
    setCurrentDir,
    currentDir,
    setHistory
  );

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
    
    handleCommand('neofetch', true);
    handleCommand('help', true);

    if (initialCommand) {
      setTimeout(() => handleCommand(initialCommand, false, setCommandHistory, setHistoryIndex), 100);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input, false, setCommandHistory, setHistoryIndex);
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
