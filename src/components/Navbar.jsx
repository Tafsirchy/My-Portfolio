import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const elegantEase = [0.16, 1, 0.3, 1];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const scrollTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update header backdrop style
      setIsScrolled(currentScrollY > 20);

      // Filter sub-pixel jitter from smooth scroll
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDiff < 6) return;
      lastScrollY.current = currentScrollY;

      // Both top bar and bottom dock appear immediately on scroll
      setIsNavVisible(true);

      // Active section spy
      const sectionIds = ['about', 'skills', 'projects', 'education', 'experience', 'contact'];
      const scrollPosition = currentScrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
      if (currentScrollY < 300) {
        setActiveSection('');
      }

      // Clear existing idle timer
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide both top and bottom nav when user stays on a section for 2 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setIsNavVisible(false);
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsNavVisible(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsNavVisible(false);
    }, 2000);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsNavVisible(true);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ── Static Layout Spacer (Keeps page height perfectly stable) ── */}
      <div className="h-16 sm:h-18 w-full pointer-events-none select-none" aria-hidden="true" />

      {/* ── Top Masthead Bar (Fixed & auto-hides on idle) ── */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isNavVisible ? 0 : -80,
          opacity: isNavVisible ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: elegantEase }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-zinc-300/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
            : 'bg-[#FFFFFF]/70 backdrop-blur-xs border-b border-transparent'
        } ${isNavVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Signature Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center cursor-pointer py-1"
            aria-label="Tafsir Chowdhury — Home"
          >
            <span
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl sm:text-[1.9rem] font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors tracking-wide leading-none select-none"
            >
              Tafsir Chowdhury
            </span>
          </a>

          {/* Right Action: Resume */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-zinc-900 border border-zinc-900 bg-transparent hover:bg-zinc-900 hover:text-[#FFFFFF] transition-all duration-300 shadow-xs"
            >
              <span>Resume</span>
              <FileDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFFFFF] transition-colors" />
            </a>
          </div>

        </div>
      </motion.header>

      {/* ── Floating Bottom Dock Capsule (Fixed & auto-hides on idle) ── */}
      <div className="fixed bottom-6 sm:bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isNavVisible ? 0 : 50,
            opacity: isNavVisible ? 1 : 0,
            scale: isNavVisible ? 1 : 0.96,
          }}
          transition={{ duration: 0.45, ease: elegantEase }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Quick Navigation Dock"
          className={`bg-[#FFFFFF]/95 backdrop-blur-xl border border-zinc-400/90 ring-1 ring-zinc-900/5 shadow-[0_16px_45px_rgba(0,0,0,0.16),0_2px_10px_rgba(0,0,0,0.06)] p-1.5 sm:p-2 rounded-full flex items-center gap-0.5 sm:gap-1 max-w-[95vw] sm:max-w-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isNavVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Subtle Live Node */}
          <div className="flex items-center pl-2.5 pr-2 sm:pl-3 sm:pr-2.5 gap-1.5 border-r border-zinc-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 hidden sm:inline select-none">
              Live
            </span>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 rounded-full select-none whitespace-nowrap ${
                  isActive
                    ? 'text-[#FFFFFF]'
                    : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDockBubble"
                    className="absolute inset-0 bg-zinc-900 rounded-full -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
