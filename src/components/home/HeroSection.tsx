import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import developerMeeting from '@/assets/developer-client-meeting.png';
import developerPresenting from '@/assets/developer-presenting.png';
import teamBrainstorming from '@/assets/team-brainstorming.png';
import codeReview from '@/assets/code-review.png';
const backgroundImages = [{
  src: developerMeeting,
  alt: 'Developer client meeting'
}, {
  src: developerPresenting,
  alt: 'Developer presenting'
}, {
  src: teamBrainstorming,
  alt: 'Team brainstorming'
}, {
  src: codeReview,
  alt: 'Code review session'
}];
const serviceIcons = [{
  emoji: '🌐',
  label: 'Web Development'
}, {
  emoji: '📱',
  label: 'Mobile Apps'
}, {
  emoji: '📊',
  label: 'Meta Ads'
}];
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Floating particles configuration
const floatingParticles = [{
  size: 'w-3 h-3',
  left: '10%',
  top: '20%',
  duration: 5,
  delay: 0
}, {
  size: 'w-2 h-2',
  left: '25%',
  top: '60%',
  duration: 6,
  delay: 0.5
}, {
  size: 'w-4 h-4',
  left: '75%',
  top: '25%',
  duration: 7,
  delay: 1
}, {
  size: 'w-2 h-2',
  left: '85%',
  top: '70%',
  duration: 5.5,
  delay: 1.5
}, {
  size: 'w-3 h-3',
  left: '60%',
  top: '80%',
  duration: 6.5,
  delay: 2
}, {
  size: 'w-2 h-2',
  left: '40%',
  top: '15%',
  duration: 5,
  delay: 0.8
}];

// Characters for scramble effect
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}";
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Text scramble effect states
  const fullText = "Transforming Ideas Into ";
  const highlightText = "Digital Excellence";
  const [scrambledText, setScrambledText] = useState("");
  const [scrambledHighlight, setScrambledHighlight] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [highlightRevealedCount, setHighlightRevealedCount] = useState(0);

  // Background image carousel with longer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Text scramble effect for main text
  useEffect(() => {
    if (revealedCount <= fullText.length) {
      const scrambleInterval = setInterval(() => {
        const revealed = fullText.slice(0, revealedCount);
        const remaining = fullText.slice(revealedCount);
        const scrambled = remaining.split('').map(char => char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join('');
        setScrambledText(revealed + scrambled);
      }, 30);
      const revealTimeout = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 60);
      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(revealTimeout);
      };
    }
  }, [revealedCount]);

  // Text scramble effect for highlight text
  useEffect(() => {
    if (revealedCount > fullText.length && highlightRevealedCount <= highlightText.length) {
      const scrambleInterval = setInterval(() => {
        const revealed = highlightText.slice(0, highlightRevealedCount);
        const remaining = highlightText.slice(highlightRevealedCount);
        const scrambled = remaining.split('').map(char => char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join('');
        setScrambledHighlight(revealed + scrambled);
      }, 30);
      const revealTimeout = setTimeout(() => {
        setHighlightRevealedCount(prev => prev + 1);
      }, 70);
      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(revealTimeout);
      };
    }
  }, [revealedCount, highlightRevealedCount]);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different layers

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  return <section ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image Carousel with Horizontal Scrolling */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={currentImageIndex} src={backgroundImages[currentImageIndex].src} alt={backgroundImages[currentImageIndex].alt} className="absolute inset-0 w-full h-full object-cover" initial={{
          x: "100%",
          opacity: 0
        }} animate={{
          x: "0%",
          opacity: 0.5
        }} exit={{
          x: "-100%",
          opacity: 0
        }} transition={{
          x: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          },
          opacity: {
            duration: 0.5
          }
        }} />
        </AnimatePresence>
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {backgroundImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-primary w-8' : 'bg-foreground/30 hover:bg-foreground/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
        {/* Lighter overlay for better image visibility */}
        <div className="absolute inset-0 bg-secondary/60" />
      </div>

      {/* Floating Particles */}
      {floatingParticles.map((particle, i) => <motion.div key={i} className={`absolute ${particle.size} bg-primary/10 rounded-full pointer-events-none z-[1]`} style={{
      left: particle.left,
      top: particle.top
    }} animate={{
      y: [0, -30, 0],
      x: [0, 15, -15, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.2, 1]
    }} transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: "easeInOut"
    }} />)}


      {/* Animated gradient orbs with Parallax */}
      <motion.div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-[1]" style={{
      y: orb1Y
    }} animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl z-[1]" style={{
      y: orb2Y
    }} animate={{
      scale: [1.2, 1, 1.2],
      opacity: [0.2, 0.4, 0.2]
    }} transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      
      {/* Additional parallax decorative elements */}
      
      <motion.div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary/5 rounded-full z-[1]" style={{
      y: useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
    }} />

      <motion.div className="container-swiss relative z-10" style={{
      y: contentY,
      opacity
    }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div className="max-w-2xl" variants={containerVariants} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-sm font-medium mb-6 text-secondary-foreground">
              <motion.span className="w-2 h-2 bg-primary rounded-full" animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }} />
              Est. June 2025 • Bengaluru, India
            </motion.div>

            {/* Headline with text scramble effect */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-mono">
              <span className="tracking-tight">{scrambledText}</span>
              <motion.span animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }} transition={{
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }
            }} style={{
              backgroundSize: '200% 200%'
            }} className="gradient-text inline-block tracking-tight text-primary">
                {scrambledHighlight}
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-lg mb-4 font-medium text-secondary-foreground">
              Custom Websites • Mobile Apps • Meta Ads Management • Strategic Growth Solutions
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="mb-8 leading-relaxed text-secondary-foreground">
              DevHub is a full-service digital agency specializing in crafting exceptional digital experiences. 
              We help businesses establish a powerful online presence and drive measurable growth through 
              innovative technology solutions.
            </motion.p>

            {/* CTAs with shine effect */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <motion.div whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="relative overflow-hidden group">
                <Button asChild variant="hero" size="lg" className="relative overflow-hidden">
                  <Link to="/get-quote" className="flex items-center gap-2">
                    {/* Shine sweep effect */}
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" animate={{
                    x: ['-100%', '200%']
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }} />
                    Start Your Project
                    <motion.span className="inline-block" animate={{
                    x: [0, 4, 0]
                  }} transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Button asChild variant="heroOutline" size="lg">
                  <Link to="/projects">View Our Work</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Service Icons - 3D Animated */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              {serviceIcons.map((service, index) => <motion.div key={service.label} initial={{
              opacity: 0,
              scale: 0.5,
              y: 20,
              rotateX: -30
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0
            }} transition={{
              duration: 0.5,
              delay: 0.8 + index * 0.1,
              type: "spring",
              stiffness: 200
            }} whileHover={{
              scale: 1.15,
              y: -6,
              rotateY: 15,
              rotateX: -10,
              z: 50
            }} className="flex items-center gap-2 text-sm text-foreground cursor-pointer" style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}>
                  <motion.span className="text-3xl" style={{
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
              }} whileHover={{
                rotateY: 20,
                rotateX: -15,
                scale: 1.2
              }} animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, -3, 3, 0]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3
              }}>
                    {service.emoji}
                  </motion.span>
                  <span className="hidden sm:block">{service.label}</span>
                </motion.div>)}
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration with Parallax */}
          
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.5
    }} style={{
      opacity: scrollIndicatorOpacity
    }}>
        
        <motion.div animate={{
        y: [0, 8, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          
        </motion.div>
      </motion.div>
    </section>;
};