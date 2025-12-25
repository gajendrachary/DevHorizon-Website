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
  icon: LucideIcon;
  accentIcon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  timeline: string;
  index: number;
  isInView: boolean;
  onClick: () => void;
}

export const ServiceCard = ({
  icon: Icon,
  accentIcon: AccentIcon,
  title,
  description,
  features,
  color,
  timeline,
  index,
  isInView,
  onClick,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Calculate entrance animation delay based on index
  const entranceDelay = index * ANIMATION_CONFIG.entrance.stagger;

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
        className="relative bg-card border border-border p-6 sm:p-8 lg:p-10 rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTapStart={() => setIsTapped(true)}
        onTap={() => {
          setIsTapped(false);
          onClick();
        }}
        onTapCancel={() => setIsTapped(false)}
        animate={{
          rotateY: isTapped ? ANIMATION_CONFIG.tap.rotateY : isHovered ? ANIMATION_CONFIG.hover.rotateY : 0,
          rotateX: isTapped ? ANIMATION_CONFIG.tap.rotateX : isHovered ? ANIMATION_CONFIG.hover.rotateX : 0,
          scale: isTapped ? ANIMATION_CONFIG.tap.scale : isHovered ? ANIMATION_CONFIG.hover.scale : 1,
          boxShadow: isHovered 
            ? `${ANIMATION_CONFIG.hover.shadowIntensity} hsl(var(--primary) / 0.25)` 
            : '0 4px 6px -1px hsl(var(--foreground) / 0.1)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
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
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs text-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: entranceDelay + 0.4 }}
        >
          <Clock className="w-3 h-3" />
          {timeline}
        </motion.div>

        {/* Floating Accent Icon */}
        <motion.div
          className="absolute top-16 right-4 text-primary/10"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AccentIcon className="w-8 h-8" />
        </motion.div>

        {/* Icon */}
        <motion.div
          className={`relative w-16 h-16 ${color} flex items-center justify-center mb-6 rounded-xl`}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
        >
          <Icon className="w-8 h-8" />
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1.5, opacity: 0 } : {}}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Content */}
        <motion.h3 
          className="text-xl lg:text-2xl font-bold mb-3 text-foreground"
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
              <span className="text-muted-foreground">{feature}</span>
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
