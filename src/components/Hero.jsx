import { motion } from 'framer-motion';
import { ArrowDown, FileDown, Github, Linkedin, Twitter, Mail, ArrowUpRight, MapPin, Sparkles, Code2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo, socialLinks } from '@/data/portfolio';

const Hero = () => {
  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Full-Stack Web Developer & Founder</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1]">
                Building high-performance, thoughtful web applications.
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl">
                I'm <span className="text-zinc-950 font-semibold">{personalInfo.name}</span>, a full-stack engineer and Founder of{' '}
                <a
                  href="https://boonec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 transition-colors inline-flex items-center gap-0.5"
                >
                  BOONEC
                  <ArrowUpRight className="w-3.5 h-3.5 inline" />
                </a>
                . I build robust digital platforms, scalable architectures, and refined interfaces using React, Next.js, and Node.js.
              </p>
            </div>

            {/* Quick Metrics / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full py-2">
              <div className="p-3 bg-white border border-zinc-200/80 rounded-lg shadow-xs">
                <p className="text-xs text-zinc-500 font-medium">Core Stack</p>
                <p className="text-sm font-semibold text-zinc-900 mt-0.5">Next.js, React, Node</p>
              </div>
              <div className="p-3 bg-white border border-zinc-200/80 rounded-lg shadow-xs">
                <p className="text-xs text-zinc-500 font-medium">Leadership</p>
                <p className="text-sm font-semibold text-zinc-900 mt-0.5">Founder @ BOONEC</p>
              </div>
              <div className="p-3 bg-white border border-zinc-200/80 rounded-lg shadow-xs col-span-2 sm:col-span-1">
                <p className="text-xs text-zinc-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-zinc-900 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  Dhaka (UTC+6)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all shadow-sm active:scale-95"
              >
                View Selected Works
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200/90 rounded-lg transition-all shadow-xs active:scale-95"
              >
                <FileDown className="w-4 h-4 text-zinc-600" />
                Download Resume
              </a>

              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                Contact Me
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Proof & Direct Channels */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-200/70 w-full">
              <span className="text-xs font-medium text-zinc-500">Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Tafsirchy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tafsirchy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/chy_tafsir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-600 hover:text-emerald-600 hover:bg-zinc-100 rounded-md transition-colors"
                  aria-label="WhatsApp Contact"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-colors"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right / Visual Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Clean frame */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-zinc-200/90 shadow-elevated p-2">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-zinc-100">
                  <img
                    src="/assets/HeroProfile.png"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.03] hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/assets/About.png";
                    }}
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900/60 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-semibold tracking-tight">{personalInfo.name}</p>
                      <p className="text-zinc-200 text-xs font-normal">Full-Stack Engineer & Builder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimalist floating credentials card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-xl p-3.5 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Modern Web Specialist</p>
                  <p className="text-[11px] text-zinc-500 font-medium">React · Next.js · Node · Cloud</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
