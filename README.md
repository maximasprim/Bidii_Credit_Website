# Bidii Credit — Website Rebuild

A modern rebuild of the Bidii Credit Kenya website: React 19 + TypeScript + Vite +
Tailwind CSS v4, with Framer Motion, React Router, React Hook Form + Zod, Swiper,
and React CountUp wired in and ready to use.

## What's fully built

- **Home page** — hero, animated stats, "Why Bidii", featured loan products,
  a live interactive loan calculator preview, a 4-step application journey,
  testimonial carousel, branch preview grid, FAQ accordion, closing CTA band.
- **Navigation & footer** — sticky navbar with a products mega-menu, mobile
  menu, mobile sticky "Apply Now" bar, full multi-column footer.
- **Design system** — color and type tokens live in `src/index.css` under
  `@theme`. Everything else (`bg-navy-900`, `text-ember-500`, etc.) is
  generated from those tokens automatically by Tailwind v4.

## What's scaffolded as placeholders

Every other route from the brief exists and is wired into the router so the
site is fully navigable, but currently shows a "coming soon" placeholder in
the same visual language: About, Services, Products (index + detail),
full Loan Calculator, Branch Locator, Downloads, News, Careers, Contact,
Apply, FAQ. These are the natural next pages to build out — say which one
you want next and it can be built against this same design system.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint       # eslint
npm run format     # prettier
```

## Design notes

- **Palette**: deep navy (`--color-navy-*`) for trust/authority, a single
  warm ember-orange (`--color-ember-*`) reserved for actions and emphasis,
  a warm-tinted gray (`--color-mist-*`) instead of a cold slate.
- **Type**: Plus Jakarta Sans for display/headings, Inter for body and UI,
  with `tabular-nums` applied to all monetary and numeric figures.
- **Signature motif**: an ascending "staircase" growth line
  (`src/components/ui/GrowthLine.tsx`) — each flat tread is a step, each
  riser is the effort between steps. It stands in for *bidii* (Kiswahili:
  diligence/effort compounding into growth) and recurs at different scales:
  the hero, the CTA band, and as inspiration for the stats layout.
- Numbered steps are used only for the application journey, since that's a
  genuine sequence — not decoratively elsewhere.

## Content

All homepage copy (products, stats, testimonials, branches, FAQs) lives in
`src/data/content.ts` as placeholder content matching Bidii's real product
lineup — swap in real figures, branch addresses, and verified testimonials
before launch.
