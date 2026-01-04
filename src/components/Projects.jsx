import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/portfolio';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="projects" className="relative min-h-screen bg-slate-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="px-6 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm">
                <p className="text-indigo-400 text-sm font-display tracking-[0.3em] uppercase">
                  FEATURED WORKS
                </p>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Projects
            </h2>
          </motion.div>

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
                  <div className={`space-y-4 ${!isEven ? 'md:order-2' : ''} flex flex-col justify-between`}>
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

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-medium transition-colors duration-200"
                      >
                        View project
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Image/Code (right for even, left for odd) */}
                  <div className={`${!isEven ? 'md:order-1' : ''} h-full`}>
                    {project.codeSnippet ? (
                      // Code Snippet with 3D depth
                      <div className="relative group h-full">
                        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 overflow-x-auto transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 h-full">
                          <pre className="text-xs text-gray-300 font-mono leading-relaxed">
                            <code>{project.codeSnippet}</code>
                          </pre>
                        </div>
                        {/* 3D depth effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent rounded-lg -z-10 blur-xl transform translate-y-4 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      </div>
                    ) : project.images && project.images.length > 0 ? (
                      // Multiple Images - Professional 3D Layout
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
                                e.target.src = 'https://via.placeholder.com/400x300/1e293b/64748b?text=Project+Image';
                              }}
                            />
                            {/* Gradient Overlay with lighting effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-500"></div>
                            
                            {/* Light reflection effect */}
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          
                          {/* 3D Shadow layers */}
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
                                  e.target.src = 'https://via.placeholder.com/200x150/1e293b/64748b?text=Detail';
                                }}
                              />
                              {/* Glowing ring effect */}
                              <div className="absolute inset-0 ring-2 ring-orange-500/40 rounded-lg group-hover:ring-orange-500/60 transition-all duration-300"></div>
                              {/* Inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Depth shadow for secondary image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-slate-900/40 rounded-xl -z-10 blur-xl transform translate-y-4 translate-x-2 opacity-70"></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Single Image with 3D Effect
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                             style={{
                               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.1)',
                               transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)'
                             }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300/1e293b/64748b?text=Project+Image';
                            }}
                          />
                          {/* Lighting and gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-500"></div>
                          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        {/* 3D depth shadow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-slate-900/30 rounded-2xl -z-10 blur-2xl transform translate-y-6 translate-x-2 opacity-60 group-hover:translate-y-8 group-hover:opacity-80 transition-all duration-500"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-32 grid md:grid-cols-2 gap-12 items-start border-t border-slate-800 pt-20"
          >
            {/* Left: Call to Action */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Contact</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Have a project?
                  <br />
                  Let's talk!
                </h2>
              </div>
              <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-medium transition-colors duration-200">
                Contact
              </button>
            </div>

            {/* Right: Contact Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-slate-700 focus:border-slate-500 outline-none py-2 text-white transition-colors"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-slate-700 focus:border-slate-500 outline-none py-2 text-white transition-colors"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  rows="3"
                  className="w-full bg-transparent border-b border-slate-700 focus:border-slate-500 outline-none py-2 text-white resize-none transition-colors"
                  placeholder=""
                ></textarea>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
