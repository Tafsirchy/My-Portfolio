'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { projects } from '@/data/portfolio';

export default function Projects() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <section id="projects" className="space-y-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold tracking-tight text-[#181A20]"
          >
            Featured Projects
          </motion.h2>
        </div>
        <p className="text-sm sm:text-base text-[#5A606E]">
          Selected full-stack web applications, e-commerce platforms, and SaaS products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.slug || project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group flex flex-col justify-between bg-[#F1EFEA] border border-[rgba(24,26,32,0.07)] hover:border-[#4F46E5]/40 rounded-2xl overflow-hidden transition-all duration-300 p-5 shadow-xs hover:shadow-lg hover:shadow-[#181A20]/5"
          >
            <div>
              {/* Media Preview in full original color */}
              <Link
                href={`/projects/${project.slug}`}
                className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#FAF9F6] border border-[rgba(24,26,32,0.07)] mb-4 shadow-inner"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {project.featured && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#E06D53] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </div>
                )}
              </Link>

              {/* Title & Description */}
              <div className="space-y-2 mb-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-lg font-bold text-[#181A20] group-hover:text-[#4F46E5] transition-colors"
                >
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#5A606E] group-hover:text-[#4F46E5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <p className="text-sm text-[#5A606E] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies Badges in Warm Alabaster */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs font-semibold bg-[#FAF9F6] text-[#181A20] rounded-md border border-[rgba(24,26,32,0.07)] shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2.5 py-0.5 text-xs font-medium text-[#5A606E]">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3.5 border-t border-[rgba(24,26,32,0.07)] text-sm font-medium">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all shadow-xs hover:shadow"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Source code for ${project.title}`}
                    className="p-2 rounded-lg text-[#5A606E] hover:text-[#181A20] hover:bg-[#FAF9F6] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    className="p-2 rounded-lg text-[#5A606E] hover:text-[#E06D53] hover:bg-[#FAF9F6] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="pt-4 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#181A20] text-[#FAF9F6] hover:bg-[#4F46E5] shadow-md transition-all hover:scale-105"
        >
          View All {projects.length} Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
