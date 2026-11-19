import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { getAllProjects } from '@/data/portfolio';
import Dock from '@/components/Dock';

export const metadata = {
  title: 'All Projects & Case Studies',
  description:
    'Comprehensive showcase of full-stack web applications, e-commerce platforms, and SaaS products built by Tafsir Chowdhury.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'All Projects & Case Studies | Tafsir Chowdhury',
    description:
      'Explore full-stack web applications, Next.js platforms, and scalable products engineered with modern tech stacks.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F1117] text-[#181A20] dark:text-[#F3F4F6] font-sans selection:bg-[#4F46E5] selection:text-white transition-colors duration-200">
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-20 space-y-8 sm:space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] dark:text-[#6366F1] hover:text-[#4338CA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]">
              All Projects &amp; Case Studies
            </h1>
          </div>
          <p className="text-base text-[#5A606E] dark:text-[#9CA3AF] max-w-2xl">
            A comprehensive list of full-stack applications, client solutions, and digital products I&apos;ve designed and engineered.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {allProjects.map((project) => (
            <div
              key={project.slug || project.id}
              className="group flex flex-col justify-between bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 hover:border-[#4F46E5]/40 dark:hover:border-[#6366F1]/40 rounded-2xl overflow-hidden transition-all duration-300 p-5 shadow-xs hover:shadow-lg hover:shadow-[#181A20]/5"
            >
              <div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#FAF9F6] dark:bg-[#0F1117] border border-[rgba(24,26,32,0.07)] dark:border-white/10 mb-4 shadow-inner"
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#E06D53] dark:bg-[#F59E0B] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </div>
                  )}
                </Link>

                <div className="space-y-2 mb-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-lg font-bold text-[#181A20] dark:text-[#F3F4F6] group-hover:text-[#4F46E5] dark:group-hover:text-[#6366F1] transition-colors"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#5A606E] dark:text-[#9CA3AF] group-hover:text-[#4F46E5] dark:group-hover:text-[#6366F1] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <p className="text-sm text-[#5A606E] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-xs font-semibold bg-[#FAF9F6] dark:bg-[#0F1117] text-[#181A20] dark:text-[#F3F4F6] rounded-md border border-[rgba(24,26,32,0.07)] dark:border-white/10 shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-0.5 text-xs font-medium text-[#5A606E] dark:text-[#9CA3AF]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3.5 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10 text-sm font-medium">
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
                      className="p-2 rounded-lg text-[#5A606E] dark:text-[#9CA3AF] hover:text-[#181A20] dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#0F1117] transition-colors"
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
                      className="p-2 rounded-lg text-[#5A606E] dark:text-[#9CA3AF] hover:text-[#E06D53] dark:hover:text-[#F59E0B] hover:bg-[#FAF9F6] dark:hover:bg-[#0F1117] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Footer */}
        <footer className="pt-10 pb-24 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10 text-center text-sm text-[#5A606E] dark:text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} Tafsir Chowdhury. All rights reserved.</p>
        </footer>
      </main>

      <Dock />
    </div>
  );
}
