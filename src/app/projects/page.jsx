import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Projects & Case Studies',
  description:
    'Comprehensive showcase of full-stack web applications, e-commerce platforms, and SaaS products built by Tafsir Chowdhury using Next.js, React, Node.js, and MongoDB.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies | Tafsir Chowdhury',
    description:
      'Explore full-stack web applications, Next.js platforms, and scalable products engineered with modern tech stacks.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-zinc-900 font-sans">
      <Navbar />
      <main id="main-content" className="pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
