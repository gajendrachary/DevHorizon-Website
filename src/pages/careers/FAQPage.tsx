import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { CareersFAQ } from '@/components/careers/CareersFAQ';

const FAQPage = () => (
  <CareersLayout>
    <SEO
      title="Careers FAQ — DevHorizon"
      description="Frequently asked questions about joining DevHorizon Technologies — hiring, internships, remote work, and more."
      canonical="https://devhorizontech.com/careers/faq"
    />
    <CareersFAQ />
  </CareersLayout>
);

export default FAQPage;
