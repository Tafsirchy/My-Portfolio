import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook, Send, MessageSquare, Terminal } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';
import ScrambleText from './ScrambleText';
import Radar from './Radar';

const Contact = () => {
  const sectionRef = useRef(null);
  
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Tafsir',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const iconMap = { Github, Linkedin, Twitter, Facebook };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 bg-background text-slate-900 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        {/* Section Headline */}
        <div className="mb-20 border-b border-black/10 pb-6 relative">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neon-olive tracking-widest uppercase font-bold">
              // SECTION: CNT
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <span className="text-neon-olive">{'>'}</span> System.Connect
            </h2>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold tracking-[0.3em] text-neon-navy uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Active_Channels
              </h3>
              
              <div className="grid gap-4">
                {/* Email */}
                <div 
                  className="group relative bg-white border border-black/10 p-6 flex items-center gap-6 hover:border-neon-navy transition-colors shadow-sm"
                  onMouseEnter={() => setHoveredCard('email')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Mail className="h-6 w-6 text-slate-500 group-hover:text-neon-navy transition-colors" />
                  <div className="flex-1">
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Direct_Message</p>
                    <a href={`mailto:${personalInfo.email}`} className="font-mono text-slate-900 font-bold text-sm hover:text-neon-navy transition-colors">
                      <ScrambleText text={personalInfo.email} forceHover={hoveredCard === 'email'} />
                    </a>
                  </div>
                </div>

                {/* WhatsApp/Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href={`tel:${personalInfo.phone}`} 
                    className="block group"
                    onMouseEnter={() => setHoveredCard('phone')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative bg-white border border-black/10 p-6 hover:border-neon-olive transition-colors h-full shadow-sm">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-olive opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Phone className="h-5 w-5 text-slate-500 group-hover:text-neon-olive transition-colors mb-4" />
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Voice_Comm</p>
                      <p className="font-mono text-sm text-slate-900 font-bold"><ScrambleText text={personalInfo.phone} forceHover={hoveredCard === 'phone'} /></p>
                    </div>
                  </a>

                  <a 
                    href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block group"
                    onMouseEnter={() => setHoveredCard('whatsapp')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative bg-white border border-black/10 p-6 hover:border-neon-navy transition-colors h-full shadow-sm">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-navy opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <SiWhatsapp className="h-5 w-5 text-slate-500 group-hover:text-neon-navy transition-colors mb-4" />
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Live_Chat</p>
                      <p className="font-mono text-sm text-slate-900 font-bold"><ScrambleText text={personalInfo.whatsapp} forceHover={hoveredCard === 'whatsapp'} /></p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Footprint */}
            <div className="space-y-6">
               <h3 className="font-mono text-xs font-bold tracking-[0.3em] text-neon-olive uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Social_Topology
              </h3>
              <Radar socialLinks={socialLinks} iconMap={iconMap} />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900 border border-neon-navy/30 p-8 md:p-10 relative shadow-[0_0_30px_rgba(15,23,42,0.5)]">
              {/* HUD Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-olive"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-olive"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-olive"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-olive"></div>

              <div className="mb-8 border-b border-white/10 pb-4">
                 <h3 className="font-mono text-sm text-white uppercase tracking-widest font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neon-olive" /> Init_Transmission
                 </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-neon-olive tracking-widest font-bold flex items-center gap-2">
                      <span>{'>'}</span> Enter_Identity:
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="[ TYPE HERE ]"
                      className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-slate-600 focus:border-neon-olive h-10 rounded-none uppercase text-xs font-bold shadow-none px-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-neon-olive tracking-widest font-bold flex items-center gap-2">
                      <span>{'>'}</span> Email_Endpoint:
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="[ TYPE HERE ]"
                      className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-slate-600 focus:border-neon-olive h-10 rounded-none uppercase text-xs font-bold shadow-none px-0 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neon-olive tracking-widest font-bold flex items-center gap-2">
                    <span>{'>'}</span> Subject_Matter:
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="[ TYPE HERE ]"
                    className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-slate-600 focus:border-neon-olive h-10 rounded-none uppercase text-xs font-bold shadow-none px-0 focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neon-olive tracking-widest font-bold flex items-center gap-2">
                    <span>{'>'}</span> Payload:
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="[ TYPE HERE ]"
                    rows={5}
                    className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-slate-600 focus:border-neon-olive rounded-none resize-none uppercase text-xs px-0 py-2 font-bold shadow-none focus-visible:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neon-olive/10 border border-neon-olive text-neon-olive font-bold h-14 uppercase tracking-[0.2em] hover:bg-neon-olive hover:text-slate-900 transition-colors flex items-center justify-center gap-3 text-xs mt-8 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neon-olive border-t-transparent rounded-full animate-spin"></div>
                      [ ENCRYPTING_DATA... ]
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      {'>'} TRANSMIT_PAYLOAD
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
