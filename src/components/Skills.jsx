import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs,
  SiFirebase, SiJsonwebtokens, SiMysql,
  SiGit, SiGithub, SiFigma,
  SiNetlify, SiVercel, SiCloudflare,
  SiC, SiCplusplus, SiPython
} from 'react-icons/si';
import { TbApi, TbBolt, TbBrandCSharp } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';
import { Terminal } from 'lucide-react';

const SkillBadge = ({ tech, index, isMarquee = false }) => {
  const Wrapper = isMarquee ? 'div' : motion.div;
  const animProps = isMarquee ? {} : {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.4,
      delay: tech.delay * 0.05,
    },
    viewport: { once: true }
  };

  return (
    <Wrapper
      {...animProps}
      className="group relative flex flex-col items-center gap-3 w-full"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white border border-black/10 group-hover:border-neon-navy/50 flex items-center justify-center transition-all duration-300 shadow-sm mx-auto">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-300 group-hover:border-neon-navy transition-colors"></div>
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-300 group-hover:border-neon-navy transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-300 group-hover:border-neon-navy transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-300 group-hover:border-neon-navy transition-colors"></div>

        {/* Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent h-[200%] -top-[100%] group-hover:animate-[scan_2s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100"></div>

        <tech.Icon 
          className="text-2xl md:text-3xl text-slate-400 group-hover:text-slate-900 transition-all duration-300 relative z-10"
        />
        
        {/* Glow effect matching tech color on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md pointer-events-none"
          style={{ backgroundColor: tech.color }}
        />
      </div>

      <div className="text-center font-mono w-full">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-neon-navy transition-colors truncate">
          {tech.name}
        </p>
      </div>
    </Wrapper>
  );
};

const mernCode = [
  "> INIT SYS_CORE",
  "> CONNECTING TO MONGODB...",
  "> [SUCCESS] DB CONNECTED",
  "> STARTING EXPRESS APP...",
  "> [PORT] 5000 ACTIVE",
  "> MOUNTING REACT UI...",
  "> [NODE_ENV] PRODUCTION",
  "> SYSTEM_READY"
];

const frontendCode = [
  "> INIT UI_MODULES",
  "> COMPILING REACT COMPONENTS...",
  "> BUNDLING TAILWIND CSS...",
  "> [WARN] 2 UNUSED VARIABLES",
  "> OPTIMIZING ASSETS...",
  "> RENDER_DOM() CALLED",
  "> [STATUS] 60FPS ATTAINED"
];

const backendCode = [
  "> INIT DATA_LINK",
  "> INITIALIZING FIREBASE ADMIN...",
  "> MOUNTING REST_API ROUTES...",
  "> DB_MIGRATION CHECK...",
  "> [OK] MYSQL SYNCED",
  "> GENERATING JWT SECRET...",
  "> LISTENING FOR REQUESTS..."
];

const workflowCode = [
  "> INIT DEV_OPS",
  "> GIT CHECKOUT MAIN",
  "> PULLING LATEST CHANGES...",
  "> RUNNING BUILD PIPELINE...",
  "> [FIGMA] SYNCING TOKENS",
  "> DEPLOYING TO CLOUDFLARE...",
  "> [SUCCESS] DEPLOYMENT LIVE"
];

const languagesCode = [
  "> INIT CORE_LOGIC",
  "> COMPILING C/C++ BINARIES...",
  "> RUNNING PYTHON SCRIPTS...",
  "> [OK] MEMORY ALLOCATED",
  "> EXECUTING C# RUNTIME...",
  "> KERNEL SYNC SUCCESS",
  "> [STATUS] NATIVE SPEED ATTAINED"
];

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const codeContainerRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "0px 0px -100px 0px" });
  
  useEffect(() => {
    let interval;
    if (category.codeSnippet && isInView && codeContainerRef.current) {
      let i = 0;
      const lines = [];
      interval = setInterval(() => {
        lines.push(category.codeSnippet[i % category.codeSnippet.length]);
        if (lines.length > 8) lines.shift();
        
        // Direct DOM manipulation for maximum smoothness (bypasses React re-renders)
        if (codeContainerRef.current) {
          codeContainerRef.current.innerHTML = lines.map(line => 
            `<div class="truncate">${line}</div>`
          ).join('') + '<div class="animate-pulse mt-1 w-2 h-3 bg-neon-olive"></div>';
        }
        i++;
      }, 40); // Fast 40ms interval
    }
    return () => clearInterval(interval);
  }, [category.codeSnippet, isInView]);

  const half = Math.ceil(category.skills.length / 2);
  const skills1 = category.skills.slice(0, half);
  const skills2 = category.skills.slice(half);

  // Duplicate skills 6 times to ensure a seamless infinite scroll loop since arrays are shorter
  const marqueeSkills1 = [...skills1, ...skills1, ...skills1, ...skills1, ...skills1, ...skills1];
  const marqueeSkills2 = [...skills2, ...skills2, ...skills2, ...skills2, ...skills2, ...skills2];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-slate-50 border border-black/10 hover:border-neon-navy/30 transition-colors shadow-sm overflow-hidden flex flex-col sm:flex-row h-[350px] group"
    >
      {/* Left Panel: Terminal Background */}
      <div className="flex-1 sm:w-1/2 bg-slate-900 flex flex-col relative overflow-hidden border-b sm:border-b-0 sm:border-r border-black/10 p-6">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        
        {/* Header */}
        <div className="relative z-10 flex flex-col gap-1 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-olive" />
            <h3 className="text-xl font-display font-bold uppercase tracking-widest text-white group-hover:text-neon-olive transition-colors">
              {category.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase pl-6">
            {category.subtitle}
          </span>
        </div>

        {/* Code Runner */}
        <div 
          ref={codeContainerRef}
          className="relative z-10 flex-1 flex flex-col justify-end font-mono text-[10px] md:text-xs text-neon-olive/80 leading-relaxed font-bold pointer-events-none"
        >
          <div className="animate-pulse mt-1 w-2 h-3 bg-neon-olive"></div>
        </div>
      </div>

      {/* Right Panel: Infinite Vertical Marquee (2 Columns) */}
      <div 
        className="flex-1 sm:w-1/2 bg-slate-50 relative overflow-hidden p-6 flex gap-4 justify-center"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
      >
        <div className="flex-1 flex flex-col gap-8 animate-marquee-vertical hover:[animation-play-state:paused] pt-4">
          {marqueeSkills1.map((tech, skillIdx) => (
            <SkillBadge 
              key={`col1-${skillIdx}`} 
              tech={tech} 
              index={skillIdx} 
              isMarquee={true}
            />
          ))}
        </div>
        
        {/* If skills2 has items, render the reverse scrolling column */}
        {skills2.length > 0 && (
          <div className="flex-1 flex flex-col gap-8 animate-marquee-vertical-reverse hover:[animation-play-state:paused] pt-4">
            {marqueeSkills2.map((tech, skillIdx) => (
              <SkillBadge 
                key={`col2-${skillIdx}`} 
                tech={tech} 
                index={skillIdx} 
                isMarquee={true}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  
  const categories = [
    {
      title: "MERN_Stack",
      subtitle: "SYS.CORE",
      codeSnippet: mernCode,
      skills: [
        { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0 },
        { name: "Express.js", Icon: SiExpress, color: "#0f172a", delay: 1 },
        { name: "React", Icon: SiReact, color: "#61DAFB", delay: 2 },
        { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 3 },
      ]
    },
    {
      title: "Frontend",
      subtitle: "UI.MODULES",
      codeSnippet: frontendCode,
      skills: [
        { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", delay: 4 },
        { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", delay: 5 },
        { name: "Next.js", Icon: SiNextdotjs, color: "#0f172a", delay: 6 },
        { name: "HTML5", Icon: SiHtml5, color: "#E34F26", delay: 7 },
        { name: "CSS3", Icon: SiCss3, color: "#1572B6", delay: 8 },
      ]
    },
    {
      title: "Backend",
      subtitle: "DATA.LINK",
      codeSnippet: backendCode,
      skills: [
        { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", delay: 9 },
        { name: "REST_API", Icon: TbApi, color: "#FF6C37", delay: 10 },
        { name: "JWT", Icon: SiJsonwebtokens, color: "#0f172a", delay: 11 },
        { name: "MySQL", Icon: SiMysql, color: "#4479A1", delay: 12 },
      ]
    },
    {
      title: "Workflow",
      subtitle: "DEV.OPS",
      codeSnippet: workflowCode,
      skills: [
        { name: "GitHub", Icon: SiGithub, color: "#0f172a", delay: 13 },
        { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020", delay: 14 },
        { name: "Figma", Icon: SiFigma, color: "#F24E1E", delay: 15 },
        { name: "VS_Code", Icon: VscCode, color: "#007ACC", delay: 16 },
      ]
    },
    {
      title: "Languages",
      subtitle: "CORE.LOGIC",
      codeSnippet: languagesCode,
      skills: [
        { name: "C", Icon: SiC, color: "#A8B9CC", delay: 17 },
        { name: "C++", Icon: SiCplusplus, color: "#00599C", delay: 18 },
        { name: "C#", Icon: TbBrandCSharp, color: "#239120", delay: 19 },
        { name: "Python", Icon: SiPython, color: "#3776AB", delay: 20 },
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative bg-white text-slate-900 py-32 overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        {/* Section Headline */}
        <div className="mb-20 border-b border-black/10 pb-6 relative">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
              // SECTION: SKL
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <span className="text-neon-olive">{'>'}</span> System.Skills
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={categories.length % 2 !== 0 && index === categories.length - 1 ? "md:col-span-2" : ""}
            >
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Custom Animations in Tailwind */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes marquee-vertical {
          0% { transform: translateY(0) translateZ(0); }
          100% { transform: translateY(-50%) translateZ(0); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 4s linear infinite;
          will-change: transform;
        }
        .animate-marquee-vertical-reverse {
          animation: marquee-vertical 4s linear infinite reverse;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Skills;
