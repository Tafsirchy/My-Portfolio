import { motion, useScroll, useTransform } from 'framer-motion';
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
    [0, 0.5, 1],
    index % 2 === 0 ? [0, -30, 0] : [0, 30, 0]
  );

  return (
    <motion.div
      style={{ y: yTransform }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: tech.delay * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.2,
        y: -15,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Circular Badge */}
      <div className="relative">
        {/* Rotating glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `conic-gradient(from 0deg, ${tech.color}40, transparent, ${tech.color}40)`,
            filter: 'blur(20px)'
          }}
        />
        
        {/* Main circular container */}
        <div 
          className="relative w-24 h-24 rounded-full backdrop-blur-xl bg-white/5 border-2 flex items-center justify-center group-hover:border-white/30 transition-all duration-300 overflow-hidden"
          style={{
            borderColor: `${tech.color}40`,
          }}
        >
          {/* Gradient overlay on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle, ${tech.color}, transparent)`
            }}
          />
          
          {/* Official Logo Icon */}
          <tech.Icon 
            className="relative z-10 transition-all duration-300"
            style={{ 
              color: tech.color,
              fontSize: '2.5rem'
            }}
          />
          {/* Floating tech particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-cyan-500 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tech name tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none"
      >
        <div className="px-3 py-1 rounded-full backdrop-blur-xl bg-black/80 border border-white/20">
          <p className="text-xs font-medium text-white">
            {tech.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Tech stack categorized
  const categories = [
    {
      title: "MERN Stack",
      skills: [
        { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0 },
        { name: "Express.js", Icon: SiExpress, color: "#E0E0E0", delay: 1 },
        { name: "React", Icon: SiReact, color: "#61DAFB", delay: 2 },
        { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 3 },
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", delay: 4 },
        { name: "HTML5", Icon: SiHtml5, color: "#E34F26", delay: 5 },
        { name: "CSS3", Icon: SiCss3, color: "#1572B6", delay: 6 },
        { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", delay: 7 },
        { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", delay: 8 },
      ]
    },
    {
      title: "Backend & DB",
      skills: [
        { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", delay: 9 },
        { name: "REST API", Icon: TbApi, color: "#FF6C37", delay: 10 },
        { name: "JWT", Icon: SiJsonwebtokens, color: "#E0E0E0", delay: 11 },
        { name: "MySQL", Icon: SiMysql, color: "#4479A1", delay: 12 },
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "Git", Icon: SiGit, color: "#F05032", delay: 13 },
        { name: "GitHub", Icon: SiGithub, color: "#FFFFFF", delay: 14 },
        { name: "VS Code", Icon: VscCode, color: "#007ACC", delay: 15 },
        { name: "Figma", Icon: SiFigma, color: "#F24E1E", delay: 16 },
        { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020", delay: 17 },
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative bg-slate-950 text-white pt-10 overflow-hidden"
    >
      {/* Creative Section Separator - Mesh Gradient Transition */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none z-0"></div>
      
      {/* Top Circuit Connector (Receiving from About) */}
      <div className="absolute top-0 inset-x-0 h-40 pointer-events-none opacity-20 transform rotate-180 z-0">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200L150 150H300L350 100H450L500 150H650L800 200" stroke="url(#circuit-grad-skills)" strokeWidth="2" strokeDasharray="10 5" />
          <defs>
            <linearGradient id="circuit-grad-skills" x1="0" y1="200" x2="800" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* Animated background grid and Hex Spotlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent z-0"></div>
        
        {/* Subtle Hex Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2306b6d4' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      <div className="relative z-20 w-11/12 max-w-7xl mx-auto pb-16">

        {/* Section Headline - Global System */}
        <div className="mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">ABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
               Tech <span className="text-gradient">Stack</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm font-light leading-relaxed">
              A specialized toolkit for modern web development, refined through practical implementation and complex problem-solving.
            </p>
          </motion.div>
        </div>

        {/* Professional Modern Layout - Vertical Stacked Cards */}
        <div className="space-y-6 max-w-6xl mx-auto">
          
          {/* MERN Stack - Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
              
              <div className="p-10">
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <TbBolt className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {categories[0].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 ml-11">Full-stack development foundation</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {categories[0].skills.map((tech, skillIdx) => (
                    <SkillBadge 
                      key={skillIdx} 
                      tech={tech} 
                      index={skillIdx} 
                      scrollYProgress={scrollYProgress} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Frontend & Backend - Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {categories[1].title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-8">User interface technologies</p>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {categories[1].skills.map((tech, skillIdx) => (
                      <SkillBadge 
                        key={skillIdx} 
                        tech={tech} 
                        index={skillIdx} 
                        scrollYProgress={scrollYProgress} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Backend & DB */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {categories[2].title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-8">Server & database stack</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {categories[2].skills.map((tech, skillIdx) => (
                      <SkillBadge 
                        key={skillIdx} 
                        tech={tech} 
                        index={skillIdx} 
                        scrollYProgress={scrollYProgress} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Development Tools - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {categories[3].title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-8">Essential development toolkit</p>
                
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
                  {categories[3].skills.map((tech, skillIdx) => (
                    <SkillBadge 
                      key={skillIdx} 
                      tech={tech} 
                      index={skillIdx} 
                      scrollYProgress={scrollYProgress} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Geometric V-Cut Separator (Skills -> Education) */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-20">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H100V0L50 50L0 0V100Z" fill="#020617" />
          <path d="M0 0L50 50L100 0" stroke="url(#v-grad)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="v-grad" x1="0" y1="0" x2="100" y2="0">
              <stop stopColor="transparent" />
              <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};


export default Skills;
