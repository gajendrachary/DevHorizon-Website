import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { ApplyForm } from '@/components/careers/ApplyForm';
import { WhyJoin } from '@/components/careers/WhyJoin';
import { Button } from '@/components/ui/button';
import {
  HIRING_OPEN,
  HIRING_CLOSED_TITLE,
  HIRING_CLOSED_MESSAGE,
  HIRING_CONTACT_EMAIL,
} from '@/lib/careersConfig';
import { supabase } from '@/integrations/supabase/client';
import type { JobOpening } from '@/components/careers/JobCard';

const ApplyPage = () => {
  const location = useLocation();
  const prefill = (location.state ?? null) as { role?: string; type?: string } | null;
  const [jobs, setJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    if (!HIRING_OPEN) return;
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
        canonical="https://www.devhorizontech.com/careers/apply"
      />
      <section className="py-14 md:py-20">
      <WhyJoin />
      <section className="py-14 md:py-20">
        <div className="container-swiss max-w-3xl">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Apply</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Apply for a role</h1>
            <p className="text-muted-foreground">
              Tell us about yourself. We review every application within ~5 business days.
            </p>
          </div>

          {!HIRING_OPEN && (
            <div className="mb-8 rounded-xl border border-border bg-card p-6 md:p-8 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-xs font-medium text-muted-foreground shrink-0">
                  Hiring paused
                </span>
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold mb-1">{HIRING_CLOSED_TITLE}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{HIRING_CLOSED_MESSAGE}</p>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <a href={`mailto:${HIRING_CONTACT_EMAIL}`}>
                    <Mail className="mr-2 h-4 w-4" /> Contact us
                  </a>
                </Button>
              </div>
            </div>
          )}

          <ApplyForm
            openRoles={jobs.map((j) => ({ title: j.title, job_type: j.job_type }))}
            prefillRole={prefill?.role}
            prefillType={prefill?.type}
            disabled={!HIRING_OPEN}
          />
        </div>
      </section>
    </CareersLayout>
  );
};

export default ApplyPage;
