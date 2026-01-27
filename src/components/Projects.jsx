import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import { ExternalLink, Github, X, Info, Rocket, Wrench, ArrowRight, Layers } from 'lucide-react';
import { TbBolt } from 'react-icons/tb';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

const ProjectImage3D = ({ project, scrollYProgress }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 100, damping: 30 });
  
  // Parallax layers based on mouse
  const bgX = useTransform(x, [0, 1], [15, -15]);
  const bgY = useTransform(y, [0, 1], [15, -15]);
  const fgX = useTransform(x, [0, 1], [-20, 20]);
  const fgY = useTransform(y, [0, 1], [-20, 20]);
  
  // Fix for Hook violation: Declare these at top level
  const peekX = useTransform(x, [0, 1], [-30, 30]);
  const peekY = useTransform(y, [0, 1], [-30, 30]);
  const holographicX = useTransform(x, [0, 1], ["-100%", "100%"]);
  const holographicOpacity = useTransform(x, [0, 0.5, 1], [0, 0.3, 0]);

  // Scroll-linked tilt (additive)
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[300px] md:h-[450px] cursor-pointer group/card preserve-3d"
    >
      <motion.div
        style={{ rotateX, rotateY, rotateZ: scrollRotateX, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl will-change-transform"
      >
        {project.codeSnippet ? (
          /* Layer 1: Code Snippet (integrated into 3D) */
          <motion.div style={{ x: bgX, y: bgY, scale: 1.05 }} className="absolute inset-0 bg-slate-950 p-6 overflow-hidden">
             {/* macOS style header */}
             <div className="flex items-center gap-1.5 mb-4 opacity-50">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             </div>
             <pre className="text-[10px] md:text-sm text-cyan-400 font-mono leading-relaxed opacity-80">
               <code>{project.codeSnippet}</code>
             </pre>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </motion.div>
        ) : (
          /* Layer 1: Background Image (Parallax) */
          <motion.div style={{ x: bgX, y: bgY, scale: 1.1 }} className="absolute inset-0">
            <ImageWithLoader
              src={project.images?.[0] || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/0f172a/06b6d4?text=Project'; }}
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover/card:bg-slate-950/20 transition-colors duration-500" />
          </motion.div>
        )}

        {/* Layer 2: Floating Tag (Extreme Parallax) */}
        <motion.div 
          style={{ x: fgX, y: fgY, translateZ: 50 }} 
          className="absolute top-8 left-8 z-20 pointer-events-none"
        >
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2 shadow-2xl">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-display text-white uppercase tracking-widest">
              {project.codeSnippet ? "Source Build" : "Premium Build"}
            </span>
          </div>
        </motion.div>

        {/* Layer 3: Secondary Image Peek (if exists and no snippet) */}
        {!project.codeSnippet && project.images?.[1] && (
          <motion.div
            style={{ x: peekX, y: peekY, translateZ: 80 }}
            className="absolute -bottom-10 -right-10 w-1/2 aspect-video rounded-2xl overflow-hidden border-4 border-slate-950 shadow-2xl hidden lg:block"
          >
            <ImageWithLoader src={project.images[1]} alt="Detail" className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* Holographic Reflection */}
        <motion.div
            style={{ 
              x: holographicX,
              opacity: holographicOpacity
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, index, openModal, scrollYProgress }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid md:grid-cols-2 gap-16 items-center"
    >
      {/* Content */}
      <div className={`order-2 space-y-8 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-black text-white/5 font-display">0{index + 1}</span>
            <h3 className="text-4xl font-bold tracking-tight text-white">{project.title}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-cyan-400/80 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-lg leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative h-12 px-8 rounded-xl bg-white/5 border border-cyan-500/30 text-white font-bold text-xs flex items-center gap-2 overflow-hidden transition-all duration-500 hover:scale-110 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/50 hover:-translate-y-1"
          >
            {/* Slide-up gradient background with zoom */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <TbBolt className="h-5 w-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300" />
              <span>Live Demo</span>
              <motion.span 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative h-12 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center gap-2 overflow-hidden transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
          >
            {/* Diagonal shine effect */}
            <div className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            
            {/* Pulsing glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Source</span>
            </span>
          </a>
          <button 
            onClick={() => openModal(project)}
            className="group relative h-12 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center gap-2 overflow-hidden transition-all duration-500 hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-cyan-600/20 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            {/* Magnetic pull effect - expanding circle */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
            
            {/* Shimmer lines */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}></div>
            </div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <Info className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Details</span>
            </span>
          </button>
        </div>
      </div>

      {/* 3D Image Showcase */}
      <div className={`order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <ProjectImage3D project={project} scrollYProgress={scrollYProgress} />
      </div>
    </motion.div>
  );
};

// Swiper removed for a more creative custom layout
import { projects } from '@/data/portfolio';

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lenis = useLenis();

  useEffect(() => {
    if (selectedProject) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      lenis?.start();
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }
    return () => { 
      lenis?.start();
      document.body.style.overflow = 'auto'; 
      document.body.classList.remove('modal-open');
    };
  }, [selectedProject, lenis]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 0.8 
      },
    },
  };

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#020617] text-white py-14 overflow-hidden">
      {/* Premium Charcoal Textures */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #06b6d4 0, #06b6d4 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px'
        }}
      ></div>

      {/* Light Leaks / Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
      {/* Top Wave */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10 transform rotate-180 opacity-50">
        <svg className="absolute top-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112L1200,106.7V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z" fill="#0f172a"></path>
        </svg>
      </div>

      <div className="relative z-30 w-11/12 max-w-7xl mx-auto pb-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline */}
          <div className="mb-16 relative">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">SHOWCASE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
            </motion.div>
          </div>

          {/* Projects List */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                openModal={openModal} 
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-0"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                data-lenis-prevent
                className="relative w-full max-w-3xl max-h-[85vh] bg-[#0f172a] border border-white/20 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col z-10"
              >
                {/* Modal Header/Image */}
                <div className="relative h-48 md:h-64 w-full overflow-hidden flex-shrink-0">
                  <ImageWithLoader 
                    src={(selectedProject.images && selectedProject.images[0]) || selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                  
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-50 shadow-xl"
                  >
                    <X className="h-5 w-5" />
                  </button>
  
                  <div className="absolute bottom-6 left-6 right-6">
                     <motion.h2 
                       initial={{ opacity: 0, x: -15 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="text-2xl md:text-3xl font-black font-display text-white mb-2 drop-shadow-lg"
                     >
                       {selectedProject.title}
                     </motion.h2>
                     <div className="flex flex-wrap gap-2 text-gradient">
                       {selectedProject.technologies.slice(0, 4).map((tech, i) => (
                         <span key={i} className="text-[9px] font-bold uppercase tracking-widest">{tech}</span>
                       ))}
                     </div>
                  </div>
                </div>
  
                {/* Modal Content - Scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar bg-[#0f172a]/50">
                  
                  {/* Description */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Info className="h-4 w-4" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Overview</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
                      {selectedProject.description}
                    </p>
                  </section>
  
                  {/* Tech Stack */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Wrench className="h-4 w-4" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Tech Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 font-medium whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Challenges */}
                    <section className="space-y-3 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-red-400">
                        <ArrowRight className="h-4 w-4" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Challenge</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed italic">
                        "{selectedProject.challenges}"
                      </p>
                    </section>
  
                    {/* Future Plans */}
                    <section className="space-y-3 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Rocket className="h-4 w-4" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Evolution</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedProject.futurePlans}
                      </p>
                    </section>
                  </div>
  
                  {/* Direct Links */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-4 px-4 sm:px-0 sm:gap-4">
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-2 py-2 text-white font-bold text-sm transition-all sm:flex-1 sm:h-14 sm:px-6 sm:bg-gradient-to-r sm:from-cyan-600 sm:to-indigo-600 sm:rounded-xl sm:hover:shadow-lg sm:hover:shadow-cyan-500/30 sm:active:scale-95"
                    >
                      <TbBolt className="h-5 w-5 text-cyan-400 sm:text-white group-hover:rotate-12 transition-transform" />
                      <span>Live Site</span>
                      {/* Underline for mobile */}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left sm:hidden"></span>
                    </a>
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-2 py-2 text-white font-bold text-sm transition-all sm:flex-1 sm:h-14 sm:px-6 sm:bg-white/5 sm:border sm:border-white/10 sm:rounded-xl sm:hover:bg-white/10 sm:active:scale-95"
                    >
                      <Github className="h-5 w-5 text-gray-400 sm:text-white" />
                      <span>Repository</span>
                      {/* Underline for mobile */}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left sm:hidden"></span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}


      {/* Rounded Portal Mask (Projects -> Contact) */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[200px] bg-slate-950 rounded-[100%] z-10"></div>
    </section>
  );
};

export default Projects;
