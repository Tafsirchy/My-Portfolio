import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs,
  SiFirebase, SiJsonwebtokens, SiMysql,
  SiGit, SiGithub, SiFigma,
  SiNetlify, SiVercel, SiCloudflare
} from 'react-icons/si';
import { TbApi, TbBolt } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';

const SkillBadge = ({ tech, index, scrollYProgress }) => {
  const yTransform = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    index % 2 === 0 ? [20, -20, 20] : [-20, 20, -20]
  );
  const springY = useSpring(yTransform, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{ y: springY }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: tech.delay * 0.05,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Circular Badge */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, ${tech.color}40, transparent, ${tech.color}40)`,
            filter: 'blur(10px)'
          }}
        />
        
        <div 
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-all duration-300"
        >
          <tech.Icon 
            className="text-3xl md:text-4xl transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            style={{ color: tech.color }}
          />
        </div>
      </div>

      {/* Tech name */}
      <div className="mt-3 text-center">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
          {tech.name}
        </p>
      </div>
    </motion.div>
  );
};

const FloatingParticle = ({ i, smoothProgress }) => {
  // Pre-calculate random values outside the hook
  const seed = i * 123.456;
  const startY = (Math.sin(seed) * 200) - 100;
  const endY = (Math.cos(seed) * 200) - 100;
  const left = (Math.abs(Math.sin(seed * 2)) * 100) + "%";
  const top = (Math.abs(Math.cos(seed * 3)) * 100) + "%";
  const rotateStart = Math.sin(seed * 4) * 360;

  const y = useTransform(smoothProgress, [0, 1], [startY, endY]);

  return (
    <motion.div
      className="absolute text-cyan-500/20 font-mono text-xl select-none"
      style={{
        left,
        top,
        y,
        rotate: rotateStart,
      }}
    >
      {['{', '}', '/>', '[]', '&&', '=>', '()'][i % 7]}
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const meshOpacity = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0.3, 0.8, 0.3]);
  const bgColor = useTransform(smoothProgress, [0, 1], ["#020617", "#0f172a"]);

  const categories = [
    {
      title: "MERN Stack",
      subtitle: "The Foundation",
      color: "cyan",
      skills: [
        { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0 },
        { name: "Express.js", Icon: SiExpress, color: "#E0E0E0", delay: 1 },
        { name: "React", Icon: SiReact, color: "#61DAFB", delay: 2 },
        { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 3 },
      ]
    },
    {
      title: "Modern Frontend",
      subtitle: "Interface Mastery",
      color: "indigo",
      skills: [
        { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", delay: 4 },
        { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", delay: 5 },
        { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", delay: 6 },
        { name: "HTML5", Icon: SiHtml5, color: "#E34F26", delay: 7 },
        { name: "CSS3", Icon: SiCss3, color: "#1572B6", delay: 8 },
      ]
    },
    {
      title: "Backend ecosystem",
      subtitle: "Data & Systems",
      color: "purple",
      skills: [
        { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", delay: 9 },
        { name: "REST API", Icon: TbApi, color: "#FF6C37", delay: 10 },
        { name: "JWT", Icon: SiJsonwebtokens, color: "#E0E0E0", delay: 11 },
        { name: "MySQL", Icon: SiMysql, color: "#4479A1", delay: 12 },
      ]
    },
    {
      title: "Workflow & Cloud",
      subtitle: "DevOps & Design",
      color: "blue",
      skills: [
        { name: "Git & GitHub", Icon: SiGithub, color: "#FFFFFF", delay: 13 },
        { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020", delay: 14 },
        { name: "Figma", Icon: SiFigma, color: "#F24E1E", delay: 15 },
        { name: "VS Code", Icon: VscCode, color: "#007ACC", delay: 16 },
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative text-white py-24 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Digital Nebula Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Shifting Nebula Gradients */}
        <motion.div 
          style={{ 
            opacity: meshOpacity,
            scale: useTransform(smoothProgress, [0, 1], [1, 1.2]),
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />
        </motion.div>

        {/* Layer 2: Animated SVG Circuits */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M0 200h200v200h200v-100h300v300h300"
            stroke="url(#circuit-grad)"
            strokeWidth="1"
            fill="none"
            style={{ pathLength: useTransform(smoothProgress, [0, 0.5], [0, 1]) }}
          />
          <motion.path
            d="M1000 800h-300v-200h-200v100h-300v-300h-200"
            stroke="url(#circuit-grad)"
            strokeWidth="1"
            fill="none"
            style={{ pathLength: useTransform(smoothProgress, [0.5, 1], [0, 1]) }}
          />
          <defs>
            <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 3: Floating Code Particles (Parallax) */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            i={i} 
            smoothProgress={smoothProgress} 
          />
        ))}

        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-16">
        {/* Section Headline */}
        <div className="mb-20 relative text-center">
          <motion.div
            style={{ y: useTransform(smoothProgress, [0, 1], [-20, 20]) }}
            className="flex flex-col items-center gap-4"
          >
            <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">ABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
               Specialized <span className="text-gradient">Toolkit</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
          </motion.div>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const cardY = useTransform(smoothProgress, [0.1 + index * 0.1, 0.5 + index * 0.1], [50, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const cardRotate = useTransform(smoothProgress, [0.1, 0.5], [index % 2 === 0 ? -2 : 2, 0]);

            return (
              <motion.div
                key={index}
                style={{ y: cardY, rotateZ: cardRotate }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500"
              >
                {/* Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-8 rounded-full bg-${category.color}-500 shadow-lg shadow-${category.color}-500/50`}></div>
                    <h3 className="text-2xl font-bold tracking-tight">{category.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest pl-5">{category.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
                  {category.skills.map((tech, skillIdx) => (
                    <SkillBadge 
                      key={skillIdx} 
                      tech={tech} 
                      index={skillIdx} 
                      scrollYProgress={scrollYProgress} 
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Geometric V-Cut Separator */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-20">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H100V0L50 50L0 0V100Z" fill="#020617" />
        </svg>
      </div>
    </section>
  );
};

export default Skills;
