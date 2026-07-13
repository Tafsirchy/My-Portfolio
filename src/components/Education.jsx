import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Terminal } from 'lucide-react';
import { education } from '@/data/portfolio';

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section id="education" ref={sectionRef} className="relative py-32 bg-background text-slate-900 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Headline */}
          <div className="mb-24 border-b border-black/10 pb-6 relative">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
                // SECTION: EDU
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <span className="text-neon-olive">{'>'}</span> System.Education
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* HUD Vertical Line */}
            <div className="hidden md:block absolute left-[32px] top-0 bottom-0 w-px bg-black/10">
               <motion.div 
                 style={{ scaleY: pathLength }}
                 className="w-full h-full bg-neon-navy origin-top"
               />
            </div>

            <div className="space-y-16">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative md:pl-24"
                >
                  {/* Timeline Node */}
                  <div className="hidden md:flex absolute left-[28px] top-6 w-2.5 h-2.5 border border-neon-navy bg-background z-10" />
                  {/* Connection Line */}
                  <div className="hidden md:block absolute left-[32px] top-[28px] w-[50px] h-px bg-black/10" />

                  {/* Content Panel */}
                  <div className="group relative bg-white/80 border border-black/10 p-8 hover:border-neon-navy/50 transition-colors backdrop-blur-md shadow-sm">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-slate-300 group-hover:border-neon-navy transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-slate-300 group-hover:border-neon-navy transition-colors"></div>
                    
                    <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-start mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Terminal className="w-4 h-4 text-neon-navy" />
                          <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 tracking-tight uppercase">
                            {item.degree}
                          </h3>
                        </div>
                        <p className="font-mono text-sm text-slate-600 uppercase font-bold">
                          {item.institution}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs text-slate-600 font-bold bg-slate-50 px-3 py-1 border border-black/5 shrink-0 uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-neon-navy" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 group-hover:bg-neon-navy/30 transition-colors"></div>
                      <p className="pl-4 font-mono text-xs md:text-sm text-slate-600 leading-relaxed uppercase">
                        {item.description}
                      </p>
                    </div>

                    {item.gpa && (
                      <div className="mt-6 flex">
                        <div className="font-mono text-xs text-white bg-neon-navy px-4 py-1 uppercase font-bold tracking-widest flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                           GPA: {item.gpa}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
