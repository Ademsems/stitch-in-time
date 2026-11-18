import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { StripeBand } from "@/components/fx/StripeBand";
import { CountUp } from "@/components/fx/CountUp";
import { BookButton } from "@/components/BookButton";
import { FindBranchButton } from "@/components/FindBranchButton";
import { SmartImage } from "@/components/SmartImage";
import { resolveImageSrc } from "@/lib/resolveImage";
import { TAGLINE, MATERIALS } from "@/lib/brand";
import { DUBAI_BRANCHES, ABU_DHABI_BRANCHES } from "@/data/branches";
import { TESTIMONIALS } from "@/data/testimonials";

/** Guarantee (ink break). */
export function GuaranteeSection() {
  return (
    <section data-theme="dark" data-thread className="section overflow-hidden bg-ink text-ivory">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <ShieldCheck className="h-9 w-9 text-sky" aria-hidden />
            <p className="eyebrow mt-6">Our Guarantee</p>
          </Reveal>
          <SplitHeading className="mt-4 text-4xl leading-[1.04] !text-ivory md:text-6xl">
            We guarantee our work — <em className="italic">every stitch.</em>
          </SplitHeading>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-ivory/85">
            <p>
              Every alteration carried out by Stitch In Time is backed by our workmanship
              guarantee. If you are not completely satisfied, we will re-adjust your garment at no
              additional cost. Our hem guarantee covers the lifetime of the garment. That is the
              standard we hold ourselves to.
            </p>
            <p>
              We use only premium-grade materials — including Gütermann thread from Germany —
              because quality you cannot see is just as important as quality you can.
            </p>
            <Link
              href="/about#guarantees"
              className="link-stitch mt-2 inline-flex min-h-11 items-center gap-2 font-subheader text-[0.72rem] uppercase tracking-wide2 text-ivory"
            >
              Read our full guarantees <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <Reveal variant="mask" className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] ring-1 ring-ivory/20">
            <SmartImage
              src={resolveImageSrc("/images/home/home-guarantee-detail.jpg")}
              alt="Detail of a hand-finished hem sewn with premium Gütermann thread"
              label="Craft detail"
              tone="espresso"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Materials marquee: Gütermann · Prym · Union Knopf. */
export function MaterialsMarquee() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: 3 }).flatMap((_, rep) =>
        MATERIALS.map((m) => (
          <li key={`${rep}-${m}`} className="flex items-center">
            <span className="px-8 font-serif text-5xl text-burgundy md:px-12 md:text-7xl">{m}</span>
            <svg viewBox="0 0 20 24" className="h-7 w-6 text-sky" aria-hidden>
              <path
                fill="currentColor"
                d="M2 1h16v3h-3.2c-.6 0-.8.3-.8.9v14.2c0 .6.2.9.8.9H18v3H2v-3h3.2c.6 0 .8-.3.8-.9V4.9c0-.6-.2-.9-.8-.9H2z"
              />
            </svg>
          </li>
        ))
      )}
    </ul>
  );
  return (
    <section className="overflow-hidden border-y border-burgundy/15 bg-cream py-10 md:py-14" aria-label="Materials we use">
      <p className="eyebrow mb-6 text-center">Brands We Use</p>
      <div className="marquee">
        <div className="marquee-track flex animate-marquee items-center will-change-transform">
          {row()}
          {row(true)}
        </div>
      </div>
      <p className="container mt-8 text-center font-serif text-xl text-espresso/85 md:text-2xl">
        We proudly use Gütermann thread, Prym fastenings, and Union Knopf buttons —
        professional-grade materials trusted by tailors worldwide.
      </p>
    </section>
  );
}

/** Locations teaser: branch count + list + CTA. */
export function LocationsTeaser() {
  const col = (title: string, names: string[]) => (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2 font-serif text-2xl text-burgundy">
        {names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <section data-thread className="section bg-ivory">
      <div className="container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 text-burgundy/40">
            <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="1.6 1.6" />
          </svg>
          <div className="absolute inset-[9%] rounded-full bg-burgundy" />
          <Reveal variant="fade" className="relative text-center text-ivory" data-theme="dark">
            <CountUp to={11} className="block font-serif text-[7.5rem] leading-none md:text-[9rem]" />
            <span className="eyebrow mt-2 block">Mall boutiques</span>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow">Find Us</p>
          </Reveal>
          <SplitHeading className="mt-4 text-4xl leading-[1.04] md:text-6xl">
            Across Dubai &amp; <em className="italic">Abu Dhabi.</em>
          </SplitHeading>
          <Reveal delay={0.1} className="mt-6 max-w-lg text-base leading-relaxed text-espresso/90">
            Walk-ins are always welcome — no appointment needed for in-store alterations. Find your
            nearest branch, check opening hours and get directions.
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid gap-10 sm:grid-cols-2">
            {col(`Dubai — ${DUBAI_BRANCHES.length}`, DUBAI_BRANCHES.map((b) => b.name))}
            {col(`Abu Dhabi — ${ABU_DHABI_BRANCHES.length}`, ABU_DHABI_BRANCHES.map((b) => b.name))}
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <FindBranchButton label="Open the Map" size="lg" variant="default" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Testimonials: rendered ONLY when real data exists. Never invents reviews. */
export function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section className="section bg-cream">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
          </Reveal>
          <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-5xl">
            Trusted by residents across Dubai and Abu Dhabi.
          </SplitHeading>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name + i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-md bg-ivory p-8 ring-1 ring-burgundy/15">
                <blockquote className="flex-1 font-serif text-2xl leading-snug text-burgundy">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="eyebrow mt-6 !text-espresso">
                  {t.name} · {t.location} · {t.service}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Closing CTA with the tagline (burgundy). */
export function ClosingCta({
  heading = "Ready for the perfect fit?",
  children,
}: {
  heading?: string;
  children?: React.ReactNode;
}) {
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-burgundy text-ivory">
      <StripeBand tone="dark" />
      <div className="container section flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">Book · Visit · Walk In</p>
        </Reveal>
        <SplitHeading className="mt-5 max-w-4xl text-5xl leading-[1.02] !text-ivory md:text-7xl">
          {TAGLINE.lead} <em className="italic">{TAGLINE.accent}</em>
        </SplitHeading>
        <Reveal delay={0.1} className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/85">
          <p className="font-serif text-3xl text-ivory">{heading}</p>
          <p className="mt-4">
            {children ?? (
              <>
                Book your home fitting appointment online today, or visit any of our 11 mall
                locations across Dubai and Abu Dhabi. Walk-ins are always welcome.
              </>
            )}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BookButton label="Book a Home Fitting" variant="onDark" />
          <FindBranchButton label="Find a Branch Near You" variant="outlineDark" />
        </Reveal>
      </div>
    </section>
  );
}
