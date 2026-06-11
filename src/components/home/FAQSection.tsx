import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services does DevHorizon Technologies Private Limited offer?',
    answer: 'DevHorizon Technologies Private Limited offers comprehensive digital services including custom web development, mobile app development (iOS & Android), Meta ads management, UI/UX design, and cloud solutions. We specialize in creating tailored solutions that drive business growth.'
  },
  {
    question: 'How long does it typically take to build a website?',
    answer: 'The timeline varies based on project complexity. A standard business website typically takes 2-3 weeks, while complex e-commerce platforms or web applications may take 4-8 weeks. We provide detailed timelines during our initial consultation.'
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes! We provide comprehensive post-launch support including regular updates, security patches, performance monitoring, and content updates. Our support packages are flexible and can be customized to your needs.'
  },
  {
    question: 'Can you help with SEO and digital marketing?',
    answer: 'Absolutely. All our websites are built with SEO best practices in mind. We also offer Meta ads management services to help you reach your target audience effectively and drive measurable results.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we work with clients globally including UAE, Canada, US, UK, and across India. We use modern collaboration tools to ensure seamless communication regardless of timezone differences.'
  },
];

export const FAQSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-swiss">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              FAQ
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Have questions? We've got answers. If you don't find what you're looking for, 
              feel free to reach out to us directly.
            </motion.p>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border bg-background px-6 data-[state=open]:shadow-soft data-[state=open]:border-primary/30 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline py-5 transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
