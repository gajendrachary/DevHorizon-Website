import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const stats = [
  { value: '20+', label: 'Websites Delivered' },
  { value: '5+', label: 'Mobile Apps' },
  { value: '95%', label: 'Client Satisfaction' },
];

const capabilities = ['Web Development', 'Mobile Apps', 'Meta Ads'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <section
      ref={sectionRef}
      className="hero-aurora relative overflow-hidden lg:rounded-t-[2rem]"
    >
      {/* Diagonal line texture */}
      <div className="hero-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Soft lime glow */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-24 top-1/4 hidden h-[28rem] w-[28rem] rounded-full bg-primary/12 blur-[130px] lg:block"
        aria-hidden="true"
      />

      <div className="container-swiss relative z-10 py-20 md:py-28 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        >
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.span variants={itemVariants} className="eyebrow">
              [ Transforming Ideas ]
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Transforming Ideas Into{' '}
              <span className="text-primary">Digital Excellence</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              DevHorizon Technologies is a full-service digital company crafting custom websites, mobile
              apps and high-performing Meta ads campaigns that drive measurable growth.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg" className="pl-7 pr-2">
                <Link to="/get-quote" className="flex items-center gap-3">
                  Start Your Project
                  <span className="arrow-badge">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/projects">View Our Work</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-foreground/80">
                <Link to="/careers">Careers</Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-2.5">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground/85"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
