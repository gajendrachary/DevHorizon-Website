import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ArrowRight, Coffee, Store, Palette, Salad, UtensilsCrossed, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { useAutoScrollCarousel } from '@/hooks/useAutoScrollCarousel';

// Project Images
import projectSkandaCloudKitchen from '@/assets/logo-skanda-cloud-kitchen.png';
import projectJaggeryTeaPoint from '@/assets/project-jaggery-tea-point.jpg';
import projectSriKenchambaCeramics from '@/assets/project-sri-kenchamba-ceramics.png';
import projectLikithaHandcrafts from '@/assets/project-likitha-handcrafts.png';
import projectHavenSalad from '@/assets/project-haven-salad.jpg';
import projectJzGreenHeaven from '@/assets/logo-jz-green-heaven.png';
import projectUnitedNewsKannada from '@/assets/logo-united-news-kannada.jpg';

// ============= Auto-scroll Configuration =============
const AUTO_SCROLL_CONFIG = {
  speed: 0.8,           // Pixels per frame
  reverseDelay: 1500,   // ms pause before reversing
  pauseOnHover: true,   // Pause on desktop hover
};

const projects = [
  {
    title: 'Skanda Cloud Kitchen',
    category: 'F&B / Cloud Kitchen',
    url: 'https://skandacloudkitchen.in/',
    description: 'A modern cloud kitchen website featuring an appetizing menu showcase and seamless ordering experience.',
    color: 'bg-orange-100',
    bgColor: '#EA580C',
    technologies: ['React', 'E-commerce', 'Responsive'],
    accentIcon: UtensilsCrossed,
    image: projectSkandaCloudKitchen,
    isLogo: true,
  },
  {
    title: 'United News Kannada',
    category: 'Media / News Portal',
    url: 'https://unitednewskannada.com',
    description: 'A regional Kannada news portal delivering breaking news, local stories, and multimedia content.',
    color: 'bg-red-100',
    bgColor: '#DC2626',
    technologies: ['React', 'CMS', 'SEO'],
    accentIcon: Newspaper,
    image: projectUnitedNewsKannada,
    isLogo: true,
  },
  {
    title: 'JZ Green Heaven Lodge',
    category: 'Hospitality / Lodge',
    url: 'https://www.jzgreenheaven.com',
    description: 'A nature retreat lodge website showcasing scenic accommodations, booking options, and travel experiences.',
    color: 'bg-emerald-100',
    bgColor: '#166534',
    technologies: ['React', 'Booking', 'Responsive'],
    accentIcon: Store,
    image: projectJzGreenHeaven,
    isLogo: true,
  },
  {
    title: 'Jaggery Tea Point',
    category: 'F&B / Tea Shop',
    url: 'https://jaggeryteapoint.site',
    description: 'A modern website for an artisanal tea shop featuring online ordering and brand storytelling.',
    color: 'bg-amber-100',
    bgColor: '#B45309',
    technologies: ['React', 'E-commerce', 'Responsive'],
    accentIcon: Coffee,
    image: projectJaggeryTeaPoint,
  },
  {
    title: 'Sri Kenchamba Ceramics',
    category: 'Retail / Sanitaryware & Tiles',
    url: 'https://srikenchambaceramics.com',
    description: 'E-commerce platform for premium ceramics and tiles with product catalog and inquiry system.',
    color: 'bg-stone-100',
    bgColor: '#44403C',
    technologies: ['Next.js', 'CMS', 'SEO'],
    accentIcon: Store,
    image: projectSriKenchambaCeramics,
    isLogo: true,
  },
  {
    title: 'Likitha Handcrafts',
    category: 'Handcrafts / E-Commerce',
    url: 'https://likithahandcrafts.online',
    description: 'Online store for handcrafted products with secure payments and inventory management.',
    color: 'bg-rose-100',
    bgColor: '#BE185D',
    technologies: ['React', 'Payments', 'Inventory'],
    accentIcon: Palette,
    image: projectLikithaHandcrafts,
    isLogo: true,
  },
  {
    title: 'Haven Salad',
    category: 'Food & Nutrition / Health',
    url: 'https://havensalad.in',
    description: 'Health-focused food delivery website with menu customization and subscription options.',
    color: 'bg-green-100',
    bgColor: '#15803D',
    technologies: ['React', 'Subscriptions', 'Mobile-first'],
    accentIcon: Salad,
    image: projectHavenSalad,
  },
];

