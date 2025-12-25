import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { ExternalLink, Smartphone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Animation config - matches ServiceCard
const ANIMATION_CONFIG = {
  entrance: {
    duration: 0.8,
    stagger: 0.3,
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

const websites = [
  {
    title: 'Jaggery Tea Point',
    category: 'F&B / Tea Shop',
    url: 'https://jaggeryteapoint.site',
    description: 'A modern website for an artisanal tea shop featuring online ordering and brand storytelling.',
    color: 'bg-amber-100',
    tech: ['React', 'Node.js', 'Tailwind CSS']
  },
  {
    title: 'Sri Kenchamba Ceramics',
    category: 'Retail / Sanitaryware & Tiles',
    url: 'https://srikenchambaceramics.com',
    description: 'E-commerce platform for premium ceramics and tiles with product catalog and inquiry system.',
    color: 'bg-stone-100',
    tech: ['Next.js', 'MongoDB', 'Stripe']
  },
  {
    title: 'Likitha Handcrafts',
    category: 'Handcrafts / E-Commerce',
    url: 'https://likithahandcrafts.online',
    description: 'Online store for handcrafted products with secure payments and inventory management.',
    color: 'bg-rose-100',
    tech: ['React', 'Firebase', 'Razorpay']
  },
  {
    title: 'Haven Salad',
    category: 'Food & Nutrition / Health',
    url: 'https://havensalad.in',
    description: 'Health-focused food delivery website with menu customization and subscription options.',
    color: 'bg-green-100',
    tech: ['Vue.js', 'Supabase', 'Tailwind CSS']
  },
];

const mobileApps = [
  {
    title: 'BLR360',
    category: 'Bengaluru Taxi Service',
    platforms: ['iOS', 'Android'],
    description: 'A comprehensive taxi booking app for Bengaluru with real-time tracking, fare estimation, and multiple payment options.',
    color: 'bg-blue-100',
    tech: ['React Native', 'Node.js', 'Google Maps API']
  },
  {
    title: 'Trading Automation Bot',
    category: 'FinTech / Trading Platform',
    platforms: ['iOS', 'Android'],
    description: 'Advanced trading automation platform with algorithmic strategies, real-time market data, and portfolio management.',
    color: 'bg-purple-100',
    tech: ['Flutter', 'Python', 'AWS']
  },
  {
    title: 'Saarathi',
    category: 'Airport Taxi Service',
    platforms: ['iOS', 'Android'],
    description: 'Premium airport transfer service app with flight tracking, pre-booking, and corporate accounts.',
    color: 'bg-sky-100',
    tech: ['React Native', 'Firebase', 'Stripe']
  },
];

interface ProjectCardProps {
  project: any;
  index: number;
  type: 'web' | 'app';
  isInView: boolean;
  parallaxOffset?: number;
}

const ProjectCard = ({ project, index, type, isInView, parallaxOffset = 0 }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;

  // Parallax transformations
  const parallaxRotateY = parallaxOffset * 8;
  const parallaxRotateX = Math.abs(parallaxOffset) * -3;
  const parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;
  const parallaxTranslateY = Math.abs(parallaxOffset) * 10;

  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[420px] lg:w-[400px] snap-center"
      initial={{ 
        x: '100vw',
        opacity: 0, 
        rotateY: 15,
      }}
      animate={isInView ? { 
        x: 0,
        opacity: 1, 
        rotateY: 0,
      } : {}}
      transition={{
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: entranceDelay,
        ease: ANIMATION_CONFIG.entrance.ease,
      }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative border border-border bg-card overflow-hidden cursor-pointer h-full rounded-2xl"
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
          y: isHovered ? -5 : parallaxTranslateY,
          boxShadow: isHovered
            ? `${ANIMATION_CONFIG.hover.shadowIntensity} hsl(var(--primary) / 0.25)`
            : Math.abs(parallaxOffset) < 0.3
              ? '0 20px 40px -10px hsl(var(--primary) / 0.15)'
              : '0 4px 6px -1px hsl(var(--foreground) / 0.1)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {/* Card Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Accent Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px] opacity-50 pointer-events-none" />

        {/* Project Preview */}
        <div className={`${project.color} h-48 flex items-center justify-center relative overflow-hidden`}>
          <motion.div 
            className="text-6xl font-bold text-foreground/10"
            initial={{ scale: 1 }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {project.title.charAt(0)}
          </motion.div>

          {/* Crossfade overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {type === 'web' && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-primary" />
            </motion.a>
          )}
          {type === 'app' && (
            <div className="absolute top-4 right-4 flex gap-2">
              {project.platforms.map((platform: string) => (
                <motion.span 
                  key={platform} 
                  className="bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: entranceDelay + 0.4 }}
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          )}

          {/* Category Badge */}
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: entranceDelay + 0.4 }}
          >
            {project.category}
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 sm:p-8">
          <motion.h3 
            className="text-xl lg:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
            style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base"
            style={{ transformStyle: 'preserve-3d', translateZ: 15 }}
          >
            {project.description}
          </motion.p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span 
                key={tech} 
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: entranceDelay + 0.3 + techIndex * 0.08 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Click Hint */}
          <motion.div
            className="mt-6 text-xs text-primary font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isTapped ? 1 : 0.6 }}
          >
            {type === 'web' ? 'Visit website →' : 'View details →'}
          </motion.div>
        </div>

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

interface ProjectCarouselProps {
  projects: any[];
  type: 'web' | 'app';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const ProjectCarousel = ({ projects, type, title, subtitle, icon }: ProjectCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>(projects.map(() => 0));

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Track active card and calculate parallax offsets based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cards = container.querySelectorAll('[data-card]');
      
      const newOffsets: number[] = [];
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
        const containerCenter = scrollLeft + containerWidth / 2;
        const distance = cardCenter - containerCenter;
        const normalizedOffset = Math.max(-1, Math.min(1, distance / (containerWidth * 0.5)));
        newOffsets.push(normalizedOffset);
        
        if (Math.abs(distance) < closestDistance) {
          closestDistance = Math.abs(distance);
          closestIndex = index;
        }
      });
      
      setCardOffsets(newOffsets);
      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
    if (activeIndex < projects.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
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
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
              {icon}
            </div>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {title}{' '}
            <span className="text-primary relative">
              {subtitle}
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
            Swipe to explore our {type === 'web' ? 'web' : 'mobile'} projects
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
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
            
            {projects.map((project, index) => (
              <div key={project.title} data-card>
                <ProjectCard
                  project={project}
                  index={index}
                  type={type}
                  isInView={inView}
                  parallaxOffset={cardOffsets[index] || 0}
                />
              </div>
            ))}
            
            {/* Right spacer for centering last card */}
            <div className="flex-shrink-0 w-[calc((100vw-85vw)/2)] sm:w-[calc((100vw-400px)/2)] md:w-[calc((100vw-420px)/2)] lg:w-[calc((100vw-400px-4rem)/2)]" />
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 right-[20%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-swiss relative z-10">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span 
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Portfolio
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Projects That Define{' '}
              <span className="text-primary relative">
                Excellence
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={headerInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore our portfolio of successful projects spanning web development, 
              mobile applications, and digital marketing solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Websites Carousel */}
      <div className="bg-background">
        <ProjectCarousel
          projects={websites}
          type="web"
          title="Custom"
          subtitle="Websites"
          icon={<Globe className="w-6 h-6" />}
        />
      </div>

      {/* Mobile Apps Carousel */}
      <div className="bg-secondary/30">
        <ProjectCarousel
          projects={mobileApps}
          type="app"
          title="Mobile"
          subtitle="Applications"
          icon={<Smartphone className="w-6 h-6" />}
        />
      </div>
    </Layout>
  );
};

export default Projects;
