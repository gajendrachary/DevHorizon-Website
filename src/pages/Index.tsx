import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ProjectsPreviewSection } from '@/components/home/ProjectsPreviewSection';
import { ClientLogosSection } from '@/components/home/ClientLogosSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';
import { SEO, getOrganizationSchema, getLocalBusinessSchema } from '@/components/common/SEO';

const Index = () => {
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      getLocalBusinessSchema(),
    ],
  };

  return (
    <Layout>
      <SEO
        title="DevHorizon Technologies Private Limited - Transforming Ideas Into Digital Excellence | Web & Mobile Development Bengaluru"
        description="DevHorizon Technologies Private Limited is a full-service digital agency in Bengaluru offering custom web development starting ₹30,000, mobile apps from ₹40,000, and Meta ads management. Transform your business with our innovative solutions."
        schema={combinedSchema}
      />
      
      <HeroSection />
      <ClientLogosSection />
      <CTASection />
      <ServicesSection />
      <StatsSection />
      <ProjectsPreviewSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
