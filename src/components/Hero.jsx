import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Facebook, Download } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Cyan gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-cyan-900/10 pointer-events-none" />
      
      <div className="relative z-30 w-11/12 max-w-7xl mx-auto pb-24 pt-14 md:pb-20 md:pt-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start space-y-4 order-2 md:order-1"
          >
            {/* Status Badge & Name */}
            <div className="flex flex-col items-start gap-4 mb-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">Available for Projects</span>
              </motion.div>
              
              <div className="flex flex-col items-start">
                <span className="font-display text-sm tracking-[0.3em] text-slate-500 uppercase">
                  {personalInfo.name}
                </span>
                <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-transparent mt-1"></div>
              </div>
            </div>

            {/* Main Heading - Layered Typography */}
            <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              <span className="block text-white filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                DIGITAL
              </span>
              <span className="block text-gradient filter drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                ARCHITECT
              </span>
            </h1>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px w-8 bg-slate-800"></div>
              <span className="text-xs uppercase tracking-[0.5em] text-cyan-400/60 font-bold whitespace-nowrap">
                {personalInfo.tagline}
              </span>
              <div className="h-px w-8 bg-slate-800"></div>
            </div>

            {/* Description */}
            <p className="text-base text-slate-300 font-light max-w-md leading-relaxed">
              {personalInfo.headline}
            </p>

            {/* Social Media Links - Premium Style */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = { Github, Linkedin, Twitter, Facebook }[social.icon];
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-12 h-12 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-500 border border-white/5 hover:border-cyan-500/50 overflow-hidden shadow-xl"
                    aria-label={social.name}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-all duration-500 relative z-10" />
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Buttons - Enhanced Style */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button
                onClick={() => scrollToSection('#contact')}
                className="group relative px-10 py-4 bg-white text-slate-950 font-display font-bold tracking-widest uppercase transition-all duration-500 rounded-full overflow-hidden flex items-center gap-2 hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 text-xs sm:text-sm">LET'S TALK</span>
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </button>

              {/* Resume Download Button */}
              <button
                onClick={() => {
                  // For now, just a placeholder - will download resume when available
                  alert('Resume will be available for download soon!');
                }}
                className="group relative px-8 py-4 bg-cyan-500/10 backdrop-blur-md text-cyan-400 font-display font-bold tracking-widest uppercase transition-all duration-500 rounded-full overflow-hidden flex items-center gap-2 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/20"
              >
                <Download className="w-4 h-4 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10 text-xs sm:text-sm">RESUME</span>
              </button>
            </div>
          </motion.div>

          {/* Right Content - Portrait with floating icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-end items-center min-h-[400px] md:min-h-[500px] order-1 md:order-2"
          >
            {/* Floating Icon - React */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-10 left-0 md:left-4 z-20"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-900/40 backdrop-blur-md rounded-2xl border border-purple-500/30 flex items-center justify-center transform -rotate-12 shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-purple-200 text-2xl md:text-3xl">⚛</span>
              </div>
            </motion.div>

            {/* Floating Icon - VS Code */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-20 right-0 md:right-4 z-20"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-900/40 backdrop-blur-md rounded-xl border border-blue-500/30 flex items-center justify-center transform rotate-12 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:scale-110 transition-transform duration-300">
                <span className="text-blue-200 text-2xl md:text-3xl">💻</span>
              </div>
            </motion.div>

            {/* Floating Icon - Node.js */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-20"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-900/40 backdrop-blur-md rounded-xl border border-green-500/30 flex items-center justify-center transform rotate-6 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-110 transition-transform duration-300">
                <span className="text-green-200 text-xl md:text-2xl">🌱</span>
              </div>
            </motion.div>

            {/* Floating Icon - MongoDB */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.7 }}
              className="absolute bottom-20 right-0 md:right-8 z-20"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-900/40 backdrop-blur-md rounded-xl border border-emerald-500/30 flex items-center justify-center transform -rotate-12 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:scale-110 transition-transform duration-300">
                <span className="text-emerald-200 text-xl md:text-2xl">🍃</span>
              </div>
            </motion.div>

            {/* Main Portrait Image Container */}
            <div className="relative w-full max-w-md group">
              {/* Creative Background Elements */}
              <div className="absolute inset-0 z-0">
                {/* Rotating Gradient Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10%] rounded-full border-2 border-dashed border-cyan-500/20"
                />
                {/* Pulse Glow */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full"
                />
              </div>

              {/* Seamless Portrait Wrapper */}
              <div 
                className="relative transition-all duration-700 z-10"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent), linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent), linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              >
                <ImageWithLoader
                  src="/assets/Profile.png"
                  alt="Profile"
                  className="w-full h-auto object-cover relative z-10"
                />
                
                {/* Symmetrical Inset Shadows for total invisibility */}
                <div className="absolute inset-0 z-20 shadow-[inset_0_0_100px_#020617,inset_0_0_80px_#020617] pointer-events-none"></div>
              </div>
              
              {/* Enhanced Bottom Glow Overlay */}
              <div className="absolute inset-x-0 -bottom-2 h-48 bg-gradient-to-t from-[#020617] via-[#020617]/90 via-[#020617]/50 to-transparent pointer-events-none z-20"></div>

              {/* MERN Stack Badge - Center Overlapping Bottom with Floating Animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0] 
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.5 },
                  scale: { delay: 0.8, duration: 0.5 },
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-max"
              >
                <div className="px-6 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.25)] flex items-center gap-3 group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex -space-x-2">
                    {['M', 'E', 'R', 'N'].map((char) => (
                      <div key={char} className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-[10px] font-bold text-cyan-400 shadow-inner group-hover:text-white transition-colors">
                        {char}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/80 font-bold leading-none">MERN Stack</span>
                    <span className="text-xs text-white font-medium tracking-wide">Developer</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
        >
          <span className="text-slate-500 text-xs font-display tracking-widest mb-2">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="h-5 w-5 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Diagonal Mesh Section Separator (Hero -> About) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-950"></path>
          <path d="M0 0l1200 103.52V120H0V0z" fill="url(#hero-about-grad)" fillOpacity="0.1"></path>
          <defs>
            <linearGradient id="hero-about-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
