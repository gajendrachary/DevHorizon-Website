import { useRef, useCallback, useEffect, useState } from 'react';

// ============= Configuration =============
export interface AutoScrollConfig {
  /** Scroll speed in pixels per frame (default: 1) */
  speed?: number;
  /** Delay in ms before reversing direction at edges (default: 1000) */
  reverseDelay?: number;
  /** Whether to pause on hover - desktop only (default: true) */
  pauseOnHover?: boolean;
  /** Whether auto-scroll is enabled (default: true) */
  enabled?: boolean;
}

const DEFAULT_CONFIG: Required<AutoScrollConfig> = {
  speed: 1,
  reverseDelay: 1000,
  pauseOnHover: true,
  enabled: true,
};

export interface UseAutoScrollCarouselReturn {
  /** Ref to attach to the scroll container */
  containerRef: React.RefObject<HTMLDivElement>;
  /** Current scroll direction: 1 = left-to-right content movement (scrolling right), -1 = opposite */
  direction: 1 | -1;
  /** Whether auto-scroll is currently paused */
  isPaused: boolean;
  /** Mouse enter handler for pause-on-hover */
  handleMouseEnter: () => void;
  /** Mouse leave handler for pause-on-hover */
  handleMouseLeave: () => void;
  /** Touch start handler for mobile interaction */
  handleTouchStart: (e: React.TouchEvent) => void;
  /** Touch end handler for mobile interaction */
  handleTouchEnd: () => void;
  /** Manually pause auto-scroll */
  pause: () => void;
  /** Manually resume auto-scroll */
  resume: () => void;
}

/**
 * Hook for creating an auto-scrolling, infinite back-and-forth carousel.
 * 
 * Features:
 * - Continuous horizontal auto-scroll
 * - Reverses direction at edges with configurable delay
 * - Smooth easing when changing direction
 * - Pause on hover (desktop)
 * - Resumes after touch/swipe interaction (mobile)
 * - Works with any number of items
 */
export function useAutoScrollCarousel(config: AutoScrollConfig = {}): UseAutoScrollCarouselReturn {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const { speed, reverseDelay, pauseOnHover, enabled } = mergedConfig;

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const directionRef = useRef<1 | -1>(1); // 1 = scrolling right (content moves left)
  const isPausedRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const reverseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSpeedRef = useRef(speed);
  const targetSpeedRef = useRef(speed);
  
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth speed interpolation for direction changes
  const easeSpeed = useCallback(() => {
    const diff = targetSpeedRef.current - currentSpeedRef.current;
    if (Math.abs(diff) > 0.01) {
      currentSpeedRef.current += diff * 0.05; // Gentle easing
    } else {
      currentSpeedRef.current = targetSpeedRef.current;
    }
  }, []);

  // Check if at scroll boundaries
  const checkBoundaries = useCallback(() => {
    const container = containerRef.current;
    if (!container) return { atStart: false, atEnd: false };

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    
    // Small threshold to account for floating point errors
    const threshold = 2;
    const atStart = scrollLeft <= threshold;
    const atEnd = scrollLeft >= maxScroll - threshold;

    return { atStart, atEnd };
  }, []);

  // Schedule direction reversal
  const scheduleReverse = useCallback(() => {
    if (reverseTimeoutRef.current) {
      clearTimeout(reverseTimeoutRef.current);
    }

    // Start decelerating
    targetSpeedRef.current = 0;

    reverseTimeoutRef.current = setTimeout(() => {
      // Reverse direction
      directionRef.current = directionRef.current === 1 ? -1 : 1;
      setDirection(directionRef.current);
      
      // Start accelerating in new direction
      targetSpeedRef.current = speed;
    }, reverseDelay);
  }, [reverseDelay, speed]);

  // Main animation loop
  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container || isPausedRef.current || isUserInteractingRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Apply smooth speed easing
    easeSpeed();

    const { atStart, atEnd } = checkBoundaries();
    
    // Check if we need to reverse
    if (directionRef.current === 1 && atEnd) {
      scheduleReverse();
    } else if (directionRef.current === -1 && atStart) {
      scheduleReverse();
    }

    // Apply scroll
    const scrollAmount = currentSpeedRef.current * directionRef.current;
    container.scrollLeft += scrollAmount;

    animationRef.current = requestAnimationFrame(animate);
  }, [easeSpeed, checkBoundaries, scheduleReverse]);

  // Start/stop animation based on enabled state
  useEffect(() => {
    if (enabled) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (reverseTimeoutRef.current) {
        clearTimeout(reverseTimeoutRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [enabled, animate]);

  // Handle mouse enter (pause on hover)
  const handleMouseEnter = useCallback(() => {
    if (!pauseOnHover) return;
    isPausedRef.current = true;
    setIsPaused(true);
  }, [pauseOnHover]);

  // Handle mouse leave (resume)
  const handleMouseLeave = useCallback(() => {
    if (!pauseOnHover) return;
    isPausedRef.current = false;
    setIsPaused(false);
    // Reset speed for smooth resume
    currentSpeedRef.current = 0;
    targetSpeedRef.current = speed;
  }, [pauseOnHover, speed]);

  // Handle touch start (user is interacting)
  const handleTouchStart = useCallback(() => {
    isUserInteractingRef.current = true;
    // Clear any pending resume
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  // Handle touch end (schedule resume)
  const handleTouchEnd = useCallback(() => {
    // Resume after a short delay to allow momentum scrolling
    resumeTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      // Reset speed for smooth resume
      currentSpeedRef.current = 0;
      targetSpeedRef.current = speed;
    }, 1500); // Wait for momentum to settle
  }, [speed]);

  // Manual pause/resume
  const pause = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
    currentSpeedRef.current = 0;
    targetSpeedRef.current = speed;
  }, [speed]);

  return {
    containerRef,
    direction,
    isPaused,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    pause,
    resume,
  };
}
