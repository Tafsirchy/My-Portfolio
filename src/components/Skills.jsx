import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs,
  SiFirebase, SiJsonwebtokens, SiMysql, SiPostgresql, SiPrisma, SiRedis,
  SiGit, SiGithub, SiFigma, SiVercel, SiNetlify, SiPostman, SiNestjs,
  SiC, SiCplusplus, SiPython
} from 'react-icons/si';
import { Layers, Server, Database, Wrench, Code2 } from 'lucide-react';

const skillCategories = [
  {
    title: 'Core Languages',
    icon: Code2,
    description: 'Foundational programming and scripting languages.',
    skills: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572b6' },
      { name: 'C / C++', icon: SiCplusplus, color: '#00599c' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
    ],
  },
  {
    title: 'Frontend Engineering',
    icon: Layers,
    description: 'Modern frameworks, styling architectures, and state engines.',
    skills: [
      { name: 'React 19', icon: SiReact, color: '#61dafb' },
      { name: 'Next.js 16 (App Router)', icon: SiNextdotjs, color: '#000000' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      { name: 'Component Systems', icon: SiReact, color: '#61dafb' },
      { name: 'Zustand State Management', icon: SiJavascript, color: '#854d0e' },
      { name: 'Responsive Web Design', icon: SiCss3, color: '#1572b6' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    description: 'Server architecture, RESTful services, and authorization.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'NestJS', icon: SiNestjs, color: '#ea2845' },
      { name: 'RESTful API Design', icon: SiNodedotjs, color: '#339933' },
      { name: 'JWT & OAuth Authentication', icon: SiJsonwebtokens, color: '#000000' },
      { name: 'Stripe Payment Gateway', icon: SiJavascript, color: '#6366f1' },
    ],
  },
  {
    title: 'Databases & Storage',
    icon: Database,
    description: 'Relational & document stores, caching, and ORMs.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#2d3748' },
      { name: 'Redis (Caching)', icon: SiRedis, color: '#dc382d' },
      { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
    ],
  },
  {
    title: 'DevOps, Tools & Workflow',
    icon: Wrench,
    description: 'Version control, cloud deployment, and developer tooling.',
    skills: [
      { name: 'Git & GitHub', icon: SiGithub, color: '#181717' },
      { name: 'Vercel Deployment', icon: SiVercel, color: '#000000' },
      { name: 'Netlify', icon: SiNetlify, color: '#00c7b7' },
      { name: 'Postman (API Testing)', icon: SiPostman, color: '#ff6c37' },
      { name: 'Figma to Code', icon: SiFigma, color: '#f24e1e' },
      { name: 'Linux & Monorepos', icon: SiGit, color: '#f05032' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28 border-t border-zinc-200/80 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Technical Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Engineered with a versatile, production-proven stack.
          </h2>
          <p className="text-sm text-zinc-600">
            A comprehensive overview of the programming languages, frameworks, databases, and tooling I use daily.
          </p>
        </div>

        {/* Categories Matrix */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;

            return (
              <div
                key={idx}
                className="p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs hover:border-zinc-300 hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                    {category.skills.map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/50 transition-colors"
                        >
                          <SkillIcon className="w-4 h-4 text-zinc-600 shrink-0" />
                          <span className="text-xs font-medium text-zinc-800 truncate">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
