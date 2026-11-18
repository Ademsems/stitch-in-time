import type { Metadata } from "next";
import {
  ShieldCheck,
  Scissors,
  Ruler,
  Award,
  Sparkles,
  MapPin,
  Home as HomeIcon,
  Gem,
  Zap,
  Building2,
  Check,
  X,
} from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { RiseHeading } from "@/components/fx/RiseHeading";
import { StripeBand } from "@/components/fx/StripeBand";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Values } from "@/components/sections/Values";
import { PillarCircles } from "@/components/sections/StoryPillars";
import { ClosingCta } from "@/components/sections/HomeSections";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, organizationSchema } from "@/lib/jsonld";
import { resolveImageSrc } from "@/lib/resolveImage";
import { BRAND_STORY, MISSION, VISION, POSITIONING } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Stitch In Time | Tailoring & Alterations UAE Since 2008",
  description:
    "Stitch In Time has been the UAE's trusted tailoring and alterations specialist since 2008. 11 mall locations in Dubai and Abu Dhabi. Expert craftsmanship, premium materials, and a guaranteed finish.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Stitch In Time | Tailoring & Alterations UAE Since 2008",
    description:
      "The UAE's trusted tailoring and alterations specialist since 2008 — 11 mall locations, premium materials, and a full workmanship guarantee.",
    url: "/about",
  },
};

const DIFFERENTIATORS = [
  { icon: Award, text: "18 years of expertise in tailoring and garment care across the UAE" },
  { icon: MapPin, text: "11 premium mall locations — the largest network of its kind in Dubai and Abu Dhabi" },
  { icon: HomeIcon, text: "Home fitting service with no call-out fee — professional tailoring at your door" },
  { icon: Sparkles, text: "Premium materials as standard — Gütermann, Prym, Union Knopf" },
  { icon: Gem, text: "Experienced in high-end, designer, and luxury garment alterations" },
  { icon: ShieldCheck, text: "Full workmanship guarantee on every service" },
  { icon: Zap, text: "Express service available for urgent alterations" },
  { icon: Building2, text: "Corporate and fashion industry accounts — tailored B2B solutions" },
];

