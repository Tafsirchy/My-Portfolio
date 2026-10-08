import { personalInfo } from '@/data/portfolio';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F9F6F0] text-zinc-900 border-t border-zinc-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="mb-16 border-b border-zinc-300 pb-8">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase">
            About
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 space-y-12">
            
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl font-serif text-zinc-800 leading-snug">
                I AM {personalInfo.name.toUpperCase()}.
              </p>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans max-w-2xl">
                {personalInfo.bio} A multidisciplinary engineer bridging technical software engineering principles with contemporary web design. With a focus on clarity, functionality, and timeless aesthetics, my work blends strategic thinking with precise execution.
              </p>
            </div>

            {/* Structured Traits with Hairline Dividers */}
            <div className="pt-4 border-t border-zinc-300 space-y-0">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900">Experience</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Founder & CEO at BOONEC. Leading full-cycle web development for startups and enterprise platforms. Building robust architectures with React, Next.js, and Node.js.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900">Approach</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Obsessed with fast render times, clean markup, and semantic SEO. I craft clean, reliable systems that users love interacting with, avoiding unnecessary complexity.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 py-6 border-b border-zinc-300 gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900">Vision</div>
                <div className="sm:col-span-2 text-sm text-zinc-700 leading-relaxed font-sans">
                  Great software is defined by its usability and aesthetic restraint. It should act as a seamless tool, empowering users without distraction.
                </div>
              </div>

            </div>

            {/* Skills grid as simple list */}
            <div className="pt-8">
              <div className="flex flex-col space-y-3 font-sans text-xs tracking-widest uppercase font-semibold text-zinc-900">
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <span>Simplicity</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <span>Strategy</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <span>Craft</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <span>Precision</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: The Anchor */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end w-full">
            <div className="w-full aspect-[4/5] bg-zinc-200 border border-zinc-300 relative overflow-hidden group">
              {/* Fallback pattern/image space since we don't have a portrait */}
              <div className="absolute inset-0 bg-zinc-300 grayscale mix-blend-multiply opacity-50 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-zinc-500 font-serif text-sm">
                [ Insert Professional Portrait Here ]
              </div>
            </div>
            
            <div className="w-full mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-zinc-300 pt-4 font-sans gap-4">
              <p className="text-xs text-zinc-600 max-w-[200px] leading-relaxed">
                Based in {personalInfo.location}, focused on crafting thoughtful digital experiences.
              </p>
              
              <div className="flex gap-3">
                <a 
                  href={personalInfo.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-2 border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-[#F9F6F0] transition-colors whitespace-nowrap"
                >
                  CV
                </a>
                <a 
                  href="#contact" 
                  className="px-5 py-2 bg-zinc-900 text-[#F9F6F0] border border-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-zinc-900 transition-colors whitespace-nowrap"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
