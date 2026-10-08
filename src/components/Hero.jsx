import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 50]);
  const fgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -20]);
  const yText = useTransform(scrollY, [0, 1000], [0, 30]);

  return (
    <section id="home" className="relative w-full min-h-[90vh] bg-transparent text-zinc-900 overflow-hidden font-sans pt-12 md:pt-16 pb-20">
      
      {/* Background oversized portrait */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[80vw] md:w-[60vw] h-full z-0 opacity-[0.05] grayscale"
      >
        <img 
          src="/assets/HeroProfile.png" 
          alt="" 
          className="w-full h-full object-cover object-top blur-[2px]"
          onError={(e) => { e.target.src = "/assets/About.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F6F0] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-transparent to-transparent"></div>
      </motion.div>

      {/* Main Container aligned with Navbar */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profession Label */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 mb-4 z-30"
        >
          <div className="w-8 h-[1px] bg-zinc-400"></div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium font-sans">Web Developer</span>
        </motion.div>

        {/* Giant Typography Layer */}
        <div className="relative flex flex-col w-full">
          
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 md:gap-16 lg:gap-24 w-full relative">
            <motion.h1 
              style={{ y: yText }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-[80px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-bold text-zinc-900 tracking-tighter leading-none z-10"
            >
              Tafsirul
            </motion.h1>
            
            <motion.h1 
              style={{ y: yText, WebkitTextStroke: '2px #18181b' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-[80px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-bold text-transparent tracking-tighter leading-none z-10 hidden md:block"
            >
              Islam
            </motion.h1>
          </div>
          
          <motion.h1 
            style={{ y: yText }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[65px] sm:text-[85px] md:text-[110px] lg:text-[140px] font-light text-zinc-600 tracking-tight leading-none mt-0 md:-mt-8 z-30"
          >
            Chowdhury
          </motion.h1>
        </div>

        {/* Foreground Portrait */}
        <motion.div 
          style={{ y: fgY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 mx-auto w-full h-[60vh] md:h-[80vh] z-20 pointer-events-none flex justify-center"
        >
          <img 
            src="/assets/HeroProfile.png" 
            alt="Tafsirul Islam Chowdhury" 
            className="w-auto h-full object-contain object-bottom grayscale contrast-[1.05]"
            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            onError={(e) => { e.target.src = "/assets/About.png"; }}
          />
        </motion.div>

        {/* Bottom Content Row: Intro (Left) & CTA (Right) */}
        <div className="w-full flex flex-col md:flex-row justify-between md:items-end gap-8 mt-12 sm:mt-16 z-30 pointer-events-auto relative">
          
          {/* Intro & Socials (Left) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col gap-8 w-full max-w-sm"
          >
            <div className="flex items-stretch gap-4">
              <div className="w-[1px] bg-zinc-400"></div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans tracking-tight">
                Turning ideas into <br/>scalable web experiences.
              </p>
            </div>

            {/* Mobile CTA (Hidden on Desktop) */}
            <div className="flex flex-col gap-6 md:hidden">
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="#projects" 
                  className="group flex items-center justify-center gap-2 px-6 py-3 border border-zinc-900 bg-zinc-900 text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-transparent hover:text-zinc-900"
                >
                  View My Work <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href="#contact" 
                  className="px-2 py-3 bg-transparent text-zinc-900 border-b border-zinc-900 text-xs font-semibold uppercase tracking-widest hover:text-zinc-600 hover:border-zinc-600 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-2">
              <a href="https://github.com/Tafsirchy" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="GitHub">
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a href="https://www.linkedin.com/in/tafsirchy/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a href="https://x.com/chy_tafsir" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="Twitter">
                <Twitter className="w-[18px] h-[18px]" />
              </a>
              <a href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="WhatsApp">
                <SiWhatsapp className="w-[18px] h-[18px]" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="Mail">
                <Mail className="w-[18px] h-[18px]" />
              </a>
            </div>
          </motion.div>

          {/* Desktop CTA Buttons (Right) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden md:flex items-center gap-6"
          >
            <a 
              href="#projects" 
              className="group flex items-center justify-center gap-2 px-6 py-3 border border-zinc-900 bg-zinc-900 text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-transparent hover:text-zinc-900"
            >
              View My Work <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="px-2 py-3 bg-transparent text-zinc-900 border-b border-zinc-900 text-xs font-semibold uppercase tracking-widest hover:text-zinc-600 hover:border-zinc-600 transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
