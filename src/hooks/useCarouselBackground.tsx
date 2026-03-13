import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselBackgroundOptions {
  colors: string[];
  defaultColor: string;
  resetDelay?: number;
  onColorChange?: (color: string) => void;
}

export const useCarouselBackground = ({
  colors,
  defaultColor,
  resetDelay = 700,
  onColorChange,
}: UseCarouselBackgroundOptions) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const viewedIndicesRef = useRef<Set<number>>(new Set([0]));
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteractingRef = useRef(false);

  // Update color when active index changes
  useEffect(() => {
    if (colors[activeIndex]) {
      setCurrentColor(colors[activeIndex]);
      onColorChange?.(colors[activeIndex]);
    }

    // Track viewed cards
    viewedIndicesRef.current.add(activeIndex);
    
    // Check if all cards have been viewed
    if (viewedIndicesRef.current.size === colors.length) {
      setHasViewedAll(true);
    }
  }, [activeIndex, colors, onColorChange]);

  // Handle reset after viewing all cards
  const scheduleReset = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    if (hasViewedAll && activeIndex === colors.length - 1) {
      resetTimeoutRef.current = setTimeout(() => {
        if (!isInteractingRef.current) {
          setCurrentColor(defaultColor);
          onColorChange?.(defaultColor);
        }
      }, resetDelay);
    }
  }, [hasViewedAll, activeIndex, colors.length, defaultColor, resetDelay, onColorChange]);

  // Call scheduleReset when interaction ends
  const handleInteractionEnd = useCallback(() => {
    isInteractingRef.current = false;
    scheduleReset();
  }, [scheduleReset]);

  const handleInteractionStart = useCallback(() => {
    isInteractingRef.current = true;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    currentColor,
    hasViewedAll,
    handleInteractionStart,
    handleInteractionEnd,
  };
};
