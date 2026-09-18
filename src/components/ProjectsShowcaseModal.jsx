import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Code, 
  Terminal, 
  Search, 
  Info,
} from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

const filterCategories = [
  { id: 'all', label: 'ALL SYSTEMS' },
  { id: 'next', label: 'NEXT.JS 16' },
  { id: 'ecommerce', label: 'E-COMMERCE' },
  { id: 'fullstack', label: 'FULL-STACK' },
  { id: 'mern', label: 'MERN / REACT' },
];

export default function ProjectsShowcaseModal({ 
  isOpen, 
  onClose, 
  projects = [], 
  onOpenDetails 
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [introPhase, setIntroPhase] = useState('counting'); // 'counting' | 'ready'
  const [countdownNum, setCountdownNum] = useState(3);
  const containerRef = useRef(null);

  // 3-2-1 Countdown Vault Construction Sequence
  useEffect(() => {
    if (!isOpen) {
      setIntroPhase('counting');
      setCountdownNum(3);
      return;
    }

    setIntroPhase('counting');
    setCountdownNum(3);

    const t1 = setTimeout(() => setCountdownNum(2), 400);
    const t2 = setTimeout(() => setCountdownNum(1), 800);
    const t3 = setTimeout(() => setCountdownNum(0), 1200); // Access Granted
    const t4 = setTimeout(() => setIntroPhase('ready'), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  const skipIntro = () => {
    setIntroPhase('ready');
  };

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = () => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'next') {
          return project.technologies?.some(t => t.toLowerCase().includes('next'));
        }
        if (selectedCategory === 'ecommerce') {
          const text = (project.title + ' ' + project.description).toLowerCase();
          return text.includes('commerce') || text.includes('shop') || text.includes('store') || project.technologies?.some(t => t.toLowerCase().includes('stripe'));
        }
        if (selectedCategory === 'fullstack') {
          return project.technologies?.some(t => ['express', 'nestjs', 'mongodb', 'postgresql', 'prisma', 'node'].some(back => t.toLowerCase().includes(back)));
        }
        if (selectedCategory === 'mern') {
          return project.technologies?.some(t => ['react', 'mongodb', 'node', 'express'].some(k => t.toLowerCase().includes(k)));
        }
        return true;
      };

      const matchesSearch = () => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.technologies?.some(t => t.toLowerCase().includes(q))
        );
      };

      return matchesCategory() && matchesSearch();
    });
  }, [projects, selectedCategory, searchQuery]);

  // Reset active index when filtered list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, filteredProjects.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredProjects.length, onClose]);

  // Multi-input Gesture: Drag, Swipe, Wheel, and Touch
  const lastWheelTime = useRef(0);
  const touchStartX = useRef(0);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Trigger on either 25px drag or quick swipe flick (> 200px/s)
    if (offset < -25 || velocity < -200) {
      if (activeIndex < filteredProjects.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    } else if (offset > 25 || velocity > 200) {
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 280) return; // Prevent rapid multiple skips

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta > 20) {
      lastWheelTime.current = now;
      setActiveIndex(prev => Math.min(prev + 1, filteredProjects.length - 1));
    } else if (delta < -20) {
      lastWheelTime.current = now;
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches?.[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches?.[0]) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 30 && activeIndex < filteredProjects.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (diff < -30 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between overflow-hidden select-none bg-slate-950/95"
        >
          {/* Backdrop click listener */}
          <div 
            onClick={onClose}
            className="absolute inset-0 z-0 cursor-pointer"
          />

          {/* Ambient subtle grid & fast radial glows (No heavy Gaussian blur) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] pointer-events-none" 
            style={{ background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.28) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[220px] pointer-events-none" 
            style={{ background: 'radial-gradient(ellipse at center, rgba(77, 124, 15, 0.22) 0%, transparent 70%)' }}
          />

          {/* ===================== 3, 2, 1 COUNTDOWN HUD OVERLAY ===================== */}
          <AnimatePresence>
            {introPhase === 'counting' && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/98"
              >
                {/* Laser Scanning Line */}
                <motion.div 
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none"
                />

                {/* Futuristic Circular Reticle HUD */}
                <div className="relative flex items-center justify-center w-64 h-64">
                  {/* Outer Rotating HUD Dashed Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30"
                  />

                  {/* Counter-rotating Inner Brackets Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-4 rounded-full border-2 border-t-lime-400 border-b-blue-500 border-l-transparent border-r-transparent opacity-75"
                  />

                  {/* Pulsing Central Target Core */}
                  <motion.div
                    animate={{ scale: [0.96, 1.04, 0.96] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-10 rounded-full bg-blue-950/60 border border-blue-400/50 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_50px_rgba(30,58,138,0.6)]"
                  >
                    {countdownNum > 0 ? (
                      <motion.div
                        key={countdownNum}
                        initial={{ scale: 0.4, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center"
                      >
                        <span className="font-display font-black text-6xl text-white tracking-widest drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]">
                          0{countdownNum}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center px-2"
                      >
                        <span className="font-mono text-[10px] font-bold text-lime-400 tracking-widest block uppercase">
                          DECRYPTED
                        </span>
                        <span className="font-display text-xs font-bold text-white uppercase tracking-tight">
                          ACCESS GRANTED
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Telemetry Status Line Below Reticle */}
                <div className="mt-8 text-center space-y-1.5 font-mono">
                  <span className="text-[10px] text-lime-400 font-bold tracking-[0.3em] uppercase block">
                    // SYSTEM.CONSTRUCT // PROTOCOL_INIT
                  </span>
                  <p className="text-xs text-slate-400 tracking-wider">
                    {countdownNum === 3 && 'DECRYPTING SECURITY KERNEL...'}
                    {countdownNum === 2 && 'SYNCHRONIZING 3D TELEMETRY...'}
                    {countdownNum === 1 && 'MATERIALIZING REPOSITORY VAULT...'}
                    {countdownNum === 0 && 'INITIALIZING HUD CONSTRUCT...'}
                  </p>
                </div>

                {/* Skip Button */}
                <button
                  onClick={skipIntro}
                  className="absolute top-6 right-6 font-mono text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-1.5 rounded transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>SKIP INTRO</span>
                  <span>⏭</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===================== VAULT INTERFACE (CONSTRUCTS SMOOTHLY) ===================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={introPhase === 'ready' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`w-full h-full flex flex-col justify-between ${introPhase === 'counting' ? 'pointer-events-none' : ''}`}
          >

          {/* ===================== TOP HEADER HUD ===================== */}
          <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-3 pb-2.5 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 shadow-md">
            {/* Logo & Section Identity */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-lime-400 font-bold tracking-widest uppercase">
                  // SYSTEM.ARCHIVE // 3D_SHOWCASE_V3
                </span>
                <h2 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  Project Vault <span className="text-xs font-mono text-slate-400 font-normal">[{String(activeIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}]</span>
                </h2>
              </div>
            </div>

            {/* Search Box & Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {/* Search Input */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stack/title..."
                  className="font-mono text-xs text-slate-200 bg-slate-950/80 border border-white/15 rounded px-2.5 py-1 pl-8 focus:outline-none focus:border-blue-400 focus:bg-slate-900 transition-all placeholder:text-slate-500 w-36 sm:w-44 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Chips */}
              <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/80 p-1 border border-white/10 rounded">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`font-mono text-[9px] px-2.5 py-1 uppercase font-bold transition-all rounded ${
                      selectedCategory === cat.id
                        ? 'bg-neon-navy text-white shadow-[0_0_15px_rgba(30,58,138,0.5)] border border-blue-400/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Close & Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-red-500/20 hover:border-red-500/40 border border-white/15 px-3.5 py-1.5 rounded uppercase font-bold transition-all shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ESC / CLOSE</span>
              </button>
            </div>
          </header>

          {/* ===================== CENTER 3D COVERFLOW STAGE ===================== */}
          <div 
            ref={containerRef}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden py-2 sm:py-3 select-none"
            style={{ perspective: '1200px' }}
          >
            {/* Holographic Chevrons for Quick Click */}
            <button
              onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
              disabled={activeIndex === 0}
              className={`absolute left-3 sm:left-6 z-40 p-2.5 sm:p-3 rounded-full border border-white/15 bg-slate-900/90 text-slate-200 transition-all shadow-xl ${
                activeIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-neon-navy hover:text-white hover:border-blue-400 hover:scale-110 shadow-[0_0_20px_rgba(30,58,138,0.4)]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIndex(prev => Math.min(prev + 1, filteredProjects.length - 1))}
              disabled={activeIndex === filteredProjects.length - 1}
              className={`absolute right-3 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full border border-white/15 bg-slate-900/90 text-slate-200 transition-all shadow-xl ${
                activeIndex === filteredProjects.length - 1 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-neon-navy hover:text-white hover:border-blue-400 hover:scale-110 shadow-[0_0_20px_rgba(30,58,138,0.4)]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Canvas with Hardware Accelerated GPU Spring Motion */}
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {filteredProjects.length === 0 ? (
                <div className="text-center text-slate-400 font-mono py-12 bg-slate-900/80 p-8 rounded border border-white/10 shadow-lg">
                  <Terminal className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-xs">NO SYSTEMS MATCHED THE SPECIFIED SEARCH FILTER.</p>
                </div>
              ) : (
                filteredProjects.map((project, index) => {
                  const offset = index - activeIndex;
                  const isCenter = offset === 0;
                  
                  // Optimize: Only render visible cards near the viewport
                  if (Math.abs(offset) > 2) return null;

                  // 3D coverflow transform values
                  const rotateY = isCenter ? 0 : offset > 0 ? -38 : 38;
                  const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 220 : 300);
                  const scale = isCenter ? 1 : 0.85;
                  const zIndex = 30 - Math.abs(offset);
                  const opacity = isCenter ? 1 : 0.55;

                  return (
                    <motion.div
                      key={project.id}
                      onClick={() => {
                        if (!isCenter) setActiveIndex(index);
                      }}
                      animate={{
                        x: translateX,
                        scale,
                        rotateY,
                        z: isCenter ? 60 : -120,
                        opacity,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 340,
                        damping: 32,
                        mass: 0.8,
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                        zIndex,
                      }}
                      className={`absolute w-[90vw] max-w-[360px] sm:max-w-[410px] md:max-w-[450px] bg-slate-900/95 border transition-colors duration-200 rounded-lg overflow-hidden ${
                        isCenter 
                          ? 'border-blue-500/80 shadow-[0_0_45px_rgba(30,58,138,0.45),0_0_90px_rgba(37,99,235,0.2)] ring-1 ring-blue-400/40' 
                          : 'border-white/10 hover:border-white/30 cursor-pointer shadow-xl'
                      }`}
                    >
                      {/* Tech Corners on Active Card */}
                      {isCenter && (
                        <>
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-lime-400 z-30 pointer-events-none" />
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-lime-400 z-30 pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-lime-400 z-30 pointer-events-none" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-lime-400 z-30 pointer-events-none" />
                        </>
                      )}

                      {/* Top HUD Line on Card */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isCenter ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                          <span className="text-slate-400 uppercase font-bold text-[9px]">
                            // REPO_{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-[9px] text-lime-400 font-bold tracking-wider">
                          {isCenter ? '● ACTIVE_TARGET' : 'IN_QUEUE'}
                        </span>
                      </div>

                      {/* Project Preview Screen */}
                      <div className="relative aspect-[16/9] max-h-[160px] sm:max-h-[185px] w-full overflow-hidden bg-slate-950 border-b border-white/5">
                        <ImageWithLoader
                          src={project.images?.[0] || project.image}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isCenter ? 'scale-100' : 'scale-105 opacity-80'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70 pointer-events-none" />

                        {/* Cyber Scanline across active card */}
                        {isCenter && (
                          <motion.div
                            animate={{ y: ['-100%', '300%'] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none"
                          />
                        )}
                      </div>

                      {/* Card Content Details */}
                      <div className="p-3 sm:p-3.5 flex flex-col gap-2 font-mono bg-slate-900/95">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-tight line-clamp-1">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1 py-0.5">
                          {project.technologies?.slice(0, 4).map((tech, i) => (
                            <span 
                              key={i} 
                              className="text-[9px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded font-mono uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 4 && (
                            <span className="text-[9px] px-1 py-0.5 bg-blue-900/40 border border-blue-500/30 text-blue-300 rounded font-mono font-bold">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Card Action Command Buttons */}
                        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => !isCenter && e.preventDefault()}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 text-[11px] uppercase font-bold font-mono transition-all rounded ${
                              isCenter
                                ? 'bg-neon-navy hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(30,58,138,0.5)] border border-blue-400/40'
                                : 'bg-white/5 text-slate-500 pointer-events-none'
                            }`}
                          >
                            <Monitor className="w-3 h-3" /> Execute
                          </a>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => !isCenter && e.preventDefault()}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 text-[11px] uppercase font-bold font-mono border transition-all rounded ${
                              isCenter
                                ? 'border-white/20 bg-white/10 hover:border-blue-400 hover:text-white text-slate-200'
                                : 'border-white/5 text-slate-500 pointer-events-none'
                            }`}
                          >
                            <Code className="w-3 h-3" /> Source
                          </a>

                          <button
                            onClick={() => {
                              if (isCenter && onOpenDetails) {
                                onOpenDetails(project);
                              }
                            }}
                            className={`p-1.5 border transition-all rounded ${
                              isCenter 
                                ? 'bg-lime-500/10 hover:bg-lime-500/20 border-lime-400/50 text-lime-400' 
                                : 'border-white/5 text-slate-600 pointer-events-none'
                            }`}
                            title="Open Complete Project Logs"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>

          {/* ===================== BOTTOM TIME-REEL & SCRUBBER ===================== */}
          <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-3.5 pt-1.5 flex flex-col gap-2 border-t border-white/10 bg-slate-950/90 shadow-2xl">
            {/* Synthesizer Scrubber Slider with Graduations */}
            <div className="relative w-full flex flex-col gap-0.5">
              {/* Ticks graduation line */}
              <div className="flex justify-between w-full px-1 text-[8px] font-mono text-slate-500 select-none">
                {filteredProjects.map((_, i) => (
                  <span 
                    key={i} 
                    className={`transition-colors cursor-pointer ${
                      i === activeIndex ? 'text-lime-400 font-bold' : 'text-slate-600 hover:text-slate-400'
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    | {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>

              {/* Range Scrubber input */}
              <input
                type="range"
                min={0}
                max={Math.max(filteredProjects.length - 1, 0)}
                value={activeIndex}
                onChange={(e) => setActiveIndex(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
              />
            </div>

            {/* Mini Filmstrip / Thumbnails Tape */}
            <div className="flex items-center justify-between gap-3 overflow-x-auto py-0.5 custom-scrollbar">
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((proj, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative flex-shrink-0 group overflow-hidden rounded border transition-all ${
                        isActive 
                          ? 'border-blue-400 ring-2 ring-blue-500/50 w-20 sm:w-24 h-9 sm:h-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                          : 'border-white/10 hover:border-white/30 w-14 sm:w-16 h-7 sm:h-8 opacity-45 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={proj.images?.[0] || proj.image} 
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                      <span className="absolute bottom-0.5 left-1 text-[7px] font-mono font-bold text-white bg-black/80 border border-white/10 px-1 rounded">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Tip & Key Commands */}
              <div className="hidden md:flex items-center gap-4 text-[9px] font-mono text-slate-400 uppercase">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-white text-[9px]">←</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-white text-[9px]">→</kbd>
                  DRAG / ARROWS
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-white text-[9px]">ESC</kbd>
                  EXIT
                </span>
              </div>
            </div>
          </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
