'use client';
import { motion } from 'framer-motion';
import { Briefcase, Building2, Code2, Rocket, ExternalLink } from 'lucide-react';
import { experience } from '@/data/portfolio';

const companyIcons = {
  'BOONEC': Rocket,
  'Smart Youth ICT': Building2,
  'Shwapner Thikana LTD': Building2,
  'University Project': Code2,
};

export default function Experience() {
  return (
    <section id="experience" className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]"
        >
          Work Experience
        </motion.h2>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx) => {
          const Icon = companyIcons[exp.company] || Briefcase;

          return (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 hover:border-[#4F46E5]/30 dark:hover:border-[#6366F1]/30 hover:bg-[#E8E5DD] dark:hover:bg-[#222632] shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
            >
              {/* Left: Logo & Company Info */}
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white dark:bg-[#0F1117] border border-[rgba(24,26,32,0.07)] dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform overflow-hidden p-2"
                  aria-label={`${exp.company} website`}
                >
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon className="w-5 h-5 text-[#181A20] dark:text-[#F3F4F6]" />
                  )}
                </a>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#181A20] dark:text-[#F3F4F6] leading-snug hover:text-[#4F46E5] dark:hover:text-[#6366F1] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{exp.company}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5A606E] dark:text-[#9CA3AF] opacity-60 group-hover:opacity-100 group-hover:text-[#4F46E5] dark:group-hover:text-[#6366F1] transition-all" />
                    </a>
                  </div>
                  <p className="text-sm text-[#5A606E] dark:text-[#9CA3AF] truncate sm:whitespace-normal">
                    {exp.position}
                  </p>
                </div>
              </div>

              {/* Right: Duration Badge in Warm Alabaster */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9F6] dark:bg-[#0F1117] text-[#5A606E] dark:text-[#9CA3AF] border border-[rgba(24,26,32,0.07)] dark:border-white/10 shrink-0 self-start sm:self-auto tabular-nums">
                {exp.duration}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
