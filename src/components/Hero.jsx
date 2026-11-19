'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  return (
    <section id="home" className="pt-1 sm:pt-4 pb-2">
      <div className="space-y-4 sm:space-y-5">
        
        {/* Top Row: Greeting & Role on Left, Circular Avatar on Right (Side-by-Side on all screens) */}
        <div className="flex items-center justify-between gap-6 sm:gap-10">
          
          {/* Left Column: Greeting, Badges, & Subtitle */}
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-3.5">
            
            {/* Status Badge in Soft Stone with Emerald pulse */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 text-[#181A20] dark:text-[#F3F4F6] text-xs font-semibold shadow-xs"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#5A606E] dark:text-[#9CA3AF] truncate text-[11px] sm:text-xs">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Heading with Electric Indigo Accent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center gap-2 sm:gap-3 flex-wrap"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6] leading-tight">
                Hi, I&apos;m{' '}
                <span className="text-[#4F46E5] dark:text-[#6366F1] hover:text-[#4338CA] transition-colors">
                  Tafsir
                </span>
              </h1>
              <span className="text-2xl sm:text-4xl lg:text-5xl inline-block origin-[70%_70%] hover:animate-wiggle cursor-default">
                👋
              </span>
            </motion.div>

            {/* Subtitle / Role Tagline: Stacked on mobile/sm, Inline with bullet on lg/desktop */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-2 text-base sm:text-lg font-medium text-[#181A20] dark:text-[#F3F4F6] pt-0.5"
            >
              <span>Full-Stack Web Developer</span>
              <span className="hidden lg:inline text-[#5A606E]/40">•</span>
              <div>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#E06D53] dark:text-[#F59E0B] bg-[#E06D53]/10 dark:bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-md border border-[#E06D53]/20 dark:border-[#F59E0B]/20 text-xs sm:text-sm shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E06D53] dark:text-[#F59E0B] shrink-0" />
                  Founder of BOONEC
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Avatar (Spacious on mobile/sm, balanced on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative shrink-0 self-center"
          >
            <div className="p-0.5 sm:p-1 rounded-full bg-gradient-to-tr from-[#E5E1D8] via-[#FAF9F6] to-[#E06D53]/30 dark:from-neutral-800 dark:via-neutral-700 dark:to-[#6366F1]/30 shadow-lg shadow-[#181A20]/5 dark:shadow-black/40">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-[#FAF9F6] dark:border-[#181B24] bg-[#FAF9F6] dark:bg-[#181B24]">
                <img
                  src="/assets/HeroProfile.png"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover scale-[1.4] origin-[50%_15%]"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bio text in Cool Graphite */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-base text-[#5A606E] dark:text-[#9CA3AF] leading-relaxed max-w-2xl pt-1"
        >
          Passionate about building scalable web applications, thoughtful digital products, and high-performance user experiences with modern full-stack architectures.
        </motion.p>

      </div>
    </section>
  );
}
