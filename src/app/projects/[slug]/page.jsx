import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, Code2, Sparkles, ArrowRight } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/data/portfolio';
import Dock from '@/components/Dock';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} — Case Study & Architecture`;
  const description = project.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Built by Tafsir Chowdhury`,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: project.images[0] || '/assets/HeroProfile.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Tafsir Chowdhury`,
      description,
      images: [project.images[0] || '/assets/HeroProfile.png'],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    author: {
      '@type': 'Person',
      name: 'Tafsir Chowdhury',
      url: 'https://tafsirchy.vercel.app',
    },
    url: project.liveUrl || `https://tafsirchy.vercel.app/projects/${project.slug}`,
    keywords: project.technologies.join(', '),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F1117] text-[#181A20] dark:text-[#F3F4F6] font-sans selection:bg-[#4F46E5] selection:text-white transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-20 space-y-8 sm:space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-sm font-semibold text-[#5A606E] dark:text-[#9CA3AF]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#4F46E5] dark:text-[#6366F1] hover:text-[#4338CA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <Link href="/" className="text-[#5A606E] dark:text-[#9CA3AF] hover:text-[#181A20] dark:hover:text-white transition-colors">
            Home
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-[#4F46E5]/10 dark:bg-[#6366F1]/10 text-[#4F46E5] dark:text-[#6366F1] text-xs font-bold rounded-full border border-[#4F46E5]/20 dark:border-[#6366F1]/20">
              Case Study
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-[#E06D53] dark:bg-[#F59E0B] text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181A20] dark:text-[#F3F4F6]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5A606E] dark:text-[#9CA3AF] leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold shadow-md shadow-[#4F46E5]/20 transition-all hover:scale-105"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(24,26,32,0.1)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#181B24] hover:bg-[#F1EFEA] dark:hover:bg-[#222632] text-[#181A20] dark:text-[#F3F4F6] text-sm font-semibold transition-colors shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>Frontend Repo</span>
              </a>
            )}
            {project.githubServerUrl && (
              <a
                href={project.githubServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(24,26,32,0.1)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#181B24] hover:bg-[#F1EFEA] dark:hover:bg-[#222632] text-[#181A20] dark:text-[#F3F4F6] text-sm font-semibold transition-colors shadow-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>Backend Repo</span>
              </a>
            )}
          </div>
        </header>

        {/* Media Preview - Full Original Colors */}
        {project.images && project.images[0] && (
          <section className="overflow-hidden rounded-2xl border border-[rgba(24,26,32,0.08)] shadow-lg bg-white">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={project.images[0]}
                alt={`${project.title} preview screenshot`}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A606E] dark:text-[#9CA3AF]">
              Technologies &amp; Architecture
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 bg-[#F1EFEA] dark:bg-[#181B24] text-[#181A20] dark:text-[#F3F4F6] text-xs sm:text-sm font-semibold rounded-lg border border-[rgba(24,26,32,0.07)] dark:border-white/10 shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Engineering Challenges & Solutions in Soft Stone Bento Cards */}
        {(project.challenges || project.futurePlans) && (
          <section className="space-y-6 pt-4 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10">
            {project.challenges && (
              <div className="p-6 rounded-2xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 space-y-2">
                <h3 className="text-lg font-bold text-[#181A20] dark:text-[#F3F4F6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
                  Engineering Challenges &amp; Architectural Solutions
                </h3>
                <p className="text-sm sm:text-base text-[#5A606E] dark:text-[#9CA3AF] leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.futurePlans && (
              <div className="p-6 rounded-2xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 space-y-2">
                <h3 className="text-lg font-bold text-[#181A20] dark:text-[#F3F4F6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E06D53] dark:bg-[#F59E0B]" />
                  Planned Roadmap &amp; Future Enhancements
                </h3>
                <p className="text-sm sm:text-base text-[#5A606E] dark:text-[#9CA3AF] leading-relaxed">
                  {project.futurePlans}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Internal Linking for Related Projects */}
        <nav aria-label="Next and previous projects" className="grid grid-cols-2 gap-4 pt-6 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-4 rounded-xl border border-[rgba(24,26,32,0.07)] dark:border-white/10 bg-[#F1EFEA] dark:bg-[#181B24] hover:bg-[#E8E5DD] dark:hover:bg-[#222632] hover:border-[#4F46E5]/40 dark:hover:border-[#6366F1]/40 transition-all flex flex-col gap-1 shadow-xs"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F46E5] dark:text-[#6366F1]">
                ← Previous Project
              </span>
              <span className="text-sm sm:text-base font-bold text-[#181A20] dark:text-[#F3F4F6] truncate">
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-4 rounded-xl border border-[rgba(24,26,32,0.07)] dark:border-white/10 bg-[#F1EFEA] dark:bg-[#181B24] hover:bg-[#E8E5DD] dark:hover:bg-[#222632] hover:border-[#4F46E5]/40 dark:hover:border-[#6366F1]/40 transition-all flex flex-col gap-1 text-right ml-auto w-full shadow-xs"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F46E5] dark:text-[#6366F1]">
                Next Project →
              </span>
              <span className="text-sm sm:text-base font-bold text-[#181A20] dark:text-[#F3F4F6] truncate">
                {nextProject.title}
              </span>
            </Link>
          )}
        </nav>

        {/* Minimal Footer */}
        <footer className="pt-10 pb-24 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10 text-center text-sm text-[#5A606E] dark:text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} Tafsir Chowdhury. All rights reserved.</p>
        </footer>
      </main>

      {/* Floating Bottom Dock */}
      <Dock />
    </div>
  );
}
