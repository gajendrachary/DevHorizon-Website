import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

const stats = [
  { value: 40, suffix: '+', label: 'Websites Built' },
  { value: 24, suffix: '+', label: 'Mobile Apps Developed' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 15, suffix: '+', label: 'Team Members' },
];

const StatItem = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const { ref, displayValue } = useAnimatedCounter({
    end: value,
    suffix,
    duration: 2000
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 counter-animate">
        {displayValue}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-secondary/50">
      <div className="container-swiss">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Why Choose DevHub
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Track Record Speaks
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
