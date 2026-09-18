import { useState, useEffect } from 'react';
import { Menu, X, FileDown, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs'
          : 'bg-white/60 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Name & Status */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
            TC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
              {personalInfo.name}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for work
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Resume
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-all shadow-xs"
          >
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-md"
            aria-label="Download Resume"
          >
            <FileDown className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-white border-b border-zinc-200 shadow-xl px-4 pt-4 pb-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-md text-emerald-800 text-xs font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Currently available for full-time roles & high-impact projects
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Download Resume (PDF)
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors shadow-xs"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
