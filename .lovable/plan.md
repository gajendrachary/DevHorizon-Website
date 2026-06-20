# Performance Optimization Plan

The site currently takes ~5.5s to show first content and loads ~21 MB of images on the homepage. The goal: open fast from a cold link, and scroll/animate smoothly without lag. No visual redesign — same look, same sections, same carousels.

## What's actually slow (measured on live preview)

- **First Contentful Paint: 5.5s**, full load: ~7s
- **Images: 21.6 MB on homepage** — several client logos are 2–2.8 MB each (uncompressed PNGs); service/project images are oversized
- **DOM: 11,580 nodes**, **Style recalc: 3.15s**, **Script: 4.29s** — driven by many always-on framer-motion animations and scroll listeners firing every frame
- 33 images load without `loading="lazy"`, dimensions, or modern format

## Fixes

### 1. Image weight — biggest win (~90% reduction)
- Convert oversized PNG/JPG assets to **WebP** at real display size:
  - Client logos → 400×400 max, ~20–40 KB each (was 2–2.8 MB)
  - Service background images (`service-*.png`) → 1200px WebP (~80 KB, was 600 KB)
  - Project images → 1200px WebP
- Add `loading="lazy"` + `decoding="async"` to every non-hero image
- Add explicit `width`/`height` on images to prevent layout shift
- Preload only the hero LCP image via `<link rel="preload" as="image" fetchpriority="high">` in `index.html`

### 2. Faster cold open (link → visible site)
- Preload the hero image and the main font(s)
- Add `<link rel="preconnect">` to Supabase and Google Fonts origins
- Mark non-critical sections (FAQ, Projects, Stats) with `content-visibility: auto` so the browser skips rendering them until scrolled into view
- Lazy-load the Google Map iframe on the About page (only mount when scrolled to)

### 3. Animation cost
- Gate decorative blob/glow animations behind `useInView` so they pause off-screen (Hero, Services, Projects, Stats)
- Respect `prefers-reduced-motion` globally — disable parallax & infinite animations for users who opt out
- Remove duplicate `motion.div` wrappers in service/project cards that add DOM nodes without visual effect
- Replace a few always-running infinite background blobs with static CSS gradients where motion isn't essential

### 4. Scroll & carousel performance
- Throttle scroll handlers in `ServiceCarousel`, `ProjectsCarousel` and the auto-scroll hook via `requestAnimationFrame` (currently fire on every scroll event)
- Mark scroll/touch listeners as `{ passive: true }`
- Stop the auto-scroll RAF loop when the carousel is off-screen (already partly done — extend to all carousels)
- Memoize per-card parallax offsets (currently recomputed for every card on every tick)

### 5. Fix runtime warnings spotted in console
- `fetchPriority` → `fetchpriority` on the hero `<img>` (React DOM warning, harmless but noisy)
- Add `position: relative` to the framer-motion scroll container that's emitting the "non-static position" warning

## Files to touch

- `src/assets/*.png|jpg` — re-export oversized assets as `.webp`, update imports
- `src/components/home/HeroSection.tsx`, `ServiceCarousel.tsx`, `ProjectsCarousel.tsx`, `ClientLogosSection.tsx`, `StatsSection.tsx`, `CTASection.tsx`, `ServiceCard.tsx`, `ProjectCard.tsx`
- `src/hooks/useAutoScrollCarousel.tsx` — extend RAF throttling already in place
- `src/pages/About.tsx` — lazy-mount Google Map iframe
- `src/index.css` — `prefers-reduced-motion` rules + `content-visibility` helper
- `index.html` — LCP preload + preconnect tags

## Out of scope
- No visual redesign, no copy changes, no removed sections
- No backend / schema changes
- Carousels keep their 3D look and auto-scroll — just smoother

## Expected result
- First Contentful Paint: **5.5s → <1.5s** from a cold link
- Homepage image weight: **21 MB → ~2 MB**
- Smooth 60fps scroll on carousels and hero, even on mid-range phones
