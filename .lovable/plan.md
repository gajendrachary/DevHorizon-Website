## Close hiring across the careers experience

Goal: stop accepting new applications, hide open roles, and show a professional "hiring closed" message everywhere candidates land.

### Frontend changes

1. **Global "Hiring closed" banner/state**
   - Add a shared `HIRING_OPEN = false` flag (e.g. `src/lib/careersConfig.ts`) so we can flip it back on later in one place.
   - When closed, show a polished notice card with copy like:
     > "We're not actively hiring right now. Thank you for your interest in DevHorizon Technologies — please check back soon, or reach us at info@devhorizontech.com for future opportunities."

2. **`src/pages/Careers.tsx` (hub)**
   - Hide the "Apply" and "Open roles" cards from the section grid.
   - Pass `hasOpenings={false}` and render the hiring-closed notice under the hero.

3. **`src/components/careers/CareersHero.tsx`**
   - Replace "Apply now" / "View open roles" buttons with a single muted "Hiring paused" badge and a "Contact us" button to `mailto:info@devhorizontech.com`.

4. **`src/components/careers/CareersSubNav.tsx`**
   - Remove the "Apply" and "Open roles" links while hiring is closed.

5. **`src/pages/careers/Openings.tsx`**
   - Always render the closed-state message (ignore DB results on the public page) with the professional copy above.

6. **`src/pages/careers/ApplyPage.tsx`**
   - Replace `<ApplyForm />` with the closed-state notice + "Back to Careers" link. Form code stays in the repo for when hiring reopens.

7. **`src/components/home/HeroSection.tsx`** and any other CTA pointing to `/careers/apply`
   - Keep the Careers button pointing to `/careers` (already correct); no apply links should remain on the public site.

### Backend changes

8. **Hide all open roles from the public site**
   - Run a data update to set every `job_openings` row with `status = 'open'` to `status = 'closed'`. Admin can still see/manage them in `/admin` → Openings Manager.

9. **Block new application submissions at the database**
   - Migration: drop the existing INSERT policy on `public.job_applications` and replace it with a policy that blocks all inserts (or only allows `service_role`). Existing rows and admin read access stay intact so the Applications admin page keeps working.
   - This is a defense-in-depth step so the form can't be re-enabled accidentally or hit via the API.

### Not changing

- Admin pages (`/admin` → Openings, Applications) keep full functionality so you can review past applicants and re-open roles later.
- SEO/sitemap entries for `/careers/apply` and `/careers/openings` stay (pages still resolve, just show the closed message).

### Re-opening later

Flip `HIRING_OPEN` to `true`, set the desired `job_openings` rows back to `open`, and re-run a small migration to restore the insert policy on `job_applications`.
