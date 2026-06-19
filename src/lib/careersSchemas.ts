import { z } from 'zod';

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .url({ message: 'Must be a valid URL' })
  .or(z.literal(''))
  .optional()
  .transform((v) => (v === '' ? undefined : v));

export const applicationSchema = z.object({
  full_name: z.string().trim().min(2, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  mobile: z.string().trim().min(7, 'Required').max(20),
  current_city: z.string().trim().min(2, 'Required').max(100),
  role_applied: z.string().trim().min(2, 'Select a role').max(150),
  application_type: z.enum(['Internship', 'Full-time', 'General']),
  highest_qualification: z.string().trim().min(2, 'Required').max(150),
  college_university: z.string().trim().min(2, 'Required').max(200),
  years_experience: z.string().trim().min(1, 'Required').max(50),
  skills: z.string().trim().min(2, 'List a few skills').max(500),
  short_intro: z.string().trim().min(20, 'Tell us a bit more').max(1000),
  github_url: optionalUrl,
  linkedin_url: optionalUrl,
  portfolio_url: optionalUrl,
  availability: z.string().trim().max(100).optional(),
  expected_compensation: z.string().trim().max(100).optional(),
  consent_given: z.literal(true, { errorMap: () => ({ message: 'Consent required' }) }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const openingSchema = z.object({
  title: z.string().trim().min(2).max(150),
  department: z.string().trim().min(2).max(100),
  job_type: z.enum(['Internship', 'Full-time']),
  experience_level: z.string().trim().min(1).max(50),
  location: z.string().trim().min(2).max(150),
  work_mode: z.enum(['Onsite', 'Hybrid', 'Remote']),
  skills: z.string().trim().min(1, 'Comma-separated'),
  description: z.string().trim().min(10).max(4000),
  eligibility_criteria: z.string().trim().max(2000).optional().or(z.literal('')),
  responsibilities: z.string().trim().max(2000).optional().or(z.literal('')),
  salary_range: z.string().trim().max(100).optional().or(z.literal('')),
  status: z.enum(['open', 'closed']),
});

export type OpeningInput = z.infer<typeof openingSchema>;
