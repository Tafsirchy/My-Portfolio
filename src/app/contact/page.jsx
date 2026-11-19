import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DedicatedContact from '@/components/DedicatedContact';
import Dock from '@/components/Dock';

export const metadata = {
  title: 'Contact & Connect',
  description:
    'Get in touch with Tafsir Chowdhury — Full-Stack Web Developer & Founder of BOONEC. Available for full-stack projects, SaaS development, contracts, and collaborations.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Connect | Tafsir Chowdhury',
    description:
      'Reach out directly via Email, WhatsApp, or message for engineering collaborations and opportunities.',
    url: '/contact',
  },
};

export default function ContactPage() {
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
              Get in Touch
            </h1>
          </div>
          <p className="text-base text-[#5A606E] dark:text-[#9CA3AF] max-w-2xl">
            Whether you have an upcoming project, a contract opportunity, or simply want to connect, feel free to reach out through any channel below.
          </p>
        </div>

        {/* Dedicated Channels & Form */}
        <DedicatedContact />

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
