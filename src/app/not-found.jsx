import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-zinc-900 font-sans flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">
          Error 404
        </span>
        <h1 className="text-5xl sm:text-7xl font-serif text-zinc-900 mb-6">
          Page Not Found
        </h1>
        <p className="text-zinc-600 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved. Explore our latest projects or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-[#FFFFFF] text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
