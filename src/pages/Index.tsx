import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ProjectsPreviewSection } from '@/components/home/ProjectsPreviewSection';
import { ClientLogosSection } from '@/components/home/ClientLogosSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      {/* SEO Meta Tags */}
      <title>DevHub - Transforming Ideas Into Digital Excellence | Web & Mobile Development</title>
      <meta name="description" content="DevHub is a full-service digital agency in Bengaluru offering custom web development, mobile apps, and Meta ads management. Transform your business with our innovative solutions." />
      
      <HeroSection />
      <ClientLogosSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsPreviewSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
