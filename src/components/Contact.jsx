import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const iconMap = {
    Github,
    Linkedin,
    Twitter,
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Dynamic Background Textures */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Connection Line Pattern */}
        <svg className="absolute top-1/2 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Connection Nodes */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full"
        />
      </div>

      {/* Top Portal Glow (Receiving from Projects) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Headline - Global System */}
          <div className="mb-20 relative text-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-4"
            >
              <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">CONNECTION</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white flex items-center justify-center gap-4">
                <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
                Get In <span className="text-gradient">Touch</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                Ready to transform your vision into a digital masterpiece? Let's discuss your next project or just say hello.
              </p>
            </motion.div>
          </div>

          {/* Contact Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Left Column: Contact Cards */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-3">
                  <span className="w-8 h-px bg-indigo-500"></span>
                  Information
                </h3>
                
                <div className="grid gap-4">
                  {/* Email */}
                  <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden h-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                    <CardContent className="p-0 h-full flex items-center px-6 gap-5 relative z-10">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500 shadow-lg shadow-cyan-500/10">
                        <Mail className="h-6 w-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Direct Mail</p>
                        <a href={`mailto:${personalInfo.email}`} className="text-gray-100 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">
                          {personalInfo.email}
                        </a>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-5 w-5 text-cyan-500" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone */}
                  <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden h-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                    <CardContent className="p-0 h-full flex items-center px-6 gap-5 relative z-10">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500 shadow-lg shadow-indigo-500/10">
                        <Phone className="h-5 w-5 text-indigo-400 group-hover:-rotate-12 transition-transform" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Call Me</p>
                        <a href={`tel:${personalInfo.phone}`} className="text-gray-100 hover:text-indigo-400 transition-colors font-semibold text-sm md:text-base">
                          {personalInfo.phone}
                        </a>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-5 w-5 text-indigo-500" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* WhatsApp */}
                  {personalInfo.whatsapp && (
                    <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden h-24">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                      <CardContent className="p-0 h-full flex items-center px-6 gap-5 relative z-10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500 shadow-lg shadow-emerald-500/10">
                          <MessageSquare className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Live Chat</p>
                          <a 
                            href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-200 hover:text-emerald-400 transition-colors font-semibold text-sm md:text-base"
                          >
                            WhatsApp Conversation
                          </a>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {/* Location Card */}
                  <Card className="group bg-white/5 backdrop-blur-md border-white/10 text-white hover:border-slate-500/50 transition-all duration-500 relative overflow-hidden h-24">
                    <CardContent className="p-0 h-full flex items-center px-6 gap-5 relative z-10">
                      <div className="w-12 h-12 bg-slate-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-slate-500/20 transition-all duration-500 shadow-lg shadow-slate-500/10">
                        <MapPin className="h-5 w-5 text-slate-400 group-hover:bounce transition-transform" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Base</p>
                        <p className="text-gray-200 font-semibold text-sm md:text-base tracking-wide">{personalInfo.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Social Links Pod */}
              <div className="pt-6">
                <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase mb-6 flex items-center gap-3">
                   Connect Socially <span className="flex-1 h-px bg-slate-800"></span>
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
                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:border-cyan-500 hover:text-cyan-400 transition-all duration-500 hover:scale-110 hover:-translate-y-2 relative group overflow-hidden shadow-xl"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Icon className="h-6 w-6 relative z-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white p-8 shadow-2xl relative overflow-hidden group">
                {/* Subtle Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 h-12 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 h-12 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can I help you?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 h-12 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      rows={5}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold h-12 shadow-lg shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] active:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        <span>Send Direct Message</span>
                      </div>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-3 text-emerald-400 font-medium"
                    >
                      <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">✓</div>
                      <span>Message received! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
