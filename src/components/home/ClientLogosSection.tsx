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

// Duplicate logos for seamless infinite scroll
const duplicatedLogos = [...clientLogos, ...clientLogos];

export const ClientLogosSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section 
      ref={ref} 
      className="py-12 overflow-hidden"
      style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}
    >
      <div className="container-swiss">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by businesses across industries
        </motion.p>
      </div>
      
      {/* Infinite Scroll Container */}
      <div className="relative group">
        {/* Left fade gradient */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f5f5f5, transparent)' }}
        />
        
        {/* Right fade gradient */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f5f5f5, transparent)' }}
        />
        
        <div 
          className="flex items-center animate-scroll-left hover:[animation-play-state:paused]"
          style={{ gap: '30px', width: 'max-content' }}
        >
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center gap-3 text-muted-foreground shrink-0 cursor-pointer hover:text-foreground transition-colors duration-200"
            >
              <div 
                className="flex items-center justify-center font-bold bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300
                  h-[50px] w-[50px] text-xs
                  sm:h-[70px] sm:w-[70px] sm:text-sm
                  lg:h-[100px] lg:w-[100px] lg:text-base
                  rounded-lg"
              >
                {client.initial}
              </div>
              <span className="text-sm font-medium hidden md:block whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
