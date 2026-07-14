import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import ImageWithLoader from "@/components/ui/ImageWithLoader";

const About = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(smoothProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.3], [0.95, 1]);
  const translateY = useTransform(smoothProgress, [0.1, 0.3], [50, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-background text-slate-900 py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-navy/50 to-transparent"></div>

      <motion.div
        style={{ opacity, scale, y: translateY }}
        className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10"
      >
        {/* Tech Container */}
        <div className="relative glass-panel p-8 md:p-12 border-t-2 border-t-neon-navy/80 shadow-lg shadow-black/5">
          {/* Decorative Corner Brackets */}
          <div className="hidden md:block absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-navy"></div>
          <div className="hidden md:block absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-navy"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-navy"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-navy"></div>

          {/* Section Headline */}
          <div className="mb-16 border-b border-black/10 pb-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
                // SECTION: ABT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <span className="text-neon-olive">{'>'}</span> System.About
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left side - Portrait Image */}
            <div className="md:col-span-5 relative group">
              <div className="relative p-2 border border-black/10 bg-surface shadow-sm before:absolute before:inset-0 before:bg-grid before:opacity-10 before:mix-blend-overlay">
                <ImageWithLoader
                  src="/assets/About.png"
                  alt="Profile"
                  className="w-full h-auto object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x800/ffffff/0ea5e9?text=SYS_AVATAR";
                  }}
                />
                <div className="absolute inset-0 bg-neon-navy/5 mix-blend-overlay pointer-events-none"></div>
                
                {/* Tech Badges */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-surface border border-neon-navy/50 shadow-md">
                  <p className="font-mono text-xs md:text-sm text-neon-navy uppercase font-bold">MERN_STACK</p>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold">Level: Expert</p>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="md:col-span-7 space-y-8 font-mono">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl md:text-4xl text-slate-900 uppercase tracking-wide">
                  {personalInfo.name}
                </h3>
                <p className="text-neon-olive text-xs uppercase tracking-[0.3em] font-bold">
                  {personalInfo.headline}
                </p>
              </div>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed bg-slate-50 p-6 border-l-2 border-neon-navy shadow-sm border border-black/5">
                <p>
                  <span className="text-slate-900 font-bold">INITIALIZING BACKGROUND_PROCESS...</span>
                  <br /><br />
                  I specialize in engineering <span className="text-neon-navy font-bold">highly performant</span> and <span className="text-neon-olive font-bold">scalable</span> digital architectures.
                </p>
                <p>{personalInfo.bio}</p>
                <div className="mt-4 p-4 bg-white border border-black/10 relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-olive"></div>
                  <p className="text-xs text-slate-500 font-bold">
                    <span className="text-neon-olive">"</span>
                    Every line of code I write is an opportunity to solve a problem and architect something flawless.
                    <span className="text-neon-olive">"</span>
                  </p>
                </div>
              </div>

              {/* Data Points */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm text-neon-navy uppercase tracking-widest mb-1 font-bold">Location_Data</span>
                  <span className="text-sm text-slate-900 uppercase font-bold">{personalInfo.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm text-neon-navy uppercase tracking-widest mb-1 font-bold">Status</span>
                  <span className="text-sm text-slate-900 uppercase flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 bg-neon-navy animate-pulse"></span>
                    Available for Deployment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
