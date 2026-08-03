import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
];

const StatItem = ({
  value,
  suffix,
  label,
  delay,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  index: number;
}) => {
  const { ref, displayValue } = useAnimatedCounter({
    end: value,
    suffix,
    duration: 2000,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center group cursor-pointer"
    >
      <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        {/* Glow effect */}
        <motion.div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          className="text-4xl md:text-5xl font-bold text-foreground mb-2 counter-animate relative"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {displayValue}
        </motion.div>
      </motion.div>
      <motion.div
        className="text-muted-foreground font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="section-padding bg-secondary/50 overflow-hidden">
      <div className="container-swiss">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <motion.span
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Why Choose DevHorizon Technologies
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Track Record Speaks
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-items-center max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
