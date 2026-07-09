/**
 * JSON-LD structured data builders (Schema.org).
 * Emitted per page: Organization, LocalBusiness (one per branch),
 * Service, FAQPage, BreadcrumbList.
 */

import { SITE, CONTACT } from "@/lib/site";
import { BRANCHES, type Branch } from "@/data/branches";
import { SERVICES } from "@/data/services";
import type { Faq } from "@/data/faqs";

const ORG_ID = `${SITE.url}/#organization`;

/** Parse a doc-style hours line into schema OpeningHoursSpecification. */
function parseHours(branch: Branch) {
  const dayMap: Record<string, string> = {
    Sunday: "Sunday",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
  };
  const order = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const to24 = (t: string): string => {
    // "10am" -> "10:00", "11pm" -> "23:00", "12am" -> "00:00"
    const m = t.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (!m) return "00:00";
    let h = parseInt(m[1], 10);
    const min = m[2] ?? "00";
    const mer = m[3].toLowerCase();
    if (mer === "pm" && h !== 12) h += 12;
    if (mer === "am" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}`;
  };

  const specs: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[] = [];

  for (const line of branch.hours) {
    // e.g. "Sunday – Wednesday: 10am – 11pm" or "Thursday & Friday: 10am – 12am"
    const [daysPart, timePart] = line.split(":").map((s) => s.trim());
    if (!timePart) continue;
    const times = timePart.split(/[–—-]/).map((s) => s.trim());
    if (times.length < 2) continue;
    const opens = to24(times[0]);
    const closes = to24(times[1]);

    let days: string[] = [];
    if (daysPart.includes("&")) {
      days = daysPart.split("&").map((d) => dayMap[d.trim()]).filter(Boolean);
    } else {
      const range = daysPart.split(/[–—-]/).map((d) => d.trim());
      if (range.length === 2 && dayMap[range[0]] && dayMap[range[1]]) {
        const start = order.indexOf(range[0]);
        const end = order.indexOf(range[1]);
        if (start !== -1 && end !== -1) {
          for (let i = start; i <= end; i++) days.push(order[i]);
        }
      } else if (dayMap[daysPart]) {
        days = [dayMap[daysPart]];
      }
    }
    if (days.length) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens,
        closes,
      });
    }
  }
  return specs;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    foundingDate: String(SITE.established),
    description:
      "UAE clothing alterations and tailoring house offering alterations, repairs, custom tailoring, embroidery and a home fitting service across Dubai and Abu Dhabi.",
    areaServed: ["Dubai", "Abu Dhabi", "United Arab Emirates"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.generalPhone,
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [] as string[], // PLACEHOLDER — add client social profile URLs.
  };
}

export function localBusinessSchema(branch: Branch) {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${SITE.url}/locations#${branch.slug}`,
    name: `${SITE.name} — ${branch.name}`,
    parentOrganization: { "@id": ORG_ID },
    image: `${SITE.url}/placeholders/storefront.svg`,
    url: `${SITE.url}/locations`,
    telephone: branch.phone,
    priceRange: "AED 20 – AED 200+",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.emirate,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.lat,
      longitude: branch.lng,
    },
    openingHoursSpecification: parseHours(branch),
    areaServed: branch.emirate,
  };
}

export function allBranchesSchema() {
  return BRANCHES.map(localBusinessSchema);
}

export function serviceSchema() {
  return SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.label,
    serviceType: s.heading,
    provider: { "@id": ORG_ID },
    areaServed: ["Dubai", "Abu Dhabi"],
    description: s.intro[0],
  }));
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
