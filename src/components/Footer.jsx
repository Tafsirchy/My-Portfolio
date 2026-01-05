import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  // Scroll-based animations for desktop
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Desktop scroll animations
  const opacity = useTransform(smoothProgress, [0.3, 0.7], [0, 1]);
  const y = useTransform(smoothProgress, [0.3, 0.7], [40, 0]);
  const borderOpacity = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  const borderWidth = useTransform(smoothProgress, [0.2, 0.6], ["0%", "100%"]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer ref={footerRef} className="relative bg-slate-950 text-white py-10 overflow-hidden border-t-2 border-transparent">
      {/* Creative gradient border at top - Animated */}
      <motion.div 
        style={{ 
          opacity: borderOpacity,
          width: borderWidth 
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
      ></motion.div>
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
      
      <motion.div 
        style={{ opacity, y }}
        className="relative w-11/12 max-w-4xl mx-auto"
      >
        {/* Center-aligned content */}
        <div className="flex flex-col items-center text-center space-y-5">
          
          {/* Creative Logo/Name - Navbar Style */}
          <div className="group relative">
            <div className="flex items-baseline gap-1">
              {/* "Tafsir" - Decorative/Serif Style */}
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight relative">
                Tafsir
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-full opacity-60"></span>
              </span>
              {/* "Chowdhury" - Modern Sans-Serif */}
              <span className="font-display text-lg font-light text-white/90 tracking-wider">
                Chowdhury
              </span>
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>

          {/* Elegant divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          {/* Copyright with heart */}
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span>© {currentYear}</span>
            <span className="text-white/90 font-medium">{personalInfo.name}</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            </span>
          </p>

          {/* Contact Email */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
          >
            {personalInfo.email}
          </a>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
          >
            <span className="text-sm font-medium text-white/80 group-hover:text-white">Back to Top</span>
            <ArrowUp className="h-4 w-4 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          </motion.button>

        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
