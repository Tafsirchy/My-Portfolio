import React from 'react';
import { Terminal, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const codeLines = [
  <><span className="text-[#569cd6]">import</span> {'{ Agency }'} <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'@boonec/core'</span>;</>,
  <><span className="text-[#569cd6]">import</span> {'{ createTeam }'} <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'@boonec/engine'</span>;</>,
  <br/>,
  <><span className="text-[#569cd6]">const</span> myAgency = <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Agency</span>{'({\n'}</>,
  <>{'  '}name: <span className="text-[#ce9178]">'BOONEC'</span>,</>,
  <>{'  '}founder: <span className="text-[#ce9178]">'Tafsir'</span>,</>,
  <>{'  '}specialties: [<span className="text-[#ce9178]">'Web Apps'</span>, <span className="text-[#ce9178]">'SaaS'</span>, <span className="text-[#ce9178]">'Startups'</span>]</>,
  <>{'});'}</>,
  <br/>,
  <><span className="text-[#c586c0]">await</span> myAgency.<span className="text-[#dcdcaa]">deploy</span>();</>,
  <><span className="text-[#4ec9b0]">console</span>.<span className="text-[#dcdcaa]">log</span>(<span className="text-[#ce9178]">"Need a complete team for your next big idea?"</span>);</>
];

const AgencyBanner = () => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-navy/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-10 border-b border-black/10 pb-4 relative">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
              // EXTERNAL: AGENCY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <span className="text-neon-olive">{'>'}</span> System.Agency
            </h2>
          </div>
        </div>

        {/* IDE Window Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl flex flex-col"
        >
          {/* Title Bar */}
          <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/40 shrink-0">
            <div className="flex gap-2 w-16">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-slate-400 font-mono text-xs flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>boonec_init.js</span>
            </div>
            <div className="w-16"></div> {/* Spacer */}
          </div>

          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Code Editor */}
            <div className="flex-1 p-5 md:p-6 lg:border-r border-[#333333] relative bg-[#1e1e1e] overflow-hidden group">
              <div className="absolute top-0 left-0 bottom-0 w-12 bg-[#252526] border-r border-[#333333] flex flex-col items-center py-6 opacity-50">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                  <span key={num} className="text-[#858585] font-mono text-sm leading-relaxed">{num}</span>
                ))}
              </div>
              
              <div className="pl-10 font-mono text-sm md:text-base leading-relaxed">
                <motion.div 
                  className="text-[#d4d4d4] whitespace-pre-wrap flex flex-col"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                  }}
                >
                  {codeLines.map((line, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, display: "none", x: -5 },
                        visible: { opacity: 1, display: "block", x: 0, transition: { duration: 0.05 } }
                      }}
                      className="min-h-[1.5em]"
                    >
                      {line}
                    </motion.div>
                  ))}
                </motion.div>
                
                <div className="mt-6 pt-4 border-t border-[#333333]/50 flex flex-col gap-2 min-h-[4rem]">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 0.7 } }
                    }}
                    className="flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-500 font-bold">~/portfolio $</span>
                    <motion.span 
                      variants={{
                        hidden: { clipPath: "inset(0 100% 0 0)" },
                        visible: { clipPath: "inset(0 0% 0 0)", transition: { delay: 0.75, duration: 0.3, ease: "linear" } }
                      }}
                      className="text-slate-300"
                    >
                      node boonec_init.js
                    </motion.span>
                  </motion.div>
                  
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 1.2 } }
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#238636] font-bold">{'>'}</span>
                    <span className="text-[#238636] font-bold">System Online. Ready to build.</span>
                    <span className="animate-pulse w-2 h-4 bg-slate-400 inline-block"></span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right: UI/Branding Execution */}
            <div className="flex-1 bg-[#1e1e1e] p-6 md:p-8 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] via-[#1e1e1e] to-neon-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center w-full"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delayChildren: 1.6, staggerChildren: 0.15 } }
                }}
              >
                {/* Logo Container */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                  }}
                  className="bg-white p-6 rounded-2xl border border-white/10 shadow-2xl mb-6 relative group-hover:border-neon-navy/40 transition-colors duration-500 w-full max-w-sm flex items-center justify-center min-h-[100px]"
                >
                  <div className="absolute inset-0 bg-neon-navy/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src="/assets/BOONEC_logo_modern.png" 
                    alt="BOONEC Agency" 
                    className="w-40 md:w-56 h-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>

                <motion.h3 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-2xl md:text-3xl font-display font-bold text-white mb-4"
                >
                  Bring Your Vision to Life
                </motion.h3>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-slate-400 font-sans max-w-sm mb-6 text-sm md:text-base leading-relaxed"
                >
                  Building modern websites, powerful web apps, scalable SaaS platforms, and smart digital solutions for startups and businesses.
                </motion.p>

                <motion.a 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  href="https://boonec.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden bg-[#238636] hover:bg-[#2ea043] text-white px-8 py-4 font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-lg flex items-center gap-3 w-full max-w-xs justify-center"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Execute Project <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </span>
                  {/* Sweep animation on hover */}
                  <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[-30deg] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                </motion.a>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgencyBanner;
