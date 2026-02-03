import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
          {/* Backdrop with scanlines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
              }}
            />
          </motion.div>

          {/* Holographic Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-slate-900/80 border border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)]"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg animate-pulse pointer-events-none"></div>
            
            {/* Header */}
            <div className="relative h-14 bg-cyan-950/50 border-b border-cyan-500/30 flex items-center justify-between px-6">
              <div className="flex items-center gap-2 text-cyan-400">
                <Wifi className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Uplink Established</span>
              </div>
              <button 
                onClick={onClose}
                className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrolling scan line in header */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col items-center text-center space-y-6 relative">
              {/* Holographic Circle Animation */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div 
                  className="absolute inset-2 border-t-2 border-r-2 border-cyan-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 border-b-2 border-l-2 border-indigo-400 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="relative z-10 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                >
                  <Check className="w-6 h-6 text-black stroke-[3]" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-display font-black text-white tracking-widest uppercase"
                >
                  Transmission Sent
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-cyan-200/70 text-sm font-mono leading-relaxed"
                >
                  Data packet successfully uploaded to the neural network. Expect a response shortly.
                </motion.p>
              </div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="group relative px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 w-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 text-glow">Terminate Connection</span>
              </motion.button>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 rounded-br-lg"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SuccessModal;
