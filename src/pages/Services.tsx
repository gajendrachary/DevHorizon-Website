import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, Target, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SEO, getServiceSchema, getBreadcrumbSchema } from '@/components/common/SEO';
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

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    price: '₹30,000',
    description: 'Custom, SEO-optimized websites built with modern technologies for maximum performance and user engagement.',
    features: [
      'SEO-optimized architecture',
      'Mobile-responsive design',
      'Fast loading speeds',
      'Modern tech stack (React, Next.js)',
      'CMS integration',
      'Analytics setup'
    ],
    link: '/services/web-development',
    color: 'text-primary'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    price: '₹40,000',
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
    features: [
      'iOS & Android development',
      'Cloud integration',
      'Real-time functionality',
      'Push notifications',
      'Offline capabilities',
      'App Store deployment'
    ],
    link: '/services/mobile-apps',
    color: 'text-primary'
  },
  {
    icon: Target,
    title: 'Meta Ads Management',
    price: '₹15,000',
    description: 'Strategic Facebook and Instagram advertising campaigns to maximize your ROI and reach your target audience.',
    features: [
      'Campaign strategy',
      'Audience targeting',
      'A/B testing',
      'Performance optimization',
      'Monthly reporting',
      'Budget management'
    ],
    link: '/services/meta-ads',
    color: 'text-primary'
  }
];

const Services = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const serviceSchemaData = getServiceSchema(
    services.map((s) => ({ name: s.title, description: s.description, price: s.price }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://devhub.tech/' },
    { name: 'Services', url: 'https://devhub.tech/services' },
  ]);

  return (
    <Layout>
      <SEO
        title="Our Services - Web Development, Mobile Apps & Meta Ads | DevHub Bengaluru"
        description="Explore DevHub's digital services: Custom web development starting ₹30,000, Mobile app development from ₹40,000, and Meta Ads management from ₹15,000/month. Get a free quote today."
        schema={{ '@context': 'https://schema.org', '@graph': [serviceSchemaData, breadcrumbSchema] }}
      />
      {/* CTA Section - Now at the top */}
      <section className="py-20 lg:py-32 bg-secondary text-foreground relative overflow-hidden">
        {/* Background Image with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentIndex}
              src={backgroundImages[currentIndex].src}
              alt={backgroundImages[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get a free consultation and detailed quote for your project. 
              Our team is ready to help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-quote">
                <Button variant="cta" size="lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Solutions That Drive <span className="text-primary">Results</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From stunning websites to powerful mobile apps and strategic advertising, 
              we provide end-to-end digital solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div
            ref={servicesRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-14 h-14 flex items-center justify-center bg-primary/10 mb-6 ${service.color}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                
                <p className="text-primary font-semibold mb-4">
                  Starting from {service.price}
                </p>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/get-quote">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
