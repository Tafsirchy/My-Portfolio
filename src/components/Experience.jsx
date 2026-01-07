import { useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Component defined without motion since it was reported unused by lint (added back if needed)
import { motion } from 'framer-motion';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-linked timeline progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  // Return null if no experience data (Hooks must be called before this)
  if (!experience || experience.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 80,
      x: index % 2 === 0 ? 40 : -40,
      scale: 0.85,
      rotateY: index % 2 === 0 ? 20 : -20,
      filter: "blur(4px)",
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.8,
        duration: 1
      },
    },
  };

  return (
    <section id="experience" ref={sectionRef} className="relative py-20 bg-slate-900 text-white overflow-hidden -mt-10 pt-20">
      {/* Top Depth Parallax Glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 opacity-60"></div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline */}
          <div className="mb-16 relative">
            <motion.div
              variants={containerVariants}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">JOURNEY</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                Work <span className="text-gradient">Experience</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 style={{ scaleY: pathLength, opacity: opacity }}
                 className="w-full h-full bg-gradient-to-b from-indigo-500 via-cyan-500 to-teal-500 origin-top"
               />
            </div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-24 md:space-y-12">
              {experience.map((item, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const yDrift = useTransform(scrollYProgress, [0, 1], [0, (index + 1) * -50]);

                return (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    style={{ y: yDrift }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-[calc(50%-2rem)] perspective-1000">
                      <Card className="group relative bg-slate-900/50 backdrop-blur-xl border-0 text-white transition-all duration-700 transform hover:scale-[1.03] hover:-translate-y-2 overflow-hidden shadow-2xl hover:shadow-indigo-500/20">
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                        <div className="absolute inset-[1px] rounded-lg bg-slate-900/90 backdrop-blur-xl z-10"></div>
                        
                        {/* Dynamic Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-cyan-500/0 group-hover:from-indigo-500/20 group-hover:to-cyan-500/20 transition-all duration-700 z-0"></div>
                        
                        {/* Shine Effect on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
                          <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_ease-in-out] pointer-events-none"></div>
                        </div>
                        
                        <CardHeader className="relative z-30">
                          <div className="flex items-start justify-between mb-4">
                            {/* Enhanced Icon Container */}
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="p-3 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl group-hover:from-indigo-500/50 group-hover:to-purple-500/50 transition-all duration-500 shadow-lg shadow-indigo-500/30 ring-1 ring-indigo-400/20"
                            >
                              <Briefcase className="h-7 w-7 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                            </motion.div>
                            <Badge variant="outline" className="flex items-center gap-1.5 border-indigo-400/30 text-indigo-300 backdrop-blur-sm bg-indigo-500/10 px-3 py-1.5 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20 transition-all">
                              <Calendar className="h-3.5 w-3.5" />
                              <span className="font-semibold">{item.duration}</span>
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl font-display font-bold group-hover:text-indigo-200 transition-colors tracking-tight mb-2">{item.position}</CardTitle>
                          <CardDescription className="text-indigo-400 font-semibold text-base">
                            {item.company}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-30">
                          <p className="text-slate-300 text-sm leading-relaxed mb-5 group-hover:text-slate-100 transition-colors">{item.description}</p>
                          {item.achievements && item.achievements.length > 0 && (
                            <div className="space-y-3 mt-5 p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 transition-all duration-500">
                              <p className="font-bold text-[10px] text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                <div className="h-px w-8 bg-gradient-to-r from-indigo-400 to-transparent"></div>
                                Key Contributions
                              </p>
                              <ul className="space-y-2.5">
                                {item.achievements.map((achievement, idx) => (
                                   <motion.li 
                                     key={idx} 
                                     initial={{ opacity: 0, x: -10 }}
                                     whileInView={{ opacity: 1, x: 0 }}
                                     transition={{ delay: idx * 0.1 }}
                                     className="flex items-start gap-2.5 text-sm text-slate-300 group-hover:text-slate-100 transition-colors"
                                   >
                                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block relative z-10">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1), type: "spring" }}
                        className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full ring-4 ring-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center relative"
                      >
                         <div className="absolute inset-[-4px] bg-indigo-500/20 rounded-full animate-ping"></div>
                         <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block w-[calc(50%-2rem)]"></div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Digital Wave Separator */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-20 opacity-50">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112L1200,106.7V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z" fill="#0f172a"></path>
        </svg>
      </div>
    </section>
  );
};

export default Experience;
