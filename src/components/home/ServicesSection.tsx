import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, BarChart3, Check, Sparkles, Zap, Target, Clock } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites that drive conversions and establish your digital presence.',
    features: ['SEO-optimized', 'Mobile-responsive', 'Fast loading', 'Modern tech stack'],
    extendedDescription: 'We build cutting-edge websites using React, Next.js, and modern frameworks. Our development process includes thorough testing, performance optimization, and SEO best practices to ensure your site ranks well and converts visitors.',
    extendedFeatures: [
      'Custom design tailored to your brand',
      'Content Management System (CMS) integration',
      'E-commerce functionality',
      'Analytics and tracking setup',
      'Ongoing maintenance & support',
      'Security hardening & SSL setup'
    ],
    timeline: '1-3 weeks',
    color: 'bg-primary/10 text-primary',
    accentIcon: Sparkles
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['iOS & Android', 'Cloud integration', 'Real-time', 'Scalable'],
    extendedDescription: 'We create powerful mobile applications for iOS and Android using React Native and Flutter. Our apps are built for performance, scalability, and exceptional user experience with seamless cloud integration.',
    extendedFeatures: [
      'Push notifications setup',
      'Offline mode capabilities',
      'App Store & Play Store submission',
      'In-app purchases integration',
      'Real-time sync & updates',
      'Analytics & crash reporting'
    ],
    timeline: '2-4 weeks',
    color: 'bg-accent text-accent-foreground',
    accentIcon: Zap
  },
  {
    icon: BarChart3,
    title: 'Meta Ads Management',
    description: 'Strategic Meta advertising campaigns that maximize ROI and reach your target audience.',
    features: ['Campaign strategy', 'Audience targeting', 'Performance optimization', 'Monthly reporting'],
    extendedDescription: 'Our Meta advertising experts create and manage high-performing Facebook and Instagram campaigns. We focus on data-driven strategies to maximize your return on ad spend and reach your ideal customers.',
    extendedFeatures: [
      'A/B testing & optimization',
      'Retargeting campaigns',
      'Creative design & copywriting',
      'Weekly performance reports',
      'Audience research & segmentation',
      'Budget management & scaling'
    ],
    timeline: 'Ongoing',
    color: 'bg-primary/10 text-primary',
    accentIcon: Target
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4
    }
  })
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-32 right-[15%] text-primary/20"
          variants={floatingVariants}
          animate="animate"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[12%] text-accent/30"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-[8%] text-primary/15"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Target className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="container-swiss relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span 
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Solutions That Drive{' '}
            <span className="text-primary relative">
              Results
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We offer comprehensive digital services tailored to help your business thrive in the modern digital landscape.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedService(service)}
              className="group relative bg-card border border-border p-8 lg:p-10 rounded-2xl overflow-hidden cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Card Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Accent Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Floating Accent Icon */}
              <motion.div
                className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors duration-300"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <service.accentIcon className="w-6 h-6" />
              </motion.div>

              {/* Icon */}
              <motion.div 
                className={`relative w-16 h-16 ${service.color} flex items-center justify-center mb-8 rounded-xl`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 0.4 }}
              >
                <service.icon className="w-8 h-8" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center gap-3 text-sm"
                    custom={featureIndex}
                    variants={featureVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="w-3 h-3 text-primary" />
                    </motion.div>
                    <span className="group-hover:text-foreground transition-colors duration-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Click Hint */}
              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click for details →
              </div>

              {/* Bottom Border Animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Service Details Popup */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${selectedService.color} rounded-xl flex items-center justify-center`}>
                    <selectedService.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedService.timeline}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedService.extendedDescription}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-4">What's Included:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.extendedFeatures.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Close
                </Button>
                <Button asChild>
                  <Link to="/get-quote">Get a Quote</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};