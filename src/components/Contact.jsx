import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo, socialLinks } from '@/data/portfolio';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

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
    setFormData(prev => ({
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
      setErrorMsg('Unable to send message via form right now. Please email directly at ' + personalInfo.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Let's start a conversation.
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Interested in hiring me for a full-time role, contracting me for a high-priority project, or partnering with BOONEC? Reach out below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with 1-click copy */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-zinc-900 font-semibold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-zinc-700" />
                  </div>
                  <span>Direct Email</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="text-base font-semibold text-zinc-900 hover:text-zinc-600 block transition-colors"
              >
                {personalInfo.email}
              </a>
              <p className="text-xs text-zinc-500">
                Typically responds within 24 hours.
              </p>
            </div>

            {/* WhatsApp & Phone Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-zinc-900 font-semibold text-sm">
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
                  <SiWhatsapp className="w-4 h-4 text-emerald-600" />
                </div>
                <span>WhatsApp / Direct Line</span>
              </div>

              <a
                href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-zinc-900 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
              >
                {personalInfo.phone}
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
              <p className="text-xs text-zinc-500">
                Available for urgent inquiries & technical discussions.
              </p>
            </div>

            {/* Location & Availability Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-zinc-900 font-semibold text-sm">
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-zinc-700" />
                </div>
                <span>Location & Timezone</span>
              </div>
              <p className="text-sm font-semibold text-zinc-800">
                {personalInfo.location} · UTC+6
              </p>
              <p className="text-xs text-zinc-500">
                Open to remote worldwide contracts, full-time positions & international relocation.
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Professional Networks
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Tafsirchy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tafsirchy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://x.com/chy_tafsir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-800 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-50/70 border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-zinc-950 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6">
              Fill in your details below and I'll receive it instantly in my primary inbox.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry / Full-stack opportunity"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your team, project timeline, or questions..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

          </div>

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
