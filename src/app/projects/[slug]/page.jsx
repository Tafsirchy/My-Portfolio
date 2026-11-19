import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllProjects, getProjectBySlug } from '@/data/portfolio';

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
          url: project.images[0] || '/assets/About.png',
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
      images: [project.images[0] || '/assets/About.png'],
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
      url: 'https://tafsirchy.com',
    },
    url: project.liveUrl || `https://tafsirchy.com/projects/${project.slug}`,
    keywords: project.technologies.join(', '),
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Navbar />

      <main id="main-content" className="pt-8 md:pt-14 pb-20">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-zinc-900 transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-zinc-900 truncate">{project.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-zinc-200">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-zinc-100 text-zinc-900 text-[11px] font-bold uppercase tracking-widest rounded-full">
                Case Study
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-zinc-900 tracking-tight leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-sans max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 text-[#FFFFFF] text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  Visit Live Application
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Frontend Repository
                </a>
              )}
              {project.githubServerUrl && (
                <a
                  href={project.githubServerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-zinc-300 text-zinc-700 text-xs font-bold uppercase tracking-widest hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  Backend Repository
                </a>
              )}
            </div>
          </header>

          {/* Project Media Showcase */}
          {project.images && project.images[0] && (
            <section className="mb-14 overflow-hidden border border-zinc-200 shadow-xl bg-zinc-50">
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

          {/* Tech Stack Grid */}
          <section className="mb-14 pb-12 border-b border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Technologies & Frameworks
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-md border border-zinc-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture & Engineering Deep-Dive */}
          <section className="grid md:grid-cols-2 gap-10 mb-16 pb-12 border-b border-zinc-200">
            {project.challenges && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-zinc-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                  Engineering Challenges & Solutions
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.futurePlans && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-zinc-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                  Future Roadmap & Scalability
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {project.futurePlans}
                </p>
              </div>
            )}
          </section>

          {/* Next / Previous Internal Linking for SEO */}
          <nav aria-label="Related projects" className="grid sm:grid-cols-2 gap-6 pt-4">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-6 border border-zinc-200 hover:border-zinc-900 transition-colors flex flex-col gap-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  ← Previous Project
                </span>
                <span className="text-lg font-serif text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-6 border border-zinc-200 hover:border-zinc-900 transition-colors flex flex-col gap-1 sm:text-right"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Next Project →
                </span>
                <span className="text-lg font-serif text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
}
