import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { ExternalLink, Smartphone, Globe } from 'lucide-react';

const websites = [
  {
    title: 'Jaggery Tea Point',
    category: 'F&B / Tea Shop',
    url: 'https://jaggeryteapoint.site',
    description: 'A modern website for an artisanal tea shop featuring online ordering and brand storytelling.',
    color: 'bg-amber-100',
    tech: ['React', 'Node.js', 'Tailwind CSS']
  },
  {
    title: 'Sri Kenchamba Ceramics',
    category: 'Retail / Sanitaryware & Tiles',
    url: 'https://srikenchambaceramics.com',
    description: 'E-commerce platform for premium ceramics and tiles with product catalog and inquiry system.',
    color: 'bg-stone-100',
    tech: ['Next.js', 'MongoDB', 'Stripe']
  },
  {
    title: 'Likitha Handcrafts',
    category: 'Handcrafts / E-Commerce',
    url: 'https://likithahandcrafts.online',
    description: 'Online store for handcrafted products with secure payments and inventory management.',
    color: 'bg-rose-100',
    tech: ['React', 'Firebase', 'Razorpay']
  },
  {
    title: 'Haven Salad',
    category: 'Food & Nutrition / Health',
    url: 'https://havensalad.in',
    description: 'Health-focused food delivery website with menu customization and subscription options.',
    color: 'bg-green-100',
    tech: ['Vue.js', 'Supabase', 'Tailwind CSS']
  },
];

const mobileApps = [
  {
    title: 'BLR360',
    category: 'Bengaluru Taxi Service',
    platforms: ['iOS', 'Android'],
    description: 'A comprehensive taxi booking app for Bengaluru with real-time tracking, fare estimation, and multiple payment options.',
    color: 'bg-blue-100',
    tech: ['React Native', 'Node.js', 'Google Maps API']
  },
  {
    title: 'Trading Automation Bot',
    category: 'FinTech / Trading Platform',
    platforms: ['iOS', 'Android'],
    description: 'Advanced trading automation platform with algorithmic strategies, real-time market data, and portfolio management.',
    color: 'bg-purple-100',
    tech: ['Flutter', 'Python', 'AWS']
  },
  {
    title: 'Saarathi',
    category: 'Airport Taxi Service',
    platforms: ['iOS', 'Android'],
    description: 'Premium airport transfer service app with flight tracking, pre-booking, and corporate accounts.',
    color: 'bg-sky-100',
    tech: ['React Native', 'Firebase', 'Stripe']
  },
];

const ProjectCard = ({ project, index, type }: { project: any; index: number; type: 'web' | 'app' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group border border-border bg-card overflow-hidden card-hover"
    >
      {/* Project Preview */}
      <div className={`${project.color} h-48 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-6xl font-bold text-foreground/10 group-hover:scale-110 transition-transform duration-300">
          {project.title.charAt(0)}
        </div>
        {type === 'web' && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
        {type === 'app' && (
          <div className="absolute top-4 right-4 flex gap-2">
            {project.platforms.map((platform: string) => (
              <span key={platform} className="bg-background px-3 py-1 text-xs font-medium">
                {platform}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
          {project.category}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span key={tech} className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Projects That Define Excellence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of successful projects spanning web development, 
              mobile applications, and digital marketing solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Websites Section */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Websites</h2>
              <p className="text-muted-foreground">Custom web solutions for diverse industries</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {websites.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} type="web" />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Mobile Applications</h2>
              <p className="text-muted-foreground">Native and cross-platform mobile solutions</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileApps.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} type="app" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
