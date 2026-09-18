import { GraduationCap, Award, Calendar, CheckCircle2, BookOpen } from 'lucide-react';
import { education } from '@/data/portfolio';

const Education = () => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 md:py-28 border-t border-zinc-200/80 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Education & Credentials</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Academic foundation & professional certifications.
          </h2>
          <p className="text-sm text-zinc-600">
            Formal computer science education combined with hands-on full-stack development certifications.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-zinc-50/50 border border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header Icon + Date */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                    {item.degree.toLowerCase().includes('bachelor') ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium bg-white px-3 py-1 rounded-md border border-zinc-200/80">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    {item.duration}
                  </span>
                </div>

                {/* Degree and Institution */}
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-700 mt-1">
                    {item.institution}
                  </p>
                  {item.gpa && (
                    <p className="text-xs text-emerald-700 font-medium mt-1">
                      CGPA: {item.gpa}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-2 border-t border-zinc-200/60">
                  {item.description}
                </p>
              </div>

              {/* Coursework / Skills Highlight */}
              <div className="pt-4 mt-4 border-t border-zinc-200/60 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                <span>
                  {item.degree.toLowerCase().includes('bachelor')
                    ? 'Data Structures · Software Engineering · Database Systems'
                    : 'Full-Stack MERN · Cloud Architecture · Next.js 15+'}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
