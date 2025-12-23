import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceIcons = [
  { icon: Globe, label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: BarChart3, label: 'Meta Ads' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary/30">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-swiss relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium mb-6"
            >
              <motion.span 
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Est. June 2025 • Bengaluru, India
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transforming Ideas Into{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Digital Excellence
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-4 font-medium"
            >
              Custom Websites • Mobile Apps • Meta Ads Management • Strategic Growth Solutions
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              DevHub is a full-service digital agency specializing in crafting exceptional digital experiences. 
              We help businesses establish a powerful online presence and drive measurable growth through 
              innovative technology solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button asChild variant="hero" size="lg" className="group">
                <Link to="/get-quote" className="flex items-center gap-2">
                  Start Your Project
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/projects">View Our Work</Link>
              </Button>
            </motion.div>

            {/* Service Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6"
            >
              {serviceIcons.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                >
                  <motion.div 
                    className="w-10 h-10 bg-background border border-border flex items-center justify-center transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-glow"
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="hidden sm:block">{service.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div 
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Main illustration container */}
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Abstract tech elements with animations */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-8 left-8 w-32 h-32 border-4 border-primary"
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-16 left-16 w-32 h-32 bg-primary/20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-12 right-8 w-48 h-48 border-2 border-foreground/20"
                  animate={{ rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-20 right-16 w-48 h-48 bg-primary"
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Code-like elements */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-medium"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px hsl(210 100% 40% / 0.3)" }}
                >
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <motion.div 
                        className="w-2 h-2 bg-destructive rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-yellow-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <motion.div 
                      className="space-y-1.5 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.div 
                        className="h-2 w-24 bg-primary/60"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      />
                      <motion.div 
                        className="h-2 w-32 bg-muted"
                        initial={{ width: 0 }}
                        animate={{ width: 128 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      />
                      <motion.div 
                        className="h-2 w-20 bg-primary/40"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      />
                      <motion.div 
                        className="h-2 w-28 bg-muted"
                        initial={{ width: 0 }}
                        animate={{ width: 112 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
