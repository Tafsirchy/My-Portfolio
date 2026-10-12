import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Menu, X } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const elegantEase = [0.16, 1, 0.3, 1];

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuCloseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update header backdrop style
      setIsScrolled(currentScrollY > 20);

      // Filter sub-pixel jitter from smooth scroll
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDiff < 6) return;

      // Touch-friendly auto-hide: only hide when scrolling DOWN, reveal on scroll UP.
      // Never hides on idle and never relies on hover.
      if (!isMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 140) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  // Lock body scroll + Escape-to-close while the mobile drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = setTimeout(() => menuCloseRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsNavVisible(true);
    setIsMenuOpen(false);
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
      <div className="h-16 sm:h-[72px] w-full pointer-events-none select-none" aria-hidden="true" />

      {/* ── Top Masthead Bar (Fixed & auto-hides on scroll-down only) ── */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isNavVisible ? 0 : -80,
          opacity: isNavVisible ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: elegantEase }}
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-zinc-300/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
            : 'bg-[#FFFFFF]/70 backdrop-blur-sm border-b border-transparent'
        } ${isNavVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-3">

          {/* Signature Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center cursor-pointer py-1 min-w-0"
            aria-label="Tafsir Chowdhury — Home"
          >
            <span
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-xl sm:text-[1.9rem] font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors tracking-wide leading-none select-none truncate"
            >
              Tafsir Chowdhury
            </span>
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Resume — tablet & desktop */}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-bold uppercase tracking-[0.18em] text-zinc-900 border border-zinc-900 bg-transparent hover:bg-zinc-900 hover:text-[#FFFFFF] transition-all duration-300 shadow-sm"
            >
              <span>Resume</span>
              <FileDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFFFFF] transition-colors" />
            </a>

            {/* Resume — mobile icon */}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label="Download resume"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 text-zinc-900 border border-zinc-300 hover:border-zinc-900 transition-colors"
            >
              <FileDown className="w-5 h-5" />
            </a>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 text-zinc-900 border border-zinc-300 hover:border-zinc-900 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile Drawer (full-height, safe-area aware, z-200) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: elegantEase }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-[200] md:hidden bg-black/40 backdrop-blur-sm"
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: elegantEase }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#FFFFFF] border-l border-zinc-300 shadow-2xl flex flex-col p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Navigation
                </span>
                <button
                  ref={menuCloseRef}
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center justify-center h-11 w-11 text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex items-center min-h-[52px] py-3 border-b border-zinc-200 text-base font-bold uppercase tracking-[0.14em] transition-colors ${
                          isActive ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="mt-6 inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#FFFFFF] bg-zinc-900"
              >
                <span>Resume</span>
                <FileDown className="w-4 h-4" />
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bottom Dock Capsule (md+ only) ── */}
      <div className="hidden md:flex fixed bottom-6 sm:bottom-8 left-0 right-0 z-[90] justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isNavVisible ? 0 : 50,
            opacity: isNavVisible ? 1 : 0,
            scale: isNavVisible ? 1 : 0.96,
          }}
          transition={{ duration: 0.45, ease: elegantEase }}
          aria-label="Quick Navigation Dock"
          className={`bg-[#FFFFFF]/95 backdrop-blur-xl border border-zinc-400/90 ring-1 ring-zinc-900/5 shadow-[0_16px_45px_rgba(0,0,0,0.16),0_2px_10px_rgba(0,0,0,0.06)] p-1.5 sm:p-2 rounded-full flex items-center gap-0.5 sm:gap-1 pointer-events-auto ${
            isNavVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Subtle Live Node */}
          <div className="flex items-center pl-3 pr-2.5 gap-1.5 border-r border-zinc-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 select-none">
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
                aria-current={isActive ? 'true' : undefined}
                className={`relative inline-flex items-center px-3 py-2.5 min-h-[44px] text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 rounded-full select-none whitespace-nowrap ${
                  isActive
                    ? 'text-[#FFFFFF]'
                    : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDockBubble"
                    className="absolute inset-0 bg-zinc-900 rounded-full -z-10 shadow-sm"
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
