# Stitch In Time — UAE Tailoring & Alterations Website

Production website for **Stitch In Time**, a UAE clothing alterations and tailoring house
(Dubai & Abu Dhabi). Client project delivered by **Fekra Communications**, built to the
DunajMedia stack.

Quiet-luxury tailoring-atelier aesthetic — refined, warm, editorial, generous whitespace.

---

## Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 15 (App Router) + TypeScript               |
| Styling        | Tailwind CSS (brand tokens) + shadcn-style UI      |
| Animation      | Framer Motion (subtle fades / soft slides only)    |
| Map            | react-leaflet + Leaflet + OpenStreetMap (no API keys) |
| Icons          | lucide-react                                       |
| Fonts          | Cormorant Garamond (headings) + Avenir Book/Black (UI) |

No email backend, no i18n, no Arabic — direct-link contact only (`wa.me` / `tel:` / `mailto:`).

## Brand palette

Defined as CSS variables in [`src/app/globals.css`](src/app/globals.css) and exposed as Tailwind
tokens in [`tailwind.config.ts`](tailwind.config.ts):

- Cream Ivory `#e8e2d8` — base canvas
- Warm Sand `#e2d5c7` — muted panels / secondary surface (Tailwind token: `taupe`)
- Espresso `#4a3428` — dark section breaks
- Burgundy `#6b1f2a` — **signature accent** (CTAs, hovers, highlights)
- Sky Blue `#97b3c8` — cool accent (sparing)
- Charcoal `#2b2b2b` — body ink

The Tailwind token name remains `taupe` for consistency with existing class names; the
CSS variable `--taupe` now resolves to Warm Sand `#e2d5c7` (updated from the previous `#cbbeae`).

### Contrast rule (burgundy vs dark)
Burgundy `#6b1f2a` is the signature accent **only on light surfaces** (cream/warm sand) —
buttons, hovers, links, eyebrow labels there stay burgundy. On **dark** backgrounds
(espresso `#4a3428` / charcoal `#2b2b2b`) burgundy fails contrast. Any decorative
numerals, icons, or dividers on dark backgrounds use **Sky Blue `#97b3c8`** instead (e.g.
the homepage "How Our Home Fitting Service Works" step numerals — ~5.5:1, WCAG AA).
CTAs on dark sections use the **cream** button variant (cream fill / espresso text) so
they stay clearly actionable.

## Typography

Three roles, wired as CSS variables and Tailwind `fontFamily` tokens:

| Role | Font | Tailwind token / var | Notes |
| ---- | ---- | -------------------- | ----- |
| Headings (h1–h6, display) | **Cormorant Garamond 300** (Light) | `font-serif` / `--font-cormorant` | Only 300 + 300-italic loaded; `font-weight: 300` enforced globally. Emphasise key words with `<em class="italic">` → real Cormorant **300 Italic**. |
| Eyebrow / subheader labels | **Avenir Black** | `font-subheader` / `--font-subheader` | Rendered ALL CAPS with letter-spacing (`.eyebrow` utility). |
| Body & UI (paragraphs, nav, buttons, captions) | **Avenir Book** | `font-sans` / `--font-body` | Default body font. |

Cormorant loads via `next/font/google`. **Avenir** is self-hosted: the client-supplied
`Avenir.ttc` (TrueType Collection, not web-usable) was inspected with fontTools — it
contains 12 faces including **Avenir Book** and **Avenir Black**. Those two were extracted
and converted to `.woff2` (`public/fonts/AvenirBook.woff2`, `public/fonts/AvenirBlack.woff2`)
and wired with `next/font/local`. Only those two `.woff2` files are served; the source
`Avenir.ttc` lives in `/fonts-source` (outside `/public`, git-ignored) and is **not shipped**.

