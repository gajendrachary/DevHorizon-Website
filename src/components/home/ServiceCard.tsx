import { motion } from 'framer-motion';
import { Check, Clock, LucideIcon } from 'lucide-react';
import { useState } from 'react';

// Animation config - easily adjustable
export const ANIMATION_CONFIG = {
  entrance: {
    duration: 0.8,
    stagger: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom easing curve
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

interface ServiceCardProps {
  accentIcon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  timeline: string;
  index: number;
  isInView: boolean;
  onClick: () => void;
  parallaxOffset?: number; // -1 to 1, 0 = centered
  backgroundImage?: string;
}

export const ServiceCard = ({
  accentIcon: AccentIcon,
  title,
  description,
  features,
  color,
  timeline,
  index,
  isInView,
  onClick,
  parallaxOffset = 0,
  backgroundImage,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const touchStart = useState({ x: 0, y: 0, t: 0 })[0];

  // Calculate entrance animation delay based on index
  const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;

  // Parallax transformations based on scroll offset
  const parallaxRotateY = parallaxOffset * 8;
  const parallaxRotateX = Math.abs(parallaxOffset) * -3;
  const parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;
  const parallaxTranslateY = Math.abs(parallaxOffset) * 10;

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.x = t.clientX;
    touchStart.y = t.clientY;
    touchStart.t = Date.now();
    setIsTapped(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsTapped(false);
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - touchStart.x);
    const dy = Math.abs(t.clientY - touchStart.y);
    const dt = Date.now() - touchStart.t;
    // Only treat as a tap if finger barely moved and lift was quick
    if (dx < 10 && dy < 10 && dt < 400) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[420px] lg:w-[calc((100%-3rem)/3)] snap-center"
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
        className="relative bg-card border border-border p-6 sm:p-8 lg:p-10 rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={(e) => {
          // Mouse only — touch handled in onTouchEnd to filter out scroll/swipe
          const ne = e.nativeEvent as PointerEvent;
          if (ne.pointerType && ne.pointerType !== 'mouse') return;
          onClick();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setIsTapped(false)}
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
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img 
              src={backgroundImage} 
              alt="" 
              loading="lazy"
              decoding="async"
              className="absolute right-0 top-0 h-full w-3/5 object-cover object-left opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/70" />

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
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs text-foreground font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: entranceDelay + 0.4 }}
        >
          <Clock className="w-3 h-3" />
          {timeline}
        </motion.div>


        {/* Content */}
        <motion.h3 
          className="text-xl lg:text-2xl font-bold mb-3 text-foreground"
          style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-foreground mb-6 leading-relaxed text-sm sm:text-base font-bold"
          style={{ transformStyle: 'preserve-3d', translateZ: 15 }}
        >
          {description}
        </motion.p>

        {/* Features */}
        <ul className="space-y-2.5">
          {features.map((feature, featureIndex) => (
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
              <span className="text-foreground/90">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Click Hint */}
        <motion.div
          className="mt-6 text-xs text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isTapped ? 1 : 0.6 }}
        >
          Tap for details →
        </motion.div>

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
