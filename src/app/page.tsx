import type { Metadata } from "next";
import Link from "next/link";
import { resolveImageSrc } from "@/lib/resolveImage";
import {
  Scissors,
  Sparkles,
  Ruler,
  Home as HomeIcon,
  ShieldCheck,
  Gem,
  Building2,
  Heart,
  Palette,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { FindBranchButton } from "@/components/FindBranchButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { SERVICES } from "@/data/services";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Stitch In Time | Expert Clothing Alterations in Dubai & Abu Dhabi",
  description:
    "Professional clothing alterations, repairs, and home fitting service across 11 UAE mall locations. Trusted by Dubai and Abu Dhabi residents since 2008. Book your fitting online today.",
  alternates: { canonical: "/" },
};

const HIGHLIGHTS = [
  { icon: Scissors, label: "Clothing Alterations — From AED 40" },
  { icon: Sparkles, label: "Clothing Repairs & Restoration" },
  { icon: HomeIcon, label: "Home Fitting Service — No Call-Out Fee" },
  { icon: Heart, label: "Bridal & Occasion Wear" },
  { icon: Palette, label: "Embroidery — Personal, Corporate & Promotional" },
  { icon: Building2, label: "Corporate & Business Accounts" },
];

const TRUST_ITEMS = [
  "Serving the UAE since 2008",
  "11 Mall Locations",
  "Dubai & Abu Dhabi",
  "Gutermann Thread",
  "Workmanship Guarantee",
  "Express Service Available",
];

const PILLARS = [
  {
    icon: Gem,
    title: "Bespoke Atelier",
    copy: "Every garment handled with the care of a fashion house — from everyday staples to designer and luxury pieces.",
  },
  {
    icon: Sparkles,
    title: "Quiet Luxury",
    copy: "Refined, understated craftsmanship. Premium materials as standard, because the details you cannot see still matter.",
  },
  {
    icon: Ruler,
    title: "Precision & Craftsmanship",
    copy: "Measured by shape, not just size. Skilled tailors, professional-grade equipment, a clean finish every time.",
  },
  {
    icon: HomeIcon,
    title: "Premium Convenience",
    copy: "In-store across 11 mall boutiques, or at your door through our home fitting service — same standard, same guarantee.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Book Your Appointment",
    copy: "Choose a date, time, and location that works for you. Dubai and Abu Dhabi covered.",
  },
  {
    n: "02",
    title: "We Come to You",
    copy: "A professional tailor visits your home for private fittings and precise measurements.",
  },
  {
    n: "03",
    title: "We Alter Your Garments",
    copy: "Your clothing is expertly tailored in our workshop to the highest standard.",
  },
  {
    n: "04",
    title: "Perfect Fit, Delivered",
    copy: "Your garments are returned at an agreed date and time, ready to wear.",
  },
];

