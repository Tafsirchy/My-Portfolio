import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/data/portfolio';

const About = () => {
  const sectionRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-black text-white py-16">
      {/* Creative Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Glassmorphic Orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(40px)' }}
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(50px)' }}
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full backdrop-blur-3xl border border-white/10"
          style={{ filter: 'blur(45px)' }}
        />
      </div>

      {/* Main content - Horizontal layout with backdrop blur container */}
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6">
        {/* Content container with border blur effect */}
        <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
          {/* Glow effect on borders */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-xl -z-10"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Portrait Image with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              className="relative order-2 md:order-1"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Portrait with dramatic lighting */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/About.png"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                    style={{
                      filter: 'contrast(1.1) brightness(0.9)',
                    }}
                  />
                  {/* Accent glow on left side */}
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 md:order-2"
            >
              {/* Name - Reduced size */}
              <div>
                <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
                  {personalInfo.name.toUpperCase()}
                </h1>
              </div>

              {/* Bio sections - Reduced spacing */}
              <div className="space-y-4">
                {/* Main statement */}
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {personalInfo.headline}
                </p>

                {/* Detailed bio */}
                <div className="text-xs text-gray-400 font-light leading-6 space-y-3">
                  <p>
                    Specializing in modern web technologies including React, TypeScript, and cutting-edge frontend frameworks.
                    I bring technical precision to complex web applications.
                  </p>
                  <p>
                    {personalInfo.bio}
                  </p>
                  <p>
                    From the first wireframe to the final deployment, every line of code is crafted for performance and user experience.
                    We have compiled an extensive list of projects and resources.
                  </p>
                </div>
              </div>

              {/* Signature - Reduced spacing */}
              <div className="mt-8 flex flex-col items-start">
                <span className="font-signature text-6xl text-gray-200 transform -rotate-3 block mb-2">
                  {personalInfo.name.split(' ')[0]}
                </span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase">
                  {personalInfo.tagline}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
