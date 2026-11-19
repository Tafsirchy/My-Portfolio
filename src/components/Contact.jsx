'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

const elegantEase = [0.16, 1, 0.3, 1];

const labelClass = 'block text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 mb-2';
const fieldClass =
  'w-full min-h-[44px] bg-transparent border-0 border-b border-zinc-300 px-0 py-2.5 text-base text-zinc-900 font-sans placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 rounded-none transition-colors';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Tafsirchy' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tafsirchy/' },
  { label: 'Twitter', href: 'https://x.com/chy_tafsir' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Tafsir Chowdhury',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSuccessModalOpen(true);
    } catch {
      setErrorMsg('Something went wrong. Please email me directly at ' + personalInfo.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#FFFFFF] border-t border-zinc-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: elegantEase }}
          className="mb-10 sm:mb-16 border-b border-zinc-300 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase leading-none">
            Contact
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:pb-2">
            Say hello
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Statement & Direct Contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: elegantEase }}
          >
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Available for work
            </div>

            <h3 className="mt-5 text-3xl sm:text-4xl font-serif text-zinc-900 leading-[1.15] tracking-tight">
              Have an idea?<br />Let's build it.
            </h3>
            <p className="mt-4 text-sm text-zinc-600 leading-relaxed font-sans max-w-sm">
              Open to full-time roles, freelance projects and long-term collaborations.
              I usually reply within a day.
            </p>

            {/* Primary channel: email */}
            <div className="mt-10">
              <div className="flex items-center justify-between gap-4 border-b border-zinc-300 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 min-h-[40px] -my-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 hover:text-zinc-900 transition-colors"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group mt-3 inline-flex items-start gap-2 text-xl sm:text-2xl font-serif text-zinc-900 hover:text-zinc-600 transition-colors break-all"
              >
                <span>{personalInfo.email}</span>
                <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-zinc-400 group-hover:text-zinc-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Secondary details */}
            <dl className="mt-10 border-t border-zinc-200">
              <div className="flex items-baseline justify-between gap-6 py-4 border-b border-zinc-200">
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  Phone
                </dt>
                <dd>
                  <a
                    href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    <SiWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                    {personalInfo.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4 border-b border-zinc-200">
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  Location
                </dt>
                <dd className="text-sm text-zinc-700">
                  {personalInfo.location} · UTC+6
                </dd>
              </div>
            </dl>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Message Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: elegantEase, delay: 0.15 }}
            className="lg:border-l lg:border-zinc-200 lg:pl-14"
          >
            <h3 className="text-xl sm:text-2xl font-serif text-zinc-900 leading-tight">
              Send a message
            </h3>
            <p className="mt-2 text-sm text-zinc-500 font-sans">
              A short brief is enough — I'll take it from there.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Role, project or collaboration"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about what you have in mind..."
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {errorMsg && (
                <p className="border-l-2 border-red-400 pl-3 text-xs text-red-700 font-sans leading-relaxed">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </section>
  );
};

export default Contact;
