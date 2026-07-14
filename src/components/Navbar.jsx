import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const stateRef = useRef({ isHovered: false, isMenuOpen: false });
  const timeoutRef = useRef(null);

  useEffect(() => {
    stateRef.current.isMenuOpen = isMobileMenuOpen;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsVisible(true);

      clearTimeout(timeoutRef.current);

      // Hide navbar after 600ms of no scrolling, unless hovered or menu is open
      if (window.scrollY > 100) {
        timeoutRef.current = setTimeout(() => {
          if (!stateRef.current.isHovered && !stateRef.current.isMenuOpen) {
            setIsVisible(false);
          }
        }, 600);
      }
    };

    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains('modal-open'));
    };

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      onMouseEnter={() => {
        stateRef.current.isHovered = true;
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        stateRef.current.isHovered = false;
        if (window.scrollY > 100) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            if (!stateRef.current.isHovered && !stateRef.current.isMenuOpen) {
              setIsVisible(false);
            }
          }, 600);
        }
      }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isModalOpen ? 'z-0 opacity-0 pointer-events-none' : 'z-50'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-black/10'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* HUD Logo */}
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group relative flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 bg-neon-navy animate-pulse"></div>
            <div className="font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-1">
              <span className="text-slate-400">[</span>
              <span className="text-slate-900 font-bold group-hover:text-neon-navy transition-colors">TAFSIR.C</span>
              <span className="text-slate-400">]</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="font-mono text-xs tracking-widest text-slate-500 font-bold hover:text-neon-navy transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="opacity-0 group-hover:opacity-100 text-neon-navy mr-1 transition-opacity">{'>'}</span>
                {item.label}
                <span className="absolute -bottom-2 left-0 w-full h-px bg-neon-navy transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-neon-navy active:text-neon-navy focus-visible:ring-2 focus-visible:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-black/10 shadow-lg"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="font-mono text-xs tracking-[0.2em] text-slate-600 font-bold active:bg-black/10 active:text-neon-navy transition-all py-4 px-4 block border-b border-black/5 flex items-center gap-2"
                >
                  <span className="text-neon-navy">{'>'}</span> {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
