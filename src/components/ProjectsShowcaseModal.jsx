import { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Target, Compass, CheckCircle2 } from 'lucide-react';

export default function ProjectsShowcaseModal({ isOpen, onClose, project }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Project Case Study
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Project Banner / Image */}
          {project.images && project.images.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 aspect-video relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = "https://placehold.co/1200x675/f4f4f5/71717a?text=" + encodeURIComponent(project.title);
                }}
              />
            </div>
          )}

          {/* Title & Description */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                {project.title}
              </h2>
              
              {/* Quick links */}
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors shadow-xs"
                  >
                    Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors border border-zinc-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Layers className="w-3.5 h-3.5" />
              <span>Technologies & Architecture</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Engineering Challenges Solved */}
          {project.challenges && (
            <div className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-800">
                <Target className="w-4 h-4 text-zinc-900" />
                <span>Core Engineering Challenges Overcome</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Future Roadmap / Enhancements */}
          {project.futurePlans && (
            <div className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-800">
                <Compass className="w-4 h-4 text-zinc-900" />
                <span>Planned Roadmap & Scalability</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {project.futurePlans}
              </p>
            </div>
          )}

          {/* Additional Github Server repository if available */}
          {project.githubServerUrl && (
            <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
              <span>Backend Repository available:</span>
              <a
                href={project.githubServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-900 hover:underline inline-flex items-center gap-1"
              >
                View Server Repository
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
