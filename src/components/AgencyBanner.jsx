import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';

const elegantEase = [0.16, 1, 0.3, 1];

const AgencyBanner = () => {
  return (
    <section className="py-16 md:py-24 border-t border-zinc-300 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: elegantEase }}
          className="flex flex-wrap items-center justify-between border-b border-zinc-300 pb-4 mb-10 sm:mb-16 gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
            Agency & Venture
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Active</span>
          </div>
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Giant Logo & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: elegantEase }}
            className="lg:col-span-7"
          >
            <ResponsiveImage
              src="/assets/BOONEC_logo_modern.png"
              alt="BOONEC Logo"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
              loading="lazy"
              decoding="async"
              className="w-64 sm:w-80 lg:w-96 object-contain mb-8 mix-blend-multiply"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-900 leading-[1.15] tracking-tight">
              Engineering scalable platforms & refined digital products for ambitious brands.
            </h2>
          </motion.div>

          {/* Right: Narrative, Stats & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: elegantEase, delay: 0.1 }}
            className="lg:col-span-5 space-y-8 lg:pt-4"
          >
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              Beyond individual engineering, I operate BOONEC—a specialized digital engineering studio. We partner with founders and industry leaders worldwide to architect custom SaaS solutions, full-stack web applications, and enterprise-grade systems with museum-quality aesthetics.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-8 border-t border-zinc-300">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Focus</p>
                <p className="text-sm font-bold text-zinc-900 font-serif">Full-Cycle Engineering</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Standard</p>
                <p className="text-sm font-bold text-zinc-900 font-serif">Production Grade</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Capacity</p>
                <p className="text-sm font-bold text-zinc-900 font-serif">Dedicated Teams</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Founder</p>
                <p className="text-sm font-bold text-zinc-900 font-serif">Tafsir Chowdhury</p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://boonec.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#FFFFFF] bg-zinc-900 overflow-hidden w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 w-full h-full bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Visit boonec.com
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-900 border border-zinc-900 bg-transparent w-full sm:w-auto transition-colors hover:bg-zinc-900 hover:text-[#FFFFFF]"
              >
                Discuss a Project
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AgencyBanner;
