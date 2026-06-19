ALTER TABLE public.job_openings ADD COLUMN IF NOT EXISTS salary_range text;

UPDATE public.job_openings SET salary_range = '2.3 LPA – 4 LPA' WHERE status = 'open' AND title != 'Frontend Intern';

UPDATE public.job_openings SET salary_range = '10-15K per month' WHERE title = 'Frontend Intern';

COMMENT ON COLUMN public.job_openings.salary_range IS 'Compensation range displayed on job cards';
