import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GitCommit, GitPullRequest, GitMerge, Terminal, CheckCircle2, Calendar, User, Clock, FileCode2, X, Menu } from 'lucide-react';
import { experience } from '@/data/portfolio';

const Experience = () => {
  const [activeId, setActiveId] = useState(experience[0]?.id || 1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  if (!experience || experience.length === 0) {
    return null;
  }

  const activeExperience = experience.find(exp => exp.id === activeId) || experience[0];

  // Helper to generate a fake git hash from id
  const getHash = (id) => {
    const hashes = ['a1b2c3d', 'f4e5d6c', '9x8y7z6', '1a2b3c4', '5d6e7f8'];
    return hashes[id % hashes.length] || 'abcdef1';
  };

  return (
    <section id="experience" className="relative py-20 md:py-24 bg-background text-slate-900 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-neon-navy/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        
        {/* Section Headline */}
        <div className="mb-10 border-b border-black/10 pb-4 relative">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
              // SECTION: EXP
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <span className="text-neon-olive">{'>'}</span> System.Experience
            </h2>
          </div>
        </div>

        {/* Git UI Container */}
        <div className="rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl flex flex-col h-auto md:h-[520px] min-h-[600px] md:min-h-0">
          
          {/* Title Bar */}
          <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/40 shrink-0 relative z-20">
            <div className="flex gap-2 w-16">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-slate-400 font-mono text-xs flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">tafsir/experience - Pull Requests</span>
              <span className="sm:hidden font-bold">tafsir/experience</span>
            </div>
            
            {/* Mobile History Toggle */}
            <div className="flex sm:hidden items-center justify-end w-16">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white flex items-center gap-1.5 bg-[#333333] px-2.5 py-1.5 rounded-md border border-[#444444] shadow-sm active:bg-[#444444] transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
            <div className="w-16 hidden sm:block"></div> {/* Spacer for balance on desktop */}
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0 relative">
            
            {/* Left Pane: Git Tree / Commits */}
            <div className={`${isMobileMenuOpen ? 'flex absolute inset-0 z-50' : 'hidden'} md:flex md:static w-full md:w-80 bg-[#252526] border-r-0 md:border-r border-[#333333] flex-col shrink-0 overflow-hidden`}>
              <div className="px-4 py-4 md:py-3 border-b border-[#333333] font-mono text-sm md:text-xs text-slate-300 md:text-slate-400 uppercase tracking-widest flex items-center justify-between sticky top-0 bg-[#252526] z-10 shadow-sm md:shadow-none">
                <div className="flex items-center gap-2 font-bold md:font-normal">
                  <GitMerge className="w-4 h-4 md:w-4 md:h-4" />
                  Commit History
                </div>
                <button 
                  className="md:hidden text-slate-400 hover:text-white p-2 -mr-2 bg-[#333333] rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 relative flex-1 overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Vertical Branch Line */}
                <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-[#333333]"></div>
                
                <div className="space-y-3">
                  {experience.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setActiveId(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative z-10 flex gap-4 cursor-pointer group`}
                      >
                        {/* Commit Node */}
                        <div className="flex flex-col items-center shrink-0 mt-1">
                          <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center transition-colors bg-[#252526] ${
                            isActive 
                              ? 'border-[#238636]' 
                              : 'border-[#555] group-hover:border-[#238636]/60'
                          }`}>
                            {isActive && <div className="w-2 h-2 bg-[#238636] rounded-full"></div>}
                          </div>
                        </div>

                        {/* Commit Info */}
                        <div className={`flex-1 pb-3 border-b border-[#333333]/50 transition-all ${
                          isActive ? 'opacity-100' : 'opacity-80 active:opacity-100 md:opacity-60 md:group-hover:opacity-100'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs md:text-[10px] text-slate-300 bg-[#333333] px-2 md:px-1.5 py-1 md:py-0.5 rounded">
                              {getHash(item.id)}
                            </span>
                            <span className="text-xs md:text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {item.duration}
                            </span>
                          </div>
                          <h3 className={`font-mono text-base md:text-sm font-bold leading-tight mt-1 mb-1 ${
                            isActive ? 'text-[#238636]' : 'text-slate-300 md:group-hover:text-white'
                          }`}>
                            {item.position}
                          </h3>
                          <p className="text-sm md:text-xs text-slate-500 font-mono flex items-center gap-1">
                            <Terminal className="w-3 h-3 shrink-0" /> <span className="break-words line-clamp-2">{item.company}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Pane: Commit/PR Details */}
            <div className="flex-1 bg-[#1e1e1e] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative flex flex-col">
              {/* Fake Grid Background */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`commit-${activeExperience.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-6 flex flex-col max-w-4xl w-full mx-auto relative z-10 min-h-full justify-center"
                >
                  {/* PR Header */}
                  <div className="mb-4 border-b border-[#333333] pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#238636] text-white font-mono text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
                        <GitPullRequest className="w-3.5 h-3.5" /> Merged
                      </span>
                      <span className="font-mono text-slate-400 text-sm">
                        Commit <span className="text-[#238636]">{getHash(activeExperience.id)}</span> into <span className="text-neon-navy">main</span>
                      </span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                      {activeExperience.position} <span className="text-slate-500 font-light">at</span> {activeExperience.company}
                    </h1>

                    <div className="flex flex-wrap gap-4 font-mono text-sm md:text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" /> tafsir
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {activeExperience.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCode2 className="w-4 h-4" /> {activeExperience.achievements?.length || 0} changes
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 md:p-4 mb-5">
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                      {activeExperience.description}
                    </p>
                  </div>

                  {/* Code Diff Box (Achievements) */}
                  {activeExperience.achievements && activeExperience.achievements.length > 0 && (
                    <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
                      <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center gap-2 text-sm md:text-xs font-mono text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-[#238636]" />
                        achievements.md
                      </div>
                      <div className="p-4 font-mono text-sm overflow-x-auto">
                        <div className="w-full flex flex-col min-w-0">
                          {activeExperience.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex hover:bg-[#238636]/10 group">
                              <div className="select-none text-right pr-3 sm:pr-4 py-1.5 text-slate-600 border-r border-[#30363d] w-10 sm:w-12 shrink-0 group-hover:text-slate-400">
                                {idx + 1}
                              </div>
                              <div className="select-none text-center px-2 py-1.5 text-[#238636] font-bold shrink-0">
                                +
                              </div>
                              <div className="pl-2 py-1.5 text-[#e6edf3] bg-[#2ea043]/10 break-words whitespace-pre-wrap flex-1 min-w-0 leading-relaxed">
                                {achievement}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
