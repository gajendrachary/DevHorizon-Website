import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';

const CareersAbout = () => (
  <CareersLayout>
    <SEO
      title="About — Careers at DevHorizon"
      description="DevHorizon is a Bengaluru-based software studio building production-grade SaaS, AI tools, and automation."
      canonical="https://devhorizontech.com/careers/about"
    />
    <section className="py-14 md:py-20">
      <div className="container-swiss max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">About</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-6">DevHorizon — Building Digital Excellence</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            DevHorizon is a Bengaluru-based software Company building production-grade SaaS,
            AI-powered tools and automation systems for startups and enterprises across India and
            abroad. We're small, senior and ship fast.
          </p>
          <p>
            Joining us means working on real customer products from day one, with direct mentorship
            from founders and senior engineers. We care about craftsmanship, clear thinking, and
            shipping software that works.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3 mt-8">
          {['Real project work — no throwaway tickets', 'Senior mentorship daily', 'Modern stack: React, Node, Python, AWS', 'Startup speed with engineering rigor'].map((b) => (
            <li key={b} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">{b}</li>
          ))}
        </ul>
      </div>
    </section>
  </CareersLayout>
);

export default CareersAbout;
