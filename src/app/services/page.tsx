import type { Metadata } from "next";
import { Check, Zap } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { RiseHeading } from "@/components/fx/RiseHeading";
import { StripeBand } from "@/components/fx/StripeBand";
import { BookButton } from "@/components/BookButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ClosingCta } from "@/components/sections/HomeSections";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES, EXPRESS_SERVICE } from "@/data/services";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { CONTACT, whatsappLink } from "@/lib/site";
import { resolveImageSrc } from "@/lib/resolveImage";

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

      {/* ———— Intro ———— */}
      <section data-theme="dark" className="relative overflow-hidden bg-burgundy text-ivory">
        <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-32">
          <div>
            <p className="eyebrow hero-in" style={{ ["--d" as string]: "0.05s" }}>
              Our Services
            </p>
            <RiseHeading className="mt-5 text-5xl leading-[1.02] !text-ivory md:text-7xl"
            >
              Professional tailoring &amp; alterations <em className="italic">across the UAE.</em>
            </RiseHeading>
          </div>
          <div
            className="hero-in space-y-5 text-base leading-relaxed text-ivory/85 md:text-lg"
            style={{ ["--d" as string]: "0.5s" }}
          >
            <p>
              Whether you need a simple hem, a full suit re-fit, a bridal gown adjusted for the
              perfect silhouette, or a company uniform programme managed end to end — Stitch In
              Time has the expertise, the equipment, and the team to deliver.
            </p>
            <p>
              We offer a full range of tailoring and alteration services from our 11 mall boutiques
              in Dubai and Abu Dhabi, and through our convenient home fitting service. All pricing
              is confirmed before any work begins, and every service is backed by our workmanship
              guarantee.
            </p>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <BookButton label="Book Appointment" variant="onDark" />
              <Button asChild variant="outlineDark" size="lg">
                <a
                  href={whatsappLink(
                    CONTACT.whatsappDubai,
                    "Hello Stitch In Time, I'd like a quick quote."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send a photo for a quote
                </a>
              </Button>
            </div>
          </div>
        </div>
        <StripeBand tone="dark" />
      </section>

      {/* ———— Sticky service index ———— */}
      <nav
        aria-label="Services"
        className="sticky top-[78px] z-30 border-b border-burgundy/10 bg-ivory"
      >
        <ul className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[...SERVICES.map((s) => ({ slug: s.slug, label: s.label })), { slug: "express", label: "Express" }].map(
            (s) => (
              <li key={s.slug} className="shrink-0">
                <a
                  href={`#${s.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-burgundy/25 px-5 font-subheader text-[0.66rem] uppercase tracking-wide2 text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"
                >
                  {s.label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* ———— Service sections ———— */}
      {SERVICES.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn("section scroll-mt-32", i % 2 === 0 ? "bg-ivory" : "bg-cream")}
          >
            <div className="container">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal variant={flip ? "right" : "left"} className={cn(flip && "lg:order-2")}>
                  <p className="eyebrow">
                    {service.index} · {service.label}
                  </p>
                  <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{service.heading}</h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-espresso/90">
                    {service.intro.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-10 space-y-9">
                    {service.groups?.map((group) => (
                      <div key={group.title}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-burgundy/25 pb-3">
                          <h3 className="font-serif text-2xl">{group.title}</h3>
                          {group.price && (
                            <span className="rounded-full bg-burgundy px-3.5 py-1 font-subheader text-[0.62rem] uppercase tracking-wide2 text-ivory">
                              {group.price}
                            </span>
                          )}
                        </div>
                        <ul className="mt-4 space-y-2.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm leading-relaxed text-espresso/90"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {group.note && (
                          <p className="mt-4 text-sm italic leading-relaxed text-espresso/70">
                            {group.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <BookButton label="Book Appointment" size="default" />
                  </div>
                </Reveal>

                <Reveal
                  variant="mask"
                  delay={0.1}
                  className={cn("lg:sticky lg:top-44", flip && "lg:order-1")}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] ring-1 ring-burgundy/15">
                    <SmartImage
                      src={resolveImageSrc(service.imageSrc)}
                      alt={service.imageAlt}
                      label={service.label}
                      sizes="(max-width: 1024px) 90vw, 560px"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ———— Express ———— */}
      <section
        id="express"
        data-theme="dark"
        className="section scroll-mt-32 overflow-hidden bg-espresso text-ivory"
      >
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal variant="left">
            <Zap className="h-9 w-9 text-sky" aria-hidden />
            <p className="eyebrow mt-5">Express Alteration Service</p>
            <h2 className="mt-4 text-4xl leading-[1.05] !text-ivory md:text-5xl">
              {EXPRESS_SERVICE.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/85">{EXPRESS_SERVICE.copy}</p>
            <p className="mt-6 font-serif text-xl italic text-ivory">{EXPRESS_SERVICE.closing}</p>
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <ul className="space-y-4 rounded-md border border-ivory/20 p-8">
              {EXPRESS_SERVICE.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ivory/90">
                  <span aria-hidden className="mt-2 block h-px w-5 shrink-0 bg-sky" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <BookButton label="Book Express Service" variant="onDark" />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} heading="Alterations & Services — FAQs" eyebrow="Good to Know" />
      <ClosingCta heading="Let’s find the right fit." />
    </>
  );
}
