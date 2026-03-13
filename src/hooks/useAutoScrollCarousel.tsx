import { useRef, useEffect, useState } from 'react';

// ============= Configuration =============
export interface AutoScrollConfig {
  /** Scroll speed in pixels per frame (default: 0.8) */
  speed?: number;
  /** Delay in ms before reversing direction at edges (default: 1500) */
  reverseDelay?: number;
  /** Whether to pause on hover - desktop only (default: true) */
  pauseOnHover?: boolean;
  /** Whether auto-scroll is enabled (default: true) */
  enabled?: boolean;
}

const DEFAULT_CONFIG: Required<AutoScrollConfig> = {
  speed: 0.8,
  reverseDelay: 1500,
  pauseOnHover: true,
  enabled: true,
};

export interface UseAutoScrollCarouselReturn {
  /** Ref to attach to the scroll container */
  containerRef: React.RefObject<HTMLDivElement>;
  /** Current scroll direction: 1 = scrolling right, -1 = scrolling left */
  direction: 1 | -1;
  /** Whether auto-scroll is currently paused */
  isPaused: boolean;
  /** Mouse enter handler for pause-on-hover */
  handleMouseEnter: () => void;
  /** Mouse leave handler for pause-on-hover */
  handleMouseLeave: () => void;
  /** Touch start handler for mobile interaction */
  handleTouchStart: () => void;
  /** Touch end handler for mobile interaction */
  handleTouchEnd: () => void;
  /** Manually pause auto-scroll */
  pause: () => void;
  /** Manually resume auto-scroll */
  resume: () => void;
}

/**
 * Hook for creating an auto-scrolling, infinite back-and-forth carousel.
 */
export function useAutoScrollCarousel(config: AutoScrollConfig = {}): UseAutoScrollCarouselReturn {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Store all config values in refs to avoid stale closures
  const speedRef = useRef(mergedConfig.speed);
  const reverseDelayRef = useRef(mergedConfig.reverseDelay);
  const pauseOnHoverRef = useRef(mergedConfig.pauseOnHover);
  const enabledRef = useRef(mergedConfig.enabled);
  
  // Animation state refs
  const directionRef = useRef<1 | -1>(1);
  const isPausedRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const currentSpeedRef = useRef(mergedConfig.speed);
  const targetSpeedRef = useRef(mergedConfig.speed);
  const isReversingRef = useRef(false);
  
  // React state for UI updates
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Sync config changes to refs
  useEffect(() => {
    speedRef.current = mergedConfig.speed;
    reverseDelayRef.current = mergedConfig.reverseDelay;
    pauseOnHoverRef.current = mergedConfig.pauseOnHover;
    enabledRef.current = mergedConfig.enabled;
    targetSpeedRef.current = mergedConfig.speed;
  }, [mergedConfig.speed, mergedConfig.reverseDelay, mergedConfig.pauseOnHover, mergedConfig.enabled]);

  // Main animation loop
  useEffect(() => {
    if (!mergedConfig.enabled) return;

    let frameId: number;
    let reverseTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const animate = () => {
      const container = containerRef.current;
      
      if (!container) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Skip if paused or user is interacting
      if (isPausedRef.current || isUserInteractingRef.current) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Smooth speed easing
      const speedDiff = targetSpeedRef.current - currentSpeedRef.current;
      if (Math.abs(speedDiff) > 0.01) {
        currentSpeedRef.current += speedDiff * 0.05;
      } else {
        currentSpeedRef.current = targetSpeedRef.current;
      }

      // Check boundaries
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const threshold = 2;
      const atStart = scrollLeft <= threshold;
      const atEnd = scrollLeft >= maxScroll - threshold;

      // Handle direction reversal at edges
      if (!isReversingRef.current) {
        if ((directionRef.current === 1 && atEnd) || (directionRef.current === -1 && atStart)) {
          isReversingRef.current = true;
          targetSpeedRef.current = 0;

          reverseTimeoutId = setTimeout(() => {
            directionRef.current = directionRef.current === 1 ? -1 : 1;
            setDirection(directionRef.current);
            targetSpeedRef.current = speedRef.current;
            isReversingRef.current = false;
          }, reverseDelayRef.current);
        }
      }

      // Apply scroll
      const scrollAmount = currentSpeedRef.current * directionRef.current;
      container.scrollLeft += scrollAmount;

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      if (reverseTimeoutId) {
        clearTimeout(reverseTimeoutId);
      }
    };
  }, [mergedConfig.enabled]);

  // Event handlers
  const handleMouseEnter = () => {
    if (!pauseOnHoverRef.current) return;
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!pauseOnHoverRef.current) return;
    isPausedRef.current = false;
    setIsPaused(false);
    currentSpeedRef.current = 0;
    targetSpeedRef.current = speedRef.current;
  };

  const handleTouchStart = () => {
    isUserInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isUserInteractingRef.current = false;
      currentSpeedRef.current = 0;
      targetSpeedRef.current = speedRef.current;
    }, 1500);
  };

  const pause = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const resume = () => {
    isPausedRef.current = false;
    setIsPaused(false);
    currentSpeedRef.current = 0;
    targetSpeedRef.current = speedRef.current;
  };

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
