import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Linkedin, 
  Github, 
  Globe, 
  Smartphone, 
  Server, 
  Palette,
  Users,
  Trophy,
  Target,
  Shield,
  Handshake,
  Leaf,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const techStack = [
  {
    category: 'Frontend',
    icon: Globe,
    technologies: ['React.js', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    technologies: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Firebase']
  },
  {
    category: 'Backend & Cloud',
    icon: Server,
    technologies: ['Node.js', 'Python', 'Django', 'AWS', 'GCP']
  },
  {
    category: 'Design',
    icon: Palette,
    technologies: ['UI/UX', 'Figma', 'Prototyping', 'Brand Identity']
  },
];

const team = [
  {
    name: 'Pavan Raj',
    role: 'Operations & Client Relations',
    image: null,
    links: []
  },
  {
    name: 'Gajendrachary',
    role: 'Lead Developer & Founder',
    image: null,
    links: [
      { icon: Linkedin, href: 'https://linkedin.com/in/gajendrachary' },
      { icon: Github, href: 'https://github.com/gajendrachary' }
    ]
  },
];

const values = [
  { icon: Target, title: 'Innovation', description: 'Pushing boundaries with cutting-edge solutions' },
  { icon: Trophy, title: 'Excellence', description: 'Delivering nothing but the best quality' },
  { icon: Shield, title: 'Integrity', description: 'Honest and transparent in all dealings' },
  { icon: Users, title: 'Reliability', description: 'Dependable partnerships you can count on' },
  { icon: Handshake, title: 'Collaboration', description: 'Working together for shared success' },
  { icon: Leaf, title: 'Sustainability', description: 'Building for long-term growth' },
];

const stats = [
  { value: '40+', label: 'Successful website projects' },
  { value: '24+', label: 'Mobile applications deployed' },
  { value: '2,000+', label: 'Active users' },
  { value: '95%', label: 'Client satisfaction' },
];

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: techRef, inView: techInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              About DevHub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crafting Digital Excellence Since 2025
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DevHub is a full-service digital agency based in Bengaluru, India. We specialize in 
              creating exceptional digital experiences through innovative web development, mobile 
              applications, and strategic digital marketing solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in June 2025, DevHub emerged from a passion for transforming businesses 
                through technology. What started as a small team of developers has grown into a 
                full-service digital agency serving clients across India, UAE, Canada, US, and UK.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe in the power of technology to solve real-world problems. Our approach 
                combines technical expertise with creative thinking to deliver solutions that not 
                only look great but also drive measurable business results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every project we undertake is a commitment to excellence. From initial concept to 
                final deployment, we work closely with our clients to ensure their vision becomes 
                a digital reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="bg-secondary/50 p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section ref={techRef} className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Technical Excellence</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                animate={techInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-6"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <stack.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-4">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <span key={tech} className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-padding bg-background">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Meet the Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">The People Behind DevHub</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-8 text-center card-hover"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-muted-foreground mb-4">{member.role}</p>
                {member.links.length > 0 && (
                  <div className="flex items-center justify-center gap-3">
                    {member.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary hover:text-primary-foreground"
                      >
                        <link.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-foreground text-background p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Vidyaranyapura, Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@devhub.tech" className="hover:text-primary transition-colors">
                  contact@devhub.tech
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+918688097373" className="hover:text-primary transition-colors">
                  +91 8688097373
                </a>
              </div>
            </div>
            <Button asChild variant="cta" size="lg">
              <Link to="/get-quote">Start a Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
