import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Radar = ({ socialLinks, iconMap }) => {
  const [isDetected, setIsDetected] = useState(false);

  // Pre-defined coordinates for the text blips on the radar
  const blipPositions = [
    { top: '30%', left: '25%' },
    { top: '65%', left: '70%' },
    { top: '25%', left: '65%' },
    { top: '70%', left: '30%' },
  ];

  const leftLinks = socialLinks.slice(0, Math.ceil(socialLinks.length / 2));
  const rightLinks = socialLinks.slice(Math.ceil(socialLinks.length / 2));

  return (
    <div className="flex flex-row items-center justify-center gap-4 md:gap-8 w-full">
      {/* Left Social Icons */}
      <div className="flex flex-col gap-4 w-12">
        <AnimatePresence>
          {isDetected && leftLinks.map((link, idx) => {
            const Icon = iconMap[link.icon];
            return (
              <motion.a
                key={`icon-${link.name}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", stiffness: 300, damping: 20,
                  delay: 0.5 + (idx * 0.15)
                }}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center text-slate-500 hover:border-neon-navy hover:text-neon-navy transition-colors group shadow-sm z-10"
              >
                 <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Radar Container */}
      <div 
        className="relative flex items-center justify-center cursor-crosshair group shrink-0"
        onMouseEnter={() => setIsDetected(true)}
      >
        {/* Helper pulse ring to encourage hover if not detected yet */}
        {!isDetected && (
          <div className="absolute inset-0 rounded-full border border-neon-olive/50 animate-ping" style={{ animationDuration: '3s' }}></div>
        )}
        
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-neon-olive/30 bg-slate-900/40 overflow-hidden shadow-[0_0_20px_rgba(182,255,0,0.05)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(182,255,0,0.15)] group-hover:bg-slate-900/60">
          {/* Grid rings */}
          <div className="absolute inset-0 rounded-full border border-neon-olive/20 scale-[0.75]"></div>
          <div className="absolute inset-0 rounded-full border border-neon-olive/20 scale-[0.50]"></div>
          <div className="absolute inset-0 rounded-full border border-neon-olive/20 scale-[0.25]"></div>
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-neon-olive/20 top-1/2 -translate-y-1/2"></div>
          <div className="absolute h-full w-[1px] bg-neon-olive/20 left-1/2 -translate-x-1/2"></div>
          
          {/* Sweeping Scanner */}
          <div 
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(182,255,0,0.3)_100%)] animate-spin" 
            style={{ animationDuration: '3s' }}
          ></div>
          
          {/* Default Ping Animations (when not detected) */}
          <div className={`absolute w-1.5 h-1.5 bg-neon-olive rounded-full top-1/4 right-1/4 animate-ping ${isDetected ? 'opacity-0' : 'opacity-100'} transition-opacity`} style={{ animationDuration: '2s' }}></div>
          <div className={`absolute w-2 h-2 bg-neon-olive rounded-full bottom-1/3 left-1/4 animate-ping ${isDetected ? 'opacity-0' : 'opacity-100'} transition-opacity`} style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
          
          {/* Detected Texts inside Radar */}
          <AnimatePresence>
            {isDetected && socialLinks.map((link, idx) => (
              <motion.div
                key={`text-${link.name}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.2 }}
                className="absolute text-[8px] md:text-[10px] font-mono font-bold text-neon-olive tracking-widest bg-slate-900/80 px-1 rounded border border-neon-olive/30 shadow-[0_0_10px_rgba(182,255,0,0.2)]"
                style={{ top: blipPositions[idx % blipPositions.length].top, left: blipPositions[idx % blipPositions.length].left, transform: 'translate(-50%, -50%)' }}
              >
                [{link.name.toUpperCase()}]
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Center Node */}
          <div className="absolute w-2 h-2 bg-neon-olive rounded-full shadow-[0_0_8px_#b6ff00] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      
      {/* Right Social Icons */}
      <div className="flex flex-col gap-4 w-12">
        <AnimatePresence>
          {isDetected && rightLinks.map((link, idx) => {
            const Icon = iconMap[link.icon];
            const globalIdx = leftLinks.length + idx; 
            return (
              <motion.a
                key={`icon-${link.name}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", stiffness: 300, damping: 20,
                  delay: 0.5 + (globalIdx * 0.15) 
                }}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center text-slate-500 hover:border-neon-navy hover:text-neon-navy transition-colors group shadow-sm z-10"
              >
                 <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Radar;
