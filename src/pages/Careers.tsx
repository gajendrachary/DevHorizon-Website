import { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/common/SEO';
import { supabase } from '@/integrations/supabase/client';
import { CareersHero } from '@/components/careers/CareersHero';
import { CareersSubNav } from '@/components/careers/CareersSubNav';
import { OpeningsSection } from '@/components/careers/OpeningsSection';
import { ApplyForm } from '@/components/careers/ApplyForm';
import { WhyJoin } from '@/components/careers/WhyJoin';
import { HiringProcess } from '@/components/careers/HiringProcess';
import { ResumeTips } from '@/components/careers/ResumeTips';
import { CareersFAQ } from '@/components/careers/CareersFAQ';
import type { JobOpening } from '@/components/careers/JobCard';

const FOCUS = ['Web Development', 'SaaS Platforms', 'Automation', 'AI / ML', 'Dashboards'];

const Careers = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [prefill, setPrefill] = useState<{ role: string; type: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('job_openings')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      setJobs((data ?? []) as JobOpening[]);
    };
    load();

    const channel = supabase
      .channel('job_openings_public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_openings' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleApply = (role: string, type: string) => {
    setPrefill({ role, type });
    const el = document.getElementById('apply');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
  };

  const jobPostingSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': jobs.map((j) => ({
      '@type': 'JobPosting',
      title: j.title,
      description: j.description,
      datePosted: j.created_at,
      employmentType: j.job_type === 'Internship' ? 'INTERN' : 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'DevHorizon Technologies Private Limited',
        sameAs: 'https://devhorizontech.com',
      },
      jobLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
      },
      jobLocationType: j.work_mode === 'Remote' ? 'TELECOMMUTE' : undefined,
      skills: j.skills.join(', '),
    })),
  }), [jobs]);

  return (
    <Layout>
      <SEO
        title="Careers — DevHorizon Technologies"
        description="Open roles at DevHorizon Technologies in Bengaluru — full-stack, AI/ML, DevOps, data and internships. Hybrid and remote-friendly."
        canonical="https://devhorizontech.com/careers"
        schema={jobs.length ? jobPostingSchema : undefined}
      />

      <CareersSubNav showOpenings={jobs.length > 0} />

      <CareersHero hasOpenings={jobs.length > 0} />

      {/* Focus pills */}
      <div className="container-swiss pb-6">
        <div className="flex flex-wrap gap-2">
          {FOCUS.map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-full bg-secondary/40 border border-border text-xs font-medium">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="py-14 md:py-20">
        <div className="container-swiss max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">About</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">DevHorizon — Building Digital Excellence</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              DevHorizon is a Bengaluru-based software studio building production-grade SaaS,
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
              <li key={b} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {jobs.length > 0 && <OpeningsSection jobs={jobs} onApply={handleApply} />}

      <WhyJoin />
      <HiringProcess />

      {/* Apply */}
      <section id="apply" className="py-14 md:py-20">
        <div className="container-swiss max-w-3xl">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Apply</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Apply for a role</h2>
            <p className="text-muted-foreground">
              Tell us about yourself. We review every application within ~5 business days.
            </p>
          </div>
          <ApplyForm
            openRoles={jobs.map((j) => ({ title: j.title, job_type: j.job_type }))}
            prefillRole={prefill?.role}
            prefillType={prefill?.type}
          />
        </div>
      </section>

      <ResumeTips />
      <CareersFAQ />
    </Layout>
  );
};

export default Careers;
