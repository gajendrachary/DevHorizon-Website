import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceIcons = [
  { icon: Globe, label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: BarChart3, label: 'Meta Ads' },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-swiss relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Est. June 2025 • Bengaluru, India
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transforming Ideas Into{' '}
              <span className="gradient-text">Digital Excellence</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg text-muted-foreground mb-4 font-medium"
            >
              Custom Websites • Mobile Apps • Meta Ads Management • Strategic Growth Solutions
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              DevHub is a full-service digital agency specializing in crafting exceptional digital experiences. 
              We help businesses establish a powerful online presence and drive measurable growth through 
              innovative technology solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button asChild variant="hero" size="lg">
                <Link to="/get-quote" className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/projects">View Our Work</Link>
              </Button>
            </motion.div>

            {/* Service Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-6"
            >
              {serviceIcons.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-10 h-10 bg-background border border-border flex items-center justify-center transition-all duration-200 hover:border-primary hover:text-primary">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <span className="hidden sm:block">{service.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative float-animation">
              {/* Main illustration container */}
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Abstract tech elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent" />
                <div className="absolute top-8 left-8 w-32 h-32 border-4 border-primary" />
                <div className="absolute top-16 left-16 w-32 h-32 bg-primary/20" />
                <div className="absolute bottom-12 right-8 w-48 h-48 border-2 border-foreground/20" />
                <div className="absolute bottom-20 right-16 w-48 h-48 bg-primary" />
                
                {/* Code-like elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-medium">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="space-y-1.5 mt-4">
                      <div className="h-2 w-24 bg-primary/60" />
                      <div className="h-2 w-32 bg-muted" />
                      <div className="h-2 w-20 bg-primary/40" />
                      <div className="h-2 w-28 bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
