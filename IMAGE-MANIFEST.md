# Stitch In Time — Image Manifest

The photography shopping list for the site (updated for the brandbook redesign).
**13 image slots in total — 9 already delivered, 4 still open (all optional — nothing required is missing).**

---

## How to add images

1. Export the image as a **JPG** (WebP also works).
2. Name it **exactly** as in the *Filename* column (lower-case, hyphens, with extension).
3. Drop it into the **exact folder** shown (`/public/images/...`).
4. Rebuild / redeploy. It appears automatically — **no code change needed.**

> Every slot already points at its final path. While a file is missing, a branded
> placeholder (burgundy, spool mark and stripe band) is shown instead — the site
> never shows a broken image and never errors.

**Format** JPG for photographs (WebP preferred where you can). **Resolution** export at **2×** the
size in the table (retina). **File size** aim for under 400 KB per image (hero under 600 KB) —
Next.js also resizes and re-encodes every image automatically, so just upload a clean, high-quality
original. **Colour** warm, natural, consistent grade across the set.

### Crops — what the layout does to your photo
| Shape | Where | What to know |
|---|---|---|
| **Circle** (1:1) | Home hero, the four pillars | The photo is centre-cropped to a circle. Keep the subject in the **middle 60%** of the frame. |
| **Arch** (4:5, rounded top) | Services, Home Fitting, About, Guarantee | Top corners are cut by the arch — leave headroom, keep the subject in the lower two-thirds. |
| **Card** (≈ 4:5.2 portrait) | Home "services" showcase | Same photo as the Services page; portrait works best. Landscape photos are centre-cropped. |

---

## Priorities

| Priority | Meaning |
|---|---|
| ⭐ **REQUIRED** | The page feels unfinished without it. |
| **HIGH** | Noticeably better with it — aim for launch. |
| **NICE** | Placeholder reads fine; add when budget allows. |

**Minimum viable shoot — 4 photographs cover the biggest slots:**
`home-hero.jpg` · `home-fitting-hero.jpg` · `service-alterations.jpg` · `about-atelier.jpg`
(all four are already delivered ✅ — the four open slots are optional upgrades).

---

## Home (`/`)

| # | Filename | Folder | Section | Shape / size (1×) | Orientation | Priority | Status | Art direction | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `home-hero.jpg` | `/public/images/home/` | Hero — circular mask | Circle, 1000 × 1000 (export 2000 × 2000) | Square-ish | ⭐ REQUIRED | ✅ delivered (1376 × 768 — re-export square if possible) | Hands at work on a garment: needle, thread, label. Warm directional light, shallow depth. Subject centred. | "A Stitch In Time tailor hand-finishing the label of a tailored jacket" |
| 2 | `pillar-bespoke-atelier.jpg` | `/public/images/home/` | Four pillars — "Bespoke Atelier" | Circle, 560 × 560 (export 1120) | Square | NICE | open | The atelier: fitting table, spools, garments in progress. | "A tailor's atelier with a fitting table, spools of thread and garments in progress" |
| 3 | `pillar-quiet-luxury.jpg` | `/public/images/home/` | Four pillars — "Quiet Luxury" | Circle, 560 × 560 | Square | NICE | open | Understated detail: a finished cuff, a watch, fine fabric. | "Close detail of a finely finished garment cuff and watch" |
| 4 | `pillar-precision-craftsmanship.jpg` | `/public/images/home/` | Four pillars — "Precision & Craftsmanship" | Circle, 560 × 560 | Square | NICE | open | Tape measure, chalk, hands marking cloth. | "Tailor's hands marking and measuring fabric with a tape measure" |
| 5 | `home-guarantee-detail.jpg` | `/public/images/home/` | Guarantee section — arch | Arch 4:5, 1200 × 1500 (export 2400 × 3000) | Portrait | HIGH | ✅ delivered | Macro of a hand-finished hem / lining; Gütermann thread; tactile and quiet. | "Detail of a hand-finished hem sewn with premium Gütermann thread" |

*Pillar 4, "Premium Convenience", re-uses `home-fitting-hero.jpg` (below).*

## Services (`/services`) — the same five photos also appear in the Home "services" showcase

