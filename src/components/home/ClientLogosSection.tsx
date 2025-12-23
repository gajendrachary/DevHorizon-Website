import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const clientLogos = [
  { name: 'Jaggery Tea Point', initial: 'JTP' },
  { name: 'Sri Kenchamba Ceramics', initial: 'SKC' },
  { name: 'Likitha Handcrafts', initial: 'LH' },
  { name: 'Haven Salad', initial: 'HS' },
  { name: 'BLR360', initial: 'BLR' },
  { name: 'Saarathi', initial: 'SA' },
];

export const ClientLogosSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-12 bg-secondary/30 border-y border-border">
      <div className="container-swiss">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by businesses across industries
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-muted flex items-center justify-center text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                {client.initial}
              </div>
              <span className="text-sm font-medium hidden sm:block">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
