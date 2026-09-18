import { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Code2, Layers, Info } from 'lucide-react';
import { projects } from '@/data/portfolio';
import ProjectsShowcaseModal from './ProjectsShowcaseModal';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'next', label: 'Next.js & React' },
  { id: 'ecommerce', label: 'E-Commerce & SaaS' },
  { id: 'fullstack', label: 'Full-Stack MERN' },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Selected Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Handcrafted web applications, SaaS platforms & architectures.
            </h2>
            <p className="text-sm text-zinc-600">
              Each project demonstrates real-world technical execution, responsive UI craft, and scalable backend integrations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200/60 self-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-white border border-zinc-200/90 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-elevated transition-all duration-300"
            >
              {/* Project Image Preview */}
              <div 
                onClick={() => setSelectedProject(project)}
                className="relative aspect-[16/10] overflow-hidden bg-zinc-100 cursor-pointer border-b border-zinc-100"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x500/f4f4f5/71717a?text=" + encodeURIComponent(project.title);
                  }}
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-900/90 backdrop-blur-xs text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick inspect prompt on hover */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 text-zinc-900 text-xs font-medium shadow-sm inline-flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    View Case Study
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                
                <div className="space-y-2">
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold text-zinc-950 tracking-tight cursor-pointer hover:text-zinc-600 transition-colors flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0" />
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-2 border-t border-zinc-100">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-medium text-zinc-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100/80">
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                        >
                          Live Demo
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors ml-2"
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      Details →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Case Details Modal */}
      <ProjectsShowcaseModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
