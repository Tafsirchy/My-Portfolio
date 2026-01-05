import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, Info, Rocket, Wrench, ArrowRight, Layers } from 'lucide-react';
import { TbBolt } from 'react-icons/tb';

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
            <img
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
            <img src={project.images[1]} alt="Detail" className="w-full h-full object-cover" />
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
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
             className="h-12 px-8 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 group/btn transition-all hover:scale-105 shadow-xl shadow-cyan-500/20">
            <TbBolt className="h-5 w-5 animate-pulse" /> Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
             className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all">
            <Github className="h-4 w-4" /> Source
          </a>
          <button onClick={() => openModal(project)}
                  className="h-12 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all">
            <Info className="h-4 w-4" /> Details
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
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

    {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header/Image */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden flex-shrink-0">
                <img 
                  src={(selectedProject.images && selectedProject.images[0]) || selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-50"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-8 right-8">
                   <h2 className="text-3xl md:text-4xl font-black font-display text-white mb-2">{selectedProject.title}</h2>
                   <div className="flex flex-wrap gap-2 text-gradient">
                     {selectedProject.technologies.slice(0, 4).map((tech, i) => (
                       <span key={i} className="text-[10px] font-bold uppercase tracking-widest">{tech}</span>
                     ))}
                   </div>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-8 md:p-10 overflow-y-auto space-y-10 custom-scrollbar">
                
                {/* Description */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <Info className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Project Overview</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                    {selectedProject.description}
                  </p>
                </section>

                {/* Tech Stack */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <Wrench className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Full Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 font-medium whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Challenges */}
                  <section className="space-y-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 text-red-400">
                      <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Challenges</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed italic">
                      "{selectedProject.challenges}"
                    </p>
                  </section>

                  {/* Future Plans */}
                  <section className="space-y-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center transition-transform">
                        <Rocket className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Future Plans</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedProject.futurePlans}
                    </p>
                  </section>
                </div>

                {/* Direct Links */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 h-14 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl flex items-center justify-center gap-3 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95"
                  >
                    <TbBolt className="h-6 w-6" />
                    Visit Live Site
                  </a>
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-bold hover:bg-white/10 transition-all active:scale-95"
                  >
                    <Github className="h-6 w-6" />
                    Client Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rounded Portal Mask (Projects -> Contact) */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[200px] bg-slate-950 rounded-[100%] z-10"></div>
    </section>
  );
};

export default Projects;
