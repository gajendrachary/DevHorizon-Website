

# Fix Website Issues and Improvements

## Issues Identified

1. **Home page ProjectCard entrance animation** uses `x: '100vw'` and `rotateY: 15` with uncapped stagger delay -- cards fly in from off-screen and take too long to appear (already fixed on Projects page but not on the home page's `ProjectCard.tsx`)

2. **Excessive section spacing** -- the `section-padding` class applies `py-16 md:py-24 lg:py-32` (128px on large screens), creating very large empty gaps between sections. Several sections also have large `mb-12 md:mb-16` margins on headers.

3. **Card click issues on home page** -- The `ProjectCard.tsx` (home page) wraps the entire card in `<motion.a>` which should work, but the entrance animation with `x: '100vw'` may cause cards to be positioned off-screen or have click target issues.

4. **No TypeScript errors remaining** -- The `NodeJS` namespace errors were previously fixed by using `ReturnType<typeof setTimeout>` (confirmed in current code).

## Plan

### Step 1: Fix Home Page ProjectCard Entrance Animation
**File: `src/components/home/ProjectCard.tsx`**
- Change `initial.x` from `'100vw'` to `80` (matching Projects page fix)
- Change `initial.rotateY` from `15` to `8`
- Cap the entrance delay: `Math.min(index * stagger, 0.9)`
- Reduce entrance duration to `0.6`

### Step 2: Reduce Section Spacing Site-wide
**File: `src/index.css`**
- Change `.section-padding` from `py-16 md:py-24 lg:py-32` to `py-10 md:py-16 lg:py-20` (reduce ~40%)

**File: `src/components/home/ProjectsCarousel.tsx`**
- Reduce header margin from `mb-12 md:mb-16` to `mb-8 md:mb-10`

**File: `src/components/home/CTASection.tsx`**
- Review and tighten internal spacing

**File: `src/components/home/StatsSection.tsx`**
- Review and tighten internal spacing

**File: `src/pages/Projects.tsx`**
- Reduce header margins in carousel sections

### Step 3: Ensure Card Clicks Work Reliably
**File: `src/components/home/ProjectCard.tsx`**
- Ensure the `<motion.a>` wrapper has proper `z-index` and no `pointer-events` conflicts
- Verify the parallax transforms don't push cards outside their clickable bounds

### Step 4: Review and Fix Other Pages
- Check Services page and Projects page for consistent spacing reductions
- Ensure all carousel arrow buttons work properly across pages

## Suggestions After Review
After implementing these fixes, I'll also recommend:
- The hero section has a lot of text -- consider trimming the description paragraph
- Footer has empty space above it that could be reduced
- The "Trusted by businesses" logo carousel could be slightly more compact
- Consider adding a testimonials/reviews preview section on the home page

