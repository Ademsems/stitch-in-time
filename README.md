# Stitch In Time — UAE Tailoring & Alterations Website

Production website for **Stitch In Time**, a UAE clothing alterations and tailoring house
(Dubai & Abu Dhabi). Delivered by **Fekra Communications**, built to the DunajMedia stack.
Rebuilt on the approved brandbook: quiet luxury — refined, precise, calm, never loud.

---

## Stack

| Concern    | Choice |
| ---------- | ------ |
| Framework  | Next.js 15 (App Router) + TypeScript, all routes statically prerendered |
| Styling    | Tailwind CSS (brand tokens) + shadcn-style primitives (Radix) |
| Motion     | **GSAP** + ScrollTrigger + SplitText (scroll/pin/text), **Lenis** (smooth scroll), **Motion** (`motion/react`, LazyMotion — menu stagger) |
| Map        | react-leaflet + Leaflet + OpenStreetMap (no API keys) |
| Icons      | lucide-react |
| Fonts      | Cormorant Garamond 400 + 400 Italic (Google), Avenir Roman + Avenir Heavy (self-hosted woff2) |

No email backend, no i18n, no Arabic — direct-link contact only (`wa.me` / `tel:` / `mailto:`).

## Brand system

All values come from the brandbook (`public/branding/BrandBook- StitchinTime.pdf`).

| Token (Tailwind / CSS var) | Hex | Use |
| --- | --- | --- |
| `ivory` | `#FFFEFA` | main background |
| `cream` | `#F5F1E9` | alternate sections, cards |
| `espresso` | `#433633` | dark sections, body text |
| `burgundy` | `#561B26` | **signature** — primary buttons, footer, key dark sections, headings |
| `sky` | `#9DB4CE` | accent |
| `ink` | `#1E1E1E` | darkest sections / text |

**Contrast rules (enforced in the components):** body text is espresso/burgundy/ink on ivory/cream
and ivory/cream on espresso/burgundy/ink. **Sky Blue is a text colour only on dark backgrounds**
(eyebrows, step numbers); on ivory/cream it is decorative only (lines, stripes, rings). On a sky
background use burgundy/espresso/ink text. The logo's own navy and spool red are **logo-only** colours.

**Typography:** headers Cormorant Garamond Regular with a Regular *Italic* accent word
(`<em class="italic">`); eyebrows, subheaders and buttons **Avenir Heavy, ALL CAPS**, wide tracking
(`.eyebrow`, `font-subheader`); body **Avenir Roman**. The two Avenir files were extracted from the
client's `Avenir.ttc` with fontTools and live at `public/fonts/avenir-heavy.woff2` and
`public/fonts/avenir-roman.woff2` (wired with `next/font/local`). The `.ttc` itself is not shipped
(`/fonts-source` is git-ignored).

**Motifs:** the STRIPE band (`StripeBand`), the THREAD (hero + page-long scroll thread), dashed stitch
lines + hatched rule, circles (pillars, values, hero image) and arches for photography.

