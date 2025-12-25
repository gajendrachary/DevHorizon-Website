import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ArrowRight, Coffee, Store, Palette, Salad } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Jaggery Tea Point',
    category: 'F&B / Tea Shop',
    url: 'https://jaggeryteapoint.site',
    description: 'A modern website for an artisanal tea shop featuring online ordering and brand storytelling.',
    color: 'bg-amber-100',
    technologies: ['React', 'E-commerce', 'Responsive'],
    accentIcon: Coffee,
  },
  {
    title: 'Sri Kenchamba Ceramics',
    category: 'Retail / Sanitaryware & Tiles',
    url: 'https://srikenchambaceramics.com',
    description: 'E-commerce platform for premium ceramics and tiles with product catalog and inquiry system.',
    color: 'bg-stone-100',
    technologies: ['Next.js', 'CMS', 'SEO'],
    accentIcon: Store,
  },
  {
    title: 'Likitha Handcrafts',
    category: 'Handcrafts / E-Commerce',
    url: 'https://likithahandcrafts.online',
    description: 'Online store for handcrafted products with secure payments and inventory management.',
    color: 'bg-rose-100',
    technologies: ['React', 'Payments', 'Inventory'],
    accentIcon: Palette,
  },
  {
    title: 'Haven Salad',
    category: 'Food & Nutrition / Health',
    url: 'https://havensalad.in',
    description: 'Health-focused food delivery website with menu customization and subscription options.',
    color: 'bg-green-100',
    technologies: ['React', 'Subscriptions', 'Mobile-first'],
    accentIcon: Salad,
  },
];

export const ProjectsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>(projects.map(() => 0));

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Track active card and calculate parallax offsets
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
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
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
