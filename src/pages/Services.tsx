import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight, Clock, Sparkles, Zap, Target as TargetIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef, useCallback } from 'react';
import { SEO, getServiceSchema, getBreadcrumbSchema } from '@/components/common/SEO';
import { useAutoScrollCarousel } from '@/hooks/useAutoScrollCarousel';
import developerClientMeeting from '@/assets/developer-client-meeting.jpg';
import developerPresenting from '@/assets/developer-presenting.jpg';
import teamBrainstorming from '@/assets/team-brainstorming.jpg';
import codeReview from '@/assets/code-review.jpg';
import serviceWebDev from '@/assets/service-web-development.jpg';
import serviceAppDev from '@/assets/service-app-development.jpg';
import serviceMetaAds from '@/assets/service-meta-ads.jpg';

// ============= Auto-scroll Configuration =============
const AUTO_SCROLL_CONFIG = {
  speed: 0.8,           // Pixels per frame
  reverseDelay: 1500,   // ms pause before reversing
  pauseOnHover: true,   // Pause on desktop hover
};

const backgroundImages = [
  { src: developerClientMeeting, alt: 'Developer meeting with client' },
  { src: developerPresenting, alt: 'Developer presenting work' },
  { src: teamBrainstorming, alt: 'Team brainstorming session' },
  { src: codeReview, alt: 'Code review meeting' },
];