**To swap or add an Avenir weight later:** convert the desired face from the collection to
`.woff2` (extract face → compress via fontTools/brotli), drop it in `public/fonts`, and add
another `localFont({ … })` in [`src/app/layout.tsx`](src/app/layout.tsx). Jost has been fully
removed.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint (next/core-web-vitals)
npm run build    # production build (all pages prerender static)
npm run start    # serve the production build
```

## Pages

- `/` — Home (hero, brand story, value pillars, home-fitting steps, services grid, guarantee, testimonials placeholder, FAQs, CTA)
- `/services` — All services **except Atelier** (alterations w/ pricing, repairs, custom tailoring, embroidery, business services, express)
- `/locations` — Interactive Leaflet map + synced branch list + direct contact
- `/about` — Brand story, differentiators, guarantees + T&Cs

FAQs from the content doc are **distributed** across the most relevant pages (better for AI
answer engines), each page emitting its own `FAQPage` JSON-LD.

> **Note — "Atelier Dressmaking" is intentionally excluded** (no route, nav, or footer entry).
> It is being spun off as a separate standalone brand with its own site later.

---

## The three things you'll swap at launch

### 1. Logo → real artwork
Currently a typographic placeholder wordmark in
[`src/components/Logo.tsx`](src/components/Logo.tsx) (marked `// PLACEHOLDER — swap with final
logo SVG once approved`). Replace the inner markup with the final SVG; the layout, link, and
`tone` props stay the same. Used in the header and footer.

### 2. Photography → real photos
All images go through [`src/components/SmartImage.tsx`](src/components/SmartImage.tsx), a safe
`next/image` wrapper. Where no photo exists yet it renders a **branded placeholder** (never a
broken image, never an undefined `src` crash).

**The code is already wired** — every image slot points at its final intended path via
[`src/lib/resolveImage.ts`](src/lib/resolveImage.ts). To add a photo:

1. Export the image as a JPG (or WebP).
2. Name it **exactly** as specified in [`IMAGE-MANIFEST.md`](IMAGE-MANIFEST.md).
3. Drop it into the correct `/public/images/` subfolder.
4. Rebuild (`npm run build`) — it appears automatically. **No code change needed.**

See [`IMAGE-MANIFEST.md`](IMAGE-MANIFEST.md) for the full shopping list with filenames,
dimensions, art direction notes, and priority ranking for the client shoot.

Static placeholder assets (OG image) live in [`public/placeholders/`](public/placeholders).

### 3. Booking → the 7jwzat page
Every "Book Appointment" / "Book a Home Fitting" CTA site-wide routes through **one** handler in
[`src/components/BookingProvider.tsx`](src/components/BookingProvider.tsx). Today it opens an
on-brand **"Booking coming soon"** dialog. To go live, edit
[`src/lib/site.ts`](src/lib/site.ts):

```ts
export const BOOKING_URL = "https://<the-real-7jwzat-page>";
export const BOOKING_ENABLED = true;
```

That single change makes every CTA open the 7jwzat page in a new tab — no call sites need editing.

---

## Locations & the map

- Branch data (typed) lives in [`src/data/branches.ts`](src/data/branches.ts) — name, mall,
  emirate, address, phone, hours, lat/lng. **Adding a branch is one array entry.**
- Map pins use inline SVG div-icons (no external marker assets) and OpenStreetMap tiles
  (no API key). Each pin/list item opens a card with address, hours, phone, and a **Get
  directions** button (`google.com/maps/dir/?api=1&destination=LAT,LNG`, new tab).
- The map is **expandable to fullscreen** and the list ↔ map stay in sync.

> ### ⚠️ Branch count: 11 vs 10
> The approved copy states **"11 locations"** and that wording is kept verbatim across the site.
> However, the content document only details **10 branches** (6 Dubai + 4 Abu Dhabi — its
> "Abu Dhabi — 5 Locations" heading lists only 4). We did **not** invent a fake 11th branch's
> address/phone for a live client site. **Action for the client:** supply the missing Abu Dhabi
> branch (name, address, phone, hours) and add it as one entry in `src/data/branches.ts` — the
> map, list, footer, and schema all update automatically.

---

## SEO / GEO

- Per-page metadata (titles + meta descriptions from the doc's META boxes) + Open Graph / Twitter.
- JSON-LD ([`src/lib/jsonld.ts`](src/lib/jsonld.ts)): `Organization`, `LocalBusiness` (one per
  branch with geo + parsed opening hours), `Service`, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` and `robots.txt` are generated ([`src/app/sitemap.ts`](src/app/sitemap.ts),
  [`src/app/robots.ts`](src/app/robots.ts)). **robots.txt explicitly allows AI crawlers**
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) plus standard search bots.
- Semantic HTML, correct heading hierarchy, descriptive alt text on every image slot,
  WCAG-AA focus states, keyboard nav, and aria labels on the map and WhatsApp button.

### Before launch — set the canonical domain
Update `SITE.url` in [`src/lib/site.ts`](src/lib/site.ts) to the live domain. It drives
`metadataBase`, canonicals, sitemap URLs, robots host, and all JSON-LD `@id`s. Also swap
`/public/placeholders/og-default.svg` for a real 1200×630 **PNG/JPG** OG image and fill in the
social profile URLs (footer + `Organization.sameAs`).

---

## Project structure

```
src/
  app/            # routes, layout, globals, sitemap, robots, icon, 404
  components/     # Logo, SmartImage, Header, Footer, WhatsAppButton,
                  # BookingProvider/BookButton, Reveal, FaqSection, JsonLd,
                  # locations/ (BranchMap, LocationsExplorer), ui/ (button…)
  data/           # branches, services, faqs  (approved copy, verbatim)
  lib/            # site config, jsonld builders, resolveImage, cn() util
public/
  images/         # client photography (see IMAGE-MANIFEST.md)
    home/         # home-hero.jpg, home-guarantee-detail.jpg
    services/     # service-alterations.jpg, service-repairs-restoration.jpg, …
    about/        # about-atelier.jpg
    locations/    # reserved for future branch/storefront photos
  placeholders/   # branded placeholder + OG assets
IMAGE-MANIFEST.md # photography shopping list for the client shoot
```

---

*Website by Fekra Communications. Build stack: DunajMedia.*
