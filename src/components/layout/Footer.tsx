import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import devhubLogo from '@/assets/devhub-logo.png';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'About', path: '/about' },
  { name: 'Privacy & Terms', path: '/privacy' },
];

const services = [
  { name: 'Web Development', path: '/services/web-development' },
  { name: 'Mobile Apps', path: '/services/mobile-apps' },
  { name: 'Meta Ads', path: '/services/meta-ads' },
  { name: 'UI/UX Design', path: '/get-quote' },
  { name: 'Cloud Solutions', path: '/get-quote' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/gajendrachary', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/gajendrachary', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <footer ref={ref} className="footer-dark">
      <div className="container-swiss section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <motion.img 
                src={devhubLogo} 
                alt="DevHub Logo" 
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-logo font-bold text-xl text-primary-foreground tracking-tight group-hover:text-primary transition-colors duration-200">DevHub</span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Transforming ideas into digital excellence. We build custom websites, mobile apps, and manage Meta ads to help businesses grow in the digital age.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-primary-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary hover:translate-x-2 inline-block group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-primary-foreground mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={service.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={service.path}
                    className="text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary hover:translate-x-2 inline-block group"
                  >
                    <span className="relative">
                      {service.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-primary-foreground mb-6">Contact</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-sm opacity-80">
                  Vidyaranyapura, Bengaluru,<br />
                  Karnataka, India
                </span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a
                  href="mailto:contact@devhub.tech"
                  className="flex items-center gap-3 text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary"
                >
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  contact@devhub.tech
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a
                  href="tel:+918688097373"
                  className="flex items-center gap-3 text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary"
                >
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  +91 8688097373
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm opacity-60 text-center md:text-left">
            © 2025 DevHub. All rights reserved. Crafted with precision in Bengaluru 🇮🇳
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm opacity-60 transition-opacity duration-200 hover:opacity-100 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/privacy"
              className="text-sm opacity-60 transition-opacity duration-200 hover:opacity-100 hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
