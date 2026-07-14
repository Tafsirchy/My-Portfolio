import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Facebook, Download, Terminal, Cpu } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';

const CODE_SNIPPETS = [
  "import { createRoot } from 'react-dom/client';",
  "import { App } from './App';",
  "const container = document.getElementById('root');",
  "const root = createRoot(container);",
  "root.render(<App />);",
  "// INITIALIZING SYSTEM...",
  "// ESTABLISHING SECURE CONNECTION...",
  "import data from '@database/local';",
  "export default function SystemInit() {",
  "  return <System data={data} />;",
  "}",
  "await decrypt('HeroProfile.png');",
  "renderImage();",
  "// BYPASSING FIREWALL...",
  "// ACCESS GRANTED.",
  "const user = new User({ status: 'ONLINE' });",
  "console.log('Welcome back, Commander.');",
  "// Rerouting power to primary systems...",
  "import { motion } from 'framer-motion';",
  "const AnimatedProfile = () => {",
  "  return <motion.img src={profile} />;",
  "}",
  "function optimizeRender() {",
  "  return true;",
  "}",
  "class Hacker extends Developer {",
  "  constructor() { super(); }",
  "}"
];

const Hero = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompiling, setIsCompiling] = useState(true);
  const [compileLines, setCompileLines] = useState([]);

  const fullText = `> INITIALIZING SECURE CONNECTION...\n> ACCESS GRANTED.\n> WELCOME TO PORTFOLIO_V2.0`;

  // Compilation Effect
  useEffect(() => {
    let interval;
    if (isCompiling) {
      // Add a line of code every 50ms
      interval = setInterval(() => {
        setCompileLines(prev => {
          const newLine = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          const updated = [...prev, newLine];
          // Keep only the last 30 lines so it scrolls upwards
          if (updated.length > 30) updated.shift();
          return updated;
        });
      }, 50);

      // Stop compiling after 3 seconds
      setTimeout(() => {
        setIsCompiling(false);
        clearInterval(interval);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isCompiling]);

  // Terminal Typing Effect (Starts after compiling finishes)
  useEffect(() => {
    if (!isCompiling && !isTyping && text === '') {
      setIsTyping(true);
    }
  }, [isCompiling, isTyping, text]);

  useEffect(() => {
    let i = 0;
    if (isTyping) {
      const timer = setInterval(() => {
        setText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 40);
      return () => clearInterval(timer);
    }
  }, [fullText, isTyping]);

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
      className="relative flex items-center justify-center  bg-background bg-grid overflow-hidden"
    >
      {/* Background Central Image & Compiling Interface */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
        <div className="relative w-full max-w-6xl h-full flex items-end justify-center overflow-hidden">

          {/* Subtle Backlight */}
          <motion.div
            className="absolute inset-0 bg-neon-navy/20 blur-[120px] rounded-full top-1/4"
            animate={{ opacity: isCompiling ? 0.1 : 1 }}
            transition={{ duration: 2 }}
          />

          {/* Fake Interface Code Overlay (Behind the rendering image) */}
          <AnimatePresence>
            {isCompiling && (
              <motion.div
                className="absolute bottom-0 left-4 md:left-12 w-full max-w-3xl h-[90%] z-20 flex flex-col justify-start p-4 md:p-8 font-mono text-[10px] md:text-xs text-neon-olive/80 leading-tight font-bold mix-blend-screen overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
              >
                {compileLines.map((line, index) => (
                  <div key={index} className="truncate w-full text-left">{line}</div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Base Silhouette (Shows where the image will be) */}
          {isCompiling && (
            <img
              src="/assets/HeroProfile.png"
              className="absolute z-20 w-full h-[85vh] md:h-[95vh] object-contain object-bottom opacity-10 filter grayscale brightness-0"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 100%)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 100%)',
                maskComposite: 'intersect'
              }}
              alt="Silhouette"
            />
          )}

          {/* Rendered Hero Profile Image (Reveals from top to bottom) */}
          <motion.img
            src="/assets/HeroProfile.png"
            alt="Hero Profile"
            className="relative z-30 w-full h-[85vh] md:h-[95vh] object-contain object-bottom drop-shadow-2xl"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 100%)',
              WebkitMaskComposite: 'source-in',
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 100%)',
              maskComposite: 'intersect'
            }}
            initial={{ clipPath: "inset(0 0 100% 0)", filter: "brightness(1.5) hue-rotate(90deg)" }}
            animate={{
              clipPath: isCompiling ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
              filter: isCompiling ? "brightness(1.5) hue-rotate(90deg)" : "brightness(1.05) hue-rotate(0deg)"
            }}
            transition={{
              clipPath: { duration: 3, ease: "linear" },
              filter: { duration: 3, ease: "easeOut" }
            }}
          />

          {/* The Rendering Scanner Line */}
          <AnimatePresence>
            {isCompiling && (
              <motion.div
                className="absolute left-0 w-full h-1 bg-white shadow-[0_0_20px_rgba(77,124,15,1),0_0_10px_rgba(77,124,15,1)] z-40"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Fade Out Grid at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />
      </div>

      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#fafafa_100%)] pointer-events-none z-10" />

      {/* Main HUD Overlay Content */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 md:px-8 pb-24 pt-20 md:pb-12 md:pt-20  flex flex-col md:grid md:grid-cols-12 gap-8 items-center md:items-stretch">

        {/* ================= LEFT HUD PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isCompiling ? 0 : 1, x: isCompiling ? -50 : 0 }}
          transition={{ duration: 0.8, delay: isCompiling ? 0 : 0.5 }}
          className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col items-start justify-center gap-8 w-full mt-10 md:mt-0"
        >
          {/* Terminal Box */}
          <div className="hidden md:block glass-panel p-4 font-mono text-xs text-neon-navy border-l-2 border-neon-navy w-full bg-white/60 backdrop-blur-md shadow-lg border-y border-r border-white/50">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neon-navy/20">
              <Terminal className="w-4 h-4" />
              <span>system_status.log</span>
            </div>
            <div className="whitespace-pre-wrap min-h-[48px]">{text}</div>
            <span className="animate-pulse text-slate-900">_</span>
          </div>

          <div className="flex flex-col gap-6 bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-lg shadow-xl md:shadow-none border border-white/50 md:border-none w-full">
            {/* Status & Name */}
            <div className="flex flex-col items-start gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isCompiling ? 0 : 1 }}
                transition={{ delay: isCompiling ? 0 : 1.2 }}
                className="px-3 py-1 bg-neon-navy/10 border border-neon-navy/30 flex items-center gap-2 font-mono shadow-sm"
              >
                <div className="w-2 h-2 bg-neon-navy rounded-full animate-pulse"></div>
                <span className="text-[10px] tracking-widest text-neon-navy font-bold uppercase">STATUS: ONLINE</span>
              </motion.div>

              <div className="flex items-center gap-3 font-mono text-sm tracking-[0.2em] uppercase font-bold bg-white/90 px-3 py-1.5 rounded-sm shadow-sm border border-black/5">
                <span className="text-slate-400">[</span><span className="text-slate-900">{personalInfo.name}</span><span className="text-slate-400">]</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-black text-6xl lg:text-7xl leading-none tracking-tighter uppercase relative z-10">
              <span className="block text-3xl lg:text-4xl mb-2 text-slate-800 tracking-widest drop-shadow-sm">Digital</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-navy via-blue-800 to-slate-900 drop-shadow-sm pb-2">Architect</span>
            </h1>

            <div className="flex items-center gap-4 py-1 font-mono text-xs text-neon-navy uppercase tracking-[0.3em] font-bold">
              <div className="h-px w-12 bg-neon-navy"></div>
              <span className="bg-white/90 px-3 py-1.5 rounded-sm shadow-sm border border-black/5">{personalInfo.tagline}</span>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-slate-800 font-sans leading-relaxed border-l-[3px] border-neon-navy pl-5 bg-white/90 backdrop-blur-md p-4 shadow-md border-y border-r border-y-black/5 border-r-black/5 max-w-lg">
              {personalInfo.headline}
            </p>
          </div>
        </motion.div>

        {/* ================= CENTER SPACER ================= */}
        <div className="hidden md:block md:col-span-4 lg:col-span-4 pointer-events-none"></div>

        {/* ================= RIGHT HUD PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isCompiling ? 0 : 1, x: isCompiling ? 50 : 0 }}
          transition={{ duration: 0.8, delay: isCompiling ? 0 : 0.7 }}
          className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-end justify-center gap-8 w-full mt-4 md:mt-0"
        >
          {/* Data tags - Right Aligned */}
          <div className="hidden md:flex flex-col gap-1 font-mono text-[10px] text-neon-navy bg-white/80 p-3 border border-neon-navy/20 backdrop-blur-md font-bold text-right shadow-lg">
            <div className="flex items-center justify-end gap-2 text-slate-400 mb-1 border-b border-slate-200 pb-1">
              <Cpu className="w-4 h-4" />
              <span>SYSTEM_METRICS</span>
            </div>
            <span>COORD: 34.0522°N</span>
            <span>SYS_TEMP: OPTIMAL</span>
            <span className="text-neon-olive">ID: MERN_DEV_01</span>
            <span className="text-slate-500">FW: V2.4.1</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-lg shadow-xl md:shadow-none border border-white/50 md:border-none w-full">
            {/* Social Links */}
            <div className="flex md:flex-col items-center md:items-end gap-4 w-full justify-center md:justify-end">
              <span className="hidden md:block font-mono text-[9px] text-slate-400 tracking-widest uppercase rotate-180 bg-white/50 px-1 py-2" style={{ writingMode: 'vertical-rl' }}>
                SOCIAL_LINKS
              </span>
              <div className="flex md:flex-col gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = { Github, Linkedin, Twitter, Facebook }[social.icon];
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, x: -5 }}
                      className="w-10 h-10 border border-black/10 bg-white/90 shadow-sm hover:bg-neon-navy hover:border-neon-navy flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center md:items-end gap-4 font-mono text-xs tracking-widest uppercase w-full">
              <button
                onClick={() => scrollToSection('#contact')}
                className="group relative w-full md:w-auto px-8 py-4 bg-neon-navy text-white font-bold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] flex justify-center md:justify-end"
              >
                <span className="relative z-10 flex items-center gap-2">
                  INITIATE_CONTACT <ArrowDown className="w-3 h-3 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href={personalInfo.resume}
                download
                className="group w-full md:w-auto px-8 py-3 bg-white/90 backdrop-blur-md text-slate-800 border border-black/10 shadow-sm hover:border-neon-navy hover:text-neon-navy transition-all flex items-center justify-center md:justify-end gap-2 font-bold"
              >
                <Download className="w-3 h-3 group-hover:animate-bounce" />
                <span>GET_RESUME</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isCompiling ? 0 : 1 }}
        transition={{ delay: isCompiling ? 0 : 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40 font-mono text-[10px] text-slate-500 tracking-[0.2em] uppercase font-bold"
      >
        <span className="mb-2 bg-white/70 px-3 py-1 backdrop-blur-sm shadow-sm rounded-sm">Scroll_Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="h-4 w-4 text-neon-navy" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
