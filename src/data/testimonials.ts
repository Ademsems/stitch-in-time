/**
 * Customer testimonials. INTENTIONALLY EMPTY — the testimonials section only
 * renders when this array has real entries. Never invent reviews.
 *
 * To launch: add 3–5 genuine entries (first name, location, service type),
 * sourced from WhatsApp feedback, Google reviews or direct outreach.
 */
export interface Testimonial {
  quote: string;
  name: string; // first name only
  location: string; // e.g. "Dubai Marina"
  service: string; // e.g. "Bridal alterations"
}

export const TESTIMONIALS: Testimonial[] = [];
