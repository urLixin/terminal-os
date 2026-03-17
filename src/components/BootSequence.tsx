import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Initializing system...",
  "Loading kernel v6.8.2-wlixin-edition...",
  "Checking hardware compatibility...",
  "CPU: Quantum-X 128-core processor detected",
  "RAM: 256GB ECC DDR6 initialized",
  "Storage: 4TB NVMe SSD mounted at /",
  "Network: Ghost-Protocol mesh network active",
  "Starting system services...",
  "Loading UI components...",
  "Mounting virtual filesystem...",
  "System ready."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 200 + 50);
      return () => clearTimeout(timeout);
    } else {
      // Auto-complete after a short delay, or allow manual click
      const timeout = setTimeout(onComplete, 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, onComplete]);

  useEffect(() => {
    const handleInput = () => {
      if (currentIndex >= BOOT_LOGS.length) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleInput);
    window.addEventListener('click', handleInput);
    return () => {
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('click', handleInput);
    };
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col p-8 font-mono text-sm md:text-base z-50 overflow-hidden cursor-pointer"
    >
      <div className="max-w-3xl mx-auto w-full">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="mb-1 text-green-500"
          >
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {log}
          </motion.div>
        ))}
        {currentIndex < BOOT_LOGS.length ? (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-green-500 ml-1"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-4 text-green-500 font-bold"
          >
            {">"} PRESS ANY KEY OR CLICK TO LOGIN
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
