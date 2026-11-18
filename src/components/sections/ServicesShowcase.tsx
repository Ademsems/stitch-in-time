"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { whenInteractive } from "@/lib/idle";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { Reveal } from "@/components/fx/Reveal";

export interface ShowcaseItem {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  price: string;
  href: string;
  imageSrc: string | null;
  imageAlt: string;
}

/** A dashed "stitch" border that sews itself around the card on hover/focus. */
function StitchBorder({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-3 z-20 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-ivory"
    >
      <defs>
        <mask id={id}>
          <rect
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx="3"
            fill="none"
            stroke="white"
            strokeWidth="4"
            pathLength={1}
            className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] [transition-duration:1100ms] ease-silk group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
          />
        </mask>
      </defs>
      <rect
        x="1"
        y="1"
        style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="7 6"
        mask={`url(#${id})`}
      />
    </svg>
  );
}

function ServiceCard({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      data-cursor="View"
      className="group relative block aspect-[4/5.2] w-full overflow-hidden rounded-md bg-espresso text-ivory outline-offset-4"
    >
      <div className="absolute inset-0 transition-transform [transition-duration:1400ms] ease-silk group-hover:scale-[1.07] group-focus-visible:scale-[1.07]">
        <SmartImage
          src={item.imageSrc}
          alt={item.imageAlt}
          sizes="(max-width: 1024px) 80vw, 380px"
          label={item.title}
          tone="espresso"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent"
      />
      <StitchBorder id={`stitch-${item.slug}`} />

      <div className="absolute inset-x-0 bottom-0 z-30 p-7">
        <p className="font-subheader text-[0.66rem] uppercase tracking-luxe text-sky">{item.index}</p>
        <h3 className="mt-2 font-serif text-[2rem] leading-[1.05] !text-ivory">{item.title}</h3>
        <p className="mt-3 line-clamp-3 max-w-[22rem] text-sm leading-relaxed text-ivory/85">
          {item.blurb}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          {/* price reveals on hover (always visible on touch) */}
          <span className="translate-y-0 rounded-full bg-ivory px-4 py-1.5 font-subheader text-[0.64rem] uppercase tracking-wide2 text-burgundy transition-all duration-500 ease-silk [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
            {item.price}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/50 transition-all duration-500 ease-silk group-hover:translate-x-1 group-hover:bg-ivory group-hover:text-burgundy">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Services showcase. Desktop (and motion-allowed): the section pins and the
 * card track scrolls horizontally, scrubbed to the page scroll. Mobile /
 * reduced motion: a native swipeable scroll-snap carousel.
 */
export function ServicesShowcase({ items }: { items: ShowcaseItem[] }) {
  const root = React.useRef<HTMLElement>(null);
  const viewport = React.useRef<HTMLDivElement>(null);
  const track = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const el = root.current;
    const vp = viewport.current;
    const tr = track.current;
    if (!el || !vp || !tr) return;
    let cancelled = false;
    let mm: { revert: () => void } | undefined;

    (async () => {
      await whenInteractive();
      if (cancelled) return;
      const { gsap, ScrollTrigger } = (await import("@/lib/gsap")).ensureGsap();
      if (cancelled) return;
      const m = gsap.matchMedia();
      m.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        vp.classList.remove("snap-x", "snap-mandatory");
        vp.style.overflowX = "hidden";
        const dist = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
        const tween = gsap.to(tr, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${dist() + 120}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(tr, { clearProps: "transform" });
          vp.style.overflowX = "";
          vp.classList.add("snap-x", "snap-mandatory");
        };
      });
      mm = m;
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      data-thread
      aria-labelledby="services-showcase-heading"
      className="relative bg-cream lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <div className="container pb-8 pt-20 lg:pb-10 lg:pt-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">What We Do</p>
            </Reveal>
            <SplitHeading
              id="services-showcase-heading"
              className="mt-4 text-4xl leading-[1.04] md:text-6xl"
            >
              Services for every garment &amp; <em className="italic">occasion.</em>
            </SplitHeading>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="link-stitch inline-flex min-h-11 items-center gap-2 font-subheader text-[0.72rem] uppercase tracking-wide2 text-burgundy"
            >
              View all services <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>

      <div
        ref={viewport}
        data-lenis-prevent-touch
        className="snap-x snap-mandatory overflow-x-auto pb-20 [scrollbar-width:none] lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul
          ref={track}
          className="flex w-max gap-5 px-5 sm:px-6 lg:gap-7 lg:px-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] lg:pb-12 lg:pr-24"
        >
          {items.map((item) => (
            <li
              key={item.slug}
              className="w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem] lg:max-w-none"
            >
              <ServiceCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
