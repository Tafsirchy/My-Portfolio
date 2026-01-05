import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, Info, Rocket, Wrench, ArrowRight } from 'lucide-react';
import { TbBolt } from 'react-icons/tb';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { projects } from '@/data/portfolio';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(null);

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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="relative bg-[#020617] text-white py-14 overflow-hidden">
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
      {/* Top Wave (Receiving from Experience) */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10 transform rotate-180 opacity-50">
        <svg className="absolute top-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112L1200,106.7V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z" fill="#0f172a"></path>
        </svg>
      </div>

      <div className="relative z-30 w-11/12 max-w-7xl mx-auto pb-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline - Global System */}
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
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm font-light leading-relaxed">
                Exploring the intersection of design and functionality through modular full-stack applications.
              </p>
            </motion.div>
          </div>

          {/* Projects List */}
          <div className="space-y-24">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-12 items-stretch"
                >
                  {/* Content (left for even, right for odd) */}
                  <div className={`order-2 space-y-4 ${!isEven ? 'md:order-2' : 'md:order-1'} flex flex-col justify-between`}>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{project.title}</h3>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 border border-gray-600 text-gray-300 rounded-full text-xs font-light"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mt-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Buttons - Premium Style */}
                    <div className="grid grid-cols-3 gap-3 pt-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 rounded-xl bg-white text-slate-900 font-bold text-[10px] flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all duration-300 hover:text-white active:scale-95 shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center gap-1.5">
                          <TbBolt className="h-4 w-4" />
                          Live
                        </span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300 group/git active:scale-95"
                      >
                        <Github className="h-3.5 w-3.5 group-hover/git:scale-110 transition-transform text-slate-400 group-hover/git:text-white" />
                        Code
                      </a>
                      <button
                        onClick={() => openModal(project)}
                        className="h-11 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300 group/details active:scale-95"
                      >
                        <Info className="h-3.5 w-3.5 group-hover/details:rotate-12 transition-transform text-slate-400 group-hover/details:text-white" />
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Image/Slider Section */}
                  <div className={`order-1 ${!isEven ? 'md:order-1' : 'md:order-2'} h-[200px] sm:h-[250px] md:h-auto`}>
                    {project.codeSnippet ? (
                      // Code Snippet with 3D depth
                      <div className="relative group h-full">
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-x-auto transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 md:hover:-translate-y-1 h-full">
                          <pre className="text-xs text-gray-300 font-mono leading-relaxed">
                            <code>{project.codeSnippet}</code>
                          </pre>
                        </div>
                        {/* 3D depth effect - Hidden on small devices for cleaner look */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent rounded-lg -z-10 blur-xl transform translate-y-4 opacity-50 group-hover:opacity-70 transition-opacity hidden md:block"></div>
                      </div>
                    ) : (
                      <>
                        {/* Mobile/Small Device Slider with reduced width */}
                        <div className="block md:hidden h-full max-w-sm mx-auto">
                          <Swiper
                            modules={[Pagination, Autoplay, Navigation]}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            className="h-full rounded-2xl overflow-hidden border border-white/10"
                          >
                            {(project.images || [project.image]).map((img, i) => (
                              <SwiperSlide key={i}>
                                <img
                                  src={img}
                                  alt={`${project.title} slide ${i}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://placehold.co/400x300/0f172a/06b6d4?text=Project+Image';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>

                        {/* Desktop Professional 3D Layout */}
                        <div className="hidden md:block h-full">
                          {project.images && project.images.length > 0 ? (
                            <div className="relative perspective-1000 h-full">
                              {/* Main Image with 3D Transform */}
                              <div className="relative group h-full">
                                <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:rotate-y-2 h-full"
                                     style={{
                                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.1)',
                                       transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)'
                                     }}>
                                  <img
                                    src={project.images[0]}
                                    alt={`${project.title} main`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                      e.target.src = 'https://placehold.co/400x300/0f172a/06b6d4?text=Project+Image';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-500"></div>
                                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-slate-900/30 rounded-2xl -z-10 blur-2xl transform translate-y-6 translate-x-2 opacity-60 group-hover:translate-y-8 group-hover:opacity-80 transition-all duration-500"></div>
                              </div>
                              
                              {/* Secondary Image - Floating Card Style */}
                              {project.images[1] && (
                                <div className="absolute -bottom-8 -right-8 w-2/5 group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                                     style={{
                                       boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(251, 146, 60, 0.15)',
                                       transform: 'perspective(800px) rotateY(5deg) rotateX(-3deg)'
                                     }}>
                                  <div className="relative overflow-hidden rounded-xl border-4 border-slate-800">
                                    <img
                                      src={project.images[1]}
                                      alt={`${project.title} detail`}
                                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(e) => {
                                        e.target.src = 'https://placehold.co/200x150/0f172a/06b6d4?text=Detail';
                                      }}
                                    />
                                    <div className="absolute inset-0 ring-2 ring-orange-500/40 rounded-lg group-hover:ring-orange-500/60 transition-all duration-300"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-slate-900/40 rounded-xl -z-10 blur-xl transform translate-y-4 translate-x-2 opacity-70"></div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="relative group h-full">
                              <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 h-full"
                                   style={{
                                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.1)',
                                     transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)'
                                   }}>
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.src = 'https://placehold.co/400x300/0f172a/06b6d4?text=Project+Image';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-500"></div>
                                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-slate-900/30 rounded-2xl -z-10 blur-2xl transform translate-y-6 translate-x-2 opacity-60 group-hover:translate-y-8 group-hover:opacity-80 transition-all duration-500"></div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                </motion.div>
              );
            })}
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
