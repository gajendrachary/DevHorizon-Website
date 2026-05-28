import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  { q: 'Do you hire freshers?', a: 'Yes. We run paid internships and entry-level roles. Final-year students and recent grads are welcome to apply.' },
  { q: 'Are roles remote, hybrid, or onsite?', a: 'A mix. Most engineering roles are hybrid out of Bengaluru. A few senior roles are fully remote — check each listing.' },
  { q: 'What is the typical hiring timeline?', a: 'About 2–3 weeks end-to-end: ~5 business days for resume screening, then technical and final rounds back-to-back.' },
  { q: 'What should my resume show?', a: 'Shipped work, specific tools, measurable impact, and links to repos/demos. Skip generic objective statements.' },
  { q: 'Do interns get converted to full-time?', a: 'Often yes. Strong interns receive full-time offers at the end of their term, contingent on role availability.' },
  { q: "What if no role matches my profile?", a: 'Submit a general application — choose "Other / General application" in the form. We review every submission.' },
];

export const CareersFAQ = () => (
  <section id="faq" className="py-14 md:py-20 bg-secondary/20">
    <div className="container-swiss max-w-3xl">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Frequently asked</h2>
      </div>
      <Accordion type="single" collapsible className="bg-card border border-border rounded-xl px-6 shadow-soft">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`f-${i}`} className="last:border-b-0">
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
