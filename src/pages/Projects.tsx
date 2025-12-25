import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { ExternalLink, Smartphone, Globe } from 'lucide-react';
import { useState } from 'react';

// Animation config - matches ServiceCard
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

const ProjectCard = ({ project, index, type }: { project: any; index: number; type: 'web' | 'app' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateY: 15,
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0,
        rotateY: 0,
      } : {}}
      transition={{
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: entranceDelay,
        ease: ANIMATION_CONFIG.entrance.ease,
      }}
      style={{ perspective: '1200px' }}
      className="group"
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
        transition={{ duration: 0.2, ease: 'easeOut' }}
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
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
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
            animate={inView ? { opacity: 1, scale: 1 } : {}}
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
                animate={inView ? { opacity: 1, x: 0 } : {}}
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

const Projects = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
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
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Projects That Define Excellence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of successful projects spanning web development, 
              mobile applications, and digital marketing solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Websites Section */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Websites</h2>
              <p className="text-muted-foreground">Custom web solutions for diverse industries</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {websites.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} type="web" />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Mobile Applications</h2>
              <p className="text-muted-foreground">Native and cross-platform mobile solutions</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileApps.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} type="app" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
