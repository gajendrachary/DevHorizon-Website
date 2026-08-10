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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="container-swiss pb-4">
                <div className="rounded-3xl border border-border bg-card p-4 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === link.name ? null : link.name)
                            }
                            className="w-full flex items-center justify-between py-3 text-base font-medium text-foreground"
                          >
                            {link.name}
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 transition-transform duration-200",
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
                                className="overflow-hidden pl-4 border-l-2 border-primary ml-1"
                              >
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block py-2 text-sm text-muted-foreground hover:text-primary"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className={cn(
                            "block py-3 text-base font-medium transition-colors",
                            location.pathname === link.path
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                          )}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="pt-3">
                    <Button asChild variant="hero" size="lg" className="w-full">
                      <Link to="/get-quote">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