| # | Filename | Folder | Service | Shape / size (1×) | Orientation | Priority | Status | Art direction | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 6 | `service-alterations.jpg` | `/public/images/services/` | Alterations | Arch 4:5, 1200 × 1500 (export 2400 × 3000) | Portrait | ⭐ REQUIRED | ✅ delivered | A tailor pinning a hem or lapel; chalk, pins, warm light. | "Tailor pinning a garment for precise alteration at a Stitch In Time atelier in Dubai" |
| 7 | `service-repairs-restoration.jpg` | `/public/images/services/` | Repairs & Restoration | Arch 4:5, 1200 × 1500 | Portrait | HIGH | ✅ delivered | Close-up of a zip or seam repair; rich fabric texture. | "Close-up of a premium YKK zip replacement during a clothing repair in Abu Dhabi" |
| 8 | `service-custom-tailoring.jpg` | `/public/images/services/` | Custom Tailoring | Arch 4:5, 1200 × 1500 | Portrait | HIGH | ✅ delivered | Measuring with a tape; boutique setting, natural light. | "Made-to-measure tailoring and body measurement consultation at Stitch In Time" |
| 9 | `service-embroidery.jpg` | `/public/images/services/` | Embroidery (Dubai Mall) | Arch 4:5, 1200 × 1500 | Portrait | NICE | ✅ delivered | Machine stitching a monogram on premium fabric. | "Machine embroidery of a monogram on premium fabric at the Dubai Mall branch" |
| 10 | `service-business-services.jpg` | `/public/images/services/` | Business Services | Arch 4:5, 1200 × 1500 | Portrait | NICE | ✅ delivered | A uniform fitting session in a professional setting. | "Corporate uniform fitting session for a business team at a Stitch In Time location" |
| 11 | `service-express.jpg` | `/public/images/services/` | Express (Home showcase card only) | Card ≈ 4:5.2, 1200 × 1560 | Portrait | NICE | open | A quick, precise alteration in progress — clock or timer subtly in frame. | "A tailor completing an urgent alteration under the express service" |

## Home Fitting (`/home-fitting`) — the primary conversion page

| # | Filename | Folder | Section | Shape / size (1×) | Orientation | Priority | Status | Art direction | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 12 | `home-fitting-hero.jpg` | `/public/images/home-fitting/` | Hero — arch (also pillar "Premium Convenience") | Arch 4:5, 1200 × 1500 (export 2400 × 3000) | Portrait | ⭐ REQUIRED | ✅ delivered (moved here from `home-service.jpeg`) | A tailor arriving at the door with a garment rail — private, refined, in a rich interior. | "A Stitch In Time tailor arriving with a garment rail for a private home fitting" |

## About (`/about`)

| # | Filename | Folder | Section | Shape / size (1×) | Orientation | Priority | Status | Art direction | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 13 | `about-atelier.jpg` | `/public/images/about/` | Our Story — arch | Arch 4:5, 1200 × 1500 (export 2400 × 3000) | Portrait | HIGH | ✅ delivered (1600 × 900 landscape — a portrait re-crop will sit better) | The craft behind the brand: thread, tools, an atelier bench. | "Spools of Gütermann thread in cream, taupe, espresso, burgundy and sky blue — the materials at the heart of Stitch In Time" |

## Locations (`/locations`)
No photography slots — the page is anchored by the interactive map. `/public/images/locations/` is
reserved for future branch / storefront photos.

## Not photography (generated automatically)
The **social-share (Open Graph) image** and the **favicon / app icon** are generated from the brand
logo files — nothing to supply.

---

## Folder structure

```
public/images/
  home/            home-hero · pillar-bespoke-atelier · pillar-quiet-luxury ·
                   pillar-precision-craftsmanship · home-guarantee-detail
  services/        service-alterations · -repairs-restoration · -custom-tailoring ·
                   -embroidery · -business-services · -express
  home-fitting/    home-fitting-hero
  about/           about-atelier
  locations/       (reserved)
```

## Photography direction
Warm, tactile, editorial — quiet luxury. Natural directional light; hands, needle, thread and
tape; cream / espresso / burgundy / sky-blue accents; shallow depth of field; no clutter, no harsh
flash. Keep one consistent colour grade across the whole set. Faces are optional — craft is the hero.

*Image manifest · Fekra Communications · Stitch In Time website.*
