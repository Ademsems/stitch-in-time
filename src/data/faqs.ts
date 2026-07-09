/**
 * FAQ entries — transcribed verbatim from the approved content document.
 *
 * Per the doc's guidance, entries are DISTRIBUTED across the most relevant
 * pages (not dumped on one page) to improve relevance for AI answer engines.
 * Each entry carries a `page` tag; pages render their own subset and emit a
 * matching FAQPage JSON-LD block.
 */

export type FaqPage = "home" | "services" | "locations" | "about";

export interface Faq {
  question: string;
  answer: string;
  page: FaqPage;
}

export const FAQS: Faq[] = [
  // ————— About (About page) —————
  {
    page: "about",
    question:
      "What makes Stitch In Time different from other tailoring services in the UAE?",
    answer:
      "Stitch In Time has operated across the UAE since 2008, giving us 18 years of experience in clothing alterations and garment care. We offer 11 mall locations in Dubai and Abu Dhabi, a home fitting service with no call-out fee, and a workmanship guarantee on every service. We use premium professional-grade materials — including Gutermann thread from Germany — as standard. Unlike many competitors, we back every alteration with a written guarantee: if the result is not right, we fix it at no extra cost.",
  },
  {
    page: "about",
    question: "How long has Stitch In Time been operating?",
    answer:
      "Stitch In Time was founded in 2008 and has been serving Dubai and Abu Dhabi residents for over 18 years. We operate 11 mall branches across the UAE.",
  },

  // ————— Alteration Services (Services page) —————
  {
    page: "services",
    question: "How long do clothing alterations take?",
    answer:
      "Most standard alterations are completed within 24 to 48 hours. More complex work — such as bridal gown alterations or detailed restyling — may take longer depending on the garment and current workload. Express service is available for urgent requests, with simple alterations often completed within one hour.",
  },
  {
    page: "services",
    question: "How much do clothing alterations cost in Dubai?",
    answer:
      "Alteration prices at Stitch In Time start from AED 40 for standard adjustments such as hemming trousers or tapering shirts. Suit and blazer tailoring starts from AED 120. Bridal and custom tailoring starts from AED 200. All pricing is confirmed with the customer before any work begins.",
  },
  {
    page: "services",
    question: "Can you alter designer or luxury garments?",
    answer:
      "Yes. Our tailors regularly work on designer, luxury, and delicate garments including high-end suits, evening gowns, and couture pieces. All high-value items are handled with specialist care and precision.",
  },
  {
    page: "services",
    question: "What garments can you alter?",
    answer:
      "We alter a full range of clothing including suits and blazers, dresses and gowns, trousers and jeans, shirts and tops, abayas and kanduras, bridal wear, school and corporate uniforms, and everyday casual wear. If it is wearable, we can almost always adjust it.",
  },
  {
    page: "services",
    question: "Can you repair clothing as well as alter it?",
    answer:
      "Yes. We offer a full repairs and restoration service including zip replacement (using premium YKK zippers), button fixing, tear and hole repair, seam repair, and general garment restoration. Repairs start from AED 20.",
  },
  {
    page: "services",
    question: "Do you offer express or same-day alterations in Dubai?",
    answer:
      "Yes. Our express service is available at all branches, subject to garment type and store capacity. Simple alterations can often be completed within one hour. A 50% surcharge on standard pricing applies for express service.",
  },
  {
    page: "services",
    question: "Do clothes need to be washed before alterations?",
    answer:
      "Yes. For hygiene and quality reasons, we ask that all garments be clean or dry-cleaned before being brought in for alteration or repair.",
  },

  // ————— Home Fitting Service (Home page) —————
  {
    page: "home",
    question: "Does Stitch In Time offer a home fitting service?",
    answer:
      "Yes. Our home fitting service is available across Dubai and Abu Dhabi. A professional tailor visits you at home for private fittings and measurements. There is no call-out fee, and a minimum order value of AED 300 applies. Your garments are then altered at our workshop and returned to you at a pre-agreed date and time.",
  },
  {
    page: "home",
    question: "How do I book a home fitting appointment?",
    answer:
      "You can book online through our website, via WhatsApp (Dubai: +971 56 522 6995 / Abu Dhabi: +971 56 630 2459), or by calling 800-ALTER.",
  },
  {
    page: "home",
    question: "What is your satisfaction guarantee?",
    answer:
      "If you are not fully satisfied with your alteration, we will re-adjust your garment at no additional cost. All hems are also covered for the lifetime of the garment under our hem guarantee. Claims must be submitted within four weeks of collection.",
  },

  // ————— Walk-ins & coverage (Locations page) —————
  {
    page: "locations",
    question: "Do I need an appointment for clothing alterations?",
    answer:
      "No appointment is needed. You can walk into any of our 11 branches in Dubai and Abu Dhabi during opening hours for fittings and alterations. Walk-ins are always welcome.",
  },
  {
    page: "locations",
    question: "Which areas do you cover for home fittings?",
    answer:
      "We cover all major areas across Dubai and Abu Dhabi. If you are in another emirate, contact us directly and we will advise on availability.",
  },
];

export function faqsFor(page: FaqPage): Faq[] {
  return FAQS.filter((f) => f.page === page);
}