### Logo rules
Artwork lives in `public/branding/` (extracted as clean vectors from the brandbook's vector pages):
`stitch-in-time-logo.svg` (colour — light backgrounds), `stitch-in-time-logo-white.svg` (dark
backgrounds), `stitch-in-time-icon.svg` / `-icon-white.svg` (spool brandmark — used for narrow-phone
header, favicon, app icon). `<Logo>` (`src/components/Logo.tsx`) never stretches, recolours or
separates the lockup, keeps the primary lockup ≥ 50px tall, and only the **whole lockup** is
animated (intro fade). Never use the `.eps` on the site.

## Pages

- `/` Home — cinematic hero, trust bar (count-up), story + four pillars, pinned services showcase,
  pinned "How Home Fitting Works", six interactive values, guarantee, materials marquee, locations
  teaser, FAQs, closing CTA with the tagline.
- `/services` — Alterations (with pricing), Repairs & Restoration, Custom Tailoring & Measurements,
  Embroidery, Business Services, Express. **No Atelier.**
- `/home-fitting` — the primary conversion page: hero, trust signals, 4-step service flow, 7-step
  booking walkthrough, reassurance, FAQs, booking CTA.
- `/locations` — Leaflet map, spool pins, smooth fly-to, "Near me", fullscreen, list↔map sync.
- `/about` — brand story, mission, vision, values, pillars, positioning, differentiators, Our
  Guarantees and Terms & Conditions.

> **Atelier Dressmaking is intentionally excluded** (no route, card, nav or footer entry) — it is
> being spun off as a separate brand with its own website.

## Motion & interaction

First-visit intro (~1.5s, skippable, pure CSS so it never delays LCP) · hero headline rising through
masks with the italic word last · a continuous page **thread** scrubbed to scroll (shorter on mobile) ·
masked image wipes, alternating slides, staggered grids · stripe bands that draw across · pinned
horizontal services showcase (desktop) / snap carousel (mobile) · pinned step sequence · value circles
that flip on hover / focus / tap · magnetic primary buttons with a colour-fill sweep · stitched link
underlines · dashed stitch borders that sew on hover · desktop-only custom cursor · brand-colour page
transitions · back-to-top with a scroll-progress ring.

Rules: only transform / opacity / clip-path are animated; no layout shift; **everything respects
`prefers-reduced-motion`** (no intro, no Lenis, no thread, static states); content is visible by
default and a CSS failsafe un-hides it if JS or an animation fails. Heavy scroll setup (Lenis,
ScrollTrigger pins, the thread) starts on the first interaction so it stays off the load path.

## The things you'll swap at launch

1. **Booking → the 7jwzat page.** Every "Book" CTA goes through one handler
   (`src/components/BookingProvider.tsx`) and currently opens a "Booking coming soon" dialog. In
   `src/lib/site.ts` set `BOOKING_URL` and `BOOKING_ENABLED = true`.
2. **Photography.** See `IMAGE-MANIFEST.md` — drop correctly named files in `public/images/...`; no
   code change. A missing image renders a branded placeholder, never a broken image.
3. **Canonical domain.** Set `SITE.url` in `src/lib/site.ts` (drives `metadataBase`, canonicals,
   sitemap, robots host, JSON-LD ids). Add the social profile URLs to `Organization.sameAs` in
   `src/lib/jsonld.ts` and to the footer when they exist.
4. **Testimonials.** `src/data/testimonials.ts` is empty on purpose — the section only renders when
   it holds real entries (first name, location, service). Never invent reviews.
5. **11th branch.** The copy says 11 locations; the content document details 10 (6 Dubai + 4 Abu Dhabi).
   Add the missing Abu Dhabi branch as one entry in `src/data/branches.ts`.

## SEO / GEO

Per-page metadata + Open Graph, JSON-LD (`Organization`, `ClothingStore` per branch, `Service`
incl. the home-fitting service, `FAQPage`, `BreadcrumbList`), generated `sitemap.xml`, `robots.txt`
that **explicitly allows AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …),
FAQs distributed across relevant pages, descriptive alt text, generated OG image and app icons.

## Project structure

```
src/
  app/               routes (home, services, home-fitting, locations, about), layout, globals.css,
                     sitemap, robots, opengraph-image, apple-icon, icon.svg, 404
  components/
    fx/              SmoothScroll, MotionObservers, Reveal, SplitHeading, RiseHeading, PageThread,
                     Intro, RouteCurtain, Cursor, BackToTop, StripeBand, CountUp, Magnetic
    sections/        Hero, TrustBar, StoryPillars, ServicesShowcase, HowItWorks, Values, HomeSections
    locations/       BranchMap, LocationsExplorer
    ui/              button, dialog, accordion
  data/              branches, services, faqs, testimonials
  lib/               site config, brand language, jsonld, gsap, idle, showcase, resolveImage
public/
  branding/          brandbook + logo artwork (SVG for the site)
  fonts/             avenir-roman.woff2, avenir-heavy.woff2
  images/            client photography (see IMAGE-MANIFEST.md)
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # all routes prerender static
npm run start
```

---

*Website by Fekra Communications. Build stack: DunajMedia.*
