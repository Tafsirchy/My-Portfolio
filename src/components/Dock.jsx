'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence 
} from 'framer-motion';
import { 
  Home, 
  FolderGit2, 
  Mail, 
  FileText,
  Sun,
  Moon,
  ArrowUp
} from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';

// Individual Animated Dock Item (macOS / Magic UI Magnification)
function DockItem({ mouseX, item, activeTooltip, setActiveTooltip }) {
  const ref = useRef(null);
  const Icon = item.icon;
  const isCurrentTooltip = activeTooltip === item.label;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [38, 54, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  const linkProps = item.isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="relative flex items-center justify-center aspect-square shrink-0"
      onMouseEnter={() => setActiveTooltip(item.label)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      <AnimatePresence>
        {isCurrentTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute -top-10 px-2.5 py-1 bg-[#181A20] dark:bg-white text-[#FAF9F6] dark:text-[#181A20] text-[11px] font-semibold rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50 border border-white/10 dark:border-black/10"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={item.href}
        {...linkProps}
        aria-label={item.label}
        className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${item.color} ${item.hoverBg}`}
      >
        <Icon className="w-[48%] h-[48%] max-w-[22px] max-h-[22px] transition-transform duration-150" />
      </Link>
    </motion.div>
  );
}

// Animated Action Button for Theme Toggle & Back to Top
function DockButton({ mouseX, label, tooltip, onClick, children, activeTooltip, setActiveTooltip, hoverClass = 'hover:text-[#181A20] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10' }) {
  const ref = useRef(null);
  const isCurrentTooltip = activeTooltip === label;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [38, 54, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="relative flex items-center justify-center aspect-square shrink-0"
      onMouseEnter={() => setActiveTooltip(label)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      <AnimatePresence>
        {isCurrentTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute -top-10 px-2.5 py-1 bg-[#181A20] dark:bg-white text-[#FAF9F6] dark:text-[#181A20] text-[11px] font-semibold rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50 border border-white/10 dark:border-black/10"
          >
            {tooltip || label}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`w-full h-full rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer ${hoverClass}`}
      >
        {children}
      </button>
    </motion.div>
  );
}

export default function Dock() {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group 1: Navigation
  const navItems = [
    { 
      label: 'Home', 
      href: '/', 
      icon: Home, 
      isExternal: false,
      hoverColor: 'hover:text-[#4F46E5] dark:hover:text-[#6366F1]',
      hoverBg: 'hover:bg-[#4F46E5]/10',
    },
    { 
      label: 'Projects', 
      href: '/projects', 
      icon: FolderGit2, 
      isExternal: false,
      hoverColor: 'hover:text-[#4F46E5] dark:hover:text-[#6366F1]',
      hoverBg: 'hover:bg-[#4F46E5]/10',
    },
  ];

  // Group 2: Social & Contact
  const socialItems = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/Tafsirchy', 
      icon: SiGithub, 
      isExternal: true,
      hoverColor: 'hover:text-[#181717] dark:hover:text-white',
      hoverBg: 'hover:bg-black/10 dark:hover:bg-white/10',
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/tafsirchy/', 
      icon: SiLinkedin, 
      isExternal: true,
      hoverColor: 'hover:text-[#0A66C2] dark:hover:text-[#0A66C2]',
      hoverBg: 'hover:bg-[#0A66C2]/10',
    },
    { 
      label: 'X', 
      href: 'https://x.com/chy_tafsir', 
      icon: SiX, 
      isExternal: true,
      hoverColor: 'hover:text-black dark:hover:text-white',
      hoverBg: 'hover:bg-black/10 dark:hover:bg-white/10',
    },
    { 
      label: 'Contact', 
      href: '/contact', 
      icon: Mail, 
      isExternal: false,
      hoverColor: 'hover:text-[#E06D53] dark:hover:text-[#F59E0B]',
      hoverBg: 'hover:bg-[#E06D53]/10 dark:hover:bg-[#F59E0B]/10',
    },
  ];

  // Group 3: Utility (Resume)
  const utilityItems = [
    { 
      label: 'Resume', 
      href: personalInfo.resume, 
      icon: FileText, 
      isExternal: true,
      hoverColor: 'hover:text-[#4F46E5] dark:hover:text-[#6366F1]',
      hoverBg: 'hover:bg-[#4F46E5]/10',
    },
  ];

  return (
    <nav
      aria-label="Floating Navigation Bar"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-1.5rem)]"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-2 bg-white/80 dark:bg-[#181B24]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-colors h-13 sm:h-16"
      >
        {/* Navigation Group */}
        {navItems.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            item={item}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
          />
        ))}

        {/* Separator 1 */}
        <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-700 mx-0.5 sm:mx-1 self-center shrink-0" />

        {/* Social & Contact Group */}
        {socialItems.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            item={item}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
          />
        ))}

        {/* Separator 2 */}
        <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-700 mx-0.5 sm:mx-1 self-center shrink-0" />

        {/* Utility / Resume */}
        {utilityItems.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            item={item}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
          />
        ))}

        {/* Theme Toggle Button */}
        {mounted && (
          <DockButton
            mouseX={mouseX}
            label="theme"
            tooltip={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            onClick={toggleTheme}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
            hoverClass="hover:text-amber-500 dark:hover:text-amber-300 hover:bg-amber-400/10"
          >
            {theme === 'dark' ? (
              <Moon className="w-[48%] h-[48%] max-w-[22px] max-h-[22px] text-amber-400" />
            ) : (
              <Sun className="w-[48%] h-[48%] max-w-[22px] max-h-[22px] text-amber-500" />
            )}
          </DockButton>
        )}

        {/* Scroll To Top Button (shows when scrolled down) */}
        {showScrollTop && (
          <>
            <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-700 mx-0.5 sm:mx-1 self-center shrink-0" />
            <DockButton
              mouseX={mouseX}
              label="top"
              tooltip="Back to Top"
              onClick={scrollToTop}
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
              hoverClass="hover:text-[#4F46E5] dark:hover:text-[#6366F1] hover:bg-[#4F46E5]/10"
            >
              <ArrowUp className="w-[48%] h-[48%] max-w-[22px] max-h-[22px] text-[#4F46E5] dark:text-[#818CF8]" />
            </DockButton>
          </>
        )}
      </motion.div>
    </nav>
  );
}
