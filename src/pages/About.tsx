import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO, getBreadcrumbSchema } from "@/components/common/SEO";
import { useRef, useState } from "react";
import teamEswari from "@/assets/team-eswari.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  Phone,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import teamGajendrachary from "@/assets/team-gajendrachary.png";

const techStack = [
  {
    category: "Frontend",
    icon: Globe,
    emoji: "🌐",
    technologies: ["React.js", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    emoji: "📱",
    technologies: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Firebase"],
  },
  {
    category: "Backend & Cloud",
    icon: Server,
    emoji: "⚙️",
    technologies: ["Node.js", "Python", "Django", "AWS", "GCP"],
  },
  {
    category: "Design",
    icon: Palette,
    emoji: "🎨",
    technologies: ["UI/UX", "Figma", "Prototyping", "Brand Identity"],
  },
];

const team = [
  {
    name: "A Eswari",
    role: "Director",
    image: teamEswari,
    links: [],
  },
  {
    name: "Gajendrachary",
    role: "Founder & Developer",
    image: teamGajendrachary,
    links: [
      { icon: Linkedin, href: "https://www.linkedin.com/in/gajendrachary/" },
      { icon: Github, href: "https://github.com/gajendrachary" },
    ],
  },
];

const values = [
  { icon: Target, emoji: "🎯", title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
  { icon: Trophy, emoji: "🏆", title: "Excellence", description: "Delivering nothing but the best quality" },
  { icon: Shield, emoji: "🛡️", title: "Integrity", description: "Honest and transparent in all dealings" },
  { icon: Users, emoji: "👥", title: "Reliability", description: "Dependable partnerships you can count on" },
  { icon: Handshake, emoji: "🤝", title: "Collaboration", description: "Working together for shared success" },
  { icon: Leaf, emoji: "🌱", title: "Sustainability", description: "Building for long-term growth" },
];

const stats = [
  { value: "20+", label: "Successful website projects" },
  { value: "5+", label: "Mobile applications deployed" },
  { value: "500+", label: "Active users" },
  { value: "95%", label: "Client satisfaction" },
];

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: techRef, inView: techInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Tech Stack Carousel State
  const techScrollRef = useRef<HTMLDivElement>(null);
  const [techActiveIndex, setTechActiveIndex] = useState(0);
  const techTouchStartX = useRef(0);
  const techTouchEndX = useRef(0);

  // Values Carousel State
  const valuesScrollRef = useRef<HTMLDivElement>(null);
  const [valuesActiveIndex, setValuesActiveIndex] = useState(0);
  const valuesTouchStartX = useRef(0);
  const valuesTouchEndX = useRef(0);

  // Gajendrachary popup state
  const [isGajendraPopupOpen, setIsGajendraPopupOpen] = useState(false);

  const handleTechScroll = () => {
    if (!techScrollRef.current) return;
    const scrollLeft = techScrollRef.current.scrollLeft;
    const cardWidth = techScrollRef.current.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setTechActiveIndex(Math.min(Math.max(newIndex, 0), techStack.length - 1));
  };

  const scrollTechTo = (index: number) => {
    if (!techScrollRef.current) return;
    const cardWidth = techScrollRef.current.offsetWidth * 0.85;
    techScrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setTechActiveIndex(index);
  };

  const handleValuesScroll = () => {
    if (!valuesScrollRef.current) return;
    const scrollLeft = valuesScrollRef.current.scrollLeft;
    const cardWidth = valuesScrollRef.current.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setValuesActiveIndex(Math.min(Math.max(newIndex, 0), values.length - 1));
  };

  const scrollValuesTo = (index: number) => {
    if (!valuesScrollRef.current) return;
    const cardWidth = valuesScrollRef.current.offsetWidth * 0.85;
    valuesScrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setValuesActiveIndex(index);
  };

  const handleTechTouchStart = (e: React.TouchEvent) => {
    techTouchStartX.current = e.touches[0].clientX;
  };

  const handleTechTouchMove = (e: React.TouchEvent) => {
    techTouchEndX.current = e.touches[0].clientX;
  };

  const handleTechTouchEnd = () => {
    const diff = techTouchStartX.current - techTouchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && techActiveIndex < techStack.length - 1) {
        scrollTechTo(techActiveIndex + 1);
      } else if (diff < 0 && techActiveIndex > 0) {
        scrollTechTo(techActiveIndex - 1);
      }
    }
  };

  const handleValuesTouchStart = (e: React.TouchEvent) => {
    valuesTouchStartX.current = e.touches[0].clientX;
  };

  const handleValuesTouchMove = (e: React.TouchEvent) => {
    valuesTouchEndX.current = e.touches[0].clientX;
  };

  const handleValuesTouchEnd = () => {
    const diff = valuesTouchStartX.current - valuesTouchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && valuesActiveIndex < values.length - 1) {
        scrollValuesTo(valuesActiveIndex + 1);
      } else if (diff < 0 && valuesActiveIndex > 0) {
        scrollValuesTo(valuesActiveIndex - 1);
      }
    }
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DevHorizon Technologies Private Limited",
    description:
      "Learn about DevHorizon Technologies Private Limited, a Bengaluru-based digital company founded in 2025.",
    mainEntity: {
      "@type": "Organization",
      name: "DevHorizon Technologies Private Limited",
      foundingDate: "2025-06",
      numberOfEmployees: "15+",
      areaServed: ["India", "UAE", "UK", "USA", "Canada"],
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://devhorizontech.com/" },
    { name: "About", url: "https://devhorizontech.com/about" },
  ]);

  return (
    <Layout>
      <SEO
        title="About DevHorizon — Bengaluru Digital Company"
        description="DevHorizon Technologies is a Bengaluru-based digital company building custom websites, mobile apps, and Meta ads campaigns. Meet our team and mission."
        schema={{ "@context": "https://schema.org", "@graph": [aboutSchema, breadcrumbSchema] }}
      />

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
              About DevHorizon Technologies Private Limited
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Crafting Digital Excellence Since 2025</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DevHorizon Technologies Private Limited is a full-service digital company based in Bengaluru, India. We
              specialize in creating exceptional digital experiences through innovative web development, mobile
              applications, and strategic digital marketing solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in June 2025, DevHorizon Technologies Private Limited emerged from a passion for transforming
                businesses through technology. What started as a small team of developers has grown into a full-service
                digital company serving clients across India, UAE, Canada, US, and UK.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe in the power of technology to solve real-world problems. Our approach combines technical
                expertise with creative thinking to deliver solutions that not only look great but also drive measurable
                business results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every project we undertake is a commitment to excellence. From initial concept to final deployment, we
                work closely with our clients to ensure their vision becomes a digital reality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DEVHORIZON TECHNOLOGIES PRIVATE LIMITED having CIN U62011KA2026PTC216351 is Private company incorporated
                with MCA on 19th February, 2026. DEVHORIZON TECHNOLOGIES PRIVATE LIMITED is listed in the class of
                Private company and classified as Non-govt company. This company is registered at Registrar of
                Companies(ROC), RoC-Bangalore.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The company has 2 directors/key management personal A ESWARI, A GAJENDRACHARY. DEVHORIZON TECHNOLOGIES
                PVT LTD company registration number is 216351 and its Corporate Identification Number(CIN) provided from
                MCA is U62011KA2026PTC216351.
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

      {/* Technical Expertise Section - Horizontal Carousel */}
      <section ref={techRef} className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Technical Excellence</h2>
          </motion.div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex justify-end gap-2 mb-4">
            <button
              onClick={() => scrollTechTo(Math.max(0, techActiveIndex - 1))}
              aria-label="Previous tech stack"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              disabled={techActiveIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTechTo(Math.min(techStack.length - 1, techActiveIndex + 1))}
              aria-label="Next tech stack"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              disabled={techActiveIndex === techStack.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={techScrollRef}
          onScroll={handleTechScroll}
          onTouchStart={handleTechTouchStart}
          onTouchMove={handleTechTouchMove}
          onTouchEnd={handleTechTouchEnd}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4 touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
        >
          {techStack.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -3 }}
              whileTap={{ scale: 0.98 }}
              className="snap-center shrink-0 w-[85vw] md:w-[400px] lg:w-[350px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative bg-card border border-border p-8 h-full overflow-hidden group rounded-xl">
                {/* 3D Emoji */}
                <div className="absolute top-4 right-4 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  {stack.emoji}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Accent corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <stack.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary text-secondary-foreground px-3 py-1.5 text-sm font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {techStack.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTechTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === techActiveIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-padding bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container-swiss relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Meet the Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The People Behind DevHorizon Technologies Private Limited
            </h2>
            <p className="text-muted-foreground">
              A passionate team dedicated to delivering exceptional digital solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={teamInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ y: -8, rotateY: 5, transition: { duration: 0.3 } }}
                  className={`group relative w-full bg-card border border-border p-8 text-center overflow-hidden rounded-xl ${member.name === "Gajendrachary" ? "cursor-pointer" : ""}`}
                  style={{ perspective: "1000px" }}
                  onClick={member.name === "Gajendrachary" ? () => setIsGajendraPopupOpen(true) : undefined}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Avatar with ring */}
                  <div className="relative mx-auto mb-6">
                    {member.image ? (
                      <div className="w-28 h-28 rounded-full overflow-hidden mx-auto ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        <span className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {member.name === "Gajendrachary" && (
                      <div className="absolute -top-1 -right-1 bg-primary rounded-full p-2 shadow-lg group-hover:scale-110 group-hover:shadow-primary/40 transition-all duration-300">
                        <ExternalLink className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    {/* Status indicator */}
                    <div className="absolute bottom-1 right-1/2 translate-x-8 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </motion.div>

                {/* Social / contact links BELOW the card */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  {member.name === "A Eswari" && (
                    <a
                      href="mailto:eshwari.director@devhorizontech.com"
                      aria-label={`Email ${member.name}`}
                      className="w-11 h-11 rounded-full border border-primary/30 text-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-primary/25"
                      title="eshwari.director@devhorizontech.com"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {member.links.map((link) => {
                    const isLinkedIn = link.href.includes("linkedin");
                    const isGitHub = link.href.includes("github");
                    const network = isLinkedIn ? "LinkedIn" : isGitHub ? "GitHub" : "profile";
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${network}`}
                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                          isLinkedIn
                            ? "text-[#0A66C2] border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[#0A66C2]/25"
                            : isGitHub
                              ? "text-[#333] dark:text-white border-[#333]/30 dark:border-white/30 hover:bg-[#333] dark:hover:bg-white hover:text-white dark:hover:text-[#333] hover:border-[#333] dark:hover:border-white hover:shadow-[#333]/25 dark:hover:shadow-white/25"
                              : "border-border hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-primary/25"
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section - Horizontal Carousel */}
      <section ref={valuesRef} className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          </motion.div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex justify-end gap-2 mb-4">
            <button
              onClick={() => scrollValuesTo(Math.max(0, valuesActiveIndex - 1))}
              aria-label="Previous value"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              disabled={valuesActiveIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollValuesTo(Math.min(values.length - 1, valuesActiveIndex + 1))}
              aria-label="Next value"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              disabled={valuesActiveIndex === values.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={valuesScrollRef}
          onScroll={handleValuesScroll}
          onTouchStart={handleValuesTouchStart}
          onTouchMove={handleValuesTouchMove}
          onTouchEnd={handleValuesTouchEnd}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4 touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -3 }}
              whileTap={{ scale: 0.98 }}
              className="snap-center shrink-0 w-[85vw] md:w-[350px] lg:w-[300px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative bg-card border border-border p-8 h-full overflow-hidden group rounded-xl">
                {/* 3D Emoji */}
                <div className="absolute top-4 right-4 text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  {value.emoji}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Accent corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollValuesTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === valuesActiveIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
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
            className="max-w-2xl mx-auto bg-white text-black p-8 md:p-12 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4 mb-8">
              <div className="rounded-2xl overflow-hidden border border-black/10">
                <iframe
                  src="https://maps.google.com/maps?q=DevHorizon+Technologies+Pvt+Ltd,+AB+Complex,+Hesaraghatta+Rd,+Vidyaranyapura,+Bengaluru,+Karnataka+560097&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DevHorizon Technologies Location"
                />
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-black shrink-0" />
                <a href="mailto:info@devhorizontech.com" className="hover:opacity-70 transition-opacity">
                  info@devhorizontech.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-black shrink-0" />
                <a href="tel:+918688097373" className="hover:opacity-70 transition-opacity">
                  +91 8688097373
                </a>
              </div>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/get-quote">Start a Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Gajendrachary Website Popup */}
      <Dialog open={isGajendraPopupOpen} onOpenChange={setIsGajendraPopupOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 overflow-hidden">
          <iframe
            src="https://gajendrachary.in/"
            className="w-full h-full border-0"
            title="Gajendrachary Portfolio"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default About;
