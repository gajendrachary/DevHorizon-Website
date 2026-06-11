# Performance Optimization Plan

The site is slow because of three concrete bottlenecks I measured on the live preview. This plan fixes them without changing the look or feel.

## What's actually slow (measured)

- **First Contentful Paint: 5.5s**, full load: 7s (target: <2s FCP)
- **21.6 MB of images** on the homepage — 5 client logos alone are **2–2.8 MB each** (uncompressed PNGs)
- **DOM: 11,580 nodes**, **Style recalc: 3.15s**, **Script: 4.29s** — caused by many always-on framer-motion animations + scroll listeners running every frame
- 33 images loading without `loading="lazy"`, width/height, or modern format

## Fixes

### 1. Image weight (biggest win, ~90% reduction)
- Convert oversized PNG/JPG assets to **WebP** and resize to actual display size:
  - Client logos → 400×400 max, ~20–40 KB each (was 2–2.8 MB)
  - Service background images (`service-*.png`) → 1200px wide WebP (~80 KB, was 600 KB)
  - Project images → 1200px WebP
- Add `loading="lazy"` and `decoding="async"` to every non-hero `<img>` / `motion.img`
- Add explicit `width`/`height` on images to prevent layout shift
- Add `<link rel="preload" as="image">` for the hero LCP image only

### 2. Animation cost
- Gate decorative blob/glow animations behind `useInView` so they pause off-screen (Hero, Services, Projects, Stats)
- Replace 3 always-running infinite background blobs per section with CSS-only static gradients where they aren't essential
- Respect `prefers-reduced-motion` globally — disable parallax & infinite animations for users who opt out
- Remove duplicate `motion.div` wrappers in service cards that add DOM nodes without visual effect

### 3. Scroll & carousel performance
- Throttle the scroll handler in `ServiceCarousel`, `ProjectsCarousel`, and the auto-scroll carousel hook using `requestAnimationFrame` (currently fires on every scroll event)
- Mark scroll/touch listeners as `{ passive: true }`
- Stop the auto-scroll RAF loop when the carousel is off-screen (IntersectionObserver)
- Memoize the per-card parallax offset calculation; currently recomputed for every card on every scroll tick

### 4. Smaller wins
- Remove `Documents: 5` / `Frames: 3` overhead — check for stray iframes/dev overlays we control
- Add `content-visibility: auto` to below-the-fold sections (FAQ, Projects, Stats) so the browser skips rendering them until scrolled into view

## Files I'll touch

- `src/assets/logo-*.png|jpg` → re-export as `.webp` (and update imports)
- `src/assets/service-*.png` → re-export as `.webp`
- `src/assets/project-*.jpg` → compress in place
- `src/components/home/HeroSection.tsx`, `ServiceCarousel.tsx`, `ProjectsCarousel.tsx`, `ClientLogosSection.tsx`, `StatsSection.tsx`, `CTASection.tsx`, `ServiceCard.tsx`, `ProjectCard.tsx`
- `src/hooks/useAutoScrollCarousel.tsx` — RAF throttling + viewport gating
- `src/index.css` — `prefers-reduced-motion` rules + `content-visibility` helper class
- `index.html` — LCP preload tag

## Out of scope
- No visual redesign, no copy changes, no removed sections
- No backend / schema changes
- Carousels keep their 3D look and auto-scroll behavior — just smoother
