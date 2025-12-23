import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import developerClientMeeting from '@/assets/developer-client-meeting.png';
import developerPresenting from '@/assets/developer-presenting.png';
import teamBrainstorming from '@/assets/team-brainstorming.png';
import codeReview from '@/assets/code-review.png';

const backgroundImages = [
  { src: developerClientMeeting, alt: 'Developer meeting with client' },
  { src: developerPresenting, alt: 'Developer presenting work' },
  { src: teamBrainstorming, alt: 'Team brainstorming session' },
  { src: codeReview, alt: 'Code review meeting' },
];

export const CTASection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel
          opts={{ loop: true, duration: 40 }}
          plugins={[
            Autoplay({ delay: 4000, stopOnInteraction: false })
          ]}
          className="w-full h-full"
        >
          <CarouselContent className="h-full -ml-0">
            {backgroundImages.map((image, index) => (
              <CarouselItem key={index} className="h-full pl-0">
                <motion.img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-30"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-foreground/70 z-[1]" />

      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-[2]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-[2]"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-swiss relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to Transform Your Digital Presence?
          </motion.h2>
          <motion.p 
            className="text-lg opacity-80 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's discuss how we can help you achieve your digital goals. 
            Schedule a free consultation or get started with a custom quote today.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="cta" size="xl" className="group">
                <Link to="/get-quote" className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.span>
                  Get Started
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="ctaOutline" size="xl">
                <Link to="/about" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
