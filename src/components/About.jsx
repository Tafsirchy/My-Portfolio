import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';

const About = () => {
  const elegantEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: elegantEase },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: elegantEase },
    },
  };

  return (
    <section id="about" className="py-12 md:py-16 bg-[#F9F6F0] text-zinc-900 border-t border-zinc-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-8 border-b border-zinc-300 pb-4"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase">
            About
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: The Narrative */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="lg:col-span-7 space-y-8"
          >
            
            <div className="space-y-4">
              <motion.p variants={itemVariants} className="text-xl sm:text-2xl font-serif text-zinc-800 leading-snug">
                I AM {personalInfo.name.toUpperCase()}.
              </motion.p>
              <motion.p variants={itemVariants} className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans max-w-2xl">
                {personalInfo.bio} A multidisciplinary engineer bridging technical software engineering principles with contemporary web design. With a focus on clarity, functionality, and timeless aesthetics, my work blends strategic thinking with precise execution.
              </motion.p>
            </div>

            {/* Structured Traits with Hairline Dividers */}
            <div className="pt-4 border-t border-zinc-300 space-y-0">
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4 group">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Experience</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Founder & CEO at BOONEC. Leading full-cycle web development for startups and enterprise platforms. Building robust architectures with React, Next.js, and Node.js.
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4 group">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Approach</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Obsessed with fast render times, clean markup, and semantic SEO. I craft clean, reliable systems that users love interacting with, avoiding unnecessary complexity.
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4 group">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Vision</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Great software is defined by its usability and aesthetic restraint. It should act as a seamless tool, empowering users without distraction.
                </div>
              </motion.div>

            </div>

            {/* Skills grid as simple list */}
            <div className="pt-8">
              <motion.div 
                variants={containerVariants}
                className="flex flex-col space-y-3 font-sans text-xs tracking-widest uppercase font-semibold text-zinc-900"
              >
                {['Simplicity', 'Strategy', 'Craft', 'Precision'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-center justify-between border-b border-zinc-300 pb-2 hover:pl-2 transition-all duration-300">
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </motion.div>

          {/* Right Column: The Anchor */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end w-full">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={imageVariants}
              className="w-full aspect-[4/5] bg-zinc-200 border border-zinc-300 relative overflow-hidden group"
            >
              <img 
                src="/assets/About.png" 
                alt="Portrait" 
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="w-full mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-zinc-300 pt-4 font-sans gap-4"
            >
              <p className="text-xs text-zinc-600 max-w-[200px] leading-relaxed">
                Based in {personalInfo.location}, focused on crafting thoughtful digital experiences.
              </p>
              
              <div className="flex gap-3">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-2 border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-[#F9F6F0] transition-colors whitespace-nowrap"
                >
                  CV
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="px-5 py-2 bg-zinc-900 text-[#F9F6F0] border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-zinc-900 transition-colors whitespace-nowrap"
                >
                  Get In Touch
                </motion.a>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
