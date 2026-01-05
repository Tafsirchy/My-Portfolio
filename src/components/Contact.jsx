import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll animations
  const opacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);
  const leftX = useTransform(smoothProgress, [0.2, 0.5], [-100, 0]);
  const rightX = useTransform(smoothProgress, [0.2, 0.5], [100, 0]);
  
  // Nexus nodes convergence
  const node1X = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const node2X = useTransform(smoothProgress, [0, 1], ["120%", "80%"]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const iconMap = { Github, Linkedin, Twitter };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Nexus Connection Nodes - Scroll Linked Convergence */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          style={{ x: node1X, opacity: useTransform(smoothProgress, [0, 0.5], [0, 1]) }}
          className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full"
        />
        <motion.div
           style={{ x: node2X, opacity: useTransform(smoothProgress, [0, 0.5], [0, 1]) }}
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"
        />
        
        {/* Connection Line pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">
        <motion.div style={{ opacity }}>
          {/* Section Headline */}
          <div className="mb-20 relative text-center">
            <motion.div
              style={{ y: useTransform(smoothProgress, [0, 1], [-30, 30]) }}
              className="flex flex-col items-center gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">CONNECTION</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white flex items-center justify-center gap-4">
                <MessageSquare className="w-10 h-10 md:w-14 md:h-14 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                Let's <span className="text-gradient">Collaborate</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
            </motion.div>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Info Cards - Slide from Left */}
            <motion.div style={{ x: leftX }} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase flex items-center gap-4">
                  Communication Channels <span className="flex-1 h-px bg-white/5"></span>
                </h3>
                
                <div className="grid gap-4">
                  {/* Email */}
                  <Card className="group bg-white/5 backdrop-blur-xl border-white/10 text-white hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-500">
                        <Mail className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Direct Message</p>
                        <a href={`mailto:${personalInfo.email}`} className="text-gray-100 hover:text-cyan-400 transition-colors font-semibold text-base">
                          {personalInfo.email}
                        </a>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </CardContent>
                  </Card>

                  {/* WhatsApp/Phone Pod */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="group bg-white/5 backdrop-blur-xl border-white/10 text-white hover:border-indigo-500/50 transition-all duration-500 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-all">
                          <Phone className="h-5 w-5 text-indigo-400" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Voice</p>
                        <p className="text-sm font-semibold">{personalInfo.phone}</p>
                      </CardContent>
                    </Card>

                    <Card className="group bg-white/5 backdrop-blur-xl border-white/10 text-white hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all">
                          <MessageSquare className="h-5 w-5 text-emerald-400" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                        <p className="text-sm font-semibold">Live Consultant</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Social Footprint */}
              <div className="pt-4">
                 <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase flex items-center gap-4 mb-6">
                  Social Topology <span className="flex-1 h-px bg-white/5"></span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:border-cyan-500 hover:text-cyan-400 transition-all duration-500 hover:-translate-y-2 group shadow-xl"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                         <Icon className="h-6 w-6 transition-transform group-hover:rotate-[15deg]" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form - Slide from Right */}
            <motion.div style={{ x: rightX }}>
              <Card className="bg-white/5 backdrop-blur-2xl border-white/10 text-white p-8 md:p-10 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Endpoint</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@nexus.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Inquiry Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project discussion"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Transmission Data</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Type your message here..."
                      rows={5}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold h-14 rounded-xl shadow-2xl shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] active:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ENCRYPTING TRANSMISSION...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Send className="h-5 w-5" />
                        INITIATE CONNECTION
                      </span>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center gap-3 text-cyan-400 font-bold text-xs uppercase tracking-widest"
                    >
                      ✓ Transmission Verified
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modern Radial Separation */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Contact;
