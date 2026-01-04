import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life
            </p>
          </motion.div>

          {/* Contact Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {/* Email */}
                  <Card className="hover-glow transition-all duration-300">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Email</p>
                        <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:text-primary-600 transition-colors">
                          {personalInfo.email}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone */}
                  <Card className="hover-glow transition-all duration-300">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Phone</p>
                        <a href={`tel:${personalInfo.phone}`} className="text-gray-900 hover:text-primary-600 transition-colors">
                          {personalInfo.phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  <Card className="hover-glow transition-all duration-300">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Location</p>
                        <p className="text-gray-900">{personalInfo.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white hover-glow transition-all duration-300 hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="glass hover-glow">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your project..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitStatus === 'success' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-600 text-sm text-center"
                      >
                        ✓ Message sent successfully!
                      </motion.p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
