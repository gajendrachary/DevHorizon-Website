# Plan

## 1. Fix horizontal scrolling

Add `overflow-x: hidden` to `html, body` in `src/index.css` and `overflow-x-hidden` on the root `Layout` wrapper to prevent any child (carousels with `w-[85vw]`, 3D rotated cards, animated translateX) from leaking horizontal overflow into the page.

## 2. Add screenshots as a new project: "Skanda Billing Software"

Copy the 7 uploaded WhatsApp screenshots into `src/assets/skanda-billing/` as:
- `skanda-billing-1.jpg` … `skanda-billing-7.jpg`

Use `skanda-billing-1.jpg` (the home screen with SKANDA header) as the card cover image.

Add a new entry to:
- `src/components/home/ProjectsCarousel.tsx` → `projects[]` (Recent Projects on homepage)
- `src/pages/Projects.tsx` → `mobileApps[]` (Projects page, Mobile Apps section)

Entry data:
- title: "Skanda Billing Software"
- category: "Cloud Kitchen / Billing POS"
- platforms: ["iOS", "Android", "Web"]
- description: short tagline (one line)
- bgColor: orange (#EA580C) to match the app's brand
- tech: ["React", "TypeScript", "Supabase"]
- A new `screenshots: string[]` field with all 7 images
- A new `details` object with sections used by the modal (see below)

## 3. Click-to-open detail modal (App Store style)

Currently `ProjectCard` opens the URL on click. New behavior: when a project has a `screenshots`/`details` payload, clicking the card opens a modal instead of navigating away.

Build `src/components/home/ProjectDetailModal.tsx` using shadcn `Dialog`:

- **Header**: app icon (cover image rounded-2xl), title, category, small "Mobile + Web" badges
- **Screenshot gallery**: horizontal snap-scrolling row of phone-framed screenshots (rounded-[2.5rem] device frame, shadow, ~260px wide each) — App Store "Preview" style, swipeable on mobile, arrow buttons on desktop
- **About this app**: paragraph explaining what Skanda Billing Software does
- **How it eases your work**: bulleted feature list:
  - Fast order entry with categorized menu + search (Breakfast/Lunch/Dinner, Bestseller Combos, Chicken/Mutton/Seafood/Tandoori, Biriyani, Tiffin, Indian Breads)
  - One-tap add to cart with live order summary and quantity controls
  - Automatic bill summary: subtotal, discount, packing, delivery, grand total, amount-in-words
  - Multiple payment modes (Cash, UPI, Card, Wallet) with paid/balance tracking
  - One-click Print Bill, Save, Clear
  - Bills History with unique bill IDs, order type and payment chips, search and delete
  - Daily and Monthly Reports — total orders, sales, avg order, discount, payment & order-type breakdown, CSV export
  - Customer management and full Menu/Category editor (add/rename/delete, item counts)
  - Works offline-friendly, optimized for tablets and phones used at the counter
- **Footer**: optional "Visit Website" CTA (skandacloudkitchen.in) + Close

Wire `ProjectCard` (homepage) and the inline card in `Projects.tsx` to call an `onClick` that opens the modal when `project.screenshots` exists; otherwise keep current external-link behavior.

## Technical notes

- Add to memory index: new feature "Project Detail Modal" for projects that ship `screenshots`/`details`
- Keep card animation/parallax intact — only change the click handler when detail payload exists
- Modal scroll: gallery uses `overflow-x-auto snap-x snap-mandatory` and inner phone frames with the screenshot inside (`object-cover object-top`), matching App Store preview look
- No business-logic / backend changes
