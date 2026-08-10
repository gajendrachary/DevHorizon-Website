import { motion } from 'framer-motion';
import esquireVenturesLogo from '@/assets/esquire-ventures-logo.png.asset.json';
import { useInView } from 'react-intersection-observer';
import logoSkandaCloudKitchen from '@/assets/logo-skanda-cloud-kitchen.png';
import logoLikithaHandcrafts from '@/assets/logo-likitha-handcrafts.png';
import logoHavenSalad from '@/assets/logo-haven-salad.png';
import logoJaggeryTeaPoint from '@/assets/logo-jaggery-tea-point.png';
import logoSriKenchambaCeramics from '@/assets/logo-sri-kenchamba-ceramics.png';
import logoJzGreenHeaven from '@/assets/logo-jz-green-heaven.png';
import logoUnitedNewsKannada from '@/assets/logo-united-news-kannada.jpg';
import logoSkcConstructions from '@/assets/logo-skc-constructions.png';
import logoAnanthBuildcon from '@/assets/logo-ananth-buildcon.png';
import logoSahasra from '@/assets/logo-sahasra.png';
import logoNriConnectingPeople from '@/assets/logo-nri-connecting-people.png';
import logoAnandTransports from '@/assets/logo-anand-transports.png';

const clientLogos = [
  { name: 'Skanda Cloud Kitchen', logo: logoSkandaCloudKitchen },
  { name: 'JZ Green Heaven Lodge', logo: logoJzGreenHeaven },
  { name: 'United News Kannada', logo: logoUnitedNewsKannada },
  { name: 'SKC Constructions and Interior', logo: logoSkcConstructions },
  { name: 'Ananth BuildCon', logo: logoAnanthBuildcon },
  { name: 'Sahasra', logo: logoSahasra },
  { name: 'Likitha Handcrafts', logo: logoLikithaHandcrafts },
  { name: 'Haven Salad', logo: logoHavenSalad },
  { name: 'Jaggery Tea Point', logo: logoJaggeryTeaPoint },
  { name: 'Sri Kenchamba Ceramics', logo: logoSriKenchambaCeramics },
  { name: 'NRI Connecting People', logo: logoNriConnectingPeople },
  { name: 'Anand Transports', logo: logoAnandTransports },
  { name: 'Esquire Ventures', logo: esquireVenturesLogo.url },
];

// Duplicate logos for seamless infinite scroll
const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

export const ClientLogosSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section
      ref={ref}
      className="py-10 md:py-14 overflow-hidden border-y border-border bg-secondary/40"
    >
      <div className="container-swiss">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center eyebrow justify-center mb-8"
        >
          Trusted by businesses across industries
        </motion.p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative group">
        {/* Left fade gradient */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }}
        />

        {/* Right fade gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }}
        />

        <div 
          className="flex items-center animate-scroll-left hover:[animation-play-state:paused]"
          style={{ gap: '40px', width: 'max-content' }}
        >
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <div 
                className="flex items-center justify-center overflow-hidden rounded-full border border-border bg-card transition-all duration-300
                  h-[60px] w-[60px]
                  sm:h-[80px] sm:w-[80px]
                  lg:h-[100px] lg:w-[100px]"
              >

                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
