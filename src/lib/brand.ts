/**
 * Brand language — transcribed from the approved brandbook
 * (public/branding/BrandBook- StitchinTime.pdf). The brandbook misspells
 * "Quiet Luxury" as "Quite"; the correct spelling is used here.
 */

export const TAGLINE = { lead: "A stitch in time saves", accent: "nine." } as const;

export const BRAND_STORY =
  "Stitch In Time was founded in 2008 on a simple belief: every garment deserves to fit the person wearing it. 18 years later, that conviction has grown into the UAE’s most trusted name in clothing care; 11 mall boutiques across Dubai and Abu Dhabi, the largest network of its kind in the country, alongside a home fitting service that brings the same expertise to a client’s door. The work spans every garment and occasion; an everyday hem, a designer suit, a bridal gown, a corporate uniform programme; and the precision never changes, regardless of the garment or its price tag. That precision starts inside the seam: Gütermann thread, Prym fastenings, Union Knopf buttons, not upgrades, but the standard, because the quality no one sees matters as much as the quality everyone does. It’s why thousands of residents, professionals, and fashion brands keep returning, not because we are the loudest name in the room, but because we deliver on the only promise that matters: a better fit, every time.";

export const MISSION =
  "To give every client a perfect fit and complete confidence in what they wear through specialist craftsmanship, premium materials, and service that meets them wherever they are.";

export const VISION =
  "To be the definitive name in clothing care across the region, the standard against which every alteration, tailoring, and garment-care experience is measured.";

export const POSITIONING =
  "For residents, professionals, and fashion brands across the UAE who refuse to wear anything that doesn’t fit perfectly, Stitch In Time is the UAE’s most trusted clothing alterations and tailoring house, because we pair specialist craftsmanship and premium materials with a service promise, a better fit, every time; that we guarantee, wherever our clients are.";

export type ValueTone = "burgundy" | "ivory" | "cream" | "espresso" | "sky" | "ink";

export const VALUES: { title: string; body: string; tone: ValueTone }[] = [
  {
    title: "Precision Over Speed",
    body: "Every garment is treated with the same care and accuracy, regardless of size, complexity, or price.",
    tone: "burgundy",
  },
  {
    title: "Specialist Craft",
    body: "We staff true experts for every service, never a jack-of-all-trades, because mastery is the standard.",
    tone: "ivory",
  },
  {
    title: "Quality Inside and Out",
    body: "Gütermann, Prym, and Union Knopf as standard; the quality no one sees matters as much as what they do.",
    tone: "cream",
  },
  {
    title: "Trust: Earned Repeatedly",
    body: "We stand behind every alteration with guarantees, because confidence in our work should never be a risk our clients take.",
    tone: "espresso",
  },
  {
    title: "Service Without Compromise",
    body: "From mall boutique to home fitting, the same expertise meets clients wherever they are.",
    tone: "sky",
  },
  {
    title: "Quiet Confidence",
    body: "We are not the loudest name in the room; we let consistent results speak for the brand.",
    tone: "ink",
  },
];

export const PILLARS: { title: string; copy: string; image: string; alt: string }[] = [
  {
    title: "Bespoke Atelier",
    copy: "Every garment handled with the care of a fashion house — from everyday staples to designer and luxury pieces.",
    image: "/images/home/pillar-bespoke-atelier.jpg",
    alt: "A tailor’s atelier with a fitting table, spools of thread and garments in progress",
  },
  {
    title: "Quiet Luxury",
    copy: "Refined, understated craftsmanship. Premium materials as standard, because the details you cannot see still matter.",
    image: "/images/home/pillar-quiet-luxury.jpg",
    alt: "Close detail of a finely finished garment cuff and watch",
  },
  {
    title: "Precision & Craftsmanship",
    copy: "Measured by shape, not just size. Skilled tailors, professional-grade equipment, a clean finish every time.",
    image: "/images/home/pillar-precision-craftsmanship.jpg",
    alt: "Tailor’s hands marking and measuring fabric with a tape measure",
  },
  {
    title: "Premium Convenience",
    copy: "In-store across 11 mall boutiques, or at your door through our home fitting service — same standard, same guarantee.",
    image: "/images/home-fitting/home-fitting-hero.jpg",
    alt: "A Stitch In Time tailor arriving with a garment rail for a private home fitting",
  },
];

export const MATERIALS = ["Gütermann", "Prym", "Union Knopf"] as const;
