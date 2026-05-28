import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { WhyJoin } from '@/components/careers/WhyJoin';

const WhyJoinPage = () => (
  <CareersLayout>
    <SEO
      title="Why Join — Careers at DevHorizon"
      description="Real project work, senior mentorship, modern stack, and fast growth at DevHorizon Technologies."
      canonical="https://devhorizontech.com/careers/why-join"
    />
    <WhyJoin />
  </CareersLayout>
);

export default WhyJoinPage;
