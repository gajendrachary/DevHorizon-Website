import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

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
  return (
    <footer className="footer-dark">
      <div className="container-swiss section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <span className="text-primary-foreground font-logo font-bold text-lg">D</span>
              </div>
              <span className="font-logo font-bold text-xl text-primary-foreground tracking-tight">DevHub</span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Transforming ideas into digital excellence. We build custom websites, mobile apps, and manage Meta ads to help businesses grow in the digital age.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-sm opacity-80">
                  Vidyaranyapura, Bengaluru,<br />
                  Karnataka, India
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@devhub.tech"
                  className="flex items-center gap-3 text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary"
                >
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  contact@devhub.tech
                </a>
              </li>
              <li>
                <a
                  href="tel:+918688097373"
                  className="flex items-center gap-3 text-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:text-primary"
                >
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  +91 8688097373
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60 text-center md:text-left">
            © 2025 DevHub. All rights reserved. Crafted with precision in Bengaluru 🇮🇳
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <Link
              to="/privacy"
              className="text-sm opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
