import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
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
  { name: 'Careers', path: '/careers' },
  { name: 'About', path: '/about' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-swiss relative flex items-center justify-center lg:justify-between">
        {/* Mobile Menu Button - LEFT on mobile */}
        <div className="flex-1 flex justify-start lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 transition-transform duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={devhubLogo}
            alt="DevHub Logo"
            className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          />
          <span className="font-poppins font-bold text-2xl tracking-tight group-hover:text-primary transition-colors duration-200">DevHorizon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
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
                  "px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1",
                  "hover:text-primary hover:-translate-y-0.5",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === link.name && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 bg-background border border-border shadow-medium min-w-[200px]"
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-3 text-sm transition-colors duration-150 hover:bg-secondary hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button asChild variant="hero" size="default">
            <Link to="/get-quote">Get Quote</Link>
          </Button>
        </div>

        {/* Spacer to balance mobile layout */}
        <div className="flex-1 lg:hidden" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container-swiss py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === link.name ? null : link.name
                        )}
                        className="w-full flex items-center justify-between py-3 text-base font-medium"
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
                            className="pl-4 border-l-2 border-primary ml-2"
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
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/get-quote">Get Quote</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
