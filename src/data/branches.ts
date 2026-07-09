/**
 * Branch directory — single source of truth for the Locations page, the
 * Leaflet map, the footer summary, and per-branch LocalBusiness JSON-LD.
 *
 * Data transcribed verbatim from the approved content document.
 * Coordinates are approximate mall-centre points (no geocoding API needed).
 *
 * NOTE ON COUNT: The approved brand copy states "11 locations". The content
 * document details 10 branches (6 Dubai + 4 Abu Dhabi — its "Abu Dhabi — 5
 * Locations" heading lists only 4). We do NOT invent a fake 11th branch's
 * address/phone. Adding the 11th is a single new entry below once its details
 * are supplied by the client.
 */

export type Emirate = "Dubai" | "Abu Dhabi";

export interface Branch {
  slug: string;
  name: string;
  emirate: Emirate;
  address: string;
  /** Human-readable opening hours lines (verbatim from the doc). */
  hours: string[];
  phone: string; // display + tel-friendly
  lat: number;
  lng: number;
  /** True for the Dubai Mall branch, the only location offering embroidery. */
  embroidery?: boolean;
  /** Short note shown on the card, if any. */
  note?: string;
}

export const BRANCHES: Branch[] = [
  // ————————————————————————— Dubai (6) —————————————————————————
  {
    slug: "dubai-mall",
    name: "Dubai Mall",
    emirate: "Dubai",
    address: "Lower Ground Floor — Next to P2 Cinema Parking Entrance, Downtown Dubai",
    hours: ["Sunday – Wednesday: 10am – 11pm", "Thursday – Saturday: 10am – 12am"],
    phone: "+971 4 339 8996",
    lat: 25.1972,
    lng: 55.2795,
    embroidery: true,
    note: "Embroidery services are available exclusively at this location.",
  },
  {
    slug: "dubai-hills-mall",
    name: "Dubai Hills Mall",
    emirate: "Dubai",
    address: "Ground Floor — Nearest Parking: P2 Fashion, Dubai Hills Estate",
    hours: ["Sunday – Wednesday: 10am – 11pm", "Thursday – Saturday: 10am – 12am"],
    phone: "+971 4 282 7776",
    lat: 25.1032,
    lng: 55.2483,
  },
  {
    slug: "dubai-marina-mall",
    name: "Dubai Marina Mall",
    emirate: "Dubai",
    address: "Promenade Level 1 — Across from Waitrose Supermarket, Dubai Marina",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday – Friday: 10am – 12pm"],
    phone: "+971 4 379 0977",
    lat: 25.0772,
    lng: 55.1403,
  },
  {
    slug: "dubai-festival-city-mall",
    name: "Dubai Festival City Mall",
    emirate: "Dubai",
    address: "Ground Floor — Across from CentrePoint Department Store, Festival City",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday – Friday: 10am – 12am"],
    phone: "+971 4 271 0055",
    lat: 25.2216,
    lng: 55.3529,
  },
  {
    slug: "city-centre-mirdif",
    name: "City Centre Mirdif",
    emirate: "Dubai",
    address:
      "Level 2 — Parking Entrance C, Next to Vox Cinema, Sheikh Mohammed Bin Zayed Road, Dubai",
    hours: ["Sunday – Wednesday: 10am – 10pm", "Thursday – Saturday: 10am – 12am"],
    phone: "+971 4 398 0097",
    lat: 25.2174,
    lng: 55.4088,
  },
  {
    slug: "palm-jumeirah-mall",
    name: "Palm Jumeirah Mall",
    emirate: "Dubai",
    address: "Lower Ground Floor — Nakheel Mall, Palm Jumeirah",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday & Friday: 10am – 12am"],
    phone: "+971 4 584 5102",
    lat: 25.1127,
    lng: 55.1385,
  },

  // ———————————————————————— Abu Dhabi (4) ————————————————————————
  {
    slug: "the-mall-world-trade-center",
    name: "The Mall at World Trade Center",
    emirate: "Abu Dhabi",
    address:
      "Lower Ground Floor — Khalifa Bin Zayed The First Street, Al Markaziyah, Abu Dhabi",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday – Friday: 10am – 11pm"],
    phone: "+971 2 677 0897",
    lat: 24.4936,
    lng: 54.3707,
  },
  {
    slug: "yas-mall",
    name: "Yas Mall",
    emirate: "Abu Dhabi",
    address: "Lower Ground Floor — Yas West, Yas Island, Abu Dhabi",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday & Friday: 10am – 12am"],
    phone: "+971 2 563 3430",
    lat: 24.4875,
    lng: 54.6069,
  },
  {
    slug: "my-city-centre-masdar",
    name: "My City Centre Masdar",
    emirate: "Abu Dhabi",
    address: "Ground Floor — Across from Carrefour, Masdar City, Abu Dhabi",
    hours: ["Sunday – Wednesday: 10am – 10pm", "Thursday – Saturday: 10am – 12am"],
    phone: "+971 2 444 1970",
    lat: 24.427,
    lng: 54.6169,
  },
  {
    slug: "the-galleria-al-maryah",
    name: "The Galleria Al Maryah Island",
    emirate: "Abu Dhabi",
    address:
      "Lower Ground Floor — Across from Waitrose, Next to Section B Parking, 107 Hamouda Bin Ali Al Dhaheri Street, Al Maryah Island",
    hours: ["Saturday – Wednesday: 10am – 10pm", "Thursday & Friday: 10am – 12am"],
    phone: "+971 2 445 2349",
    lat: 24.4993,
    lng: 54.3852,
  },
];

export const DUBAI_BRANCHES = BRANCHES.filter((b) => b.emirate === "Dubai");
export const ABU_DHABI_BRANCHES = BRANCHES.filter((b) => b.emirate === "Abu Dhabi");

/** Google Maps directions deep-link (opens in a new tab). */
export function directionsUrl(branch: Pick<Branch, "lat" | "lng">) {
  return `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;
}

/** Digits-only phone for tel: links. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
