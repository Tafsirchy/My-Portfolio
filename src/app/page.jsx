import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Dock from '@/components/Dock';
import { personalInfo } from '@/data/portfolio';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F1117] text-[#181A20] dark:text-[#F3F4F6] font-sans selection:bg-[#4F46E5] selection:text-white transition-colors duration-200">
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-20 space-y-12 sm:space-y-20">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />

        {/* Contact Section Concept */}
        <section id="contact" className="pt-6 pb-28 sm:pb-32 text-center flex flex-col items-center justify-center space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#181A20] dark:bg-white text-[#FAF9F6] dark:text-[#181A20] text-xs font-semibold shadow-xs">
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-[#5A606E] dark:text-[#9CA3AF] max-w-lg leading-relaxed">
            You can email me at{' '}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[#4F46E5] dark:text-[#6366F1] font-medium hover:underline transition-colors"
            >
              {personalInfo.email}
            </a>{' '}
            and I&apos;ll respond promptly.
          </p>
        </section>
      </main>

      {/* Floating Bottom Dock Navigation */}
      <Dock />
    </div>
  );
}
