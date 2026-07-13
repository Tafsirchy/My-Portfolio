import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import { Github, X, Info, Terminal, Monitor, Code } from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';
import { projects } from '@/data/portfolio';

const ProjectCard = ({ project, index, openModal, scrollYProgress }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const [iframeScale, setIframeScale] = useState(1);

  const handleMouseEnter = () => {
    // 300ms delay before loading iframe to avoid accidental triggers
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered && containerRef.current) {
      const updateScale = () => {
        if (containerRef.current) {
          // Use offsetWidth to ignore the CSS transform scale from Framer Motion
          const width = containerRef.current.offsetWidth;
          // Force a 1440px desktop width and scale it down to fit the container
          setIframeScale(width / 1440);
        }
      };
      
      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }
  }, [isHovered]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid lg:grid-cols-12 gap-8 items-center group relative"
    >
      {/* Background linking line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 -z-10 group-hover:bg-neon-navy/20 transition-colors duration-700 hidden lg:block"></div>

      {/* Image Side */}
      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative p-2 bg-white/80 border border-black/10 group-hover:border-neon-navy/50 transition-colors duration-500 backdrop-blur-md shadow-sm">
          {/* Tech Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div 
            className="relative aspect-video overflow-hidden bg-slate-100 before:absolute before:inset-0 before:bg-grid before:opacity-10 before:mix-blend-overlay cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {project.codeSnippet ? (
              <div className="absolute inset-0 bg-slate-900 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                  <Terminal className="w-4 h-4 text-neon-navy" />
                  <span className="font-mono text-xs text-slate-400">source_code.exe</span>
                </div>
                <pre className="font-mono text-[10px] sm:text-xs text-neon-navy/80 overflow-hidden">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            ) : (
              <>
                {/* Iframe Live Preview */}
                <AnimatePresence>
                  {isHovered && project.liveUrl && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-40 flex flex-col bg-slate-50 border border-neon-navy/30 overflow-hidden shadow-2xl"
                    >
                      {/* Mock Browser Header */}
                      <div className="w-full bg-slate-200 border-b border-black/10 px-3 py-1.5 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                        </div>
                        <div className="flex-1 mx-2 flex justify-center">
                          <div className="bg-white/80 border border-black/5 rounded-sm px-3 py-0.5 text-[9px] font-mono text-slate-600 flex items-center gap-1 shadow-inner w-3/4 max-w-sm overflow-hidden whitespace-nowrap">
                            <span className="text-emerald-600">https://</span>
                            {project.liveUrl.replace(/^https?:\/\//, '')}
                          </div>
                        </div>
                      </div>
                      
                      {/* The iframe */}
                      <div className="flex-1 w-full bg-white relative overflow-hidden" ref={containerRef}>
                         <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-slate-400">Loading Preview...</div>
                         <iframe 
                           src={project.liveUrl} 
                           style={{
                             width: '1440px',
                             height: '810px',
                             transform: `scale(${iframeScale})`,
                             transformOrigin: '0 0'
                           }}
                           className="absolute top-0 left-0 border-none pointer-events-auto bg-white z-10"
                           title={`${project.title} Preview`}
                           sandbox="allow-scripts allow-same-origin allow-popups"
                         />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ImageWithLoader
                  src={project.images?.[0] || project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover filter transition-all duration-700 ${isHovered ? 'scale-110 blur-md opacity-30 grayscale' : 'grayscale contrast-125 brightness-110 group-hover:grayscale-0'}`}
                />
                <div className={`absolute inset-0 bg-neon-navy/10 mix-blend-overlay pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'group-hover:opacity-0'}`} />
              </>
            )}
            
            {/* Scanline overlay */}
            {!isHovered && (
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-neon-navy/30 to-transparent z-20 pointer-events-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className={`flex flex-col ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} gap-6`}>
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-neon-olive tracking-widest uppercase block font-bold">
              // Project_ID: {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight uppercase group-hover:text-neon-navy transition-colors">
              {project.title}
            </h3>
          </div>

          <div className={`p-6 bg-white/90 border border-black/5 backdrop-blur-md relative ${isEven ? 'lg:-ml-12' : 'lg:-mr-12'} z-10 w-full lg:w-[120%] shadow-sm`}>
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-olive"></div>
            <p className="text-sm text-slate-600 font-mono leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
            {project.technologies.map((tech, i) => (
              <span key={i} className="font-mono text-[10px] px-2 py-1 border border-black/10 text-slate-600 uppercase tracking-wider bg-slate-50 font-bold">
                {tech}
              </span>
            ))}
          </div>

          <div className={`flex flex-wrap gap-4 pt-4 ${isEven ? 'justify-start' : 'lg:justify-end'}`}>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs text-white bg-neon-navy px-6 py-2 uppercase font-bold hover:shadow-[0_0_15px_rgba(30,58,138,0.4)] transition-all flex items-center gap-2"
            >
              <Monitor className="w-3 h-3" /> Execute
            </a>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs text-slate-700 border border-black/20 bg-white px-6 py-2 uppercase font-bold hover:border-neon-navy hover:text-neon-navy transition-colors flex items-center gap-2 shadow-sm"
            >
              <Code className="w-3 h-3" /> Source
            </a>
            <button 
              onClick={() => openModal(project)}
              className="font-mono text-xs text-neon-olive border border-neon-olive/50 bg-white px-4 py-2 uppercase font-bold hover:bg-neon-olive/10 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Info className="w-3 h-3" /> Logs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-background text-slate-900 py-32 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Headline */}
          <div className="mb-24 border-b border-black/10 pb-6 relative">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
                // SECTION: PRJ
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
                <span className="text-neon-olive">{'>'}</span> System.Projects
              </h2>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                openModal={openModal} 
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-white/80 backdrop-blur-md z-0"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                data-lenis-prevent
                className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-neon-navy/30 flex flex-col z-10 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-black/10 bg-slate-50">
                  <div className="flex items-center gap-2 font-mono text-xs text-neon-navy uppercase font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>project_viewer.exe - {selectedProject.title}</span>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="p-1 hover:bg-neon-navy/20 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 font-mono">
                  
                  {/* Image/Preview */}
                  <div className="w-full aspect-video border border-black/10 bg-slate-100 relative overflow-hidden p-1">
                     <ImageWithLoader 
                        src={(selectedProject.images && selectedProject.images[0]) || selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 brightness-110"
                      />
                      <div className="absolute inset-0 bg-neon-navy/10 mix-blend-overlay"></div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 border-l-2 border-neon-navy pl-4">
                    <h3 className="text-xs text-neon-navy uppercase tracking-widest font-bold">System_Overview</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
  
                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h3 className="text-xs text-neon-olive uppercase tracking-widest font-bold">Dependencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 border border-black/10 text-[10px] text-slate-700 uppercase font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
  
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-black/10">
                    {/* Challenges */}
                    <div className="space-y-2">
                      <h3 className="text-xs text-red-500 uppercase tracking-widest font-bold">Errors_Encountered</h3>
                      <p className="text-slate-500 text-xs leading-relaxed italic">
                        "{selectedProject.challenges}"
                      </p>
                    </div>
  
                    {/* Future Plans */}
                    <div className="space-y-2">
                      <h3 className="text-xs text-emerald-500 uppercase tracking-widest font-bold">Future_Patches</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {selectedProject.futurePlans}
                      </p>
                    </div>
                  </div>
  
                  {/* Actions */}
                  <div className="flex gap-4 pt-6 border-t border-black/10">
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-neon-navy text-white text-xs font-bold uppercase py-3 hover:shadow-[0_0_15px_rgba(30,58,138,0.4)] transition-all"
                    >
                      Init Deployment
                    </a>
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-black/20 bg-slate-50 text-slate-800 text-xs font-bold uppercase py-3 hover:border-neon-navy hover:text-neon-navy transition-colors"
                    >
                      View Source
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Projects;
