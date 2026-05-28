import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { ResumeTips } from '@/components/careers/ResumeTips';

const ResumeTipsPage = () => (
  <CareersLayout>
    <SEO
      title="Resume Tips — Careers at DevHorizon"
      description="Practical resume tips to help your application to DevHorizon Technologies stand out."
      canonical="https://devhorizontech.com/careers/resume-tips"
    />
    <ResumeTips />
  </CareersLayout>
);

export default ResumeTipsPage;
