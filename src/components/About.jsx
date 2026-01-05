import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/data/portfolio';

const About = () => {
  const sectionRef = useRef(null);
  
  // Advanced scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth spring for main section transitions
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Main container reveals
  const opacity = useTransform(smoothProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.3], [0.9, 1]);
  const rotateX = useTransform(smoothProgress, [0.1, 0.3], [10, 0]);

  // Parallax ORBS with different intensities
  const orbY1 = useTransform(smoothProgress, [0, 1], [-100, 100]);
  const orbY2 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const orbY3 = useTransform(smoothProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="about" className="relative bg-slate-950 text-white py-20 overflow-hidden perspective-1000">
      {/* Creative Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Glassmorphic Orbs - Scroll Linked */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full backdrop-blur-3xl border border-white/10"
        />
        <motion.div
           style={{ y: orbY2 }}
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 rounded-full backdrop-blur-3xl border border-white/10"
        />
        <motion.div
           style={{ y: orbY3 }}
          className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full backdrop-blur-3xl border border-white/10"
        />
      </div>

      {/* Main content - Horizontal layout with backdrop blur container */}
      <motion.div 
        style={{ 
          opacity, 
          scale,
          rotateX,
          transformStyle: "preserve-3d"
        }} 
        className="w-11/12 max-w-7xl mx-auto pb-20 relative z-10"
      >
        {/* Content container with border blur effect */}
        <div className="relative backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>

          {/* Section Headline */}
          <div className="mb-16 relative">
            <motion.div
              className="flex flex-col items-center md:items-start text-center md:text-left gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">DISCOVER</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                The Project <span className="text-gradient">Architect</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Portrait Image with scroll-reactive tilt */}
            <motion.div
              style={{ 
                y: useTransform(smoothProgress, [0, 1], [50, -50]),
                rotateY: useTransform(smoothProgress, [0.2, 0.8], [-10, 10])
              }}
              className="relative order-2 md:order-1"
            >
              <div className="relative w-full max-w-lg mx-auto group">
                {/* 3D Depth Shadow */}
                <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Portrait with dramatic positioning */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src="/assets/About.png"
                    alt="Profile"
                    className="w-full h-auto object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                    style={{
                      filter: 'contrast(1.05) brightness(0.95)',
                    }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x800/0f172a/06b6d4?text=Profile+Image';
                    }}
                  />
                  {/* Subtle overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-cyan-500/20 mix-blend-overlay"></div>
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                </div>

                {/* Floating Tech Badges - Experience Indicators */}
                <motion.div 
                  style={{ y: useTransform(smoothProgress, [0, 1], [20, -20]) }}
                  className="absolute -top-6 -right-6 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl hidden lg:block"
                >
                  <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase">MERN Stack</p>
                  <p className="text-[10px] text-gray-400">Specialist</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content with staggered character reveal concept */}
            <motion.div
              style={{ 
                y: useTransform(smoothProgress, [0, 1], [-30, 30])
              }}
              className="space-y-8 order-1 md:order-2"
            >
              <div className="space-y-4">
                <h1 className="font-display font-black text-4xl md:text-5xl lg:text-7xl leading-none tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {personalInfo.name.toUpperCase()}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase">INNOVATOR</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed font-medium">
                  {personalInfo.headline}
                </p>

                <div className="text-base text-gray-400 font-light leading-relaxed space-y-4">
                  <p>
                    I specialize in building <span className="text-white font-medium border-b border-cyan-500/30">highly performant</span> and <span className="text-white font-medium border-b border-indigo-500/30">scalable</span> web applications.
                  </p>
                  <p className="text-sm">
                    {personalInfo.bio}
                  </p>
                  <p className="border-l-2 border-indigo-500/50 pl-6 py-2 italic text-gray-300 relative bg-white/5 rounded-r-xl">
                    <span className="absolute -left-1 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-500/50 to-indigo-500/50"></span>
                    "Every line of code I write is an opportunity to solve a problem and create something beautiful."
                  </p>
                </div>
              </div>

              {/* Signature & Location - Creative Minimal */}
              <div className="pt-8 flex flex-wrap items-center gap-10">
                <div className="relative group">
                  <span className="font-signature text-6xl text-white group-hover:text-cyan-400 transition-colors duration-700 transform -rotate-3 cursor-default block">
                    {personalInfo.name.split(' ')[0]}
                  </span>
                  <motion.div 
                    style={{ scaleX: useTransform(smoothProgress, [0.3, 0.6], [0, 1]) }}
                    className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-transparent mt-1 origin-left"
                  ></motion.div>
                </div>
                
                <div className="h-14 w-px bg-white/10 hidden sm:block"></div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase mb-2">Operation Base</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-sm text-white font-medium tracking-widest uppercase">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Creative Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-20">
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200C100 200 150 150 300 150C450 150 550 100 700 100C850 100 900 200 1000 200H0Z" fill="url(#wave-grad-about)" />
          <defs>
             <linearGradient id="wave-grad-about" x1="0" y1="200" x2="1000" y2="200" gradientUnits="userSpaceOnUse">
               <stop stopColor="#06b6d4" stopOpacity="0" />
               <stop offset="0.5" stopColor="#06b6d4" />
               <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
             </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default About;
