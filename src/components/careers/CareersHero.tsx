import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const CareersHero = ({ hasOpenings }: { hasOpenings: boolean }) => (
  <section className="py-16 md:py-24">
    <div className="container-swiss max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/30 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          Bengaluru, India · Hybrid & Remote roles
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          Build products that matter.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          DevHorizon — Building Digital Excellence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="lg" onClick={() => scrollTo('apply')}>
            Apply now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {hasOpenings && (
            <Button size="lg" variant="outline" onClick={() => scrollTo('openings')}>
              <Briefcase className="mr-2 h-4 w-4" /> View open roles
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  </section>
);
