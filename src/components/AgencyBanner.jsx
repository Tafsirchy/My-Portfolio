import { ArrowUpRight, Sparkles, Shield, Rocket, Users } from 'lucide-react';

const AgencyBanner = () => {
  return (
    <section className="py-20 border-t border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Spotlight Card */}
        <div className="relative rounded-3xl bg-zinc-950 text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl">
          
          {/* Subtle glow in the background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Founded by Tafsir Chowdhury</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  BOONEC — Modern Web, SaaS & Digital Solutions.
                </h2>
                <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
                  Beyond individual engineering, I operate BOONEC to engineer scalable full-stack applications, custom SaaS platforms, and refined digital products for ambitious businesses and startups.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <Rocket className="w-5 h-5 text-blue-400 mb-2" />
                  <p className="text-xs font-semibold text-white">Full-Cycle Engineering</p>
                  <p className="text-[11px] text-zinc-400 mt-1">From architectural planning to cloud deployment.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <Shield className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-xs font-semibold text-white">Production Grade</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Enterprise security, fast load times & test coverage.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <Users className="w-5 h-5 text-amber-400 mb-2" />
                  <p className="text-xs font-semibold text-white">Tailored Partnership</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Transparent communication & rapid delivery.</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="https://boonec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 rounded-xl transition-all shadow-sm"
                >
                  Visit BOONEC.com
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
                >
                  Discuss a Project
                </a>
              </div>

            </div>

            {/* Right Graphic / Logo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl flex flex-col items-center text-center max-w-xs w-full">
                <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center mb-4 shadow-md">
                  <img
                    src="/assets/BOONEC_logo_modern.png"
                    alt="BOONEC Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">BOONEC</h3>
                <p className="text-xs text-zinc-400 mt-1">Digital Engineering Studio</p>
                <div className="w-full h-px bg-zinc-800 my-4" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Partnering with founders and leaders worldwide to build the next generation of web products.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AgencyBanner;
