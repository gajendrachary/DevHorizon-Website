import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';
import { useState } from 'react';

// Animation config - matches ServiceCard
export const PROJECT_ANIMATION_CONFIG = {
  entrance: {
    duration: 0.6,
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

interface ProjectCardProps {
  title: string;
  category: string;
  url: string;
  description: string;
  color: string;
  technologies: string[];
  accentIcon: LucideIcon;
  index: number;
  isInView: boolean;
  parallaxOffset?: number;
  image?: string;
  isLogo?: boolean;
  onClick?: () => void;
}

export const ProjectCard = ({
  title,
  category,
  url,
  description,
  color,
  technologies,
  accentIcon: AccentIcon,
  index,
  isInView,
  parallaxOffset = 0,
  image,
  isLogo = false,
  onClick,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const entranceDelay = Math.min(index * PROJECT_ANIMATION_CONFIG.entrance.stagger, 0.9);

  // Parallax transformations
  const parallaxRotateY = parallaxOffset * 8;
  const parallaxRotateX = Math.abs(parallaxOffset) * -3;
  const parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;
  const parallaxTranslateY = Math.abs(parallaxOffset) * 10;

  const useButton = !!onClick;
  const RootTag: any = useButton ? motion.button : motion.a;
  const rootProps: any = useButton
    ? {
        type: 'button',
        onClick,
      }
    : {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
      };

  return (
    <RootTag
      {...rootProps}
      className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[420px] lg:w-[400px] snap-center block text-left"
      initial={{
        x: 80,
        opacity: 0,
        rotateY: 8,
      }}
      animate={isInView ? {
        x: 0,
        opacity: 1,
        rotateY: 0,
      } : {}}
      transition={{
        duration: PROJECT_ANIMATION_CONFIG.entrance.duration,
        delay: entranceDelay,
        ease: PROJECT_ANIMATION_CONFIG.entrance.ease,
      }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative bg-card border border-border overflow-hidden cursor-pointer h-full rounded-2xl"
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
            ? PROJECT_ANIMATION_CONFIG.tap.rotateY
            : isHovered
              ? PROJECT_ANIMATION_CONFIG.hover.rotateY
              : parallaxRotateY,
          rotateX: isTapped
            ? PROJECT_ANIMATION_CONFIG.tap.rotateX
            : isHovered
              ? PROJECT_ANIMATION_CONFIG.hover.rotateX
              : parallaxRotateX,
          scale: isTapped
            ? PROJECT_ANIMATION_CONFIG.tap.scale
            : isHovered
              ? PROJECT_ANIMATION_CONFIG.hover.scale
              : parallaxScale,
          y: isHovered ? -5 : parallaxTranslateY,
          boxShadow: isHovered
            ? `${PROJECT_ANIMATION_CONFIG.hover.shadowIntensity} hsl(var(--primary) / 0.25)`
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

        {/* Project Preview Area */}
        <div className={`${color} h-48 flex items-center justify-center relative overflow-hidden`}>
          {image ? (
            <motion.img 
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className={isLogo 
                ? "w-24 h-24 object-contain" 
                : "absolute inset-0 w-full h-full object-cover object-top"
              }
              initial={{ scale: 1 }}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ) : (
            <>
              {/* Large Letter Background */}
              <motion.div
                className="text-6xl font-bold text-foreground/10"
                initial={{ scale: 1 }}
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {title.charAt(0)}
              </motion.div>

              {/* Floating Accent Icon */}
              <motion.div
                className="absolute top-4 left-4 text-foreground/20"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AccentIcon className="w-8 h-8" />
              </motion.div>
            </>
          )}

          {/* Crossfade overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* External Link Indicator */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ExternalLink className="w-5 h-5 text-primary" />
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: entranceDelay + 0.4 }}
          >
            {category}
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 sm:p-8">
          <motion.h3
            className="text-xl lg:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
            style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base"
            style={{ transformStyle: 'preserve-3d', translateZ: 15 }}
          >
            {description}
          </motion.p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
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
            Visit website →
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
    </RootTag>
  );
};
