import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Shield, User, Code, Briefcase, Mail, Award } from 'lucide-react';

interface NodeProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  isCenter?: boolean;
  onPositionChange: (id: string, x: number, y: number) => void;
  onClick: () => void;
}

const Node: React.FC<NodeProps> = ({ id, label, icon, x, y, isCenter, onPositionChange, onClick }) => {
  const nodeX = useMotionValue(x);
  const nodeY = useMotionValue(y);
  const isDragging = useRef(false);

  // Smooth springs for movement
  const springX = useSpring(nodeX, { stiffness: 100, damping: 20 });
  const springY = useSpring(nodeY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => { isDragging.current = true; }}
      onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 100); }}
      onDrag={(_, info) => {
        const newX = nodeX.get() + info.delta.x;
        const newY = nodeY.get() + info.delta.y;
        nodeX.set(newX);
        nodeY.set(newY);
        onPositionChange(id, newX, newY);
      }}
      onClick={() => {
        if (!isDragging.current) {
          onClick();
        }
      }}
      style={{
        x: springX,
        y: springY,
        position: 'absolute',
      }}
      className={`flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10 ${
        isCenter ? 'scale-150' : 'scale-100'
      }`}
    >
      <div
        className={`rounded-2xl flex flex-col items-center justify-center shadow-2xl backdrop-blur-md border-2 transition-all duration-300 ${
          isCenter
            ? 'w-24 h-24 bg-blue-400/20 border-blue-400 text-blue-400 shadow-blue-400/20'
            : 'w-16 h-16 bg-white/5 border-white/10 text-white/70 hover:border-blue-400/50 hover:text-blue-400'
        }`}
      >
        {isCenter ? (
          <div className="text-center">
            <p className="font-black text-lg leading-tight">wLixin</p>
            <p className="text-[10px] font-bold opacity-70 tracking-tighter">@dev</p>
          </div>
        ) : (
          icon
        )}
      </div>
      {!isCenter && (
        <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/50">
          {label}
        </span>
      )}
    </motion.div>
  );
};

export const NetworkGraph: React.FC<{ onNodeClick: (id: string) => void }> = ({ onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState([
    { id: 'center', label: 'wLixin', icon: null, x: 0, y: 0, isCenter: true },
    { id: 'about', label: 'About', icon: <User size={24} />, x: -200, y: -150 },
    { id: 'skills', label: 'Skills', icon: <Code size={24} />, x: 200, y: -150 },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={24} />, x: -250, y: 100 },
    { id: 'certs', label: 'Certs', icon: <Award size={24} />, x: 250, y: 100 },
    { id: 'contact', label: 'Contact', icon: <Mail size={24} />, x: 0, y: 200 },
  ]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePositionChange = (id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const centerNode = nodes.find((n) => n.isCenter);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 bg-black/40 rounded-xl overflow-hidden cursor-crosshair"
      style={{ perspective: '1000px' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        {nodes
          .filter((n) => !n.isCenter)
          .map((n) => {
            if (!centerNode) return null;
            const startX = dimensions.width / 2 + centerNode.x;
            const startY = dimensions.height / 2 + centerNode.y;
            const endX = dimensions.width / 2 + n.x;
            const endY = dimensions.height / 2 + n.y;

            // Curved path like NetBird
            const cp1x = startX + (endX - startX) * 0.5;
            const cp1y = startY;
            const cp2x = startX + (endX - startX) * 0.5;
            const cp2y = endY;

            return (
              <g key={n.id}>
                <motion.path
                  d={`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="blur-[2px]"
                />
                <motion.path
                  d={`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    strokeDashoffset: [0, -20]
                  }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    opacity: { duration: 1.5 },
                    strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                />
              </g>
            );
          })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nodes.map((node) => (
          <Node
            key={node.id}
            {...node}
            onPositionChange={handlePositionChange}
            onClick={() => onNodeClick(node.id)}
          />
        ))}
      </div>

      {/* Re-open Terminal Button */}
      <button
        onClick={() => onNodeClick('center')}
        className="absolute bottom-6 right-6 px-4 py-2 bg-blue-500/20 border border-blue-400 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/40 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      >
        Restore Terminal
      </button>

      {/* Instructions */}
      <div className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
        Interactive Node Map // Drag to explore
      </div>
    </div>
  );
};
