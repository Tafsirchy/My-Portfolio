import { motion } from 'framer-motion';
import { education } from '@/data/portfolio';

const elegantEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: elegantEase },
  },
};

// Determine entry type and metadata
const getEntryMeta = (item) => {
  const d = item.degree.toLowerCase();
  if (d.includes('bachelor')) {
    return {
      label: 'Degree',
      courses: ['Data Structures & Algorithms', 'Software Engineering', 'Database Systems', 'OOP', 'Computer Networks'],
      isActive: true,
    };
  }
  if (d.includes('complete web') || d.includes('mern')) {
    return {
      label: 'Certification',
      courses: ['React & Next.js', 'Node.js & Express', 'MongoDB & Firebase', 'Cloud Deployment', 'REST APIs'],
      isActive: false,
    };
  }
  if (d.includes('national skills') || d.includes('python')) {
    return {
      label: 'Gov. Certificate',
      courses: ['Python Web Apps', 'BNQF Level 4', '360 Hours', 'Government Recognized', 'NSDA Bangladesh'],
      isActive: false,
    };
  }
  if (d.includes('appreciation') || d.includes('life')) {
    return {
      label: 'Certificate',
      courses: ['Life Transformation', 'Personal Growth', 'Batch #1', 'SABiT International'],
      isActive: false,
    };
  }
  return { label: 'Credential', courses: [], isActive: false };
};

const Education = () => {
  if (!education || education.length === 0) return null;

  // Split: 1 degree + certifications
  const degree = education.filter((e) => e.degree.toLowerCase().includes('bachelor'));
  const certs = education.filter((e) => !e.degree.toLowerCase().includes('bachelor'));

  return (
    <section id="education" className="py-12 md:py-16 bg-[#FFFFFF] border-t border-zinc-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: elegantEase }}
          className="mb-8 border-b border-zinc-300 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase leading-none">
            Education
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:pb-2">
            Academic & Credentials
          </p>
        </motion.div>

        {/* ── Degree Row (full width, featured) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {degree.map((item, index) => {
            const meta = getEntryMeta(item);
            return (
              <motion.div
                key={item.id}
                variants={rowVariants}
                className="group grid grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 items-start border-b border-zinc-300 hover:bg-zinc-100/60 transition-colors duration-500 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                {/* Index */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-700 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Main */}
                <div className="col-span-10 sm:col-span-7 space-y-4">
                  <div>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 border border-zinc-300 px-2.5 py-1 mb-3">
                      {meta.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-zinc-900 leading-snug tracking-tight">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-600 mt-1 font-sans">{item.institution}</p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans max-w-xl">{item.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {meta.courses.map((c) => (
                      <span key={c} className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 bg-zinc-200/70 px-2.5 py-1">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Meta */}
                <div className="col-span-12 sm:col-span-4 flex sm:flex-col sm:items-end gap-4 sm:gap-3 pt-2 sm:pt-0">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-900 font-sans">{item.duration}</span>
                  {item.gpa && (
                    <div className="flex items-center gap-2 border border-zinc-900 px-3 py-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">GPA</span>
                      <span className="text-sm font-bold text-zinc-900 font-serif">{item.gpa}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">In Progress</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ── Certifications sub-header ── */}
          <motion.div
            variants={rowVariants}
            className="pt-8 pb-3 border-b border-zinc-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Certifications & Awards — {certs.length} credentials
            </p>
          </motion.div>

          {/* ── Certification Rows ── */}
          {certs.map((item, index) => {
            const meta = getEntryMeta(item);
            const isGov = item.level || item.hours;
            const isAppreciation = item.issuer;

            return (
              <motion.div
                key={item.id}
                variants={rowVariants}
                className="group grid grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 items-start border-b border-zinc-200 hover:bg-zinc-100/60 transition-colors duration-500 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                {/* Index */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-zinc-500 transition-colors duration-500">
                    {String(degree.length + index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Main */}
                <div className="col-span-10 sm:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 border border-zinc-300 px-2.5 py-1">
                      {meta.label}
                    </span>
                    {isGov && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700 border border-emerald-300 bg-emerald-50 px-2.5 py-1">
                        🏛 Government Recognized
                      </span>
                    )}
                    {isAppreciation && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-amber-700 border border-amber-300 bg-amber-50 px-2.5 py-1">
                        ★ Personal Development
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-zinc-900 leading-snug tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-600 font-sans">{item.institution}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans max-w-xl">{item.description}</p>

                  {/* Extra meta fields */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {meta.courses.map((c) => (
                      <span key={c} className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 bg-zinc-200/70 px-2.5 py-1">
                        {c}
                      </span>
                    ))}
                  </div>

                  {item.issuer && (
                    <p className="text-[10px] font-medium text-zinc-400 italic pt-1">
                      Issued by: {item.issuer}
                    </p>
                  )}
                </div>

                {/* Right Meta */}
                <div className="col-span-12 sm:col-span-3 flex sm:flex-col sm:items-end gap-3 pt-1 sm:pt-0">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-900 font-sans">{item.duration}</span>

                  {item.hours && (
                    <div className="flex items-center gap-2 border border-zinc-300 px-3 py-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">Hours</span>
                      <span className="text-sm font-bold text-zinc-900 font-serif">{item.hours}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Completed</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom Credibility Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: elegantEase, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-zinc-300 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: 'University', value: 'IUBAT' },
            { label: 'Current GPA', value: '3.5 / 4.0' },
            { label: 'Certifications', value: `${certs.length} Earned` },
            { label: 'Gov. Recognition', value: 'NSDA · BNQF' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">{label}</p>
              <p className="text-sm font-bold text-zinc-900 font-serif">{value}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
