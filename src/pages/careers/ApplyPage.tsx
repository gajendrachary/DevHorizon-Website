import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { ApplyForm } from '@/components/careers/ApplyForm';
import { supabase } from '@/integrations/supabase/client';
import type { JobOpening } from '@/components/careers/JobCard';

const ApplyPage = () => {
  const location = useLocation();
  const prefill = (location.state ?? null) as { role?: string; type?: string } | null;
  const [jobs, setJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    supabase
      .from('job_openings')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .then(({ data }) => setJobs((data ?? []) as JobOpening[]));
  }, []);

  return (
    <CareersLayout>
      <SEO
        title="Apply — Careers at DevHorizon"
        description="Apply to open roles at DevHorizon Technologies. We review every application within ~5 business days."
        canonical="https://devhorizontech.com/careers/apply"
      />
      <section className="py-14 md:py-20">
        <div className="container-swiss max-w-3xl">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Apply</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Apply for a role</h1>
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
    </CareersLayout>
  );
};

export default ApplyPage;
