import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      x: index % 2 === 0 ? -50 : 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="education" className="relative py-20 bg-[#0A0F1E] text-white overflow-hidden">
      {/* Blueprint Dot Matrix Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/20 pointer-events-none"></div>
      {/* Top Geometric V-Cut (Receiving from Skills) */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10 transform rotate-180">
        <svg className="absolute top-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H100V0L50 50L0 0V100Z" fill="#020617" />
          <path d="M0 0L50 50L100 0" stroke="url(#v-grad-edu)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="v-grad-edu" x1="0" y1="0" x2="100" y2="0">
              <stop stopColor="transparent" />
              <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-10">

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline - Global System */}
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
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm font-light leading-relaxed">
                A journey of continuous growth, combining formal education with specialized technical training.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full"></div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-12">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                      {/* Hover Gradient Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-indigo-500/0 group-hover:from-cyan-500/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                           <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                             <GraduationCap className="h-6 w-6 text-cyan-400" />
                           </div>
                          <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {item.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-display group-hover:text-cyan-300 transition-colors">{item.degree}</CardTitle>
                        <CardDescription className="text-cyan-400/80 font-medium">
                          {item.institution}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">{item.description}</p>
                        {item.gpa && (
                          <div className="mt-4">
                            <Badge variant="accent" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-semibold px-3 py-1">
                              GPA: {item.gpa}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full ring-4 ring-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-[calc(50%-2rem)]"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Depth Shadow Separator (Education -> Experience) */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Education;
