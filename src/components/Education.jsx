import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Scroll-linked timeline progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: index % 2 === 0 ? -10 : 10,
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8 
      },
    },
  };

  return (
    <section id="education" ref={sectionRef} className="relative py-10 bg-[#0A0F1E] text-white overflow-hidden">
      {/* Blueprint Dot Matrix Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/20 pointer-events-none"></div>
      
      {/* Top Geometric V-Cut */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10 transform rotate-180">
        <svg className="absolute top-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H100V0L50 50L0 0V100Z" fill="#020617" />
        </svg>
      </div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-10">
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
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">LEARNING</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                Academic <span className="text-gradient">Foundation</span>
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
                 className="w-full h-full bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 origin-top"
               />
            </div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-24 md:space-y-12">
              {education.map((item, index) => {
                // Parallax drift for each item
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const yDrift = useTransform(scrollYProgress, [0, 1], [0, (index + 1) * -40]);

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
                      <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                        
                        <CardHeader className="relative z-10">
                          <div className="flex items-start justify-between mb-2">
                             <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors shadow-lg shadow-cyan-500/20">
                               <GraduationCap className="h-6 w-6 text-cyan-400" />
                             </div>
                            <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-slate-400 backdrop-blur-sm bg-white/5">
                              <Calendar className="h-3 w-3" />
                              {item.duration}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-display group-hover:text-cyan-300 transition-colors tracking-tight">{item.degree}</CardTitle>
                          <CardDescription className="text-cyan-400 font-medium">
                            {item.institution}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-200 transition-colors">{item.description}</p>
                          {item.gpa && (
                            <div className="mt-4">
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-bold px-3 py-1 scale-110">
                                GPA: {item.gpa}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="hidden md:block relative z-10">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1), type: "spring" }}
                        className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full ring-4 ring-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center relative"
                      >
                         <div className="absolute inset-[-4px] bg-cyan-500/20 rounded-full animate-ping"></div>
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

      {/* Depth Shadow Separator */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Education;
