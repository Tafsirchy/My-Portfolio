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



  return (
    <section id="about" className="py-12 md:py-16 bg-[#FFFFFF] text-zinc-900 border-t border-zinc-300 overflow-hidden">
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

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-xl sm:text-2xl font-serif text-zinc-800 leading-snug">
              I AM M TAFSIRUL ISLAM CHOWDHURY.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans max-w-3xl">
              {personalInfo.bio} A multidisciplinary engineer bridging technical software engineering principles with contemporary web design. With a focus on clarity, functionality, and timeless aesthetics, my work blends strategic thinking with precise execution.
            </motion.p>
          </div>

          {/* Structured Traits with Hairline Dividers */}
          <div className="pt-4 border-t border-zinc-300 space-y-0">
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 py-6 border-b border-zinc-300 gap-4 group">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Experience</div>
              <div className="sm:col-span-3 text-sm text-zinc-700 leading-relaxed font-sans">
                Founder & CEO at BOONEC. Leading full-cycle web development for startups and enterprise platforms. Building robust architectures with React, Next.js, and Node.js.
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 py-6 border-b border-zinc-300 gap-4 group">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Approach</div>
              <div className="sm:col-span-3 text-sm text-zinc-700 leading-relaxed font-sans">
                Obsessed with fast render times, clean markup, and semantic SEO. I craft clean, reliable systems that users love interacting with, avoiding unnecessary complexity.
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 py-6 border-b border-zinc-300 gap-4 group">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500">Vision</div>
              <div className="sm:col-span-3 text-sm text-zinc-700 leading-relaxed font-sans">
                Great software is defined by its usability and aesthetic restraint. It should act as a seamless tool, empowering users without distraction.
              </div>
            </motion.div>

          </div>

          {/* Skills grid as simple list */}
          <div className="pt-4">
            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-xs tracking-widest uppercase font-semibold text-zinc-900"
            >
              {['Simplicity', 'Strategy', 'Craft', 'Precision'].map((skill, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-zinc-900 transition-colors duration-300"></span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row: Location + Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-zinc-300 pt-6 font-sans gap-6"
          >
            <p className="text-xs text-zinc-600 leading-relaxed">
              Based in {personalInfo.location}, focused on crafting thoughtful digital experiences.
            </p>
            
            <div className="flex gap-3">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2 border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                CV
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-5 py-2 bg-zinc-900 text-[#FFFFFF] border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-zinc-900 transition-colors whitespace-nowrap"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>

        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: elegantEase, delay: 0.4 }}
          className="mt-12 pt-6 border-t border-zinc-200 flex justify-end"
        >
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.6rem', color: '#71717a', letterSpacing: '0.02em' }}
          >
            Tafsir Chowdhury
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
