import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight, Clock, Sparkles, Zap, Target as TargetIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SEO, getServiceSchema, getBreadcrumbSchema } from '@/components/common/SEO';
import developerClientMeeting from '@/assets/developer-client-meeting.png';
import developerPresenting from '@/assets/developer-presenting.png';
import teamBrainstorming from '@/assets/team-brainstorming.png';
import codeReview from '@/assets/code-review.png';
import serviceWebDev from '@/assets/service-web-development.png';
import serviceAppDev from '@/assets/service-app-development.png';
import serviceMetaAds from '@/assets/service-meta-ads.png';

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
    price: '₹30,000',
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
    price: '₹40,000',
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
    price: '₹15,000',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const serviceSchemaData = getServiceSchema(
    services.map((s) => ({ name: s.title, description: s.description, price: s.price }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://devhub.tech/' },
    { name: 'Services', url: 'https://devhub.tech/services' },
  ]);

  return (
    <Layout>
      <SEO
        title="Our Services - Web Development, Mobile Apps & Meta Ads | DevHub Bengaluru"
        description="Explore DevHub's digital services: Custom web development starting ₹30,000, Mobile app development from ₹40,000, and Meta Ads management from ₹15,000/month. Get a free quote today."
        schema={{ '@context': 'https://schema.org', '@graph': [serviceSchemaData, breadcrumbSchema] }}
      />
      {/* CTA Section - Now at the top */}
      <section className="py-20 lg:py-32 bg-secondary text-foreground relative overflow-hidden">
        {/* Background Image with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentIndex}
              src={backgroundImages[currentIndex].src}
              alt={backgroundImages[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
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
      <section className="py-20 lg:py-32 bg-secondary">
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

      {/* Services Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div
            ref={servicesRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const AccentIcon = service.accentIcon;
              const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;
              
              return (
                <ServicePageCard
                  key={service.title}
                  service={service}
                  index={index}
                  isInView={servicesInView}
                  entranceDelay={entranceDelay}
                  AccentIcon={AccentIcon}
                />
              );
            })}
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
}

const ServicePageCard = ({ service, index, isInView, entranceDelay, AccentIcon }: ServicePageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div
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
              : 0,
          rotateX: isTapped 
            ? ANIMATION_CONFIG.tap.rotateX 
            : isHovered 
              ? ANIMATION_CONFIG.hover.rotateX 
              : 0,
          scale: isTapped 
            ? ANIMATION_CONFIG.tap.scale 
            : isHovered 
              ? ANIMATION_CONFIG.hover.scale 
              : 1,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? `${ANIMATION_CONFIG.hover.shadowIntensity} hsl(var(--primary) / 0.25)` 
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
          className="text-primary font-semibold mb-3 relative z-10"
          style={{ transformStyle: 'preserve-3d', translateZ: 25 }}
        >
          Starting from {service.price}
        </motion.p>
        
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