const ANIMATION_CONFIG = {
  entrance: {
    duration: 0.8,
    stagger: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
  hover: {
    scale: 1.02,
    rotateY: 5,
    rotateX: -3,
    shadowIntensity: '0 25px 50px -12px',
  },
  tap: {
    scale: 0.98,
    rotateY: 3,
    rotateX: -2,
  },
};

const services = [
  {
    emoji: '🌐',
    accentIcon: Sparkles,
    title: 'Web Development',
    
    timeline: '2-4 weeks',
    description: 'Custom, SEO-optimized websites built with modern technologies for maximum performance and user engagement.',
    features: [
      'SEO-optimized architecture',
      'Mobile-responsive design',
      'Fast loading speeds',
      'Modern tech stack (React, Next.js)',
      'CMS integration',
      'Analytics setup'
    ],
    link: '/services/web-development',
    color: 'bg-primary/10',
    backgroundImage: serviceWebDev
  },
  {
    emoji: '📱',
    accentIcon: Zap,
    title: 'Mobile App Development',
    
    timeline: '4-8 weeks',
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
    features: [
      'iOS & Android development',
      'Cloud integration',
      'Real-time functionality',
      'Push notifications',
      'Offline capabilities',
      'App Store deployment'
    ],
    link: '/services/mobile-apps',
    color: 'bg-accent/10',
    backgroundImage: serviceAppDev
  },
  {
    emoji: '📊',
    accentIcon: TargetIcon,
    title: 'Meta Ads Management',
    
    timeline: 'Monthly',
    description: 'Strategic Facebook and Instagram advertising campaigns to maximize your ROI and reach your target audience.',
    features: [
      'Campaign strategy',
      'Audience targeting',
      'A/B testing',
      'Performance optimization',
      'Monthly reporting',
      'Budget management'
    ],
    link: '/services/meta-ads',
    color: 'bg-primary/10',
    backgroundImage: serviceMetaAds
  }
];

const Services = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Carousel state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>(services.map(() => 0));
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  
  // Auto-scroll hook
  // Auto-scroll hook
  const {
    containerRef: autoScrollRef,
    direction,
    isPaused,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart: autoTouchStart,
    handleTouchEnd: autoTouchEnd,
  } = useAutoScrollCarousel(AUTO_SCROLL_CONFIG);

  // Merge refs for the scroll container
  const setScrollRef = (el: HTMLDivElement | null) => {
    (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (autoScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll for carousel
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-card]');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;
    const newOffsets: number[] = [];

    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
      const distance = cardCenter - containerCenter;
      const normalizedOffset = Math.max(-1, Math.min(1, distance / (container.clientWidth / 2)));

      newOffsets[index] = normalizedOffset;

      if (Math.abs(distance) < closestDistance) {
        closestDistance = Math.abs(distance);
        closestIndex = index;
      }
    });

    setCardOffsets(newOffsets);
    setActiveIndex(closestIndex);
  }, []);

  const handleScrollEnd = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      isScrollingRef.current = true;
      handleScroll();
      handleScrollEnd();
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleScrollEnd]);

  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-card]');
    const card = cards[index] as HTMLElement;
    if (!card) return;

    const scrollPosition = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, []);

  const scrollPrev = useCallback(() => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToCard(newIndex);
  }, [activeIndex, scrollToCard]);

  const scrollNext = useCallback(() => {
    const newIndex = Math.min(services.length - 1, activeIndex + 1);
    scrollToCard(newIndex);
  }, [activeIndex, scrollToCard]);

  const serviceSchemaData = getServiceSchema(
    services.map((s) => ({ name: s.title, description: s.description }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.devhorizontech.com/' },
    { name: 'Services', url: 'https://www.devhorizontech.com/services' },
  ]);

  return (
    <Layout>
      <SEO
        title="Services — Web, Mobile & Meta Ads | DevHorizon"
        description="DevHorizon's services: custom web development, iOS & Android mobile apps, and Meta Ads management. Bengaluru-based, serving clients globally."
        schema={{ '@context': 'https://schema.org', '@graph': [serviceSchemaData, breadcrumbSchema] }}
      />
      {/* CTA Section - Now at the top */}
      <section className="py-10 lg:py-14 bg-secondary text-foreground relative overflow-hidden">
        {/* Background Image with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentIndex}
              src={backgroundImages[currentIndex].src}
              alt={backgroundImages[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get a free consultation and detailed quote for your project. 
              Our team is ready to help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-quote">
                <Button variant="cta" size="lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-10 lg:py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Solutions That Drive <span className="text-primary">Results</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From stunning websites to powerful mobile apps and strategic advertising, 
              we provide end-to-end digital solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-10 lg:py-14 relative overflow-hidden">
        <div ref={servicesRef} className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={servicesInView ? { opacity: activeIndex > 0 ? 1 : 0.3, x: 0 } : {}}
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={servicesInView ? { opacity: activeIndex < services.length - 1 ? 1 : 0.3, x: 0 } : {}}
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Carousel Container with Auto-scroll */}
          <div
            ref={setScrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={autoTouchStart}
            onTouchEnd={autoTouchEnd}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Left spacer for centering first card */}
            <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-200px)] md:w-[calc(50vw-210px)] lg:w-[calc(50vw-200px)]" />
            
            {services.map((service, index) => {
              const AccentIcon = service.accentIcon;
              const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;
              
              return (
                <div key={service.title} data-card>
                  <ServicePageCard
                    service={service}
                    index={index}
                    isInView={servicesInView}
                    entranceDelay={entranceDelay}
                    AccentIcon={AccentIcon}
                    parallaxOffset={cardOffsets[index] || 0}
                  />
                </div>
              );
            })}
            
            {/* Right spacer for centering last card */}
            <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-200px)] md:w-[calc(50vw-210px)] lg:w-[calc(50vw-200px)]" />
          </div>

          {/* Carousel Indicators with Direction */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <motion.div
              animate={{ 
                x: direction === 1 ? [0, -3, 0] : [0, 3, 0],
                opacity: isPaused ? 0.3 : 0.6
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
            
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.div
              animate={{ 
                x: direction === 1 ? [0, 3, 0] : [0, -3, 0],
                opacity: isPaused ? 0.3 : 0.6
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Enhanced Service Card Component with 3D effects
interface ServicePageCardProps {
  service: typeof services[0];
  index: number;
  isInView: boolean;
  entranceDelay: number;
  AccentIcon: typeof Sparkles;
  parallaxOffset?: number;
}

const ServicePageCard = ({ service, index, isInView, entranceDelay, AccentIcon, parallaxOffset = 0 }: ServicePageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Parallax transformations
  const parallaxRotateY = parallaxOffset * 8;
  const parallaxRotateX = Math.abs(parallaxOffset) * -3;
  const parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;
  const parallaxTranslateY = Math.abs(parallaxOffset) * 10;

  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[420px] lg:w-[400px] snap-center"
      initial={{ opacity: 0, y: 50, rotateY: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: entranceDelay,
        ease: ANIMATION_CONFIG.entrance.ease,
      }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative bg-card border border-border p-6 sm:p-8 lg:p-10 rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTapStart={() => setIsTapped(true)}
        onTap={() => setIsTapped(false)}
        onTapCancel={() => setIsTapped(false)}
        animate={{
          rotateY: isTapped 
            ? ANIMATION_CONFIG.tap.rotateY 
            : isHovered 
              ? ANIMATION_CONFIG.hover.rotateY 
              : parallaxRotateY,
          rotateX: isTapped 
            ? ANIMATION_CONFIG.tap.rotateX 
            : isHovered 
              ? ANIMATION_CONFIG.hover.rotateX 
              : parallaxRotateX,
          scale: isTapped 
            ? ANIMATION_CONFIG.tap.scale 
            : isHovered 
              ? ANIMATION_CONFIG.hover.scale 
              : parallaxScale,
          y: isHovered ? -8 : parallaxTranslateY,
          boxShadow: isHovered 
            ? `${ANIMATION_CONFIG.hover.shadowIntensity} hsl(var(--primary) / 0.25)` 
            : Math.abs(parallaxOffset) < 0.3
              ? '0 20px 40px -10px hsl(var(--primary) / 0.15)'
              : '0 4px 6px -1px hsl(var(--foreground) / 0.1)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {/* Background Image */}
        {service.backgroundImage && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img 
              src={service.backgroundImage} 
              alt="" 
              loading="lazy"
              decoding="async"
              className="absolute right-0 top-0 h-full w-3/5 object-cover object-left opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-card/40" />
          </div>
        )}

        {/* Card Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Accent Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px] opacity-50" />

        {/* Timeline Badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs text-foreground font-bold z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: entranceDelay + 0.4 }}
        >
          <Clock className="w-3 h-3" />
          {service.timeline}
        </motion.div>

        {/* Floating Accent Icon */}
        <motion.div
          className="absolute top-16 right-4 text-primary/10 z-10"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AccentIcon className="w-8 h-8" />
        </motion.div>

        {/* 3D Emoji Icon */}
        <motion.div
          className={`relative w-16 h-16 ${service.color} flex items-center justify-center mb-6 rounded-xl z-10`}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
        >
          <span className="text-4xl">{service.emoji}</span>
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1.5, opacity: 0 } : {}}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Content */}
        <motion.h3 
          className="text-xl lg:text-2xl font-bold mb-2 text-foreground relative z-10"
          style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
        >
          {service.title}
        </motion.h3>
        
        
        <motion.p 
          className="text-foreground mb-6 leading-relaxed text-sm sm:text-base font-medium relative z-10"
          style={{ transformStyle: 'preserve-3d', translateZ: 15 }}
        >
          {service.description}
        </motion.p>

        {/* Features */}
        <ul className="space-y-2.5 relative z-10">
          {service.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: entranceDelay + 0.3 + featureIndex * 0.08 }}
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Get Started Button */}
        <Link to="/get-quote" className="relative z-10 block mt-6">
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        {/* Bottom Border Animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-b-2xl"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Services;