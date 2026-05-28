import { ReactNode, useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CareersSubNav } from './CareersSubNav';
import { supabase } from '@/integrations/supabase/client';

export const CareersLayout = ({ children }: { children: ReactNode }) => {
  const [hasOpenings, setHasOpenings] = useState(true);
  useEffect(() => {
    supabase
      .from('job_openings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'open')
      .then(({ count }) => setHasOpenings((count ?? 0) > 0));
  }, []);
  return (
    <Layout>
      <CareersSubNav showOpenings={hasOpenings} />
      {children}
    </Layout>
  );
};
