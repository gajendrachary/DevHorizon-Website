import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0
}: UseScrollAnimationProps = {}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });

  const animationClass = inView
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: '500ms',
    transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    transitionProperty: 'opacity, transform'
  };

  return {
    ref,
    inView,
    animationClass,
    style
  };
};
