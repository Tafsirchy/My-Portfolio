import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

const elegantEase = [0.16, 1, 0.3, 1];

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
      const result = await emailjs.send(
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

      console.log('Email sent successfully:', result.text);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Email send failed:', error);
      setErrorMsg(
        'Unable to transmit inquiry right now. Please dispatch directly via email to ' + personalInfo.email
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-[#FFFFFF] border-t border-zinc-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: elegantEase }}
          className="mb-10 sm:mb-14 border-b border-zinc-300 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight text-zinc-900 uppercase leading-none">
            Contact
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:pb-2">
            Direct Inquiries & Engagements
          </p>
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Dossier & Communication Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: elegantEase }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Strip */}
            <div className="border border-zinc-300 bg-zinc-100/70 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Current Status
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available For Work
              </span>
            </div>

            {/* Narrative Header */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-900 leading-snug tracking-tight">
                Let's architect something of enduring value.
              </h3>
              <p className="text-sm text-zinc-600 mt-2 font-sans leading-relaxed">
                Open to senior engineering roles, high-stakes contracts, or strategic partnerships through BOONEC.
              </p>
            </div>

            {/* Channels Ledger */}
            <div className="border border-zinc-300 divide-y divide-zinc-200">
              
              {/* Direct Email */}
              <div className="p-4 sm:p-5 group hover:bg-zinc-100/50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                    01 // Direct Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border border-zinc-300 hover:border-zinc-900 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 text-zinc-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-base font-serif font-bold text-zinc-900 hover:text-zinc-600 transition-colors block"
                >
                  {personalInfo.email}
                </a>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Typical response time: &lt; 24 hours
                </p>
              </div>

              {/* WhatsApp / Phone */}
              <div className="p-4 sm:p-5 group hover:bg-zinc-100/50 transition-colors">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 block mb-1.5">
                  02 // WhatsApp & Urgent Line
                </span>
                <a
                  href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-base font-serif font-bold text-zinc-900 hover:text-emerald-700 transition-colors"
                >
                  <SiWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{personalInfo.phone}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Available for technical evaluations & scheduled syncs
                </p>
              </div>

              {/* Location */}
              <div className="p-4 sm:p-5 group hover:bg-zinc-100/50 transition-colors">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 block mb-1.5">
                  03 // Location & Timezone
                </span>
                <p className="text-sm font-bold text-zinc-900 font-sans">
                  {personalInfo.location} · UTC+6 (BST)
                </p>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Global remote ready · Open to international relocation
                </p>
              </div>

            </div>

            {/* Social Grid */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2.5">
                Official Channels
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Tafsirchy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-100 transition-all text-xs font-bold uppercase tracking-wider text-zinc-900 group"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tafsirchy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-100 transition-all text-xs font-bold uppercase tracking-wider text-zinc-900 group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
                <a
                  href="https://x.com/chy_tafsir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-100 transition-all text-xs font-bold uppercase tracking-wider text-zinc-900 group"
                >
                  <span>Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: elegantEase, delay: 0.15 }}
            className="lg:col-span-7 border border-zinc-300 bg-[#FFFFFF]"
          >
            {/* Terminal Header */}
            <div className="border-b border-zinc-300 px-6 py-3 flex items-center justify-between bg-zinc-100/70">
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">
                Direct Dispatch Terminal
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Encrypted Form
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif text-zinc-900 leading-tight">
                  Send a Detailed Inquiry
                </h3>
                <p className="text-xs text-zinc-500 font-sans mt-1">
                  Deliver your requirements directly to my personal terminal inbox.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 border border-red-300 bg-red-50 text-xs text-red-800 font-sans">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 block" htmlFor="name">
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 text-sm bg-transparent border border-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors rounded-none placeholder:text-zinc-400 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 block" htmlFor="email">
                      Return Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-transparent border border-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors rounded-none placeholder:text-zinc-400 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 block" htmlFor="subject">
                    Subject / Project Scope *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Role / SaaS Platform Build"
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border border-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors rounded-none placeholder:text-zinc-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 block" htmlFor="message">
                    Project Details & Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Brief overview of project goals, timeline, or position details..."
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border border-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors rounded-none placeholder:text-zinc-400 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
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
