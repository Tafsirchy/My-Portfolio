import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Return null if no experience data
  if (!experience || experience.length === 0) {
    return null;
  }

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
    <section id="experience" className="relative py-20 bg-slate-900 text-white overflow-hidden -mt-10 pt-20">
      {/* Top Depth Parallax Glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 opacity-60"></div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-8">

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
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">JOURNEY</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                Work <span className="text-gradient">Experience</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm font-light leading-relaxed">
                Professional milestones and contributions in various development environments.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full"></div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-12">
              {experience.map((item, index) => (
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
                    <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-indigo-500/50 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                      {/* Hover Gradient Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                            <Briefcase className="h-6 w-6 text-indigo-400" />
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {item.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-display group-hover:text-indigo-300 transition-colors">{item.position}</CardTitle>
                        <CardDescription className="text-indigo-400/80 font-medium">
                          {item.company}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">{item.description}</p>
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="space-y-3">
                            <p className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Key Contributions</p>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                 <li key={idx} className="flex items-start gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full ring-4 ring-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center">
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

      {/* Digital Wave Separator (Experience -> Projects) */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-20">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112L1200,106.7V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z" fill="#0f172a"></path>
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112L1200,106.7" fill="none" stroke="url(#wave-grad)" strokeWidth="1" strokeDasharray="5 5" opacity="0.3"></path>
          <defs>
            <linearGradient id="wave-grad" x1="0" y1="0" x2="1200" y2="0">
              <stop stopColor="#06b6d4" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Experience;
