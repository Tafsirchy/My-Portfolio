import { motion } from 'framer-motion';
import { ArrowUp, Terminal } from 'lucide-react';
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
    <footer className="relative bg-background text-slate-900 py-12 border-t border-black/5 font-mono">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col items-center justify-center text-center space-y-6">
        
        {/* System Name */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-neon-navy">
             <Terminal className="w-5 h-5" />
             <span className="font-bold tracking-widest uppercase text-lg">System.Core</span>
          </div>
          <span className="text-[10px] text-slate-500 tracking-[0.3em] uppercase font-bold">
            User: {personalInfo.name.toUpperCase()}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>

        {/* Info */}
        <div className="space-y-2">
          <p className="text-[10px] text-slate-500 tracking-widest uppercase font-bold">
            © {currentYear} // All_Systems_Nominal
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-[10px] text-neon-olive hover:text-slate-900 transition-colors tracking-widest block uppercase font-bold"
          >
            {personalInfo.email}
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="mt-4 px-6 py-3 border border-black/10 hover:border-neon-navy text-slate-500 hover:text-neon-navy bg-slate-50 transition-all duration-300 flex items-center gap-3 group uppercase text-[10px] tracking-widest font-bold shadow-sm"
        >
          <span>Initiate_Reboot</span>
          <ArrowUp className="h-3 w-3 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
