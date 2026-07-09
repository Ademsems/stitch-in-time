/**
 * Central site configuration — single source of truth for contact links,
 * the (placeholder) booking URL, and canonical metadata.
 */

export const SITE = {
  name: "Stitch In Time",
  descriptor: "Clothing Alterations",
  legalName: "Stitch In Time Tailoring LLC",
  // Canonical production URL — update to the live domain at launch.
  url: "https://www.stitchintime.me",
  established: 2008,
  locale: "en_AE",
  region: "Dubai & Abu Dhabi, UAE",
} as const;

/**
 * Booking destination.
 *
 * PLACEHOLDER: booking is currently a "coming soon" dialog (see BookingProvider).
 * When the client's 7jwzat booking page is live, set BOOKING_URL to that URL and
 * flip BOOKING_ENABLED to true — every "Book" CTA site-wide then opens it.
 * No other code changes required.
 */
export const BOOKING_URL = "https://7jwzat.com/"; // TODO: swap for the real 7jwzat booking page
export const BOOKING_ENABLED = false;

export const CONTACT = {
  whatsappDubai: "971565226995",
  whatsappDubaiDisplay: "+971 56 522 6995",
  whatsappAbuDhabi: "971566302459",
  whatsappAbuDhabiDisplay: "+971 56 630 2459",
  homeEmail: "home@stitchintime.me",
  embroideryEmail: "embroidery@stitchintime.me",
  generalPhone: "800-ALTER",
  generalPhoneDial: "80025837", // 800-ALTER
} as const;

export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
] as const;
