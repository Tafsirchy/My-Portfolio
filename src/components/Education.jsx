import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FileJson, ChevronRight, FolderOpen, Terminal, MonitorPlay, X, Calendar, Lock } from 'lucide-react';
import { education } from '@/data/portfolio';

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [activeFileId, setActiveFileId] = useState(education[0]?.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // 'idle' | 'compiling' | 'browser'
  const [previewState, setPreviewState] = useState('idle');
  const [terminalLines, setTerminalLines] = useState([]);

  // Helper to get active education item
  const activeItem = education.find(item => item.id === activeFileId);
  const filename = activeItem ? (activeItem.fileName || activeItem.institution.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')) : '';

  // Ensure sidebar is closed on mobile initially, open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Terminal Animation Sequence
  useEffect(() => {
    if (previewState === 'compiling') {
      setTerminalLines([]);
      
      const sequence = [
        { text: '> npm run dev', delay: 300 },
        { text: 'Starting development server...', delay: 700 },
        { text: '> firebase deploy', delay: 1200 },
        { text: 'Compiling assets...', delay: 1600 },
        { text: 'Deploying to hosting...', delay: 2000 },
        { text: '✔ Deploy complete! Opening browser...', delay: 2600 }
      ];

      const timeouts = sequence.map((item, index) => 
        setTimeout(() => {
          setTerminalLines(prev => [...prev, item.text]);
          // Transition to browser after the last line
          if (index === sequence.length - 1) {
             setTimeout(() => setPreviewState('browser'), 700);
          }
        }, item.delay)
      );

      return () => timeouts.forEach(clearTimeout);
    }
  }, [previewState]);

  const CodeLine = ({ num, children, className = "" }) => (
    <div className={`flex font-mono text-sm sm:text-base leading-relaxed ${className}`}>
      <span className="w-8 shrink-0 text-slate-500 text-right pr-4 select-none">{num}</span>
      <span className="whitespace-pre-wrap break-words flex-1">{children}</span>
    </div>
  );

  return (
    <section id="education" ref={sectionRef} className="relative py-20 md:py-24 bg-background text-slate-900 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Headline */}
          <div className="mb-10 border-b border-black/10 pb-4 relative">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
                // SECTION: EDU
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <span className="text-neon-olive">{'>'}</span> System.Education
              </h2>
            </div>
          </div>

          {/* IDE Container */}
          <div className="rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl flex flex-col h-[550px] md:h-[500px]">
            {/* Title Bar */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/40 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-slate-400 font-mono text-xs hidden sm:flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                tafsir_education - Visual Studio Code
              </div>
              <div className="w-16"></div> {/* Spacer for balance */}
            </div>

            <div className="flex flex-1 overflow-hidden min-h-0 relative">
              {/* Sidebar */}
              {isSidebarOpen && (
                <div className="w-48 sm:w-64 bg-[#252526] border-r border-[#333333] flex flex-col shrink-0 overflow-y-auto">
                  <div className="px-4 py-2 font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    Explorer
                  </div>
                  <div className="mt-2">
                    <div className="px-2 py-1 flex items-center gap-1 text-slate-300 font-mono text-sm hover:bg-[#2a2d2e] cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronRight className="w-4 h-4 rotate-90" />
                      src/
                    </div>
                    <div className="pl-6 pr-2 pb-4 flex flex-col gap-0.5">
                      {education.map((item) => {
                        const itemFilename = item.fileName || item.institution.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
                        return (
                          <div key={item.id} className="group flex items-center justify-between w-full hover:bg-[#2a2d2e] rounded-sm pr-2">
                            <div
                              onClick={() => {
                                setActiveFileId(item.id);
                                setPreviewState('idle');
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                              }}
                              className={`flex items-center gap-2 py-3 md:py-1.5 px-2 cursor-pointer font-mono text-base md:text-sm transition-colors flex-1 min-w-0 min-h-[44px] md:min-h-0 ${
                                activeFileId === item.id ? 'bg-[#37373d] text-white' : 'text-slate-400'
                              }`}
                            >
                              <FileJson className="w-4 h-4 shrink-0 text-[#cbcb41]" />
                              <span className="truncate">{itemFilename}.json</span>
                            </div>
                            {/* Preview Button (Visible on hover in sidebar) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFileId(item.id);
                                if (previewState !== 'browser') {
                                  setPreviewState('compiling');
                                }
                              }}
                              className={`transition-all duration-300 shrink-0 ml-2 ${
                                activeFileId === item.id 
                                  ? 'opacity-100 animate-bounce text-[#cbcb41] scale-110 drop-shadow-[0_0_8px_rgba(203,203,65,0.8)]' 
                                  : 'opacity-0 group-hover:opacity-100 group-hover:animate-bounce text-[#cbcb41]'
                              } hover:!animate-none hover:!text-[#27c93f] hover:!scale-125 hover:!drop-shadow-[0_0_12px_rgba(39,201,63,0.9)]`}
                              title="Run & Open Preview"
                            >
                              <MonitorPlay className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Main Coding Area OR Browser View */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] relative">
                
                {previewState === 'browser' ? (
                  /* Browser View */
                  <div className="flex-1 flex flex-col bg-white overflow-hidden z-20">
                    {/* Browser Toolbar */}
                    <div className="bg-[#f1f5f9] border-b border-slate-200 h-12 flex items-center px-4 justify-between shrink-0 shadow-sm">
                      <div className="flex gap-2 w-20">
                        <button 
                          onClick={() => setPreviewState('idle')} 
                          className="w-8 h-8 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] hover:bg-red-600 transition-colors flex items-center justify-center group" 
                          title="Close Preview"
                        >
                          <X className="w-4 h-4 md:w-2.5 md:h-2.5 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100" />
                        </button>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
                      </div>
                      
                      <div className="flex-1 max-w-md mx-4 bg-white rounded-md h-7 px-3 flex items-center justify-center gap-2 text-xs text-slate-600 font-mono shadow-sm border border-slate-200/60 transition-colors hover:border-slate-300">
                         <Lock className="w-3 h-3 text-emerald-500" />
                         https://tafsir.dev/education/{filename}
                      </div>
                      
                      <div className="w-20 flex justify-end">
                        <button 
                          onClick={() => setPreviewState('idle')}
                          className="flex items-center justify-center gap-1 text-xs font-mono font-bold bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-2 md:px-2 md:py-1 rounded transition-colors min-h-[44px] md:min-h-0"
                        >
                          <X className="w-3 h-3" /> CLOSE
                        </button>
                      </div>
                    </div>
                    
                    {/* Browser Content (Scrollable if needed, beautifully centered) */}
                    <div className="flex-1 bg-slate-50 relative overflow-y-auto p-4 sm:p-8 flex flex-col justify-center">
                      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`browser-${activeItem.id}`}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -20 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200/60 p-6 sm:p-8 w-full max-w-[500px] relative overflow-hidden group my-auto"
                        >
                           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-navy to-neon-olive"></div>
                           
                           <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2 leading-tight">
                             {activeItem.degree}
                           </h3>
                           
                           <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold mb-5 uppercase tracking-wider flex items-start gap-2">
                             <Terminal className="w-4 h-4 text-neon-olive shrink-0 mt-0.5" />
                             <span className="flex-1">{activeItem.institution}</span>
                           </p>
                           
                           <div className="flex items-center gap-2 mb-5 text-xs font-mono bg-slate-50 border border-slate-100 w-fit px-3 py-1.5 rounded-md text-slate-600 font-semibold shadow-sm">
                              <Calendar className="w-3.5 h-3.5 text-neon-navy shrink-0" />
                              {activeItem.duration}
                           </div>
                           
                           <div className="text-sm text-slate-600 leading-relaxed mb-6 relative">
                             <div className="absolute left-0 top-1 bottom-1 w-1 bg-neon-navy/20 rounded-full"></div>
                             <p className="pl-4">
                               {activeItem.description}
                             </p>
                           </div>
                           
                           {activeItem.gpa && (
                             <div className="inline-flex items-center gap-2 font-mono text-xs bg-neon-navy text-white px-4 py-2 rounded uppercase font-bold tracking-widest shadow-md">
                               <span className="w-1.5 h-1.5 bg-neon-olive rounded-full animate-pulse"></span>
                               GPA: {activeItem.gpa}
                             </div>
                           )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  /* Standard Code View with Terminal Slide-up */
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Tabs */}
                    <div className="flex bg-[#252526] overflow-x-auto no-scrollbar shrink-0">
                      {!isSidebarOpen && (
                        <button 
                          onClick={() => setIsSidebarOpen(true)}
                          className="px-3 text-slate-400 hover:text-white border-r border-[#333333] flex items-center justify-center bg-[#2d2d2d]"
                        >
                          <FolderOpen className="w-4 h-4" />
                        </button>
                      )}
                      {education.map((item) => {
                        const itemFilename = item.fileName || item.institution.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
                        return (
                          <div
                            key={item.id}
                            onClick={() => setActiveFileId(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-[#333333] border-t-2 font-mono text-sm min-w-max ${
                              activeFileId === item.id 
                                ? 'bg-[#1e1e1e] border-t-[#007acc] text-[#cbcb41]' 
                                : 'bg-[#2d2d2d] border-t-transparent text-slate-400 hover:bg-[#1e1e1e]'
                            }`}
                          >
                            <FileJson className="w-4 h-4" />
                            {itemFilename}.json
                          </div>
                        );
                      })}
                    </div>

                    {/* Breadcrumbs */}
                    <div className="px-4 py-3 md:py-1.5 flex items-center justify-between font-mono text-sm md:text-xs text-slate-500 border-b border-[#333333] shrink-0 min-h-[44px] md:min-h-0">
                      <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
                        src <ChevronRight className="w-3 h-3 shrink-0" /> education <ChevronRight className="w-3 h-3 shrink-0" /> 
                        <span className="text-slate-400 shrink-0">{filename}.json</span>
                      </div>
                      
                      {/* Mobile Preview Button */}
                      <button
                        onClick={() => {
                          if (previewState !== 'browser') {
                            setPreviewState('compiling');
                          }
                        }}
                        className="flex md:hidden items-center gap-1 text-[#cbcb41] active:text-[#27c93f] transition-colors ml-2 bg-[#2d2d2d] px-2 py-1 rounded shadow-sm"
                      >
                        <MonitorPlay className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-wider">Run</span>
                      </button>
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#1e1e1e] pb-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeFileId}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activeItem && (
                            <div className="text-slate-300 pb-8">
                              <CodeLine num={1}><span className="text-[#c586c0]">{"{"}</span></CodeLine>
                              <CodeLine num={2}>  <span className="text-[#9cdcfe]">"id"</span>: <span className="text-[#b5cea8]">{activeItem.id}</span>,</CodeLine>
                              <CodeLine num={3}>  <span className="text-[#9cdcfe]">"institution"</span>: <span className="text-[#ce9178]">"{activeItem.institution}"</span>,</CodeLine>
                              <CodeLine num={4}>  <span className="text-[#9cdcfe]">"degree"</span>: <span className="text-[#ce9178]">"{activeItem.degree}"</span>,</CodeLine>
                              <CodeLine num={5}>  <span className="text-[#9cdcfe]">"duration"</span>: <span className="text-[#ce9178]">"{activeItem.duration}"</span>,</CodeLine>
                              <CodeLine num={6}>  <span className="text-[#9cdcfe]">"description"</span>: <span className="text-[#ce9178]">"{activeItem.description}"</span>{activeItem.gpa ? ',' : ''}</CodeLine>
                              {activeItem.gpa && (
                                <CodeLine num={7}>  <span className="text-[#9cdcfe]">"gpa"</span>: <span className="text-[#ce9178]">"{activeItem.gpa}"</span></CodeLine>
                              )}
                              <CodeLine num={activeItem.gpa ? 8 : 7}><span className="text-[#c586c0]">{"}"}</span></CodeLine>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Integrated Terminal Panel */}
                    <AnimatePresence>
                      {previewState === 'compiling' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 240, opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                          className="absolute bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-[#333333] font-mono text-xs sm:text-sm flex flex-col z-20 shadow-[0_-15px_30px_rgba(0,0,0,0.4)]"
                        >
                          <div className="px-4 py-2 border-b border-[#333333] flex items-center justify-between text-[#e7e7e7] uppercase tracking-wider text-xs md:text-[11px] font-bold bg-[#252526]">
                            <div className="flex gap-4">
                              <span className="border-b border-[#007acc] pb-1.5 -mb-2 text-[#e7e7e7]">Terminal</span>
                              <span className="pb-1.5 -mb-2 text-slate-500">Output</span>
                              <span className="pb-1.5 -mb-2 text-slate-500">Debug Console</span>
                            </div>
                            <button onClick={() => setPreviewState('idle')} className="text-slate-400 hover:text-white transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-1.5 text-slate-300">
                            <div className="text-slate-500 mb-1">Portfolio Dev Environment - tafsir@dev-machine</div>
                            {terminalLines.map((line, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${
                                  line.includes('✔') ? 'text-[#27c93f]' 
                                  : line.startsWith('>') ? 'text-[#007acc]' 
                                  : 'text-slate-300'
                                }`}
                              >
                                {line}
                              </motion.div>
                            ))}
                            <motion.div 
                              animate={{ opacity: [1, 0] }} 
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="w-2 h-4 bg-slate-400 mt-1" 
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )}
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="hidden md:flex bg-[#007acc] text-white px-3 py-1 items-center justify-between font-mono text-xs shrink-0 z-10 relative">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors">
                  <Terminal className="w-3 h-3" /> master*
                </span>
                <span className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors hidden sm:inline-block">0 errors, 0 warnings</span>
              </div>
              <div className="flex items-center gap-3 hidden sm:flex">
                {previewState === 'browser' && (
                  <span className="bg-white/20 px-2 py-0.5 rounded flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider animate-pulse">
                    <MonitorPlay className="w-3 h-3" /> Live Preview
                  </span>
                )}
                {previewState === 'compiling' && (
                  <span className="bg-white/20 px-2 py-0.5 rounded flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider animate-pulse text-yellow-300">
                    Compiling...
                  </span>
                )}
                <span className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors">UTF-8</span>
                <span className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors">JSON</span>
                <span className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors">Prettier</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
