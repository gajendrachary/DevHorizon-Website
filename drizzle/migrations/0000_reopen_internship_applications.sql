-- Allow public application submissions again
DROP POLICY IF EXISTS "Applications closed - no inserts" ON public.job_applications;

CREATE POLICY "Anyone can submit an application"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (consent_given = true);

GRANT INSERT ON public.job_applications TO anon;
GRANT INSERT ON public.job_applications TO authenticated;

-- Allow resume uploads into the applications/ folder of the private resumes bucket
DROP POLICY IF EXISTS "Applicants can upload resumes" ON storage.objects;
CREATE POLICY "Applicants can upload resumes"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes' AND name LIKE 'applications/%');

-- Reopen the internship role
UPDATE public.job_openings SET status = 'open' WHERE job_type = 'Internship';