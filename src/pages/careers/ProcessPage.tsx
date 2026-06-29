import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { HiringProcess } from '@/components/careers/HiringProcess';

const ProcessPage = () => (
  <CareersLayout>
    <SEO
      title="Hiring Process — Careers at DevHorizon"
      description="Our 5-step hiring process: apply, screening, technical interview, final discussion, and offer."
      canonical="https://www.devhorizontech.com/careers/process"
    />
    <HiringProcess />
  </CareersLayout>
);

export default ProcessPage;
