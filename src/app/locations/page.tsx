import type { Metadata } from "next";
import { Check, MessageCircle, Mail, Phone, ScrollText } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { RiseHeading } from "@/components/fx/RiseHeading";
import { StripeBand } from "@/components/fx/StripeBand";
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
  { icon: MessageCircle, label: "WhatsApp — Dubai", value: CONTACT.whatsappDubaiDisplay, href: whatsappLink(CONTACT.whatsappDubai), external: true },
  { icon: MessageCircle, label: "WhatsApp — Abu Dhabi", value: CONTACT.whatsappAbuDhabiDisplay, href: whatsappLink(CONTACT.whatsappAbuDhabi), external: true },
  { icon: Mail, label: "Home Fitting Email", value: CONTACT.homeEmail, href: `mailto:${CONTACT.homeEmail}` },
  { icon: Mail, label: "Embroidery Enquiries", value: CONTACT.embroideryEmail, href: `mailto:${CONTACT.embroideryEmail}` },
  { icon: Phone, label: "General Enquiries", value: CONTACT.generalPhone, href: `tel:${CONTACT.generalPhoneDial}` },
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

      <section className="bg-ivory">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow hero-in" style={{ ["--d" as string]: "0.05s" }}>
              Our Locations
            </p>
            <RiseHeading className="mt-5 text-5xl leading-[1.02] md:text-7xl">
              11 mall boutiques across <em className="italic">Dubai &amp; Abu Dhabi.</em>
            </RiseHeading>
          </div>
          <div
            className="hero-in space-y-4 text-base leading-relaxed text-espresso/90"
            style={{ ["--d" as string]: "0.5s" }}
          >
            <p>
              Stitch In Time operates across 11 premium mall locations in Dubai and Abu Dhabi,
              making professional tailoring and clothing alterations accessible wherever you live,
              work, or shop.
            </p>
            <p>
              Every branch offers the full Stitch In Time service — expert alterations, clothing
              repairs, walk-in fittings, and professional tailoring advice — with consistent
              quality and the same workmanship guarantee across every location.
            </p>
            <p className="font-serif text-2xl leading-snug text-burgundy">
              Walk-ins are always welcome. No appointment needed for in-store alterations. Prefer
              the convenience of a home visit? Book our home fitting service and we will come to
              you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-20 md:pb-28">
        <div className="container">
          <LocationsExplorer />
        </div>
      </section>

      <section data-theme="dark" className="relative overflow-hidden bg-espresso text-ivory">
        <StripeBand tone="dark" />
        <div className="container section grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal variant="left">
            <p className="eyebrow">Consistent Everywhere</p>
            <h2 className="mt-4 text-4xl leading-[1.05] !text-ivory md:text-5xl">
              What every branch <em className="italic">offers.</em>
            </h2>
            <ul className="mt-8 space-y-4">
              {BRANCH_OFFERINGS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ivory/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <BookButton label="Book a Home Fitting" variant="onDark" />
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div className="rounded-md border border-ivory/20 p-8">
              <h3 className="font-serif text-3xl !text-ivory">Contact us directly</h3>
              <p className="mt-2 text-sm text-ivory/75">
                No contact form — just direct, click-to-action links.
              </p>
              <ul className="mt-6 divide-y divide-ivory/15">
                {CONTACTS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="flex min-h-14 items-center gap-4 py-3 transition-colors hover:text-sky"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/30">
                        <c.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-subheader text-[0.58rem] uppercase tracking-luxe text-sky">
                          {c.label}
                        </span>
                        <span className="block text-base text-ivory">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} heading="Visiting Us — Questions & Answers" eyebrow="Walk-ins & Coverage" />

      <section className="border-t border-burgundy/15 bg-cream">
        <div className="container flex items-center justify-center gap-3 py-7 text-center">
          <ScrollText className="h-4 w-4 text-burgundy" aria-hidden />
          <p className="text-sm text-espresso/80">
            Embroidery services are available exclusively at our Dubai Mall branch.
          </p>
        </div>
      </section>
    </>
  );
}
