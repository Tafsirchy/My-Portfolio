import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/data/portfolio';

const About = () => {
  const sectionRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-slate-950 text-white py-20">
      {/* Creative Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Glassmorphic Orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(40px)' }}
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(50px)' }}
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(45px)' }}
        />
      </div>

      {/* Main content - Horizontal layout with backdrop blur container */}
      <motion.div style={{ opacity }} className="w-11/12 max-w-7xl mx-auto pb-20">
        {/* Content container with border blur effect */}
        <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
          {/* Glow effect on borders */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-xl -z-10"></div>

          {/* Section Headline - Global System */}
          <div className="mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">DISCOVER</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                THE person <span className="text-gradient">behind</span> the code
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Portrait Image with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              className="relative order-2 md:order-1"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Portrait with dramatic lighting */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/About.png"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                    style={{
                      filter: 'contrast(1.1) brightness(0.9)',
                    }}
                  />
                  {/* Accent glow on left side */}
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 md:order-2"
            >
              {/* Name - Reduced size */}
              <div>
                <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
                  {personalInfo.name.toUpperCase()}
                </h1>
              </div>

              {/* Bio sections - Reduced spacing */}
              <div className="space-y-4">
                {/* Main statement */}
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {personalInfo.headline}
                </p>

                {/* Detailed bio - Refined Rhythm */}
                <div className="text-sm text-gray-400 font-light leading-relaxed space-y-4">
                  <p>
                    I specialize in building <span className="text-white font-medium">highly performant</span> and <span className="text-white font-medium">scalable</span> web applications. My approach combines technical excellence with a deep understanding of user behavior.
                  </p>
                  <p>
                    {personalInfo.bio}
                  </p>
                  <p className="border-l-2 border-cyan-500/30 pl-4 py-1 italic">
                    "Every line of code I write is an opportunity to solve a problem and create something beautiful."
                  </p>
                </div>
              </div>

              {/* Signature & CTA - Better Balance */}
              <div className="pt-8 flex flex-col sm:flex-row items-center gap-8">
                <div className="flex flex-col items-center sm:items-start group">
                  <span className="font-signature text-6xl text-white group-hover:text-cyan-400 transition-colors duration-500 transform -rotate-3 cursor-default">
                    {personalInfo.name.split(' ')[0]}
                  </span>
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent mt-1 group-hover:scale-x-110 transition-transform origin-left"></div>
                </div>
                
                <div className="hidden sm:block h-12 w-px bg-slate-800"></div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase mb-1">Location</span>
                  <span className="text-xs text-white font-medium tracking-widest uppercase">{personalInfo.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Creative Bottom Transition (About -> Skills) - Tech Circuit Connector */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-20 overflow-hidden">
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-20" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200L150 150H300L350 100H450L500 150H650L800 200" stroke="url(#circuit-grad)" strokeWidth="2" strokeDasharray="10 5" />
          <circle cx="150" cy="150" r="4" fill="#06b6d4" />
          <circle cx="350" cy="100" r="4" fill="#6366f1" />
          <circle cx="450" cy="100" r="4" fill="#6366f1" />
          <circle cx="650" cy="150" r="4" fill="#06b6d4" />
          <defs>
            <linearGradient id="circuit-grad" x1="0" y1="200" x2="800" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>
    </section>
  );
};

export default About;
