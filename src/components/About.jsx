import { personalInfo } from '@/data/portfolio';
import { Layers, Zap, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Layers,
      title: 'Full-Stack Architecture',
      description: 'End-to-end expertise spanning reactive Next.js/React frontends, robust Node/Express/NestJS APIs, and optimized databases (MongoDB, PostgreSQL).',
    },
    {
      icon: Zap,
      title: 'Performance & Craftsmanship',
      description: 'Obsessed with fast render times, clean markup, semantic SEO, and intuitive user interfaces that balance aesthetic beauty with practical utility.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Production Standards',
      description: 'Writing maintainable, type-safe, and secure code with rigorous state management, role-based auth, and scalable cloud deployment workflows.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            A software engineer dedicated to clean code, scalable architecture, and thoughtful design.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-base text-zinc-600 leading-relaxed">
            <p>
              I am a web developer and founder based in Dhaka, Bangladesh. Currently pursuing my Bachelor of Science in Computer Science at the <strong className="text-zinc-900 font-medium">International University of Business Agriculture and Technology (IUBAT)</strong>, I bridge technical software engineering principles with contemporary web design.
            </p>
            <p>
              As the Founder & CEO of <strong className="text-zinc-900 font-medium">BOONEC</strong>, I lead full-cycle web development for startups, e-commerce brands, and enterprise platforms. My work ranges from building geospatial property exploration engines and high-throughput corporate e-commerce backends to designing intuitive SaaS tools.
            </p>
            <p>
              I believe great software is defined by clarity, speed, and usability. I don't build unnecessary complexity; I craft clean, reliable systems that recruiters, clients, and end-users love interacting with.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modern React 19 & Next.js 16</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RESTful APIs & Database Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Payment Gateways (Stripe) & Auth</span>
              </div>
            </div>
          </div>

          {/* Highlights / Pillar Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
