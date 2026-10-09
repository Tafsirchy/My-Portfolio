import React, { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 50]);
  const fgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -20]);
  const yText = useTransform(scrollY, [0, 1000], [0, 30]);

  // Elegant easing function
  const elegantEase = [0.16, 1, 0.3, 1];

  return (
    <section id="home" className="relative w-full min-h-[90vh] bg-transparent text-zinc-900 overflow-hidden font-sans pt-12 md:pt-16 pb-20">
      
      {/* Background oversized portrait */}
      <motion.div 
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-10 md:bottom-18 left-16 right-0 mx-auto w-full h-[70vh] md:h-[95vh] z-0 pointer-events-none flex justify-center origin-bottom translate-x-20 md:translate-x-48"
      >
        <img 
          src="/assets/About.png" 
          alt="" 
          className={`w-auto h-full object-contain object-bottom blur-[1px] transition-all duration-700 pointer-events-none ${isHovered ? 'grayscale-0' : 'grayscale'}`}
          onError={(e) => { e.target.src = "/assets/About.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-transparent to-transparent"></div>
      </motion.div>

      {/* Main Container aligned with Navbar */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profession Label */}
        <motion.div 
          initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 1.2, ease: elegantEase }}
          className="flex items-center gap-4 mb-4 z-30"
        >
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: elegantEase }}
            className="w-8 h-[1px] bg-zinc-400 origin-left"
          ></motion.div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium font-sans">Web Developer</span>
        </motion.div>

        {/* Giant Typography Layer */}
        <div className="relative flex flex-col w-full">
          
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 md:gap-16 lg:gap-24 w-full relative">
            <motion.h1 
              style={{ y: yText }}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3, duration: 1.4, ease: elegantEase }}
              className="text-[80px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-bold text-zinc-900 tracking-tighter leading-none z-10"
            >
              Tafsirul
            </motion.h1>
            
            <motion.h1 
              style={{ y: yText, WebkitTextStroke: '2px #18181b' }}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 1.4, ease: elegantEase }}
              className="text-[80px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-bold text-transparent tracking-tighter leading-none z-10 hidden md:block"
            >
              Islam
            </motion.h1>
          </div>
          
          <motion.h1 
            style={{ y: yText }}
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1.4, ease: elegantEase }}
            className="text-[65px] sm:text-[85px] md:text-[110px] lg:text-[140px] font-light text-zinc-600 tracking-tight leading-none mt-0 md:-mt-8 z-30"
          >
            Chowdhury
          </motion.h1>
        </div>

        {/* Foreground Portrait */}
        <motion.div 
          style={{ y: fgY }}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 1.8, ease: elegantEase }}
          className="absolute bottom-0 left-0 right-0 mx-auto w-full h-[60vh] md:h-[80vh] z-20 pointer-events-none flex justify-center"
        >
          <img 
            src="/assets/HeroProfile.png" 
            alt="Tafsirul Islam Chowdhury" 
            className={`w-auto h-full object-contain object-bottom contrast-[1.05] transition-all duration-700 cursor-pointer pointer-events-auto ${isHovered ? 'grayscale-0 delay-200' : 'grayscale delay-0'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            onError={(e) => { e.target.src = "/assets/About.png"; }}
          />
        </motion.div>

        {/* Bottom Content Row: Intro (Left) & CTA (Right) */}
        <div className="w-full flex flex-col md:flex-row justify-between md:items-end gap-8 mt-12 sm:mt-16 z-30 pointer-events-auto relative">
          
          {/* Intro & Socials (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.7, duration: 1.2, ease: elegantEase }}
            className="flex flex-col gap-8 w-full max-w-sm"
          >
            <div className="flex items-stretch gap-4">
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: elegantEase }}
                className="w-[1px] bg-zinc-400 origin-top"
              ></motion.div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans tracking-tight">
                Turning ideas into <br/>scalable web experiences.
              </p>
            </div>

            {/* Mobile CTA (Hidden on Desktop) */}
            <div className="flex flex-col gap-6 md:hidden">
              <div className="flex flex-wrap items-center gap-6">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects" 
                  className="group flex items-center justify-center gap-2 px-6 py-3 border border-zinc-900 bg-zinc-900 text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-[#18181b]/90 hover:text-[#F9F6F0]"
                >
                  View My Work <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="px-2 py-3 bg-transparent text-zinc-900 border-b border-zinc-900 text-xs font-semibold uppercase tracking-widest hover:text-zinc-600 hover:border-zinc-600 transition-colors"
                >
                  Get In Touch
                </motion.a>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-2">
              {[
                { icon: Github, link: "https://github.com/Tafsirchy", label: "GitHub" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/tafsirchy/", label: "LinkedIn" },
                { icon: Twitter, link: "https://x.com/chy_tafsir", label: "Twitter" },
                { icon: SiWhatsapp, link: `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, label: "WhatsApp" },
                { icon: Mail, link: `mailto:${personalInfo.email}`, label: "Mail" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5, ease: elegantEase }}
                  whileHover={{ y: -3, color: '#18181b' }}
                  href={social.link} 
                  target={social.link.startsWith('http') ? "_blank" : undefined}
                  rel={social.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-zinc-500 hover:text-zinc-900 transition-colors" 
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Desktop CTA Buttons (Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 1.2, ease: elegantEase }}
            className="hidden md:flex items-center gap-6"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="group flex items-center justify-center gap-2 px-6 py-3 border border-zinc-900 bg-zinc-900 text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-[#18181b]/90 hover:text-[#F9F6F0]"
            >
              View My Work <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-2 py-3 bg-transparent text-zinc-900 border-b border-zinc-900 text-xs font-semibold uppercase tracking-widest hover:text-zinc-600 hover:border-zinc-600 transition-colors"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
