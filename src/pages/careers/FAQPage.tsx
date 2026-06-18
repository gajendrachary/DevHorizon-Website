import { SEO, getFAQSchema } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { CareersFAQ } from '@/components/careers/CareersFAQ';

const careersFaqs = [
  { question: 'Do you hire freshers?', answer: 'Yes. We run paid internships and entry-level roles. Final-year students and recent grads are welcome to apply.' },
  { question: 'Are roles remote, hybrid, or onsite?', answer: 'A mix. Most engineering roles are hybrid out of Bengaluru. A few senior roles are fully remote — check each listing.' },
  { question: 'What is the typical hiring timeline?', answer: 'About 2–3 weeks end-to-end: ~5 business days for resume screening, then technical and final rounds back-to-back.' },
  { question: 'What should my resume show?', answer: 'Shipped work, specific tools, measurable impact, and links to repos/demos. Skip generic objective statements.' },
  { question: 'Do interns get converted to full-time?', answer: 'Often yes. Strong interns receive full-time offers at the end of their term, contingent on role availability.' },
  { question: 'What if no role matches my profile?', answer: 'Submit a general application — choose "Other / General application" in the form. We review every submission.' },
];

const FAQPage = () => (
  <CareersLayout>
    <SEO
      title="Careers FAQ — DevHorizon"
      description="Frequently asked questions about joining DevHorizon Technologies — hiring, internships, remote work, and resume tips."
      canonical="https://www.devhorizontech.com/careers/faq"
      schema={getFAQSchema(careersFaqs)}
    />
    <CareersFAQ />
  </CareersLayout>
);

export default FAQPage;
