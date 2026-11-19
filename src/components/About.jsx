'use client';
import { motion } from 'framer-motion';
import { Code, Zap, Shield } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function About() {
  const highlights = [
    { label: 'Clean Architecture', icon: Code, accent: 'text-[#4F46E5]' },
    { label: 'Lightning Performance', icon: Zap, accent: 'text-[#E06D53]' },
    { label: 'Production Security', icon: Shield, accent: 'text-[#181A20]' },
  ];

  return (
    <section id="about" className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]"
        >
          About
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="space-y-3.5 text-base sm:text-[17px] leading-relaxed text-[#5A606E] dark:text-[#9CA3AF]"
      >
        <p>
          {personalInfo.bio}
        </p>
        <p>
          As the founder of <span className="font-bold text-[#181A20] dark:text-[#F3F4F6] hover:text-[#E06D53] dark:hover:text-[#F59E0B] transition-colors">BOONEC</span>, I build modern web applications, scalable platforms, and bespoke digital products focused on clean design, fast performance, and robust architecture.
        </p>
      </motion.div>

      {/* Value Badges in Soft Stone Surface */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-3.5 rounded-xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 text-[#181A20] dark:text-[#F3F4F6] flex items-center gap-2.5 font-medium text-xs sm:text-sm shadow-xs hover:border-[#4F46E5]/30 dark:hover:border-[#6366F1]/30 transition-colors"
            >
              <Icon className={`w-4 h-4 shrink-0 ${item.accent}`} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
