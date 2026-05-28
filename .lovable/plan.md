## Careers Page Implementation Plan

Build a complete careers system at `/careers` with admin dashboard at `/careers/admin`, integrated into the existing DevHorizon site shell.

### 1. Database (Lovable Cloud migration)

**Extend `app_role` enum** to include `recruiter` (admin and user already exist).

**Tables:**
- `job_openings` — title, department, job_type, experience_level, location (default 'Bengaluru, India'), work_mode, skills text[], description, eligibility_criteria, responsibilities, status (default 'open'), created_at
- `job_applications` — all personal/role/education/links/resume fields per spec, status default 'new', consent_given bool, submitted_at

**RLS:**
- `job_openings`: public SELECT where status='open'; admin full CRUD
- `job_applications`: anyone INSERT with consent_given=true; admin+recruiter SELECT/UPDATE; admin DELETE
- `user_roles`: users SELECT own; mutations via service role only (no policies for INSERT/UPDATE/DELETE from authenticated)

**Storage:** private bucket `resumes`, 5MB limit, MIME allowlist (PDF/DOC/DOCX). Policy: anyone can INSERT (upload via form); only admins can SELECT (signed URLs).

**Seed data:** 6 openings (Full Stack Engineer, AI/ML Engineer, DevOps Engineer, Automation QA Engineer, Data Engineer, Frontend Intern).

### 2. Routes & Navigation

- Add `/careers` and `/careers/admin` to `src/App.tsx`
- Add "Careers" link to `src/components/layout/Header.tsx` navLinks
- Add `/careers` to `public/sitemap.xml` and `scripts/generate-sitemap.ts`
- `/careers/admin` rendered with `<meta name="robots" content="noindex,nofollow">` via SEO component

### 3. `/careers` page structure

Uses existing `Layout` (Header + Footer). Sections in order:
1. Hero (eyebrow chip, H1, sub, two CTAs)
2. Focus pills strip
3. About — "DevHorizon — Building Digital Excellence"
4. Sticky sub-nav (under main header) — desktop: horizontal links with active scroll-spy; mobile: hamburger → Sheet side panel
5. `#openings` — fetched live; hidden entirely if zero results; search + filters (job_type, department, experience_level); cards with Apply button that scrolls to `#apply` and pre-fills role
6. Why join (6 cards)
7. Hiring process (5 steps)
8. `#apply` — Zod-validated form with sections; resume upload to `resumes` bucket; insert into `job_applications`; PhonePe-style success (animated green circle + check stroke + ripple)
9. Resume tips (5 numbered)
10. FAQs accordion (6 items)

SEO: `<title>Careers — DevHorizon Technologies</title>`, meta desc, canonical `/careers`, JSON-LD `JobPosting` array generated from fetched openings.

### 4. `/careers/admin` page

- Email/password sign-in form only (no signup link, no Google button on this page)
- After auth: check `has_role(uid, 'admin')` — non-admins see "Access denied"
- Tabs: **Openings** (CRUD table with create/edit modal covering all columns) and **Applications** (read-only table, status dropdown new→shortlisted→interview→rejected/hired, "Download Resume" button calling `storage.createSignedUrl('resumes', path, 60)`)
- Realtime: subscribe to `job_openings` changes so public page updates live (enable via `ALTER PUBLICATION supabase_realtime ADD TABLE job_openings`)
- Provision first admin: include in migration — promote `gajendrachary518@gmail.com` to admin if user exists; otherwise document via insert tool after signup

### 5. Design

- Inherit existing tokens from `index.css` and `tailwind.config.ts` (dark theme, white text with glow, black-bg buttons with shadow per project memory)
- Rounded-xl cards, subtle borders, soft shadows, generous whitespace
- Fully responsive, keyboard-nav, WCAG AA contrast
- Use existing `Button`, `Input`, `Textarea`, `Select`, `Accordion`, `Sheet`, `Dialog`, `Table`, `Badge`, `Card` shadcn components
- No new theme toggle

### 6. New files

```
src/pages/Careers.tsx
src/pages/CareersAdmin.tsx
src/components/careers/CareersHero.tsx
src/components/careers/CareersSubNav.tsx
src/components/careers/OpeningsSection.tsx
src/components/careers/JobCard.tsx
src/components/careers/ApplyForm.tsx
src/components/careers/SuccessAnimation.tsx
src/components/careers/WhyJoin.tsx
src/components/careers/HiringProcess.tsx
src/components/careers/ResumeTips.tsx
src/components/careers/CareersFAQ.tsx
src/components/careers/admin/OpeningsManager.tsx
src/components/careers/admin/ApplicationsManager.tsx
src/lib/careersSchemas.ts  (Zod)
```

Plus edits to: `src/App.tsx`, `src/components/layout/Header.tsx`, `public/sitemap.xml`, `scripts/generate-sitemap.ts`.

### Technical notes

- Resume upload path: `applications/{uuid}.{ext}` — uploaded with anon key (storage policy allows INSERT to anyone), then path stored in `resume_file_url`
- File validation client-side: size ≤ 5MB, mime in [pdf, msword, vnd.openxmlformats-officedocument.wordprocessingml.document]
- Sub-nav uses IntersectionObserver for active section highlight
- Form pre-fills role via URL hash query `?role=...` or local state when Apply button on a card is clicked
- Realtime subscription on public page so newly created openings appear without refresh
- DOMPurify sanitization on text inputs per project security memory
