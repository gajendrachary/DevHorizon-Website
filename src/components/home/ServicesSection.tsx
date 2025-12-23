import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, BarChart3, Check } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites that drive conversions and establish your digital presence.',
    features: ['SEO-optimized', 'Mobile-responsive', 'Fast loading', 'Modern tech stack'],
    color: 'bg-primary/10 text-primary'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['iOS & Android', 'Cloud integration', 'Real-time', 'Scalable'],
    color: 'bg-accent text-accent-foreground'
  },
  {
    icon: BarChart3,
    title: 'Meta Ads Management',
    description: 'Strategic Meta advertising campaigns that maximize ROI and reach your target audience.',
    features: ['Campaign strategy', 'Audience targeting', 'Performance optimization', 'Monthly reporting'],
    color: 'bg-primary/10 text-primary'
  },
];

export const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-swiss">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solutions That Drive Results
          </h2>
          <p className="text-muted-foreground">
            We offer comprehensive digital services tailored to help your business thrive in the modern digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border p-8 card-hover"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.color} flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110`}>
                <service.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
