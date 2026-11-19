'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Trophy, ExternalLink } from 'lucide-react';
import { education } from '@/data/portfolio';

const eduIcons = [GraduationCap, Award, Trophy, BookOpen];

export default function Education() {
  return (
    <section id="education" className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E06D53] dark:bg-[#F59E0B]" />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]"
        >
          Education &amp; Certifications
        </motion.h2>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => {
          const FallbackIcon = eduIcons[idx % eduIcons.length];

          return (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 hover:border-[#E06D53]/30 dark:hover:border-[#F59E0B]/30 hover:bg-[#E8E5DD] dark:hover:bg-[#222632] shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
            >
              {/* Left: Institution Logo & Info */}
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white dark:bg-[#0F1117] border border-[rgba(24,26,32,0.07)] dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform overflow-hidden p-1.5"
                  aria-label={`${edu.institution} website`}
                >
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <FallbackIcon className="w-5 h-5 text-[#E06D53] dark:text-[#F59E0B]" />
                  )}
                </a>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#181A20] dark:text-[#F3F4F6] leading-snug hover:text-[#E06D53] dark:hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{edu.institution}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5A606E] dark:text-[#9CA3AF] opacity-60 group-hover:opacity-100 group-hover:text-[#E06D53] dark:group-hover:text-[#F59E0B] transition-all" />
                    </a>
                  </div>
                  <p className="text-sm text-[#5A606E] dark:text-[#9CA3AF] truncate sm:whitespace-normal">
                    {edu.degree}
                  </p>
                </div>
              </div>

              {/* Right: Duration Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9F6] dark:bg-[#0F1117] text-[#5A606E] dark:text-[#9CA3AF] border border-[rgba(24,26,32,0.07)] dark:border-white/10 shrink-0 self-start sm:self-auto tabular-nums">
                {edu.duration}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
