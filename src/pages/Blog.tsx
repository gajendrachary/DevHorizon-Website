import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SEO, getBreadcrumbSchema } from '@/components/common/SEO';
import { useAutoScrollCarousel } from '@/hooks/useAutoScrollCarousel';

// ============= Auto-scroll Configuration =============
const AUTO_SCROLL_CONFIG = {
  speed: 0.8,           // Pixels per frame
  reverseDelay: 1500,   // ms pause before reversing
  pauseOnHover: true,   // Pause on desktop hover
};

const ANIMATION_CONFIG = {
  entrance: {
    duration: 0.8,
    stagger: 0.15,
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

const categoryEmojis: Record<string, string> = {
  'Technology': '💻',
  'Mobile': '📱',
  'Marketing': '📊',
  'Design': '🎨',
  'All': '✨',
};

const categories = ['All', 'Technology', 'Mobile', 'Marketing', 'Design'];

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Explore the cutting-edge technologies and trends shaping the future of web development, from AI integration to advanced frameworks.',
    category: 'Technology',
    date: 'Dec 15, 2025',
    readTime: '8 min read',
    author: 'Gajendrachary',
    featured: true,
    slug: 'future-of-web-development-2025'
  },
  {
    id: 2,
    title: 'React vs Vue: Which Framework to Choose in 2025?',
    excerpt: 'A comprehensive comparison of React and Vue.js to help you make an informed decision for your next project.',
    category: 'Technology',
    date: 'Dec 12, 2025',
    readTime: '10 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'react-vs-vue-2025'
  },
  {
    id: 3,
    title: 'Complete Guide to Mobile App Development',
    excerpt: 'Everything you need to know about building successful mobile applications, from concept to deployment.',
    category: 'Mobile',
    date: 'Dec 8, 2025',
    readTime: '12 min read',
    author: 'Pavan Raj',
    featured: false,
    slug: 'mobile-app-development-guide'
  },
  {
    id: 4,
    title: '10 Tips to Maximize Your Meta Ads ROI',
    excerpt: 'Learn proven strategies to optimize your Meta advertising campaigns and get the best return on investment.',
    category: 'Marketing',
    date: 'Dec 5, 2025',
    readTime: '6 min read',
    author: 'Pavan Raj',
    featured: false,
    slug: 'meta-ads-roi-tips'
  },
  {
    id: 5,
    title: 'UI/UX Design Principles for Better Conversions',
    excerpt: 'Discover the design principles that can significantly improve your website conversion rates.',
    category: 'Design',
    date: 'Dec 1, 2025',
    readTime: '7 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'ui-ux-design-principles'
  },
  {
    id: 6,
    title: 'Building Scalable Applications with Node.js',
    excerpt: 'A deep dive into building performant and scalable backend applications using Node.js and modern practices.',
    category: 'Technology',
    date: 'Nov 28, 2025',
    readTime: '9 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'scalable-nodejs-applications'
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>([]);
  
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

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !post.featured;
  });

  // Initialize card offsets
  useEffect(() => {
    setCardOffsets(filteredPosts.map(() => 0));
  }, [filteredPosts.length]);

  const featuredPost = blogPosts.find(post => post.featured);

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: carouselRef, inView: carouselInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Carousel scroll handling
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-blog-card]');
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, filteredPosts]);

  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-blog-card]');
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
    const newIndex = Math.min(filteredPosts.length - 1, activeIndex + 1);
    scrollToCard(newIndex);
  }, [activeIndex, filteredPosts.length, scrollToCard]);


  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DevHorizon Technologies Private Limited Blog',
    description: 'Insights on web development, mobile apps, Meta ads, and UI/UX design.',
    publisher: {
      '@type': 'Organization',
      name: 'DevHorizon Technologies Private Limited',
    },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://devhubtechnologies.in/' },
    { name: 'Blog', url: 'https://devhubtechnologies.in/blog' },
  ]);

  return (
    <Layout>
      <SEO
        title="DevHorizon Technologies Private Limited Blog - Web Development, Mobile & Marketing Insights"
        description="Stay updated with DevHorizon Technologies Private Limited blog on web development trends, mobile app best practices, Meta ads optimization tips, and UI/UX design principles. Expert insights from Bengaluru's top digital agency."
        schema={{ '@context': 'https://schema.org', '@graph': [blogSchema, breadcrumbSchema] }}
      />
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              DevHorizon Technologies Private Limited Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Updates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay updated with the latest trends in technology, mobile development, 
              digital marketing, and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-background">
          <div className="container-swiss">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-border bg-card overflow-hidden rounded-2xl"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-primary/10 h-64 lg:h-auto flex items-center justify-center relative overflow-hidden">
                  <motion.span 
                    className="text-8xl"
                    animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {categoryEmojis[featuredPost.category] || '📝'}
                  </motion.span>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    ⭐ Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>{categoryEmojis[featuredPost.category]}</span>
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-fit">
                    <Link to={`/blog/${featuredPost.slug}`} className="flex items-center gap-2">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-swiss">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span>{categoryEmojis[category]}</span>
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Carousel */}
      <section ref={carouselRef} className="section-padding bg-background relative overflow-hidden">
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
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={carouselInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Latest{' '}
              <span className="text-primary relative">
                Articles
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={carouselInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={carouselInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Swipe to explore our latest insights
            </motion.p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="relative">
              {/* Navigation Arrows */}
              <motion.button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={carouselInView ? { opacity: activeIndex > 0 ? 1 : 0.3, x: 0 } : {}}
                aria-label="Previous article"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={carouselInView ? { opacity: activeIndex < filteredPosts.length - 1 ? 1 : 0.3, x: 0 } : {}}
                aria-label="Next article"
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
                {/* Left spacer */}
                <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)]" />
                
                {filteredPosts.map((post, index) => (
                  <div key={post.id} data-blog-card>
                    <BlogCard 
                      post={post} 
                      index={index} 
                      isInView={carouselInView}
                      parallaxOffset={cardOffsets[index] || 0}
                    />
                  </div>
                ))}
                
                {/* Right spacer */}
                <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)]" />
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
                  {filteredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToCard(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to article ${index + 1}`}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.span 
              className="text-5xl block mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📬
            </motion.span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <form className="flex gap-4 flex-col sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full"
              />
              <Button type="submit" variant="hero" className="rounded-full">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
  isInView: boolean;
  parallaxOffset: number;
}

const BlogCard = ({ post, index, isInView, parallaxOffset }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Parallax transformations
  const parallaxRotateY = parallaxOffset * 8;
  const parallaxRotateX = Math.abs(parallaxOffset) * -3;
  const parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;
  const parallaxTranslateY = Math.abs(parallaxOffset) * 10;

  const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;

  return (
    <motion.article
      className="flex-shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] snap-center"
      initial={{ opacity: 0, y: 50, rotateY: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: entranceDelay,
        ease: ANIMATION_CONFIG.entrance.ease,
      }}
      style={{ perspective: '1200px' }}
    >
      <Link to={`/blog/${post.slug}`}>
        <motion.div
          className="relative bg-card border border-border overflow-hidden rounded-2xl cursor-pointer h-full"
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
          {/* Card Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Accent Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[80px] opacity-50" />

          {/* Floating Emoji */}
          <motion.div
            className="absolute top-4 right-4 text-4xl z-10"
            animate={{
              y: isHovered ? [-2, 2, -2] : 0,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {categoryEmojis[post.category] || '📝'}
          </motion.div>

          <div className="bg-secondary/50 h-40 flex items-center justify-center relative overflow-hidden">
            <motion.span 
              className="text-6xl font-bold text-muted-foreground/20"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {post.title.charAt(0)}
            </motion.span>
          </div>
          
          <div className="p-6 relative z-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>{categoryEmojis[post.category]}</span>
              {post.category}
            </span>
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Bottom border animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </Link>
    </motion.article>
  );
};

export default Blog;