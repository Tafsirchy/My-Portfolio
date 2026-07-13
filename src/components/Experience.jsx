import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle, Terminal } from 'lucide-react';
import { experience } from '@/data/portfolio';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  if (!experience || experience.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 bg-background text-slate-900 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-neon-navy/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline */}
          <div className="mb-20 border-b border-black/10 pb-6 relative">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
                // SECTION: EXP
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <span className="text-neon-olive">{'>'}</span> System.Experience
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10">
               <motion.div 
                 style={{ scaleY: pathLength }}
                 className="w-full h-full bg-neon-navy origin-top shadow-[0_0_10px_rgba(30,58,138,0.5)]"
               />
            </div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-12">
              {experience.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Panel */}
                    <div className="w-full md:w-[calc(50%-3rem)] group">
                      <div className="relative bg-white/80 backdrop-blur-md p-6 border border-black/10 hover:border-neon-navy/50 transition-all duration-300 shadow-sm">
                        {/* HUD Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 group-hover:border-neon-navy transition-colors"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 group-hover:border-neon-navy transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 group-hover:border-neon-navy transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 group-hover:border-neon-navy transition-colors"></div>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                        <div className="relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                            <div>
                              <h3 className="text-xl font-display font-bold text-slate-900 uppercase tracking-wide group-hover:text-neon-navy transition-colors">
                                {item.position}
                              </h3>
                              <p className="font-mono text-sm text-neon-olive mt-1 flex items-center gap-2 font-bold">
                                <Terminal className="w-3 h-3" />
                                {item.company}
                              </p>
                            </div>
                            <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-600 font-bold bg-slate-50 px-3 py-1 border border-black/5">
                              <Calendar className="w-3 h-3 text-neon-navy" />
                              <span>{item.duration}</span>
                            </div>
                          </div>

                          <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                            {item.description}
                          </p>

                          {item.achievements && item.achievements.length > 0 && (
                            <div className="bg-slate-50 border border-black/5 p-4 relative">
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon-olive/50 group-hover:bg-neon-olive transition-colors"></div>
                              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-bold">
                                {'>'} execution_log: achievements
                              </p>
                              <ul className="space-y-2">
                                {item.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start gap-3 font-sans text-xs text-slate-700">
                                    <span className="text-neon-navy mt-0.5 text-[10px] font-bold">_</span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="hidden md:flex relative z-10 w-12 h-12 items-center justify-center">
                      <div className="w-4 h-4 bg-background border-2 border-neon-navy rotate-45 group-hover:bg-neon-navy transition-colors shadow-[0_0_10px_rgba(30,58,138,0.5)]"></div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-[calc(50%-3rem)]"></div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
