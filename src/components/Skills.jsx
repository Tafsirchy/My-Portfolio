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

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Tech stack with official icons and colors
  const techStack = [
    // MERN Stack
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0 },
    { name: "Express.js", Icon: SiExpress, color: "#000000", delay: 0.1 },
    { name: "React", Icon: SiReact, color: "#61DAFB", delay: 0.2 },
    { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 0.3 },
    
    // Frontend
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", delay: 0.4 },
    { name: "HTML5", Icon: SiHtml5, color: "#E34F26", delay: 0.5 },
    { name: "CSS3", Icon: SiCss3, color: "#1572B6", delay: 0.6 },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", delay: 0.7 },
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000", delay: 0.8 },
    
    // Backend & Database
    { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", delay: 0.9 },
    { name: "REST API", Icon: TbApi, color: "#FF6C37", delay: 1.0 },
    { name: "JWT", Icon: SiJsonwebtokens, color: "#000000", delay: 1.1 },
    { name: "MySQL", Icon: SiMysql, color: "#4479A1", delay: 1.2 },
    
    // Tools & Platforms
    { name: "Git", Icon: SiGit, color: "#F05032", delay: 1.3 },
    { name: "GitHub", Icon: SiGithub, color: "#181717", delay: 1.4 },
    { name: "VS Code", Icon: VscCode, color: "#007ACC", delay: 1.5 },
    { name: "Figma", Icon: SiFigma, color: "#F24E1E", delay: 1.6 },
    { name: "Netlify", Icon: SiNetlify, color: "#00C7B7", delay: 1.7 },
    { name: "Vercel", Icon: SiVercel, color: "#000000", delay: 1.8 },
    { name: "Surge", Icon: TbBolt, color: "#00BFA5", delay: 1.9 },
    { name: "Cloud", Icon: SiCloudflare, color: "#F38020", delay: 2.0 },
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative min-h-screen bg-black text-white py-20 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
              <p className="text-purple-400 text-sm font-display tracking-[0.3em] uppercase">
                SKILLS & EXPERTISE
              </p>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg">
            Modern technologies I work with
          </p>
        </motion.div>

        {/* Floating Tech Icons with Animations */}
        <div className="relative min-h-[600px] flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {techStack.map((tech, index) => {
            // Unique scroll-based animation for each icon
            const yTransform = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              index % 2 === 0 ? [0, -30, 0] : [0, 30, 0]
            );

            return (
              <motion.div
                key={index}
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
                    
                    {/* Floating particles */}
                    <motion.div
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `2px solid ${tech.color}`,
                      }}
                    />
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
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
