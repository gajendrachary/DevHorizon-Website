import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { CareersHero } from '@/components/careers/CareersHero';
import { HiringClosedNotice } from '@/components/careers/HiringClosedNotice';
import { HIRING_OPEN } from '@/lib/careersConfig';
import { supabase } from '@/integrations/supabase/client';

const FOCUS = ['Web Development', 'SaaS Platforms', 'Automation', 'AI / ML', 'Dashboards'];

type Section = { to: string; title: string; desc: string; hiringOnly?: boolean };
const SECTIONS: Section[] = [
  { to: '/careers/about', title: 'About', desc: 'Who we are and what we build.' },
  { to: '/careers/openings', title: 'Open roles', desc: 'Live positions across engineering, AI/ML, and design.', hiringOnly: true },
  { to: '/careers/why-join', title: 'Why join', desc: 'Real impact, senior mentorship, modern stack.' },
  { to: '/careers/process', title: 'Hiring process', desc: 'A clear 5-step path from application to offer.' },
  { to: '/careers/resume-tips', title: 'Resume tips', desc: 'Help your application stand out.' },
  { to: '/careers/faq', title: 'FAQ', desc: 'Answers to common questions.' },
  { to: '/careers/apply', title: 'Apply', desc: 'Submit your application — we review every one.', hiringOnly: true },
];

const Careers = () => {
  const [hasOpenings, setHasOpenings] = useState(false);

  useEffect(() => {
    supabase
      .from('job_openings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'open')
      .then(({ count }) => setHasOpenings((count ?? 0) > 0));
  }, []);

  return (
    <CareersLayout>
      <SEO
        title="Careers — DevHorizon Technologies"
        description="Open roles at DevHorizon Technologies in Bengaluru — full-stack, AI/ML, DevOps, data and internships. Hybrid and remote-friendly."
        canonical="https://devhorizontech.com/careers"
      />

      <CareersHero hasOpenings={hasOpenings} />

      <div className="container-swiss pb-6">
        <div className="flex flex-wrap gap-2">
          {FOCUS.map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-full bg-secondary/40 border border-border text-xs font-medium">
              {f}
            </span>
          ))}
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="container-swiss">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Explore</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Everything about working with us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS.filter((s) => s.to !== '/careers/openings' || hasOpenings).map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-xl border border-border bg-card p-6 shadow-soft hover:shadow-medium transition-all hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                  {s.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CareersLayout>
  );
};

export default Careers;
