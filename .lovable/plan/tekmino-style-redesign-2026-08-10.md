# Tekmino-style Redesign

Rebuild the site's visual language to match the Tekmino IT-solutions template: dark canvas, lime-green accent, floating pill navbar, bracketed section labels, and generous non-overlapping spacing.

## Look and feel

- Dark base (near-black `#0a0a0a` surfaces, slightly lighter `#141414` cards) as the default theme across all pages.
- Lime-green accent (`#c8f031`-family) for buttons, links, eyebrows, icon chips, and active nav states. Black text sits on lime buttons.
- Bracketed uppercase eyebrows above every section heading, e.g. `[ TRANSFORMING IDEAS ]`.
- Large rounded corners on cards, buttons, and the page container; subtle hairline borders instead of shadows.
- Circular arrow badge inside primary buttons, matching Tekmino's "Get Started" pill.

## Site shell

- Thin top utility bar: tagline with an inline link on the left; working hours, Support, and language on the right.
- Floating pill navbar below it: logo left, centered nav with dropdowns, search icon and a lime CTA pill on the right.
- Rounded inset page container with visible dark margins on the outer edges.
- Footer restyled dark with lime accents and the same bracketed labels.

## No overlapping

- Every section becomes a normal stacked block with its own vertical padding; no negative margins, no absolutely positioned elements crossing section boundaries.
- The floating header reserves real space above the content so nothing slides under it.
- Hero content sits in a padded grid, not layered over other sections.
- Checked at desktop, tablet, and mobile widths after the build.

## Pages covered

Homepage, Services (and the three service detail pages), Projects, Blog + article, Reviews, About, Get Quote, Careers and its subpages, Auth, and the 404 page.

Homepage section order is preserved: Hero → Client Logos → CTA → Services → HorizonHire product → Stats → Projects → FAQ.

## What stays the same

- All content, copy, routes, forms, backend logic, and admin screens are untouched.
- HorizonHire product section keeps its content, restyled to the new dark/lime system.
- Existing animation performance rules (transform/opacity only) still apply.

## Technical notes

- Rewrite the color tokens in `src/index.css` to a dark-first palette with lime primary; the brand cyan→violet gradient is retired as the primary accent and kept only on the logo mark.
- Update `tailwind.config.ts` with the new accent and radius scale.
- Rework `Header.tsx` (top bar + pill nav) and `Layout.tsx` (inset container, correct top offset), and `Footer.tsx`.
- Add a shared `SectionHeading` component for the bracketed eyebrow + heading pattern, and reuse it across sections.
- Restyle card components (`ServiceCard`, `ProjectCard`, blog cards, stats, FAQ) against the new tokens; no hardcoded color utilities.
- Sweep remaining pages for light-theme hardcoded classes (`bg-white`, `text-black`, etc.) and replace with semantic tokens.
