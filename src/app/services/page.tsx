import type { Metadata } from "next";
import { Check, Zap, ArrowRight } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";
import { SERVICES, EXPRESS_SERVICE } from "@/data/services";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tailoring & Alteration Services in Dubai & Abu Dhabi",
  description:
    "From hemming and repairs to bridal alterations, embroidery, and corporate uniforms — Stitch In Time offers expert tailoring services across 11 UAE locations. Prices from AED 40.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Tailoring & Alteration Services in Dubai & Abu Dhabi | Stitch In Time",
    description:
      "Expert alterations, repairs, custom tailoring, embroidery, and business services across Dubai and Abu Dhabi. Prices from AED 40.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const faqs = faqsFor("services");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...serviceSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* ———————————————————— Page intro ———————————————————— */}
      <section className="bg-espresso text-cream">
        <div className="container py-24 md:py-32">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-cream/70">Our Services</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-cream md:text-6xl">
              Professional Tailoring &amp; Alterations{" "}
              <em className="italic">Across the UAE.</em>
            </h1>
            <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-cream/85 md:text-lg">
              <p>
                Whether you need a simple hem, a full suit re-fit, a bridal gown
                adjusted for the perfect silhouette, or a company uniform programme
                managed end to end — Stitch In Time has the expertise, the
                equipment, and the team to deliver.
              </p>
              <p>
                We offer a full range of tailoring and alteration services from our
                11 mall boutiques in Dubai and Abu Dhabi, and through our convenient
                home fitting service. All pricing is confirmed before any work
                begins, and every service is backed by our workmanship guarantee.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton label="Book Appointment" variant="cream" />
              <a
                href={`https://wa.me/${CONTACT.whatsappDubai}?text=${encodeURIComponent(
                  "Hello Stitch In Time, I'd like a quick quote."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-sm border border-cream/40 px-8 text-base text-cream transition-colors hover:bg-cream hover:text-espresso"
              >
                Send a photo for a quick quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Service sections (alternating) ———————————————————— */}
      {SERVICES.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "section scroll-mt-24",
              i % 2 === 0 ? "bg-cream" : "bg-taupe/20"
            )}
          >
            <div className="container">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Copy */}
                <Reveal className={cn(flip && "lg:order-2")}>
                  <p className="eyebrow">
                    {service.index} · {service.label}
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
                    {service.heading}
                  </h2>
                  <div className="mt-5 space-y-4 font-sans text-base leading-relaxed text-ink/80">
                    {service.intro.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-8 space-y-7">
                    {service.groups?.map((group) => (
                      <div key={group.title}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-taupe/70 pb-2">
                          <h3 className="font-serif text-xl text-espresso">
                            {group.title}
                          </h3>
                          {group.price && (
                            <span className="rounded-full bg-burgundy/10 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wide text-burgundy">
                              {group.price}
                            </span>
                          )}
                        </div>
                        <ul className="mt-3 space-y-2">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-ink/80"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {group.note && (
                          <p className="mt-3 font-sans text-sm italic leading-relaxed text-ink/60">
                            {group.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <BookButton label="Book Appointment" size="default" />
                  </div>
                </Reveal>

                {/* Image */}
                <Reveal
                  delay={0.1}
                  className={cn("lg:sticky lg:top-28", flip && "lg:order-1")}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md ring-1 ring-taupe/60">
                    <SmartImage
                      src={null}
                      alt={service.imageAlt}
                      label="Image coming soon"
                      wrapperClassName="h-full w-full"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ———————————————————— Express service (burgundy break) ———————————————————— */}
      <section id="express" className="section scroll-mt-24 bg-burgundy text-cream">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <Zap className="h-9 w-9 text-cream/90" />
              <p className="eyebrow mt-5 text-cream/70">Express Alteration Service</p>
              <h2 className="mt-3 text-3xl md:text-4xl text-cream">
                {EXPRESS_SERVICE.heading}
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-cream/85">
                {EXPRESS_SERVICE.copy}
              </p>
              <p className="mt-6 font-sans text-sm italic text-cream/75">
                {EXPRESS_SERVICE.closing}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-3 rounded-md border border-cream/25 bg-cream/5 p-7">
                {EXPRESS_SERVICE.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-sans text-sm leading-relaxed text-cream/90"
                  >
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-cream/70" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <BookButton label="Book Express Service" variant="cream" size="default" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ———————————————————— Services FAQs ———————————————————— */}
      <FaqSection faqs={faqs} heading="Alterations & Services — FAQs" eyebrow="Good to Know" />
    </>
  );
}
