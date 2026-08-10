import { Link } from "react-router-dom";
import { Linkedin, Github, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import devhubLogo from "@/assets/devhub-logo.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Reviews", path: "/reviews" },
  { name: "About", path: "/about" },
  { name: "Privacy & Terms", path: "/privacy" },
];

const services = [
  { name: "Web Development", path: "/services/web-development" },
  { name: "Mobile Apps", path: "/services/mobile-apps" },
  { name: "Meta Ads", path: "/services/meta-ads" },
  { name: "UI/UX Design", path: "/get-quote" },
  { name: "Cloud Solutions", path: "/get-quote" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/devhorizon-technologies-pvt-ltd/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/DevHorizon-Technologies", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/devhorizon.technologies/", label: "Instagram" },
];

export const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer ref={ref} className="footer-dark lg:rounded-b-[2rem]">
      <div className="container-swiss section-padding">
        {/* Top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="surface-card mb-16 flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <span className="eyebrow">[ Let's Build ]</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
              Have a project in mind? Let's talk.
            </h2>
          </div>
          <Button asChild variant="hero" size="lg" className="pl-7 pr-2 self-start md:self-auto">
            <Link to="/get-quote" className="flex items-center gap-3">
              Get a Quote
              <span className="arrow-badge">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <img
                src={devhubLogo}
                alt="DevHorizon Technologies logo"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-poppins font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                DevHorizon Technologies Private Limited
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">
              Transforming ideas into digital excellence. We build custom websites, mobile apps, and manage Meta ads to
              help businesses grow in the digital age.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border text-foreground/80 flex items-center justify-center transition-colors duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="eyebrow mb-6">[ Quick Links ]</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="eyebrow mb-6">[ Services ]</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="eyebrow mb-6">[ Contact ]</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Vidyaranyapura, Bengaluru,
                  <br />
                  Karnataka, India
                </span>
              </li>
              <li>
                <a
                  href="mailto:info@devhorizontech.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  info@devhorizontech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918688097373"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  +91 8688097373
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2026 DevHorizon Technologies Private Limited. All rights reserved. We build your business
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
