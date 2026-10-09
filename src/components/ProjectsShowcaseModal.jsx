import { useEffect, useState, useRef } from 'react';
import { X, Github, ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function ProjectsShowcaseModal({ isOpen, onClose, project }) {
  const [viewMode, setViewMode] = useState('browser');
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [showIframe, setShowIframe] = useState(false);
  const lenis = useLenis();

  // Stop Lenis smooth scroll when modal is open so wheel events don't bleed through
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => { lenis.start(); };
  }, [isOpen, lenis]);

  // Force native wheel scroll on the content panel, bypassing Lenis entirely
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isOpen]);

  useEffect(() => {
    if (project) {
      setViewMode(project.liveUrl ? 'browser' : 'image');
    }
  }, [project]);

  // Delay iframe mounting to prevent blocking the modal open animation
  useEffect(() => {
    if (isOpen && viewMode === 'browser' && project?.liveUrl) {
      setShowIframe(false);
      const timer = setTimeout(() => setShowIframe(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowIframe(false);
    }
  }, [isOpen, viewMode, project]);

  useEffect(() => {
    if (!containerRef.current || viewMode !== 'browser') return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1440);
        }
      }
    };

    // Initial check
    updateScale();
    
    const observer = new ResizeObserver(() => {
      updateScale();
    });
    
    observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);
    
    // Fallback for when the modal animation finishes
    const timeoutId = setTimeout(updateScale, 500);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
      clearTimeout(timeoutId);
    };
  }, [viewMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[95vh] max-h-[95vh] bg-[#F9F6F0] shadow-2xl flex flex-col md:flex-row z-10 animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Left Column: Browser / Image View */}
        <div className="md:w-1/2 bg-zinc-200 border-b md:border-b-0 md:border-r border-zinc-300 relative flex flex-col h-[50vh] md:h-full">
          
          {/* Top Bar for View Toggles */}
          <div className="flex items-center justify-between border-b border-zinc-300 bg-[#F9F6F0] px-4 py-4 z-20 w-full shrink-0">
            <div className="flex items-center bg-zinc-200/60 rounded-md p-1 shadow-inner">
              {project.liveUrl && (
                <button
                  onClick={() => setViewMode('browser')}
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${viewMode === 'browser' ? 'bg-zinc-900 text-[#F9F6F0] shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  Live Browser
                </button>
              )}
              <button
                onClick={() => setViewMode('image')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${viewMode === 'image' ? 'bg-zinc-900 text-[#F9F6F0] shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Static Image
              </button>
            </div>
            
            {/* Mobile Close Button (moved to header) */}
            <button
              onClick={onClose}
              className="md:hidden flex items-center justify-center p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors bg-zinc-200/60 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={containerRef} className={`flex-1 w-full overflow-x-hidden relative bg-zinc-100 ${viewMode === 'browser' ? 'overflow-y-hidden' : 'overflow-y-auto scrollbar-hide'}`}>
            {viewMode === 'browser' ? (
              project.liveUrl ? (
                project.liveUrl.includes('smart24.live') ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-widest">Security Policy Restriction</span>
                    <p className="text-xs text-zinc-500 mb-6 max-w-sm leading-relaxed">
                      This specific project's server prevents internal embedding. Please click the <strong>Live Demo</strong> button on the right to view the live website in a new tab.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Loading State & Blurred Image Background */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-0 overflow-hidden bg-zinc-200">
                      {project.images && project.images.length > 0 && (
                        <img 
                          src={project.images[0]} 
                          alt="loading background" 
                          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md scale-105" 
                        />
                      )}
                      <div className="relative z-10 p-8 flex flex-col items-center bg-white/40 backdrop-blur-md rounded-xl shadow-sm">
                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 animate-pulse">Loading Live Preview...</span>
                        <span className="text-[10px] text-zinc-500 max-w-[200px] leading-relaxed">(If connection is refused by website, please click Live Demo on the right)</span>
                      </div>
                    </div>
                    
                    {/* Desktop Scaled Iframe Wrapper */}
                    <div 
                      className={`absolute top-0 left-0 z-10 bg-white transition-opacity duration-700 ${showIframe ? 'opacity-100' : 'opacity-0'}`} 
                      style={{ 
                        width: '1440px', 
                        height: `${100 / (scale > 0 ? scale : 1)}%`, 
                        transform: `scale(${scale > 0 ? scale : 1})`, 
                        transformOrigin: 'top left' 
                      }}
                    >
                      {showIframe && (
                        <iframe
                          src={project.liveUrl}
                          className="w-full h-full border-none bg-white"
                          title={project.title}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      )}
                    </div>
                  </>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-100">
                  <span className="text-sm font-semibold text-zinc-500 mb-2">Preview Unavailable</span>
                  <p className="text-xs text-zinc-400">This project does not have a live URL.</p>
                </div>
              )
            ) : (
              project.images && project.images.length > 0 && (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto object-contain block mx-auto"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/1200x1600/e4e4e7/71717a?text=" + encodeURIComponent(project.title);
                  }}
                />
              )
            )}
          </div>
          
          {/* Mobile close button moved to header */}
        </div>

        {/* Right Column: Details & Links */}
        <div className="md:w-1/2 flex flex-col h-[45vh] md:h-full bg-[#F9F6F0] overflow-hidden">
          
          {/* Header Bar */}
          <div className="shrink-0 px-8 py-6 border-b border-zinc-300 bg-[#F9F6F0] flex items-center justify-between z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
              Case Study
            </span>
            <button
              onClick={onClose}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div 
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto scrollbar-hide p-8 sm:p-10 lg:p-12 flex flex-col gap-12 pb-16"
          >
            
            {/* Title and Bio */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-zinc-900 leading-none">
                {project.title}
              </h2>
              
              <div className="w-12 h-[1px] bg-zinc-900"></div>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-[#F9F6F0] text-xs font-bold uppercase tracking-widest transition-colors hover:bg-zinc-800"
                >
                  Live Demo
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Technologies & Architecture
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Roadmap */}
            {(project.challenges || project.futurePlans) && (
              <div className="space-y-10 pt-10 border-t border-zinc-300">
                {project.challenges && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Engineering Challenges
                    </span>
                    <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                      {project.challenges}
                    </p>
                  </div>
                )}
                
                {project.futurePlans && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Planned Roadmap
                    </span>
                    <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                      {project.futurePlans}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Backend Repo */}
            {project.githubServerUrl && (
              <div className="pt-10 border-t border-zinc-300">
                <a
                  href={project.githubServerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  View Backend Repository
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
