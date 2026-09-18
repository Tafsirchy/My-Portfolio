import { Briefcase, Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { experience } from '@/data/portfolio';

const Experience = () => {
  if (!experience || experience.length === 0) return null;

  // Ensure logical reverse-chronological order (Present roles first)
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.duration.includes('Present')) return -1;
    if (b.duration.includes('Present')) return 1;
    return b.id - a.id;
  });

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-zinc-200/80 bg-zinc-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Work Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Professional track record & hands-on engineering impact.
          </h2>
          <p className="text-sm text-zinc-600">
            A chronological timeline of roles where I have architected, delivered, and led full-stack products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-zinc-200 ml-3 sm:ml-4 space-y-10 sm:space-y-12">
          {sortedExperience.map((exp, index) => {
            const isCurrent = exp.duration.toLowerCase().includes('present');

            return (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                {/* Node marker on the line */}
                <span
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-colors ${
                    isCurrent
                      ? 'border-emerald-600 ring-4 ring-emerald-100'
                      : 'border-zinc-400 group-hover:border-zinc-900'
                  }`}
                />

                {/* Experience Card */}
                <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-subtle hover:border-zinc-300 transition-all">
                  
                  {/* Top Meta Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-100">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                          {exp.position}
                        </h3>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-zinc-700 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200/60 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Role Description */}
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Key Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Key Deliverables & Responsibilities:
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                            <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Company link if BOONEC */}
                  {exp.company === 'BOONEC' && (
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs text-zinc-500">Agency & Venture</span>
                      <a
                        href="https://boonec.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:text-zinc-600"
                      >
                        Visit boonec.com
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
