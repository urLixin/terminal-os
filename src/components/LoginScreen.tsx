import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('SYSTEM BOOT COMPLETE');
  const [showInput, setShowInput] = useState(false);
  const targetUsername = 'wLixin';

  useEffect(() => {
    const t1 = setTimeout(() => setStatus('INITIALIZING AUTH SERVICE...'), 800);
    const t2 = setTimeout(() => {
      setStatus('READY');
      setShowInput(true);
    }, 1600);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (showInput) {
      let currentText = '';
      let index = 0;
      
      const typeChar = () => {
        if (index < targetUsername.length) {
          currentText += targetUsername[index];
          setUsername(currentText);
          index++;
          setTimeout(typeChar, 150 + Math.random() * 100);
        } else {
          // Finished typing, wait a bit and login
          setTimeout(() => {
            setStatus('ACCESS GRANTED');
            setTimeout(onLogin, 800);
          }, 500);
        }
      };

      setTimeout(typeChar, 500);
    }
  }, [showInput, onLogin]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 bg-black flex items-center justify-center font-mono z-40 overflow-hidden"
    >
      <div className="max-w-md w-full p-8 space-y-8">
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-sm opacity-50"
          >
            {status}
          </motion.p>
          
          <AnimatePresence>
            {showInput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-green-500 text-xl">
                  <span>login:</span>
                  <div className="flex-1 text-green-500">
                    {username}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-5 bg-green-500 ml-1 align-middle"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-12 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] text-green-500/30 uppercase tracking-widest">Secure Terminal Access</p>
            <p className="text-[10px] text-green-500/30">Encryption: AES-256-GCM</p>
          </div>
          <p className="text-[10px] text-green-500/30">
            Node: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>
      
      {/* CRT Scanline Effect */}
      <div className="crt-overlay" />
    </motion.div>
  );
};
