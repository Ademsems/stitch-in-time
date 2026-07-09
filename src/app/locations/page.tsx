import type { Metadata } from "next";
import {
  Check,
  MessageCircle,
  Mail,
  Phone,
  ScrollText,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { LocationsExplorer } from "@/components/locations/LocationsExplorer";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, allBranchesSchema } from "@/lib/jsonld";
import { CONTACT, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stitch In Time Locations — Dubai & Abu Dhabi Mall Branches",
  description:
    "Find your nearest Stitch In Time tailoring branch. 11 locations across Dubai and Abu Dhabi — including Dubai Mall, Dubai Hills, Dubai Marina, Yas Mall, and more. Walk-ins welcome.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Our Locations — Dubai & Abu Dhabi Mall Branches | Stitch In Time",
    description:
      "11 premium mall locations across Dubai and Abu Dhabi. Interactive map, opening hours, and directions. Walk-ins always welcome.",
    url: "/locations",
  },
};

const BRANCH_OFFERINGS = [
  "Expert clothing alterations and repairs",
  "Walk-in fitting services — no appointment needed",
  "Professional tailoring advice",
  "Express service available",
  "Workmanship guarantee on all services",
];

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp — Dubai",
    value: CONTACT.whatsappDubaiDisplay,
    href: whatsappLink(CONTACT.whatsappDubai),
    external: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp — Abu Dhabi",
    value: CONTACT.whatsappAbuDhabiDisplay,
    href: whatsappLink(CONTACT.whatsappAbuDhabi),
    external: true,
  },
  {
    icon: Mail,
    label: "Home Fitting Email",
    value: CONTACT.homeEmail,
    href: `mailto:${CONTACT.homeEmail}`,
  },
  {
    icon: Mail,
    label: "Embroidery Enquiries",
    value: CONTACT.embroideryEmail,
    href: `mailto:${CONTACT.embroideryEmail}`,
  },
  {
    icon: Phone,
    label: "General Enquiries",
    value: CONTACT.generalPhone,
    href: `tel:${CONTACT.generalPhoneDial}`,
  },
];

export default function LocationsPage() {
  const faqs = faqsFor("locations");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]),
          ...allBranchesSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* ———————————————————— Intro ———————————————————— */}
      <section className="bg-cream">
        <div className="container py-20 md:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Our Locations</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-espresso md:text-6xl">
              11 Mall Boutiques Across{" "}
              <em className="italic">Dubai &amp; Abu Dhabi.</em>
            </h1>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-ink/80">
              <p>
                Stitch In Time operates across 11 premium mall locations in Dubai
                and Abu Dhabi, making professional tailoring and clothing
                alterations accessible wherever you live, work, or shop.
              </p>
              <p>
                Every branch offers the full Stitch In Time service — expert
                alterations, clothing repairs, walk-in fittings, and professional
                tailoring advice — with consistent quality and the same
                workmanship guarantee across every location.
              </p>
              <p className="font-medium text-espresso">
                Walk-ins are always welcome. No appointment needed for in-store
                alterations. Prefer the convenience of a home visit? Book our home
                fitting service and we will come to you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Map + synced list ———————————————————— */}
      <section className="bg-cream pb-20">
        <div className="container">
          <LocationsExplorer />
        </div>
      </section>

      {/* ———————————————————— What every branch offers ———————————————————— */}
      <section className="section bg-espresso text-cream">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-cream/70">Consistent Everywhere</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-cream">
              What Every Branch Offers
            </h2>
            <ul className="mt-8 space-y-4">
              {BRANCH_OFFERINGS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
                  <span className="font-sans text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <BookButton label="Book a Home Fitting" variant="cream" />
            </div>
          </Reveal>

          {/* Contact directly */}
          <Reveal delay={0.1}>
            <div className="rounded-md border border-cream/20 bg-cream/5 p-8">
              <h3 className="font-serif text-2xl text-cream">Contact Us Directly</h3>
              <p className="mt-2 font-sans text-sm text-cream/70">
                No contact form — just direct, click-to-action links.
              </p>
              <ul className="mt-6 divide-y divide-cream/10">
                {CONTACTS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 py-3.5 transition-colors hover:text-cream"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream/80">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-subheader text-xs uppercase tracking-wide text-cream/55">
                          {c.label}
                        </span>
                        <span className="block font-sans text-base text-cream/90">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Locations FAQs ———————————————————— */}
      <FaqSection faqs={faqs} heading="Visiting Us — Questions & Answers" eyebrow="Walk-ins & Coverage" />

      {/* Small footnote about embroidery exclusivity */}
      <section className="border-t border-taupe/60 bg-taupe/20">
        <div className="container flex items-center justify-center gap-3 py-6 text-center">
          <ScrollText className="h-4 w-4 text-burgundy" />
          <p className="font-sans text-sm text-ink/70">
            Embroidery services are available exclusively at our Dubai Mall branch.
          </p>
        </div>
      </section>
    </>
  );
}
