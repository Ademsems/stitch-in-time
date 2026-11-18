import { SERVICES, EXPRESS_SERVICE } from "@/data/services";
import { resolveImageSrc } from "@/lib/resolveImage";
import type { ShowcaseItem } from "@/components/sections/ServicesShowcase";

/** Price chip copy per service (from the approved pricing in the content doc). */
const PRICE: Record<string, string> = {
  alterations: "From AED 40",
  "repairs-restoration": "From AED 20",
  "custom-tailoring": "From AED 200",
  embroidery: "Dubai Mall",
  "business-services": "800-ALTER",
};

/** Server-side: resolves each image path (placeholder when the file is missing). */
export function showcaseItems(): ShowcaseItem[] {
  const items: ShowcaseItem[] = SERVICES.map((s) => ({
    slug: s.slug,
    index: s.index,
    title: s.label,
    blurb: s.intro[0],
    price: PRICE[s.slug] ?? "Enquire",
    href: `/services#${s.slug}`,
    imageSrc: resolveImageSrc(s.imageSrc),
    imageAlt: s.imageAlt,
  }));
  items.push({
    slug: "express",
    index: "06",
    title: "Express Service",
    blurb: EXPRESS_SERVICE.copy,
    price: "+50% · 1 hour",
    href: "/services#express",
    imageSrc: resolveImageSrc("/images/services/service-express.jpg"),
    imageAlt: "A tailor completing an urgent alteration under the express service",
  });
  return items;
}
