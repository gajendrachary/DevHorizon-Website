import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-foreground text-background">
      <div className="container-swiss">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg opacity-80 mb-10 leading-relaxed">
            Let's discuss how we can help you achieve your digital goals. 
            Schedule a free consultation or get started with a custom quote today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="cta" size="xl">
              <Link to="/get-quote" className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="ctaOutline" size="xl">
              <Link to="/about" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