export default function HomePage() {
  const faqs = faqsFor("home");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          ...serviceSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* ———————————————————— Hero ———————————————————— */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={resolveImageSrc("/images/home/home-hero.jpg")}
            alt="Master tailor at Stitch In Time performing a precise clothing alteration in a Dubai atelier"
            priority
            label="Hero photography coming soon"
            monogram="SiT"
            wrapperClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/75 to-espresso/60" />
        </div>

        <div className="container py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-cream/80">Since 2008 · Dubai &amp; Abu Dhabi</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl">
              The Perfect Fit,
              <br />
              <em className="italic">Wherever You Are.</em>
            </h1>
            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-cream/85">
              Expert clothing alterations, repairs, and home fitting service —
              across 11 locations in Dubai and Abu Dhabi.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton label="Book a Home Fitting" />
              <FindBranchButton variant="onDark" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Intro / brand story ———————————————————— */}
      <section className="section bg-cream">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow">Our Craft</p>
            <div className="mx-auto mt-5 hairline" />
            <div className="mt-8 space-y-6 font-serif text-2xl font-light leading-relaxed text-espresso md:text-[1.7rem]">
              <p>
                At Stitch In Time, we believe that great clothing starts with a
                great fit. Since 2008, we have helped thousands of clients across
                the UAE look and feel their very best — from everyday alterations
                to bridal fittings, luxury garment care, and corporate uniform
                services.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 font-sans text-base leading-relaxed text-ink/80">
              <p>
                Our skilled tailors operate across 11 mall boutiques in Dubai and
                Abu Dhabi, and come directly to your door through our home fitting
                service — offering the same precision, the same premium materials,
                and the same guarantee, whether in-store or in your home.
              </p>
              <p>
                Every garment we touch is handled with care, craftsmanship, and a
                genuine commitment to quality. We use professional-grade materials,
                including Gutermann thread — one of the world&rsquo;s most trusted
                names in garment finishing — because the details matter.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Service highlights strip ———————————————————— */}
      <section className="border-y border-taupe/60 bg-taupe/25">
        <div className="container py-14">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05}>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-sans text-sm text-espresso">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————— Four value pillars ———————————————————— */}
      <section className="section bg-cream">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Stitch In Time</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
              A Tailoring House, Not a Counter.
            </h2>
            <div className="mx-auto mt-5 hairline" />
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <Reveal as="article" key={pillar.title} delay={i * 0.08}>
                <div className="flex h-full flex-col border-t-2 border-burgundy/70 pt-6">
                  <pillar.icon className="h-7 w-7 text-burgundy" />
                  <h3 className="mt-4 font-serif text-2xl text-espresso">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink/75">
                    {pillar.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————— How home fitting works (espresso break) ———————————————————— */}
      <section className="section bg-espresso text-cream">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-cream/70">Home Fitting Service</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-cream">
              How Our Home Fitting Service Works
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-cream/50" />
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.08}>
                <div className="relative">
                  {/* Sky blue on espresso: ~5.5:1 — WCAG AA. */}
                  <span className="font-serif text-5xl text-sky">{step.n}</span>
                  <h3 className="mt-3 font-serif text-xl text-cream">{step.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-cream/70">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-sm uppercase tracking-luxe text-cream/60">
              No call-out fee · Available across Dubai and Abu Dhabi
            </p>
            <BookButton label="Book a Home Fitting" variant="cream" />
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Services overview grid ———————————————————— */}
      <section className="section bg-cream">
        <div className="container">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">What We Do</p>
              <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
                Services for Every Garment &amp; Occasion.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide text-burgundy hover:text-espresso"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal as="article" key={service.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-taupe/70 bg-cream/60 transition-colors hover:border-burgundy/50"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <SmartImage
                      src={resolveImageSrc(service.imageSrc)}
                      alt={service.imageAlt}
                      label="Image coming soon"
                      wrapperClassName="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-2xl text-espresso group-hover:text-burgundy">
                      {service.label}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink/75">
                      {service.intro[0]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wide text-burgundy">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————— Guarantee (burgundy break) ———————————————————— */}
      <section className="section bg-burgundy text-cream">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ShieldCheck className="h-10 w-10 text-cream/90" />
            <h2 className="mt-6 text-3xl md:text-4xl text-cream">
              We Guarantee Our Work — Every Stitch.
            </h2>
            <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-cream/85">
              <p>
                Every alteration carried out by Stitch In Time is backed by our
                workmanship guarantee. If you are not completely satisfied, we will
                re-adjust your garment at no additional cost. Our hem guarantee
                covers the lifetime of the garment. That is the standard we hold
                ourselves to.
              </p>
              <p>
                We use only premium-grade materials — including Gutermann thread
                from Germany — because quality you cannot see is just as important
                as quality you can.
              </p>
            </div>
            <Link
              href="/about#guarantees"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide text-cream underline underline-offset-4 hover:text-taupe"
            >
              Read our full guarantees
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md ring-1 ring-cream/20">
              <SmartImage
                src={resolveImageSrc("/images/home/home-guarantee-detail.jpg")}
                alt="Detail of a hand-finished hem sewn with premium Gutermann thread"
                label="Craft detail — image coming soon"
                wrapperClassName="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Testimonials placeholder ———————————————————— */}
      <section className="section bg-cream">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-espresso">
              Trusted by Residents Across Dubai and Abu Dhabi.
            </h2>
            <div className="mx-auto mt-5 hairline" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-md border border-dashed border-taupe bg-taupe/15 p-8 text-left">
                  <div className="flex gap-1 text-burgundy/40" aria-hidden>
                    {"★★★★★".split("").map((s, j) => (
                      <span key={j}>{s}</span>
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 font-serif text-lg italic text-espresso/70">
                    &ldquo;Customer testimonial to be added here.&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 font-sans text-xs uppercase tracking-luxe text-ink/50">
                    First name · Location · Service
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          {/* CONTENT NOTE (from doc): supply 3–5 customer testimonials with first
              name, location, and service type to replace these placeholders. */}
        </div>
      </section>

      {/* ———————————————————— Brands we use ———————————————————— */}
      <section className="border-y border-taupe/60 bg-taupe/25">
        <div className="container py-14 text-center">
          <Reveal>
            <p className="eyebrow">Brands We Use</p>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-xl leading-relaxed text-espresso md:text-2xl">
              We proudly use Gutermann thread, Prym fastenings, and Union Knopf
              buttons — professional-grade materials trusted by tailors worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ———————————————————— Home Fitting FAQs ———————————————————— */}
      <FaqSection faqs={faqs} heading="Home Fitting — Questions & Answers" eyebrow="Home Fitting" />

      {/* ———————————————————— Final CTA ———————————————————— */}
      <section className="section bg-espresso text-cream">
        <div className="container flex flex-col items-center text-center">
          <Reveal>
            <Clock className="mx-auto h-8 w-8 text-cream/70" />
            <h2 className="mt-6 text-4xl md:text-5xl text-cream">
              Ready for the Perfect Fit?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-lg leading-relaxed text-cream/80">
              Book your home fitting appointment online today, or visit any of our
              11 mall locations across Dubai and Abu Dhabi. Walk-ins are always
              welcome.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <BookButton label="Book a Home Fitting" variant="cream" />
              <FindBranchButton label="Find a Branch Near You" variant="onDark" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
