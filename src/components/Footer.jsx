import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 border-t border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-zinc-950 tracking-tight">
              {personalInfo.name}
            </span>
            <p className="text-xs text-zinc-500 mt-0.5">
              Full-Stack Web Developer & Founder of BOONEC
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 font-medium">
            <a href="#about" className="hover:text-zinc-950 transition-colors">About</a>
            <a href="#experience" className="hover:text-zinc-950 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-zinc-950 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-zinc-950 transition-colors">Skills</a>
            <a href="#education" className="hover:text-zinc-950 transition-colors">Education</a>
            <a href="#contact" className="hover:text-zinc-950 transition-colors">Contact</a>
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-100" />

        {/* Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            © {currentYear} Tafsir Chowdhury. Designed with minimalism & clarity.
          </p>

          <div className="flex items-center gap-4 text-zinc-500">
            <a
              href="https://github.com/Tafsirchy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/tafsirchy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-zinc-900 transition-colors"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
