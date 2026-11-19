'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  ExternalLink,
} from 'lucide-react';
import { SiWhatsapp, SiGithub, SiLinkedin, SiX, SiFacebook } from 'react-icons/si';
import { personalInfo } from '@/data/portfolio';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

export default function DedicatedContact() {
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
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_y380e22';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_v84k5o8';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Nq88uR-T2g2H3sH2L';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          to_name: 'Tafsir Chowdhury',
        },
        publicKey
      );

      setIsSuccessModalOpen(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setErrorMsg('Failed to send message. Please reach out directly via email or WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactChannels = [
    {
      title: 'Email Address',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      accent: 'text-[#4F46E5] dark:text-[#6366F1]',
      iconBoxBg: 'bg-[#4F46E5]/10 dark:bg-[#6366F1]/15 border-[#4F46E5]/25 dark:border-[#6366F1]/30',
      hoverBorder: 'hover:border-[#4F46E5]/40 dark:hover:border-[#6366F1]/40',
      hoverBg: 'hover:bg-[#4F46E5]/5 dark:hover:bg-[#6366F1]/5',
      actionText: 'Compose Email',
      onCopy: handleCopyEmail,
      isCopied: copiedEmail,
    },
    {
      title: 'WhatsApp & Direct Call',
      value: personalInfo.phone,
      href: 'https://wa.me/8801633996633',
      icon: SiWhatsapp,
      accent: 'text-[#25D366]',
      iconBoxBg: 'bg-[#25D366]/10 dark:bg-[#25D366]/15 border-[#25D366]/25 dark:border-[#25D366]/30',
      hoverBorder: 'hover:border-[#25D366]/40',
      hoverBg: 'hover:bg-[#25D366]/5',
      actionText: 'Open Chat',
      onCopy: handleCopyPhone,
      isCopied: copiedPhone,
    },
    {
      title: 'Location & Timezone',
      value: `${personalInfo.location} (GMT+6)`,
      subtitle: 'Available worldwide for remote work & consulting',
      icon: MapPin,
      accent: 'text-[#E06D53] dark:text-[#F59E0B]',
      iconBoxBg: 'bg-[#E06D53]/10 dark:bg-[#F59E0B]/15 border-[#E06D53]/25 dark:border-[#F59E0B]/30',
      hoverBorder: 'hover:border-[#E06D53]/40 dark:hover:border-[#F59E0B]/40',
      hoverBg: 'hover:bg-[#E06D53]/5 dark:hover:bg-[#F59E0B]/5',
    },
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/Tafsirchy', 
      icon: SiGithub, 
      handle: '@Tafsirchy',
      iconColor: 'text-[#181717] dark:text-white',
      iconBoxBg: 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15',
      hoverBorder: 'hover:border-black/30 dark:hover:border-white/30',
      hoverBg: 'hover:bg-black/5 dark:hover:bg-white/5',
      textHover: 'group-hover:text-black dark:group-hover:text-white',
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/tafsirchy/', 
      icon: SiLinkedin, 
      handle: 'tafsirchy',
      iconColor: 'text-[#0A66C2]',
      iconBoxBg: 'bg-[#0A66C2]/10 dark:bg-[#0A66C2]/15 border-[#0A66C2]/25 dark:border-[#0A66C2]/30',
      hoverBorder: 'hover:border-[#0A66C2]/40',
      hoverBg: 'hover:bg-[#0A66C2]/5',
      textHover: 'group-hover:text-[#0A66C2]',
    },
    { 
      name: 'Twitter / X', 
      url: 'https://x.com/chy_tafsir', 
      icon: SiX, 
      handle: '@chy_tafsir',
      iconColor: 'text-black dark:text-white',
      iconBoxBg: 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15',
      hoverBorder: 'hover:border-black/30 dark:hover:border-white/30',
      hoverBg: 'hover:bg-black/5 dark:hover:bg-white/5',
      textHover: 'group-hover:text-black dark:group-hover:text-white',
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/tafsir.chowdhury.973567', 
      icon: SiFacebook, 
      handle: 'Tafsir Chowdhury',
      iconColor: 'text-[#1877F2]',
      iconBoxBg: 'bg-[#1877F2]/10 dark:bg-[#1877F2]/15 border-[#1877F2]/25 dark:border-[#1877F2]/30',
      hoverBorder: 'hover:border-[#1877F2]/40',
      hoverBg: 'hover:bg-[#1877F2]/5',
      textHover: 'group-hover:text-[#1877F2]',
    },
  ];

  return (
    <div className="space-y-12">
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      {/* Primary Channels in Soft Stone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactChannels.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className={`p-5 rounded-2xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 shadow-xs flex flex-col justify-between gap-4 transition-colors group ${channel.hoverBorder} ${channel.hoverBg}`}
            >
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-xs transition-all ${channel.iconBoxBg}`}>
                  <Icon className={`w-5 h-5 ${channel.accent} transition-transform duration-200 group-hover:scale-110`} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#5A606E] dark:text-[#9CA3AF]">
                  {channel.title}
                </h2>
                <p className="text-sm font-bold text-[#181A20] dark:text-[#F3F4F6] break-all">
                  {channel.value}
                </p>
                {channel.subtitle && (
                  <p className="text-xs text-[#5A606E] dark:text-[#9CA3AF] leading-relaxed">
                    {channel.subtitle}
                  </p>
                )}
              </div>

              {channel.href && (
                <div className="flex items-center gap-2 pt-3 border-t border-[rgba(24,26,32,0.06)] dark:border-white/5">
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#181A20] dark:text-[#F3F4F6] hover:text-[#4F46E5] dark:hover:text-[#6366F1] transition-colors"
                  >
                    <span>{channel.actionText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={channel.onCopy}
                    className="p-1 text-[#5A606E] dark:text-[#9CA3AF] hover:text-[#181A20] dark:hover:text-white transition-colors ml-auto cursor-pointer"
                    aria-label={`Copy ${channel.title}`}
                  >
                    {channel.isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Social Profiles Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A606E] dark:text-[#9CA3AF]">
            Professional Networks &amp; Socials
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`group p-3 sm:p-4 rounded-xl bg-[#F1EFEA] dark:bg-[#181B24] border border-[rgba(24,26,32,0.07)] dark:border-white/10 transition-colors flex items-center gap-2.5 sm:gap-3 shadow-xs ${social.hoverBorder} ${social.hoverBg}`}
              >
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all shrink-0 shadow-xs ${social.iconBoxBg} ${social.iconColor}`}>
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <span className={`block text-xs font-bold text-[#181A20] dark:text-[#F3F4F6] truncate transition-colors ${social.textHover}`}>
                    {social.name}
                  </span>
                  <span className="block text-[11px] text-[#5A606E] dark:text-[#9CA3AF] truncate">
                    {social.handle}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Direct Interactive Message Form */}
      <section className="space-y-4 pt-4 border-t border-[rgba(24,26,32,0.07)] dark:border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E06D53] dark:bg-[#F59E0B]" />
            <h2 className="text-xl font-bold tracking-tight text-[#181A20] dark:text-[#F3F4F6]">
              Send a Direct Message
            </h2>
          </div>
          <p className="text-sm text-[#5A606E] dark:text-[#9CA3AF]">
            Fill in your details below and your message will land straight into my inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-[#181A20] dark:text-[#F3F4F6]">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(24,26,32,0.09)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#0F1117] text-sm text-[#181A20] dark:text-[#F3F4F6] placeholder:text-[#5A606E]/60 dark:placeholder:text-[#9CA3AF]/60 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#181A20] dark:text-[#F3F4F6]">
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(24,26,32,0.09)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#0F1117] text-sm text-[#181A20] dark:text-[#F3F4F6] placeholder:text-[#5A606E]/60 dark:placeholder:text-[#9CA3AF]/60 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-xs font-semibold text-[#181A20] dark:text-[#F3F4F6]">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Project Collaboration / Opportunity"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(24,26,32,0.09)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#0F1117] text-sm text-[#181A20] dark:text-[#F3F4F6] placeholder:text-[#5A606E]/60 dark:placeholder:text-[#9CA3AF]/60 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-[#181A20] dark:text-[#F3F4F6]">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project, timeline, or idea..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[rgba(24,26,32,0.09)] dark:border-white/10 bg-[#FAF9F6] dark:bg-[#0F1117] text-sm text-[#181A20] dark:text-[#F3F4F6] placeholder:text-[#5A606E]/60 dark:placeholder:text-[#9CA3AF]/60 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all resize-none shadow-xs"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-rose-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold shadow-md shadow-[#4F46E5]/25 disabled:opacity-50 transition-all hover:scale-105"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
