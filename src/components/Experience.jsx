import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experience } from '@/data/portfolio';

const elegantEase = [0.16, 1, 0.3, 1];

const Experience = () => {
  if (!experience || experience.length === 0) return null;

  // Separate BOONEC (own venture) from professional roles
  const boonec = experience.find((e) => e.company === 'BOONEC');
  const professional = experience
    .filter((e) => e.company !== 'BOONEC')
    .sort((a, b) => {
      if (a.duration.toLowerCase().includes('present')) return -1;
      if (b.duration.toLowerCase().includes('present')) return 1;
      return b.id - a.id;
    });

  const currentJob = professional[0];
  const pastJobs = professional.slice(1);

  return (
    <section
      id="experience"
      className="py-12 md:py-16 bg-[#FFFFFF] border-t border-zinc-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: elegantEase }}
          className="mb-8 border-b border-zinc-300 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase leading-none">
            Experience
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:pb-2">
            Professional Track Record
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════
            BOONEC — OWN VENTURE (separate, distinct)
        ════════════════════════════════════════════ */}
        {boonec && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: elegantEase }}
            className="mb-8 border border-zinc-300 group hover:border-zinc-500 transition-colors duration-500"
          >
            {/* Venture label strip */}
            <div className="border-b border-zinc-300 px-6 sm:px-8 py-2 flex items-center justify-between bg-zinc-100">
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">
                Own Venture — Founder
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Est. {boonec.duration}
              </span>
            </div>

            <div className="p-5 sm:p-6 grid sm:grid-cols-12 gap-5 sm:gap-8 items-center">
              {/* BOONEC Logo */}
              <div className="sm:col-span-4 flex flex-col gap-3">
                <img
                  src="/assets/BOONEC_logo_modern.png"
                  alt="BOONEC"
                  className="w-60 sm:w-72 object-contain"
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 font-sans">
                  {boonec.position}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block sm:col-span-1 h-full">
                <div className="w-px h-full bg-zinc-200 mx-auto" />
              </div>
              <div className="sm:hidden border-t border-zinc-200" />

              {/* Right: description + achievements */}
              <div className="sm:col-span-7 space-y-4">
                <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                  {boonec.description}
                </p>
                {boonec.achievements && (
                  <div className="space-y-2 pt-2">
                    {boonec.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                        <p className="text-xs text-zinc-500 leading-relaxed font-sans">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-2">
                  <a
                    href="https://boonec.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-900 border-b border-zinc-400 pb-0.5 hover:border-zinc-900 transition-colors duration-300"
                  >
                    boonec.com <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Professional Roles label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-3"
        >
          Professional Roles
        </motion.p>

        {/* ════════════════════════════════════════════
            CURRENT JOB — inverted dark featured card
        ════════════════════════════════════════════ */}
        {currentJob && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: elegantEase }}
            className="relative bg-zinc-900 text-[#FFFFFF] overflow-hidden mb-6 group"
          >
            {/* Decorative ghost letter */}
            <span
              className="pointer-events-none absolute -right-4 -bottom-8 text-[10rem] sm:text-[14rem] font-serif font-bold text-white/[0.04] leading-none select-none"
              aria-hidden="true"
            >
              {currentJob.company.charAt(0)}
            </span>

            <div className="relative z-10 p-6 sm:p-8 grid sm:grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="sm:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current Role
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-[#FFFFFF] leading-tight tracking-tight">
                    {currentJob.position}
                  </h3>
                  <p className="text-sm font-semibold text-white/50 mt-2 font-sans uppercase tracking-widest">
                    {currentJob.company}
                  </p>
                </div>

                <p className="text-sm text-white/60 leading-relaxed font-sans max-w-lg">
                  {currentJob.description}
                </p>

                {currentJob.achievements && (
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    {currentJob.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-white/30 shrink-0" />
                        <p className="text-sm text-white/70 leading-relaxed font-sans">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:col-span-4 flex sm:flex-col sm:items-end gap-6 sm:gap-4">
                <div className="sm:text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-1">Duration</p>
                  <p className="text-xs font-bold text-[#FFFFFF] font-sans leading-snug">{currentJob.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════
            PAST JOBS — compact grid
        ════════════════════════════════════════════ */}
        {pastJobs.length > 0 && (
          <div className={`grid gap-px bg-zinc-300 ${pastJobs.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
            {pastJobs.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1, ease: elegantEase, delay: index * 0.12 }}
                className="bg-[#FFFFFF] p-6 sm:p-8 flex flex-col gap-4 group hover:bg-zinc-100 transition-colors duration-400"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-zinc-500 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 text-right">
                    {exp.duration}
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-serif text-zinc-900 leading-snug tracking-tight mb-1">
                    {exp.position}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-sans">
                    {exp.company}
                  </p>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{exp.description}</p>

                {exp.achievements?.[0] && (
                  <div className="pt-3 border-t border-zinc-200 flex items-start gap-2">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">{exp.achievements[0]}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: elegantEase, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-zinc-300 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Roles', value: `${professional.length} Positions` },
            { label: 'Currently At', value: 'Smart Youth ICT' },
            { label: 'Own Venture', value: 'BOONEC' },
            { label: 'Core Stack', value: 'Next.js · Node · MongoDB' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">{label}</p>
              <p className="text-sm font-bold text-zinc-900 font-serif">{value}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;
