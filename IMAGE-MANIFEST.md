# Stitch In Time — Image Manifest

Photography shopping list for the client shoot/sourcing.  
**8 images total. 2 are required for launch; 4 more are high-priority.**

---

## How to add images

1. Export your image as a JPG (or WebP — both work).
2. Name it **exactly** as shown in the filename column below (kebab-case, with extension).
3. Drop it into the **exact folder** shown — no subfolders, no renamed files.
4. Redeploy (or rebuild with `npm run build`).
5. It appears automatically. **No code change needed.**

> The code already points at the final file path for every slot. While a file is
> missing, a branded placeholder renders instead — the site never shows a broken image.

**Format:** JPG for photos. WebP is also accepted and gives smaller file sizes.  
**Resolution:** Export at **2× the dimensions listed** (retina/HiDPI screens). Example: a 1200px-wide spec → export at 2400px.  
**File size:** Keep each image under **400 KB** (compress with [Squoosh](https://squoosh.app) or similar after export). For the hero, under **600 KB** is acceptable given its full-screen role.

---

## Priority guide

| Priority | Meaning |
|---|---|
| **REQUIRED** | Site feels incomplete without it. Shoot/source first. |
| **HIGH** | Significantly improves the page. Aim for launch. |
| **RECOMMENDED** | Noticeably better with it, can launch without. |
| **NICE-TO-HAVE** | Placeholder reads fine; add when budget allows. |

---

## Home page (`/`)

| # | Filename | Folder | Section | What to shoot | Dimensions (1×) | Aspect ratio | Orientation | Priority | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `home-hero.jpg` | `/public/images/home/` | Hero (full-bleed background) | Master tailor at work in an elegant Dubai atelier. Hands pinning or measuring a garment on a dress form or fitting stand. Warm, directional light. Shallow depth of field. Subject fills left-to-centre frame; right side has breathing room for the headline. Espresso/cream palette preferred. | 2400 × 1600 | 3:2 | **Landscape** | **REQUIRED** ⭐ | "Master tailor at Stitch In Time performing a precise clothing alteration in a Dubai atelier" |
| 2 | `home-guarantee-detail.jpg` | `/public/images/home/` | Guarantee section (portrait card) | Extreme close-up of a finished hem. Gutermann thread in a warm tone, needle, fabric texture — tactile and premium. Macro lens, very shallow depth of field. Almost no background visible. | 1200 × 1500 | 4:5 | **Portrait** | **HIGH** | "Detail of a hand-finished hem sewn with premium Gutermann thread" |

---

## Services page (`/services`) — also used on the Home services grid

> These 5 images each appear in **two places**: the home page services grid (16:10 crop) and the services detail page (4:5 portrait). Shoot in portrait — the wider crop is generated automatically. Shoot at 1200 × 1500 minimum (export 2400 × 3000).

| # | Filename | Folder | Services section | What to shoot | Dimensions (1×) | Aspect ratio | Orientation | Priority | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 3 | `service-alterations.jpg` | `/public/images/services/` | Alterations (first card — most prominent) | Tailor pinning a trouser hem or jacket lapel. Hands in focus, with pin cushion or chalk visible. Atelier/boutique setting. Warm, editorial light. | 1200 × 1500 | 4:5 | **Portrait** | **REQUIRED** ⭐ | "Tailor pinning a garment for precise alteration at a Stitch In Time atelier in Dubai" |
| 4 | `service-repairs-restoration.jpg` | `/public/images/services/` | Repairs & Restoration | Close-up of a YKK zip replacement in progress — zip slider, threads, hands partially visible. Rich fabric texture (denim, leather, or suiting). | 1200 × 1500 | 4:5 | **Portrait** | **HIGH** | "Close-up of a premium YKK zip replacement during a clothing repair in Abu Dhabi" |
| 5 | `service-custom-tailoring.jpg` | `/public/images/services/` | Custom Tailoring & Measurements | Tailor taking body measurements with a tape measure around the waist or shoulder. Clean studio or mall boutique setting, natural light, professional feel. | 1200 × 1500 | 4:5 | **Portrait** | **HIGH** | "Made-to-measure tailoring and body measurement consultation at Stitch In Time" |
| 6 | `service-embroidery.jpg` | `/public/images/services/` | Embroidery (Dubai Mall only) | Embroidery machine close-up — needle stitching a monogram or logo onto premium fabric. Rich colour contrast (gold/cream thread on dark material works well). | 1200 × 1500 | 4:5 | **Portrait** | **RECOMMENDED** | "Machine embroidery of a monogram on premium fabric at the Dubai Mall branch" |
| 7 | `service-business-services.jpg` | `/public/images/services/` | Business Services | A small team fitting session — tailors measuring or adjusting uniformed staff in a professional/office environment. Clean and corporate in feel. | 1200 × 1500 | 4:5 | **Portrait** | **NICE-TO-HAVE** | "Corporate uniform fitting session for a business team at a Stitch In Time location" |

---

## About page (`/about`)

| # | Filename | Folder | Section | What to shoot | Dimensions (1×) | Aspect ratio | Orientation | Priority | Alt text |
|---|---|---|---|---|---|---|---|---|---|
| 8 | `about-atelier.jpg` | `/public/images/about/` | Brand Story (portrait card, sticky on desktop) | Editorial interior of a Stitch In Time mall boutique. A tailor at the work bench — garment in progress, tools on the surface. Warm light, slightly shallow depth. Conveys craft and permanence. | 1200 × 1500 | 4:5 | **Portrait** | **HIGH** | "The Stitch In Time atelier — tailors at work in a Dubai boutique" |

---

## Locations page (`/locations`)

No image slots currently — the page is anchored by the interactive Leaflet map.  
The `/public/images/locations/` folder exists for any future additions (storefront photos, branch thumbnails, etc.).

---

## Folder structure (created and ready)

```
public/
  images/
    home/
      .gitkeep          ← drop home-hero.jpg and home-guarantee-detail.jpg here
    services/
      .gitkeep          ← drop all 5 service-*.jpg files here
    about/
      .gitkeep          ← drop about-atelier.jpg here
    locations/
      .gitkeep          ← reserved for future branch/storefront photos
```

---

## Minimum viable shoot (4 images)

If budget or time is tight, these 4 images cover the highest-impact slots:

1. `home-hero.jpg` — sets the brand tone for the entire site
2. `service-alterations.jpg` — appears on both the home grid and the services page
3. `about-atelier.jpg` — humanises the brand on the About page
4. `home-guarantee-detail.jpg` — reinforces craft quality on the home page

---

## Photography direction notes

All images should be consistent with the **quiet-luxury atelier** aesthetic:
- **Warm, natural light** — no harsh flash, no clinical white
- **Tactile and editorial** — fabric texture, thread, tools visible in frame
- **Hands and craft** — the human element is more important than faces
- **Muted, warm palette** — cream, espresso, camel, natural linen tones; avoid vivid synthetics
- **Clean backgrounds** — boutique or atelier setting; no clutter
- **Shallow depth of field** — keeps focus on craft detail
- Consistent colour-grading across all images (warm tone, slightly desaturated)

---

*Image manifest generated for Fekra Communications · Stitch In Time website build.*
