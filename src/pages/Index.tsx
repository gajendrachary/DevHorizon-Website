import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProjectsPreviewSection } from "@/components/home/ProjectsPreviewSection";
import { ClientLogosSection } from "@/components/home/ClientLogosSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { ProductSection } from "@/components/home/ProductSection";
import { InternshipSection } from "@/components/home/InternshipSection";
import { SEO, getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from "@/components/common/SEO";

const homepageFaqs = [
  {
    question: "What services does DevHorizon Technologies Private Limited offer?",
    answer:
      "DevHorizon Technologies Private Limited offers comprehensive digital services including custom web development, mobile app development (iOS & Android), Meta ads management, UI/UX design, and cloud solutions. We specialize in creating tailored solutions that drive business growth.",
  },
  {
    question: "How long does it typically take to build a website?",
    answer:
      "The timeline varies based on project complexity. A standard business website typically takes 2-3 weeks, while complex e-commerce platforms or web applications may take 4-8 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes! We provide comprehensive post-launch support including regular updates, security patches, performance monitoring, and content updates. Our support packages are flexible and can be customized to your needs.",
  },
  {
    question: "Can you help with SEO and digital marketing?",
    answer:
      "Absolutely. All our websites are built with SEO best practices in mind. We also offer Meta ads management services to help you reach your target audience effectively and drive measurable results.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we work with clients globally including UAE, Canada, US, UK, and across India. We use modern collaboration tools to ensure seamless communication regardless of timezone differences.",
  },
];

const Index = () => {
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [getOrganizationSchema(), getLocalBusinessSchema(), getFAQSchema(homepageFaqs)],
  };

  return (
    <Layout>
      <SEO
        title="DevHorizon — Web & Mobile Development in Bengaluru"
        description="DevHorizon Technologies builds custom websites, mobile apps, and Meta ads campaigns for businesses in Bengaluru and worldwide. Get a free quote today."
        schema={combinedSchema}
      />

      <HeroSection />
      <ClientLogosSection />
      <div className="cv-auto"><InternshipSection /></div>
      <div className="cv-auto"><CTASection /></div>

      <div className="cv-auto"><ServicesSection /></div>
      <div className="cv-auto"><ProductSection /></div>

      <div className="cv-auto"><StatsSection /></div>
      <div className="cv-auto"><ProjectsPreviewSection /></div>
      <div className="cv-auto"><FAQSection /></div>
    </Layout>
  );
};

export default Index;
