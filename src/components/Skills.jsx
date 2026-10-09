import { motion } from 'framer-motion';
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs,
  SiFirebase, SiJsonwebtokens, SiMysql, SiPostgresql, SiPrisma, SiRedis,
  SiGit, SiGithub, SiFigma, SiVercel, SiNetlify, SiPostman, SiNestjs,
  SiC, SiCplusplus, SiPython
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Core Languages',
    description: 'Foundational programming and scripting languages.',
    skills: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'C / C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Modern frameworks, styling architectures, and state engines.',
    skills: [
      { name: 'React 19', icon: SiReact },
      { name: 'Next.js 16', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Figma', icon: SiFigma },
    ],
  },
  {
    title: 'Backend & APIs',
    description: 'Server architecture, RESTful services, and authorization.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'RESTful API', icon: SiNodedotjs },
      { name: 'JWT & OAuth', icon: SiJsonwebtokens },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Relational & document stores, caching, and ORMs.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Prisma ORM', icon: SiPrisma },
      { name: 'Redis', icon: SiRedis },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    title: 'DevOps & Tooling',
    description: 'Version control, cloud deployment, and developer tooling.',
    skills: [
      { name: 'Git & GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
      { name: 'Postman', icon: SiPostman },
      { name: 'Linux', icon: SiGit },
    ],
  },
];

const Skills = () => {
  const elegantEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: elegantEase },
    },
  };

  return (
    <section id="skills" className="py-8 md:py-12 bg-transparent text-zinc-900 border-t border-zinc-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-8 md:gap-12 items-center w-full">
          
          {/* Top: Centered Title */}
          <div className="w-full flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-zinc-900 uppercase leading-none mb-4">
                Expertise
              </h2>
              <div className="w-12 h-[1px] bg-zinc-900 mb-4 transform transition-transform duration-1000 ease-out hover:scale-x-150"></div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans max-w-lg">
                A curated stack of tools and frameworks, focused on delivering scalable, high-performance, and meticulously crafted digital experiences.
              </p>
            </motion.div>
          </div>

          {/* Bottom: Categories */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
            {skillCategories.map((category, idx) => {
              return (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                  className="w-full flex flex-col"
                >
                  {/* Category Header */}
                  <motion.div variants={itemVariants} className="flex flex-col border-b border-zinc-900 pb-3 mb-2 gap-1">
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-bold font-sans text-zinc-400">0{idx + 1}</span>
                      <h3 className="text-2xl font-serif text-zinc-900">{category.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 font-sans">
                      {category.description}
                    </p>
                  </motion.div>
                  
                  {/* Skills List (Typography Driven) */}
                  <div className="flex flex-col w-full">
                    {category.skills.map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <motion.div 
                          key={sIdx}
                          variants={itemVariants}
                          className="group flex items-center justify-between py-3 border-b border-zinc-200 hover:border-zinc-900 transition-colors duration-500 cursor-default"
                        >
                          <span className="text-lg md:text-xl font-sans text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-2 transition-all duration-500">
                            {skill.name}
                          </span>
                          <SkillIcon className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 transition-all duration-500 transform group-hover:scale-110" />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;
