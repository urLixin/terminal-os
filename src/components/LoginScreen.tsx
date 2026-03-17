import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [status, setStatus] = useState('Authenticating user...');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStatus('User: WLixin'), 500);
    const t2 = setTimeout(() => setStatus('Access granted.'), 1000);
    const t3 = setTimeout(() => setShowPrompt(true), 1200);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onLogin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLogin]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 bg-black flex items-center justify-center font-mono z-40"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 text-xl md:text-2xl"
        >
          {status}
        </motion.div>
        
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={onLogin}
              className="px-8 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 animate-pulse"
            >
              PRESS ENTER TO CONTINUE
            </button>
            <p className="text-green-500/50 text-xs">
              Session ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
