
-- ============ job_openings ============
CREATE TABLE public.job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  job_type text NOT NULL,
  experience_level text NOT NULL,
  location text NOT NULL DEFAULT 'Bengaluru, India',
  work_mode text NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  eligibility_criteria text,
  responsibilities text,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_openings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_openings TO authenticated;
GRANT ALL ON public.job_openings TO service_role;

ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view open job openings" ON public.job_openings
  FOR SELECT TO anon, authenticated
  USING (status = 'open' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert job openings" ON public.job_openings
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update job openings" ON public.job_openings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete job openings" ON public.job_openings
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_job_openings_updated_at
  BEFORE UPDATE ON public.job_openings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ job_applications ============
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  current_city text NOT NULL,
  role_applied text NOT NULL,
  application_type text NOT NULL,
  highest_qualification text NOT NULL,
  college_university text NOT NULL,
  years_experience text NOT NULL,
  skills text NOT NULL,
  short_intro text NOT NULL,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  resume_file_url text NOT NULL,
  availability text,
  expected_compensation text,
  consent_given boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications" ON public.job_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (consent_given = true);

CREATE POLICY "Admins and recruiters can view applications" ON public.job_applications
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Admins and recruiters can update applications" ON public.job_applications
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Admins can delete applications" ON public.job_applications
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Storage: resumes (private) ============
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes', 'resumes', false, 5242880,
  ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types,
  public = false;

CREATE POLICY "Anyone can upload resumes"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins and recruiters can read resumes"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'resumes'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'recruiter'))
  );

-- ============ Realtime ============
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_openings;

-- ============ Seed openings ============
INSERT INTO public.job_openings (title, department, job_type, experience_level, work_mode, skills, description, eligibility_criteria, responsibilities) VALUES
('Full Stack Engineer','Engineering','Full-time','2-5 yrs','Hybrid',
 ARRAY['React','TypeScript','Node.js','PostgreSQL','AWS'],
 'Own end-to-end product features across our React + Node.js stack. Work directly with founders shipping production SaaS to global customers.',
 'Bachelor''s in CS/IT or equivalent practical experience. 2+ years building production web apps. Comfortable across frontend and backend.',
 'Design, build and ship full-stack features. Write clean, tested code. Review PRs. Participate in product decisions.'),
('AI/ML Engineer','AI & Data','Full-time','2-5 yrs','Hybrid',
 ARRAY['Python','PyTorch','LangChain','OpenAI','Vector DBs','FastAPI'],
 'Build LLM-powered features and ML pipelines that ship to real users. From prototype to production.',
 'Strong Python. Experience with LLMs, embeddings, and prompt engineering. Production ML experience preferred.',
 'Design and deploy ML/LLM features. Build evaluation pipelines. Optimize inference cost and latency.'),
('DevOps Engineer','Infrastructure','Full-time','2-5 yrs','Remote',
 ARRAY['AWS','Terraform','Docker','Kubernetes','GitHub Actions','Linux'],
 'Own our cloud infrastructure end-to-end. Make deploys boring and observability brilliant.',
 '2+ years in DevOps/SRE roles. Hands-on AWS and IaC experience required.',
 'Manage AWS infra via Terraform. Build CI/CD pipelines. On-call rotation. Cost optimization.'),
('Automation QA Engineer','Quality','Full-time','0-2 yrs','Hybrid',
 ARRAY['Playwright','Cypress','TypeScript','API Testing','CI/CD'],
 'Build automated test suites that catch regressions before customers do.',
 'CS background or equivalent. Strong scripting in JS/TS. Curious mindset.',
 'Write e2e and integration tests. Maintain test infra. Triage flaky tests. Partner with engineering on quality.'),
('Data Engineer','AI & Data','Full-time','2-5 yrs','Hybrid',
 ARRAY['Python','SQL','dbt','Airflow','BigQuery','Snowflake'],
 'Build data pipelines and analytics infrastructure that power product and business decisions.',
 '2+ years in data engineering. Strong SQL and Python. Modern data stack experience.',
 'Build ETL/ELT pipelines. Maintain data warehouse. Partner with product on analytics.'),
('Frontend Intern','Engineering','Internship','Fresher','Onsite',
 ARRAY['React','TypeScript','Tailwind CSS','Git'],
 '6-month internship building real product UI in React. Mentored by senior engineers. High potential for full-time conversion.',
 'Final-year student or recent graduate. Solid HTML/CSS/JS. Portfolio of React projects preferred.',
 'Ship UI components for production apps. Pair with seniors. Participate in code reviews. Learn fast.');
