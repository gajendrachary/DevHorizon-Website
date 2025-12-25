import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
const projects = [{
  title: 'Jaggery Tea Point',
  category: 'F&B / Tea Shop',
  url: 'https://jaggeryteapoint.site',
  description: 'A modern website for an artisanal tea shop featuring online ordering and brand storytelling.',
  color: 'bg-amber-100'
}, {
  title: 'Sri Kenchamba Ceramics',
  category: 'Retail / Sanitaryware & Tiles',
  url: 'https://srikenchambaceramics.com',
  description: 'E-commerce platform for premium ceramics and tiles with product catalog and inquiry system.',
  color: 'bg-stone-100'
}, {
  title: 'Likitha Handcrafts',
  category: 'Handcrafts / E-Commerce',
  url: 'https://likithahandcrafts.online',
  description: 'Online store for handcrafted products with secure payments and inventory management.',
  color: 'bg-rose-100'
}, {
  title: 'Haven Salad',
  category: 'Food & Nutrition / Health',
  url: 'https://havensalad.in',
  description: 'Health-focused food delivery website with menu customization and subscription options.',
  color: 'bg-green-100'
}];
export const ProjectsPreviewSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [activeProject, setActiveProject] = useState<number | null>(null);
  return <section ref={ref} className="section-padding bg-background">
      <div className="container-swiss">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block" initial={{
          opacity: 0,
          y: 10
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.1,
          ease: "easeOut"
        }}>
            Our Work
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" initial={{
          opacity: 0,
          y: 20
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.2,
          ease: "easeOut"
        }}>
             Recent Projects
          </motion.h2>
          <motion.p className="text-muted-foreground" initial={{
          opacity: 0,
          y: 20
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.3,
          ease: "easeOut"
        }}>
            Explore some of our recent work that showcases our expertise in creating impactful digital solutions.
          </motion.p>
        </motion.div>

        {/* Projects Grid with Crossfade Effect */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatePresence>
            {projects.map((project, index) => <motion.a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" initial={{
            opacity: 0,
            y: 40
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }} whileHover={{
            y: -8,
            transition: {
              duration: 0.3
            }
          }} onMouseEnter={() => setActiveProject(index)} onMouseLeave={() => setActiveProject(null)} className="group block border border-border bg-card overflow-hidden hover:shadow-glow hover:border-primary/30 transition-all duration-500">
              {/* Project Preview with Crossfade Overlay */}
              <div className={`${project.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                <motion.div className="text-4xl font-bold text-foreground/10" initial={{
                scale: 1
              }} animate={{
                scale: activeProject === index ? 1.2 : 1,
                rotate: activeProject === index ? 5 : 0
              }} transition={{
                duration: 0.5,
                ease: "easeOut"
              }}>
                  {project.title.charAt(0)}
                </motion.div>
                
                {/* Crossfade overlay on hover */}
                <motion.div className="absolute inset-0 bg-primary/10" initial={{
                opacity: 0
              }} animate={{
                opacity: activeProject === index ? 1 : 0
              }} transition={{
                duration: 0.5,
                ease: "easeInOut"
              }} />
                
                <motion.div className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center" initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: activeProject === index ? 1 : 0,
                y: activeProject === index ? 0 : 10
              }} transition={{
                duration: 0.4,
                ease: "easeOut"
              }}>
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Project Info with enhanced transitions */}
              <motion.div className="p-6" initial={{
              opacity: 0.8
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.3
            }}>
                <motion.div className="text-xs font-medium text-primary uppercase tracking-wider mb-2" animate={{
                x: activeProject === index ? 4 : 0
              }} transition={{
                duration: 0.3
              }}>
                  {project.category}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            </motion.a>)}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="text-center">
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.98
        }}>
            <Button asChild variant="outline" size="lg">
              <Link to="/projects" className="flex items-center gap-2">
                View All Projects
                <motion.span animate={{
                x: [0, 4, 0]
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};