const GUARANTEES = [
  {
    icon: Scissors,
    title: "Alteration Guarantee",
    body: [
      "If you are not fully satisfied with your alteration, we will re-adjust your garment at no additional cost.",
      "This guarantee applies to garments that have been properly pinned and measured by our team prior to work commencing.",
    ],
  },
  {
    icon: Ruler,
    title: "Hem Guarantee",
    body: [
      "All hems completed by Stitch In Time are covered for the lifetime of the garment.",
      "If a hem becomes undone under normal wear, we will repair it free of charge. This does not include damage caused by excessive wear, misuse, or external force. Items must be returned to the original branch for guarantee to apply.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Garment Care Guarantee",
    body: [
      "In the rare event that a garment is damaged as a result of our workmanship, we take full responsibility.",
      "Compensation will be provided based on the original receipt value, or fair market value where a receipt is unavailable. In such cases, the garment remains with us for assessment. All claims must be submitted within four weeks of collection.",
    ],
  },
];

const EXCLUSIONS = [
  "Garments not measured or pinned by our team",
  "Size changes requested after the fitting process is complete",
  "Wear and tear from use or improper handling",
  "Manufacturer defects present in the garment prior to alteration",
];

const TERMS = [
  "All garments must be clean and ready for fitting upon presentation",
  "Alterations are confirmed and pinned by our trained staff, and approved by the customer before work begins",
  "Stitch In Time is not liable for issues arising from pre-existing garment conditions or alterations carried out against professional advice",
  "Full payment is required prior to completion of services",
  "Turnaround times are estimates and may vary depending on garment type and current workload",
  "Promotional vouchers must be presented before order confirmation and cannot be combined with other offers",
  "For home fitting services, a minimum order value of AED 300 applies. Cancellation or no-show fees may apply",
  "Uncollected garments after six months may be donated to charity, following reasonable attempts to contact the customer",
  "Customers are responsible for collecting completed garments within the agreed timeframe",
  "All non-alteration product returns must be unused, in original packaging, and returned within 30 days with receipt",
];

export default function AboutPage() {
  const faqs = faqsFor("about");

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* ———— Brand story ———— */}
      <section className="bg-ivory">
        <div className="container grid items-start gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow hero-in" style={{ ["--d" as string]: "0.05s" }}>
              Our Story
            </p>
            <RiseHeading className="mt-5 text-5xl leading-[1.02] md:text-7xl">
              Founded in 2008, on a <em className="italic">simple belief.</em>
            </RiseHeading>
            <div
              className="hero-in mt-8 space-y-5 text-base leading-relaxed text-espresso/90"
              style={{ ["--d" as string]: "0.5s" }}
            >
              <p className="font-serif text-3xl leading-snug text-burgundy">
                Every garment deserves to fit the person wearing it.
              </p>
              <p>{BRAND_STORY}</p>
            </div>
          </div>
          <div className="hero-circle lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] ring-1 ring-burgundy/15">
              <SmartImage
                src={resolveImageSrc("/images/about/about-atelier.jpg")}
                alt="Spools of Gütermann thread in cream, taupe, espresso, burgundy and sky blue — the materials at the heart of Stitch In Time"
                label="Atelier photography"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ———— Mission & vision ———— */}
      <section data-theme="dark" className="relative overflow-hidden bg-burgundy text-ivory">
        <StripeBand tone="dark" />
        <div className="container section grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal variant="left">
            <p className="eyebrow">Mission</p>
            <p className="mt-5 font-serif text-3xl leading-snug text-ivory md:text-4xl">{MISSION}</p>
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <p className="eyebrow">Vision</p>
            <p className="mt-5 font-serif text-3xl leading-snug text-ivory md:text-4xl">{VISION}</p>
          </Reveal>
        </div>
      </section>

      <Values tone="cream" />

      {/* ———— Pillars ———— */}
      <section className="section bg-ivory">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">Our Pillars</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-6xl">
              The four pillars of <em className="italic">our craft.</em>
            </SplitHeading>
          </div>
          <PillarCircles className="mt-14 lg:mt-20" />
        </div>
      </section>

      {/* ———— Positioning ———— */}
      <section data-theme="dark" className="section bg-ink text-ivory">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow">Positioning</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-serif text-[1.7rem] leading-snug text-ivory md:text-4xl">
              {POSITIONING}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ———— Differentiators ———— */}
      <section className="section bg-cream">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">Our Differentiators</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-6xl">
              What sets us <em className="italic">apart.</em>
            </SplitHeading>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal as="li" key={item.text} delay={(i % 4) * 0.07}>
                <div className="flex h-full flex-col rounded-md bg-ivory p-7 ring-1 ring-burgundy/10 transition-shadow duration-500 hover:shadow-[0_18px_40px_-26px_rgb(var(--burgundy)/0.6)]">
                  <item.icon className="h-7 w-7 text-burgundy" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-espresso/90">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ———— Guarantees ———— */}
      <section id="guarantees" className="section scroll-mt-28 bg-ivory">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <ShieldCheck className="mx-auto h-9 w-9 text-burgundy" aria-hidden />
              <p className="eyebrow mt-4">Our Guarantees</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-6xl">
              Confidence, built into <em className="italic">every order.</em>
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-espresso/85">
                Every alteration at Stitch In Time is backed in writing. Not satisfied? We
                re-adjust at no extra cost.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {GUARANTEES.map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 0.08}>
                <div className="h-full rounded-md border border-burgundy/15 bg-cream p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-ivory">
                    <g.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-3xl">{g.title}</h3>
                  <div className="mt-4 space-y-3">
                    {g.body.map((p) => (
                      <p key={p.slice(0, 20)} className="text-sm leading-relaxed text-espresso/90">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-md border border-burgundy/30 bg-burgundy/[0.04] p-8">
                <h3 className="flex items-center gap-2 font-serif text-3xl">
                  <X className="h-5 w-5 text-burgundy" aria-hidden />
                  Important Exclusions
                </h3>
                <p className="mb-4 mt-3 text-sm text-espresso/80">Our guarantees do not apply to:</p>
                <ul className="space-y-3">
                  {EXCLUSIONS.map((e) => (
                    <li
                      key={e}
                      className="flex items-start gap-3 text-sm leading-relaxed text-espresso/90"
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-md border border-burgundy/15 bg-ivory p-8">
                <h3 className="flex items-center gap-2 font-serif text-3xl">
                  <Check className="h-5 w-5 text-burgundy" aria-hidden />
                  Terms &amp; Conditions
                </h3>
                <ul className="mt-5 space-y-3">
                  {TERMS.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm leading-relaxed text-espresso/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} heading="About Stitch In Time — FAQs" eyebrow="Good to Know" tone="cream" />

      <ClosingCta heading="Experience the difference.">
        Book a home fitting or visit any of our 11 mall boutiques across Dubai and Abu Dhabi.
      </ClosingCta>
    </>
  );
}
