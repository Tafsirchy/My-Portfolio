import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { projects } from '@/data/portfolio';
import ProjectsShowcaseModal from './ProjectsShowcaseModal';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'next', label: 'Next.js & React' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'fullstack', label: 'Full-Stack MERN' },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const elegantEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: elegantEase },
    },
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    if (selectedCategory === 'next') {
      return projects.filter(p => 
        p.technologies.some(t => t.toLowerCase().includes('next') || t.toLowerCase().includes('react'))
      );
    }
    if (selectedCategory === 'ecommerce') {
      return projects.filter(p => 
        p.title.toLowerCase().includes('commerce') || 
        p.title.toLowerCase().includes('bakery') ||
        p.description.toLowerCase().includes('e-commerce') ||
        p.description.toLowerCase().includes('real estate') ||
        p.technologies.some(t => t.toLowerCase().includes('stripe'))
      );
    }
    if (selectedCategory === 'fullstack') {
      return projects.filter(p => 
        p.technologies.some(t => 
          t.toLowerCase().includes('mongo') || 
          t.toLowerCase().includes('express') || 
          t.toLowerCase().includes('node') ||
          t.toLowerCase().includes('firebase')
        )
      );
    }
    return projects;
  }, [selectedCategory]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-zinc-300 bg-[#F9F6F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-zinc-900 uppercase leading-none mb-6">
            Selected Works
          </h2>
          <div className="w-12 h-[1px] bg-zinc-900 mb-6 transform transition-transform duration-1000 ease-out hover:scale-x-150"></div>
          <p className="text-sm text-zinc-600 leading-relaxed font-sans max-w-lg">
            A curated showcase of digital products, combining strategic design with flawless technical execution.
          </p>
        </motion.div>

        {/* Minimalist Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: elegantEase }}
          className="flex flex-wrap justify-center gap-8 mb-16 md:mb-24"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors duration-500 pb-2 ${
                selectedCategory === cat.id ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {cat.label}
              {selectedCategory === cat.id && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          key={`${selectedCategory}-${showAll}`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-y-24"
        >
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group flex flex-col cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden mb-6 bg-zinc-100">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x500/f4f4f5/71717a?text=" + encodeURIComponent(project.title);
                  }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Centered Hover Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                  <span className="px-6 py-3 bg-[#F9F6F0] text-zinc-900 text-xs font-semibold uppercase tracking-widest rounded-full shadow-xl">
                    View Project
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3 px-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-serif text-zinc-900 leading-tight group-hover:text-zinc-600 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </div>
                
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Typography-driven Tech Stack */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button — shown only before expand */}
        {!showAll && filteredProjects.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: elegantEase }}
            className="flex justify-center mt-20"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors duration-500"
            >
              <span className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
              See More · {filteredProjects.length - 4} more projects
              <span className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
            </button>
          </motion.div>
        )}

        {/* See Less — only appears at very bottom after projects are expanded */}
        {showAll && filteredProjects.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: elegantEase }}
            className="flex justify-center mt-20"
          >
            <button
              onClick={() => setShowAll(false)}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-700 transition-colors duration-500"
            >
              <span className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
              See Less
              <span className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
            </button>
          </motion.div>
        )}
      </div>

      <ProjectsShowcaseModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
