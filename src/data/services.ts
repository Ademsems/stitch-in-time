/**
 * Services content — transcribed verbatim from the approved content document.
 * The "Atelier Dressmaking" section is intentionally OMITTED: it is being spun
 * off as a separate standalone brand and must not appear anywhere on this site.
 */

export interface ServiceGroup {
  /** Sub-heading within a service, e.g. "Trouser & Jeans Alterations". */
  title: string;
  price?: string;
  items: string[];
  /** Optional trailing note paragraph. */
  note?: string;
}

export interface Service {
  slug: string;
  index: string; // "01" etc.
  heading: string; // editorial section heading
  label: string; // short nav / eyebrow label
  intro: string[];
  groups?: ServiceGroup[];
  /** Alt text for the paired image placeholder (per doc alt-text guidance). */
  imageAlt: string;
  /** Final intended path in /public — resolveImageSrc() shows placeholder if not present yet. */
  imageSrc: string;
  contact?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "alterations",
    index: "01",
    label: "Alterations",
    heading: "Alterations That Actually Fit Right.",
    imageAlt:
      "Tailor pinning a garment for precise alteration at a Stitch In Time atelier in Dubai",
    imageSrc: "/images/services/service-alterations.jpg",
    intro: [
      "A well-fitted garment changes how you look and how you feel. Our tailors specialise in precise alterations across all garment types — from everyday clothing to luxury and designer pieces — ensuring a refined, clean finish every time.",
      "All alteration prices are confirmed at the point of pinning. Every garment is measured and approved by the customer before work begins.",
    ],
    groups: [
      {
        title: "Trouser & Jeans Alterations",
        price: "from AED 40",
        items: [
          "Hemming (standard and original hem preservation)",
          "Waist adjustment — taking in or letting out",
          "Slim tapering for a more tailored fit",
          "Length shortening",
        ],
        note: "Perfect for online purchases that need adjusting, or wardrobe staples that need refreshing.",
      },
      {
        title: "Dress & Skirt Alterations",
        price: "from AED 40",
        items: [
          "Length shortening and adjustments",
          "Taking in or letting out for a better fit",
          "Reshaping for improved comfort and silhouette",
        ],
        note: "We work across all fabric types, from casual to occasion wear and delicate textiles.",
      },
      {
        title: "Shirt & Top Alterations",
        price: "from AED 40",
        items: [
          "Slim fit tailoring — side tapering for a sharper silhouette",
          "Sleeve shortening and adjustment",
          "Collar and body reshaping",
        ],
      },
      {
        title: "Suit & Blazer Tailoring",
        price: "from AED 120",
        items: [
          "Jacket tapering for a contemporary fit",
          "Sleeve shortening — with or without functioning buttons",
          "Full suit fitting and multi-point adjustment",
          "Lining repair and replacement",
        ],
        note: "We regularly work on luxury and designer suits. All high-value garments are handled with specialist care.",
      },
      {
        title: "Abaya & Kandura Alterations",
        price: "from AED 40",
        items: [
          "Length adjustments",
          "Sleeve fitting and reshaping",
          "Full resizing and proportional adjustments",
        ],
        note: "Handled with respect for the garment's original design and craftsmanship.",
      },
      {
        title: "Bridal & Occasion Wear",
        price: "from AED 200",
        items: [
          "Wedding dress alterations — resizing, hemming, bustling",
          "Evening gown adjustments",
          "Bridesmaid dress fittings",
          "Detailed finishing for luxury occasion wear",
        ],
        note: "We recommend bringing your shoes and undergarments to your fitting to ensure the ideal length and proportion. We advise booking bridal alterations at least four weeks in advance.",
      },
    ],
  },
  {
    slug: "repairs-restoration",
    index: "02",
    label: "Repairs & Restoration",
    heading: "Restore Your Favourite Pieces.",
    imageAlt:
      "Close-up of a premium YKK zip replacement during a clothing repair in Abu Dhabi",
    imageSrc: "/images/services/service-repairs-restoration.jpg",
    intro: [
      "A damaged garment does not always need to be replaced. Our repairs and restoration service gives new life to clothing you love — from zip replacements and button fixing to tear repairs and seam restoration.",
      "We use premium YKK zippers and professional-grade fastenings to ensure repairs that are durable, clean, and discreet.",
    ],
    groups: [
      {
        title: "Services Include",
        price: "from AED 20",
        items: [
          "Zip replacement — using premium YKK zippers",
          "Button replacement and fixing",
          "Tear, hole, and seam repair",
          "General garment restoration",
        ],
        note: "If you are unsure whether your garment can be repaired, bring it in — our tailors will give you an honest assessment before any work begins.",
      },
    ],
  },
  {
    slug: "custom-tailoring",
    index: "03",
    label: "Custom Tailoring & Measurements",
    heading: "Made Precisely for You.",
    imageAlt:
      "Made-to-measure tailoring and body measurement consultation at Stitch In Time",
    imageSrc: "/images/services/service-custom-tailoring.jpg",
    intro: [
      "For clients who require a made-to-measure garment or a higher level of fit precision, our custom tailoring service provides a fully personalised experience — from your first fitting through to a perfectly finished result.",
    ],
    groups: [
      {
        title: "Services Include",
        price: "from AED 200",
        items: [
          "Made-to-measure clothing — suits, shirts, trousers, and more",
          "Personal fittings and full body measurements",
          "Ongoing fit adjustments for repeat clients",
          "Measurement consultations for online purchases",
        ],
      },
      {
        title: "Our Professional Measurement Service",
        items: [
          "Custom suit measurements",
          "Bridal and bridesmaid fittings",
          "Uniform fittings — professional and school wear",
          "Alteration measurements for existing garments",
        ],
        note: "Home measurement visits are available. Measurements taken by our team consider posture, fabric type, and garment construction — ensuring a result that fits by shape, not just by size.",
      },
    ],
  },
  {
    slug: "embroidery",
    index: "04",
    label: "Embroidery",
    heading: "Precision Embroidery for Personal, Corporate & Promotional Use.",
    imageAlt:
      "Machine embroidery of a monogram on premium fabric at the Dubai Mall branch",
    imageSrc: "/images/services/service-embroidery.jpg",
    intro: [
      "Our embroidery service uses specialist machines and materials to deliver clean, professional results — whether you are looking for a personalised gift, a corporate uniform programme, or branded promotional wear.",
      "Embroidery is available exclusively at our Dubai Mall branch (Lower Ground Floor, next to P2 Cinema Parking). For enquiries: embroidery@stitchintime.me",
    ],
    groups: [
      {
        title: "Personalised Embroidery",
        items: [
          "Baby blankets, towels, and bathrobes",
          "Cushions, pillows, and table linens",
          "Scarves, gloves, and aprons",
          "His & hers gift sets and special occasion keepsakes",
        ],
      },
      {
        title: "Corporate Embroidery",
        items: [
          "Business shirts and uniforms",
          "Ties and formal wear",
          "Corporate apparel and workwear",
        ],
      },
      {
        title: "Promotional Embroidery",
        items: [
          "T-shirts and branded apparel",
          "Caps, hats, and sports team uniforms",
          "Club and organisation wear",
          "Patches, badges, and custom tags",
        ],
      },
      {
        title: "Logo Digitizing",
        items: [
          "All embroidery designs require digitizing prior to production. Please send your artwork to embroidery@stitchintime.me or bring your design on USB to our Dubai Mall branch for setup and quotation.",
        ],
      },
    ],
  },
  {
    slug: "business-services",
    index: "05",
    label: "Business Services",
    heading: "Tailoring Solutions for Businesses, Brands & Fashion Partners.",
    imageAlt:
      "Corporate uniform fitting session for a business team at a Stitch In Time location",
    imageSrc: "/images/services/service-business-services.jpg",
    intro: [
      "Stitch In Time works with fashion retailers, corporate clients, and hospitality businesses across the UAE to provide reliable, high-quality alteration and uniform services at scale. We offer dedicated account management, group fittings, and on-site visits — ensuring your team always presents at its best.",
    ],
    groups: [
      {
        title: "Fashion Partner Accounts",
        items: [
          "Professional garment pinning guidance for in-store teams",
          "In-store or on-site tailoring support",
          "Staff training on correct fitting techniques",
          "On-demand alteration services for customer purchases",
          "Home or store visits upon request",
        ],
        note: "To enquire about a Fashion Partner Account, contact us at 800-ALTER.",
      },
      {
        title: "Corporate Uniform Services",
        items: [
          "Group fittings for teams and staff — in-store or on-site",
          "Pick-up and delivery service for bulk orders",
          "Dedicated corporate account management",
          "Access to all 11 UAE mall locations",
          "Consistent quality backed by our workmanship guarantee",
          "Experienced tailoring specialists with over 15 years of expertise",
        ],
        note: "To set up a Corporate Account, contact us at 800-ALTER.",
      },
    ],
  },
];

export interface ExpressService {
  heading: string;
  copy: string;
  points: string[];
  closing: string;
}

export const EXPRESS_SERVICE: ExpressService = {
  heading: "Need It Urgently? We Can Help.",
  copy: "Our express alteration service is available for urgent requests, subject to garment type and store capacity. Simple alterations can often be completed within one hour of drop-off. More complex garments are typically ready within 24 hours.",
  points: [
    "50% surcharge on standard pricing",
    "One-hour turnaround for simple alterations where possible",
    "24-hour turnaround for more complex garments",
    "Timing subject to garment type and time of drop-off",
  ],
  closing: "Quality and finish are never compromised under express turnaround.",
};
