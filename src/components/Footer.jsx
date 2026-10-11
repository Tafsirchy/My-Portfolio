import { ArrowUp, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { num: '01', label: 'About', href: '#about' },
    { num: '02', label: 'Skills', href: '#skills' },
    { num: '03', label: 'Projects', href: '#projects' },
    { num: '04', label: 'Education', href: '#education' },
    { num: '05', label: 'Experience', href: '#experience' },
    { num: '06', label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-14 sm:py-20 border-t border-zinc-300 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ── Top Statement: Giant Name & Brand Mark ── */}
        <div className="border-b border-zinc-300 pb-8 sm:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400 block mb-3">
              Colophon & Identity
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-zinc-900 uppercase leading-none">
              M. Tafsirul Islam Chowdhury
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 border border-zinc-900 hover:bg-zinc-900 hover:text-[#FFFFFF] transition-colors"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Editorial 4-Column Ledger ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Bio & Positioning */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              01 // Profile
            </p>
            <p className="text-sm font-bold text-zinc-900 font-serif leading-snug">
              Full-Stack Web Developer & Founder of BOONEC.
            </p>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Specialized in scalable React/Next.js architectures, modern backend APIs, and high-impact digital ventures.
            </p>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              02 // Index
            </p>
            <ul className="space-y-1.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 hover:text-zinc-950 transition-colors"
                  >
                    <span className="text-[9px] text-zinc-400 font-medium group-hover:text-zinc-900 transition-colors">
                      {item.num}.
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ventures & Platforms */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              03 // Networks
            </p>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-[0.18em]">
              <li>
                <a
                  href="https://boonec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>BOONEC.com (Studio)</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Tafsirchy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tafsirchy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/chy_tafsir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Status */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              04 // Coordinates
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Dhaka, Bangladesh
            </p>
            <p className="text-xs text-zinc-500 font-sans">
              Timezone: UTC+6 (BST)
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 border border-emerald-300 bg-emerald-50 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Engagements
              </span>
            </div>
          </div>

        </div>

        {/* ── Bottom Colophon Bar ── */}
        <div className="pt-8 border-t border-zinc-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <p>
            © {currentYear} M. Tafsirul Islam Chowdhury. All rights reserved.
          </p>
          <p className="text-zinc-500">
            Smart Simplistic Editorial System
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
