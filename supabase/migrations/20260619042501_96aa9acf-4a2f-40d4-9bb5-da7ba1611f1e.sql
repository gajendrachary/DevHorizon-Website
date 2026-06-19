
-- form_submissions constraints
ALTER TABLE public.form_submissions
  ADD CONSTRAINT form_submissions_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT form_submissions_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT form_submissions_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT form_submissions_phone_len CHECK (phone IS NULL OR char_length(phone) BETWEEN 4 AND 32),
  ADD CONSTRAINT form_submissions_company_len CHECK (company IS NULL OR char_length(company) <= 160),
  ADD CONSTRAINT form_submissions_message_len CHECK (message IS NULL OR char_length(message) <= 4000),
  ADD CONSTRAINT form_submissions_form_type_chk CHECK (char_length(form_type) BETWEEN 1 AND 64),
  ADD CONSTRAINT form_submissions_budget_len CHECK (budget IS NULL OR char_length(budget) <= 64),
  ADD CONSTRAINT form_submissions_timeline_len CHECK (timeline IS NULL OR char_length(timeline) <= 64),
  ADD CONSTRAINT form_submissions_metadata_size CHECK (metadata IS NULL OR pg_column_size(metadata) <= 8192);

DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;
CREATE POLICY "Anyone can submit forms"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(form_type) BETWEEN 1 AND 64
    AND (message IS NULL OR char_length(message) <= 4000)
    AND status = 'new'
  );

-- job_applications constraints (application_type case-insensitive)
ALTER TABLE public.job_applications
  ADD CONSTRAINT job_apps_name_len CHECK (char_length(full_name) BETWEEN 2 AND 120),
  ADD CONSTRAINT job_apps_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT job_apps_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT job_apps_mobile_len CHECK (char_length(mobile) BETWEEN 4 AND 32),
  ADD CONSTRAINT job_apps_city_len CHECK (char_length(current_city) BETWEEN 1 AND 120),
  ADD CONSTRAINT job_apps_role_len CHECK (char_length(role_applied) BETWEEN 1 AND 160),
  ADD CONSTRAINT job_apps_apptype_chk CHECK (lower(application_type) IN ('full-time','internship','contract','part-time')),
  ADD CONSTRAINT job_apps_qual_len CHECK (char_length(highest_qualification) BETWEEN 1 AND 160),
  ADD CONSTRAINT job_apps_college_len CHECK (char_length(college_university) BETWEEN 1 AND 200),
  ADD CONSTRAINT job_apps_yrs_len CHECK (char_length(years_experience) BETWEEN 1 AND 32),
  ADD CONSTRAINT job_apps_skills_len CHECK (char_length(skills) BETWEEN 1 AND 2000),
  ADD CONSTRAINT job_apps_intro_len CHECK (char_length(short_intro) BETWEEN 1 AND 2000),
  ADD CONSTRAINT job_apps_github_len CHECK (github_url IS NULL OR char_length(github_url) <= 300),
  ADD CONSTRAINT job_apps_linkedin_len CHECK (linkedin_url IS NULL OR char_length(linkedin_url) <= 300),
  ADD CONSTRAINT job_apps_portfolio_len CHECK (portfolio_url IS NULL OR char_length(portfolio_url) <= 300),
  ADD CONSTRAINT job_apps_resume_len CHECK (char_length(resume_file_url) BETWEEN 1 AND 500),
  ADD CONSTRAINT job_apps_avail_len CHECK (availability IS NULL OR char_length(availability) <= 120),
  ADD CONSTRAINT job_apps_comp_len CHECK (expected_compensation IS NULL OR char_length(expected_compensation) <= 120);

DROP POLICY IF EXISTS "Anyone can submit applications" ON public.job_applications;
CREATE POLICY "Anyone can submit applications"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_given = true
    AND char_length(full_name) BETWEEN 2 AND 120
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(mobile) BETWEEN 4 AND 32
    AND lower(application_type) IN ('full-time','internship','contract','part-time')
    AND char_length(short_intro) <= 2000
    AND char_length(skills) <= 2000
    AND status = 'new'
  );

-- Resume bucket: admin-only UPDATE/DELETE
DROP POLICY IF EXISTS "Admins can update resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete resumes" ON storage.objects;
CREATE POLICY "Admins can update resumes"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete resumes"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Realtime: admin-only channel subscriptions
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage realtime channels" ON realtime.messages;
CREATE POLICY "Admins can manage realtime channels"
  ON realtime.messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
