import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

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

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Tafsirchy', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/tafsirchy/', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://x.com/chy_tafsir', label: 'Twitter' },
    { icon: Facebook, url: 'https://www.facebook.com/tafsir.chowdhury.973567', label: 'Facebook' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-20"
    >
      {/* Cyan gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-cyan-900/10 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start space-y-4 order-2 md:order-1"
          >
            {/* Small name tag */}
            <div className="flex flex-col items-start">
              <span className="font-display text-sm tracking-widest text-slate-400 uppercase mb-2">
                {personalInfo.name}
              </span>
              <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            </div>

            {/* Main Heading - Reduced size */}
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight">
              <span className="text-white">PROFESSIONAL</span>
              <br />
              <span className="text-slate-300">WEB</span>
              <br />
              <span className="text-slate-300">DEVELOPER</span>
            </h1>

            {/* Description */}
            <p className="text-base text-slate-300 font-light max-w-md leading-relaxed">
              {personalInfo.headline}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-cyan-500/50 border border-slate-700 hover:border-cyan-500"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-display font-bold tracking-widest uppercase transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 rounded-md mt-2"
            >
              LET'S TALK
            </button>
          </motion.div>

          {/* Right Content - Portrait with floating icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center min-h-[500px] md:min-h-[600px] order-1 md:order-2"
          >
            {/* Floating Icon - React (top left) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-10 left-0 md:left-10 z-20"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-900 rounded-xl border border-purple-500/30 flex items-center justify-center transform -rotate-12 shadow-xl">
                <span className="font-display font-bold text-purple-200 text-2xl md:text-3xl">⚛</span>
              </div>
            </motion.div>

            {/* Floating Icon - VS Code (top right) */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-20 right-0 md:right-10 z-20"
            >
              <div className="w-14 h-14 md:w-18 md:h-18 bg-purple-900 rounded-xl border border-purple-500/30 flex items-center justify-center transform rotate-12 shadow-xl">
                <span className="font-display font-bold text-purple-200 text-xl md:text-2xl">💻</span>
              </div>
            </motion.div>

            {/* Main Portrait Image */}
            <div className="relative w-full max-w-md">
              <div className="relative z-10 bg-slate-900 rounded-b-3xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/Profile.png"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
                {/* Background gradient (top) */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent"></div>
                {/* Background gradient (bottom) */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
              </div>

              {/* Yellow chart overlay at bottom */}
             <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 opacity-90 z-20">
                <svg
                  className="drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
                  viewBox="0 0 100 60"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 45 L5 15 L25 35 L50 5 L75 35 L95 15 L95 45 Q50 60 5 45 Z" />
                  <circle cx="5" cy="15" r="2" fill="#FDE047" />
                  <circle cx="50" cy="5" r="2" fill="#FDE047" />
                  <circle cx="95" cy="15" r="2" fill="#FDE047" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-gray-500 text-xs font-display tracking-widest mb-2">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="h-5 w-5 text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
