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
import { resolveImageSrc } from "@/lib/resolveImage";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { FindBranchButton } from "@/components/FindBranchButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, organizationSchema } from "@/lib/jsonld";

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
  { icon: Sparkles, text: "Premium materials as standard — Gutermann, Prym, Union Knopf" },
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

      {/* ———————————————————— Brand story ———————————————————— */}
      <section className="bg-cream">
        <div className="container py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Our Story</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-espresso md:text-6xl">
                Founded in 2008, on a <em className="italic">Simple Belief.</em>
              </h1>
              <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-ink/80">
                <p className="font-serif text-xl italic text-espresso/90">
                  Every garment deserves to fit the person wearing it.
                </p>
                <p>
                  What began as a specialist tailoring and alterations service has
                  grown, over 18 years, into one of the UAE&rsquo;s most trusted
                  names in clothing care — with 11 mall boutiques across Dubai and
                  Abu Dhabi, a growing home fitting service, and a client base that
                  keeps returning because of the quality they experience and the
                  confidence they leave with.
                </p>
                <p>
                  We work across all garment types and all occasions — from everyday
                  wardrobe adjustments to designer suit tailoring, bridal gown
                  fittings, and corporate uniform programmes. The level of care and
                  precision is the same regardless of the garment, the occasion, or
                  the price of the piece.
                </p>
                <p>
                  Our tailors use premium materials as standard. Gutermann thread
                  from Germany. Prym fastenings. Union Knopf buttons. These are not
                  premium upgrades — they are simply the materials we work with,
                  because we believe the quality inside a garment matters as much as
                  the quality anyone can see.
                </p>
                <p>
                  Over 18 years, we have become the trusted choice for thousands of
                  residents, families, professionals, and fashion brands across the
                  UAE. Our clients return not because we are the most visible, but
                  because we deliver on what we promise — a better fit, every time.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md ring-1 ring-taupe/60 lg:sticky lg:top-28">
                <SmartImage
                  src={resolveImageSrc("/images/about/about-atelier.jpg")}
                  alt="The Stitch In Time atelier — tailors at work in a Dubai boutique"
                  label="Atelier photography coming soon"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ———————————————————— Differentiators ———————————————————— */}
      <section className="section bg-taupe/25 border-y border-taupe/60">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Differentiators</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
              What Sets Us Apart.
            </h2>
            <div className="mx-auto mt-5 hairline" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal as="article" key={item.text} delay={(i % 4) * 0.06}>
                <div className="flex h-full flex-col rounded-md bg-cream/70 p-6 ring-1 ring-taupe/50">
                  <item.icon className="h-6 w-6 text-burgundy" />
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink/80">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————— Guarantees ———————————————————— */}
      <section id="guarantees" className="section scroll-mt-24 bg-cream">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <ShieldCheck className="mx-auto h-9 w-9 text-burgundy" />
            <p className="eyebrow mt-4">Our Guarantees</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
              Confidence, Built Into Every Order.
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-ink/75">
              Every alteration at Stitch In Time is backed in writing. Not
              satisfied? We re-adjust at no extra cost.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <Card className="h-full bg-cream">
                  <CardHeader>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                      <g.icon className="h-6 w-6" />
                    </span>
                    <CardTitle className="mt-3">{g.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {g.body.map((p) => (
                      <p key={p.slice(0, 20)} className="text-sm leading-relaxed text-ink/75">
                        {p}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Exclusions + Terms */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full border-burgundy/30 bg-burgundy/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <X className="h-5 w-5 text-burgundy" />
                    Important Exclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-ink/70">Our guarantees do not apply to:</p>
                  <ul className="space-y-2.5">
                    {EXCLUSIONS.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card className="h-full bg-cream">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-burgundy" />
                    Terms &amp; Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {TERMS.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy/70" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ———————————————————— About FAQs ———————————————————— */}
      <FaqSection faqs={faqs} heading="About Stitch In Time — FAQs" eyebrow="Good to Know" />

      {/* ———————————————————— CTA ———————————————————— */}
      <section className="section bg-espresso text-cream">
        <div className="container flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-cream">
              Experience the Difference.
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-lg leading-relaxed text-cream/80">
              Book a home fitting or visit any of our 11 mall boutiques across
              Dubai and Abu Dhabi.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <BookButton label="Book a Home Fitting" variant="cream" />
              <FindBranchButton variant="onDark" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
