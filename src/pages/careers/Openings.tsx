import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { CareersLayout } from '@/components/careers/CareersLayout';
import { OpeningsSection } from '@/components/careers/OpeningsSection';
import { supabase } from '@/integrations/supabase/client';
import type { JobOpening } from '@/components/careers/JobCard';

const CareersOpenings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobOpening[]>([]);

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
      .channel('job_openings_openings_page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_openings' }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

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

  const handleApply = (role: string, type: string) => {
    navigate('/careers/apply', { state: { role, type } });
  };

  return (
    <CareersLayout>
      <SEO
        title="Open Roles — Careers at DevHorizon"
        description="Live job openings at DevHorizon Technologies — engineering, AI/ML, DevOps, data and internships in Bengaluru."
        canonical="https://devhorizontech.com/careers/openings"
        schema={jobs.length ? jobPostingSchema : undefined}
      />
      {jobs.length > 0 ? (
        <OpeningsSection jobs={jobs} onApply={handleApply} />
      ) : (
        <section className="py-20">
          <div className="container-swiss max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">No active openings</h1>
            <p className="text-muted-foreground">
              We don't have live roles right now — but we always welcome general applications.
            </p>
          </div>
        </section>
      )}
    </CareersLayout>
  );
};

export default CareersOpenings;