interface ProjectsCarouselProps {
  onActiveColorChange?: (color: string) => void;
}

export const ProjectsCarousel = ({ onActiveColorChange }: ProjectsCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>(projects.map(() => 0));
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const viewedIndicesRef = useRef<Set<number>>(new Set([0]));
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  // Auto-scroll hook
  const {
    containerRef: autoScrollRef,
    direction,
    isPaused,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart: autoTouchStart,
    handleTouchEnd: autoTouchEnd,
    pause: pauseAutoScroll,
    resume: resumeAutoScroll,
  } = useAutoScrollCarousel(AUTO_SCROLL_CONFIG);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Merge refs for the scroll container
  const setScrollRef = (el: HTMLDivElement | null) => {
    (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (autoScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };


  // Update background color when active index changes
  useEffect(() => {
    if (onActiveColorChange && projects[activeIndex]?.bgColor) {
      onActiveColorChange(projects[activeIndex].bgColor);
    }
    
    // Track viewed cards
    viewedIndicesRef.current.add(activeIndex);
    if (viewedIndicesRef.current.size === projects.length) {
      setHasViewedAll(true);
    }
  }, [activeIndex, onActiveColorChange]);

  // Handle scroll end detection and reset logic
  const handleScrollEnd = useCallback(() => {
    isScrollingRef.current = false;
    
    // Schedule reset if all cards viewed and on last card
    if (hasViewedAll && activeIndex === projects.length - 1) {
      resetTimeoutRef.current = setTimeout(() => {
        if (!isScrollingRef.current && onActiveColorChange) {
          onActiveColorChange('transparent');
        }
      }, 700);
    }
  }, [hasViewedAll, activeIndex, onActiveColorChange]);

  // Track active card and calculate parallax offsets
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollEndTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      isScrollingRef.current = true;
      
      // Clear any pending reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cards = container.querySelectorAll('[data-project-card]');

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

      // Debounce scroll end detection
      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollEndTimeout);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [handleScrollEnd]);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-project-card]');
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

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef} 
      className="section-padding bg-background relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Recent projects carousel"
    >
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
            Our Work
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Recent{' '}
            <span className="text-primary relative">
              Projects
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
            Swipe to explore our recent work that showcases our expertise
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
            ref={setScrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={autoTouchStart}
            onTouchEnd={autoTouchEnd}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 -mx-4 md:px-8 md:-mx-8 touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Left spacer for centering first card */}
            <div className="flex-shrink-0 w-[calc((100vw-85vw)/2)] sm:w-[calc((100vw-400px)/2)] md:w-[calc((100vw-420px)/2)] lg:w-[calc((100vw-400px-4rem)/2)]" />

            {projects.map((project, index) => (
              <div key={project.title} data-project-card>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  url={project.url}
                  description={project.description}
                  color={project.color}
                  technologies={project.technologies}
                  accentIcon={project.accentIcon}
                  index={index}
                  isInView={inView}
                  parallaxOffset={cardOffsets[index] || 0}
                  image={project.image}
                  isLogo={project.isLogo}
                />
              </div>
            ))}

            {/* Right spacer for centering last card */}
            <div className="flex-shrink-0 w-[calc((100vw-85vw)/2)] sm:w-[calc((100vw-400px)/2)] md:w-[calc((100vw-420px)/2)] lg:w-[calc((100vw-400px-4rem)/2)]" />
          </div>

          {/* Carousel Indicators with Direction */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <motion.button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              animate={{ 
                x: direction === 1 ? [0, -3, 0] : [0, 3, 0],
                opacity: isPaused ? 0.3 : 0.6
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            
            <div className="flex gap-2">
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
            
            <motion.button
              onClick={scrollNext}
              disabled={activeIndex === projects.length - 1}
              animate={{ 
                x: direction === 1 ? [0, 3, 0] : [0, -3, 0],
                opacity: isPaused ? 0.3 : 0.6
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/projects" className="flex items-center gap-2">
                View All Projects
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
