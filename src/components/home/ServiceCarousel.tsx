import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, BarChart3, Sparkles, Zap, Target, Clock, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ServiceCard, ANIMATION_CONFIG } from './ServiceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export const ServiceCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Track active card based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / services.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), services.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cards = container.querySelectorAll('[data-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const scrollNext = () => {
    if (activeIndex < services.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-swiss relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
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
            Swipe to explore our comprehensive digital services
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === 0}
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === services.length - 1}
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 -mx-4 md:px-8 md:-mx-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Left spacer for centering first card */}
            <div className="flex-shrink-0 w-[calc((100vw-85vw)/2)] sm:w-[calc((100vw-400px)/2)] md:w-[calc((100vw-420px)/2)] lg:w-[calc((100vw-400px-4rem)/2)]" />
            
            {services.map((service, index) => (
              <div key={service.title} data-card>
                <ServiceCard
                  icon={service.icon}
                  accentIcon={service.accentIcon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  color={service.color}
                  timeline={service.timeline}
                  index={index}
                  isInView={inView}
                  onClick={() => setSelectedService(service)}
                />
              </div>
            ))}
            
            {/* Right spacer for centering last card */}
            <div className="flex-shrink-0 w-[calc((100vw-85vw)/2)] sm:w-[calc((100vw-400px)/2)] md:w-[calc((100vw-420px)/2)] lg:w-[calc((100vw-400px-4rem)/2)]" />
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
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
