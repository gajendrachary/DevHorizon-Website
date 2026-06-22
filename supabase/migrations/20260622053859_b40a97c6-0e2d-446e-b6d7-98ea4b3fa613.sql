DROP POLICY IF EXISTS "Anyone can submit applications" ON public.job_applications;
CREATE POLICY "Applications closed - no inserts" ON public.job_applications FOR INSERT TO public WITH CHECK (false);