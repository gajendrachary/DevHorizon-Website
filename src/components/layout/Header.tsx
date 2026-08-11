import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight, Clock, LifeBuoy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import devhubLogo from '@/assets/devhub-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    dropdown: [
      { name: 'Web Development', path: '/services/web-development' },
      { name: 'Mobile Apps', path: '/services/mobile-apps' },
      { name: 'Meta Ads', path: '/services/meta-ads' },
    ]
  },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Reviews', path: '/reviews' },
  {
    name: 'Careers',
    path: '/careers',
    dropdown: [
      { name: 'About', path: '/careers/about' },
      { name: 'Why Join Us', path: '/careers/why-join' },
      { name: 'Process', path: '/careers/process' },
      { name: 'Resume Tips', path: '/careers/resume-tips' },
      { name: 'FAQ', path: '/careers/faq' },
      { name: 'Apply', path: '/careers/apply' },
    ],
  },
  { name: 'About', path: '/about' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative z-50">
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-border/70">
        <div className="container-swiss flex items-center justify-between py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Fast &amp; reliable IT solution services.</span>
            <Link
              to="/get-quote"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4"
            >
              Start Now
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              9 am to 6 pm [mon-sat]
            </span>
            <span className="h-3 w-px bg-border" />
            <a
              href="mailto:info@devhorizontech.com"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-primary" />
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Floating pill navbar */}
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
        <div className="container-swiss py-3">
          <div className="flex items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-4 py-2.5 lg:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-foreground transition-transform duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src={devhubLogo}
                alt="DevHorizon Technologies logo"
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-poppins font-bold text-xl lg:text-2xl tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                DevHorizon
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-1",
                      "hover:text-primary",
                      location.pathname === link.path ? "text-primary" : "text-foreground/75"
                    )}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.name && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 pt-3 min-w-[220px]"
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-medium">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block rounded-xl px-3 py-2.5 text-sm text-popover-foreground/85 transition-colors duration-150 hover:bg-accent hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Button asChild variant="hero" size="default" className="pl-6 pr-2">
                <Link to="/get-quote" className="flex items-center gap-3">
                  Get Started
                  <span className="arrow-badge">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </Button>
            </div>

            {/* Mobile spacer to keep logo centered */}
            <span className="w-9 lg:hidden" />
          </div>
        </div>

        {/* Mobile Menu - slide in from left */}
        {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px]"
              />
              <motion.div
                key="drawer"
                initial={{ opacity: 0, x: -24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.96 }}
                transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
                className="lg:hidden fixed top-20 left-4 z-50 w-auto max-w-[80vw] max-h-[75vh] overflow-y-auto rounded-3xl border border-foreground/15 bg-foreground/5 backdrop-blur-2xl shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.35)] p-3"
              >
                <nav className="flex flex-col gap-2 min-w-[13rem]">
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col gap-2">
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === link.name ? null : link.name)
                            }
                            className="w-full flex items-center justify-between gap-6 rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-xl transition-colors active:scale-[0.98]"
                          >
                            {link.name}
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                activeDropdown === link.name && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === link.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1.5 pl-3">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className="rounded-xl border border-foreground/10 bg-foreground/5 px-3.5 py-2 text-xs text-muted-foreground backdrop-blur-xl hover:text-primary"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          className={cn(
                            "rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm font-medium backdrop-blur-xl transition-colors active:scale-[0.98]",
                            location.pathname === link.path
                              ? "text-primary border-primary/40"
                              : "text-foreground hover:text-primary"
                          )}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Button asChild variant="hero" size="lg" className="w-full mt-1">
                    <Link to="/get-quote">Get Started</Link>
                  </Button>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body)}
      </div>
    </div>
  );
};
