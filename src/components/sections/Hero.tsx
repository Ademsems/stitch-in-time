"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { StripeBand } from "@/components/fx/StripeBand";
import { whenInteractive } from "@/lib/idle";
import { BookButton } from "@/components/BookButton";
import { FindBranchButton } from "@/components/FindBranchButton";

/**
 * Cinematic hero. Works without photography: burgundy field, drawn thread,
 * stripe band and a circular image slot that shows the branded placeholder
 * until the shoot is delivered.
 *
 * The entrance (headline lines rising through a mask, italic word last, circle
 * reveal, thread drawing) is pure CSS so text and image paint at first paint —
 * LCP-friendly, no hydration dependency. Only the scroll parallax is JS, and
 * it is initialised when the browser is idle.
 */
export function Hero({ imageSrc }: { imageSrc: string | null }) {
  const root = React.useRef<HTMLElement>(null);
  const imgWrap = React.useRef<HTMLDivElement>(null);
  const copy = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    const start = async () => {
      const { gsap, ScrollTrigger } = (await import("@/lib/gsap")).ensureGsap();
      if (cancelled) return;
      ctx = gsap.context(() => {
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        const inner = imgWrap.current?.querySelector("img, [role='img']");
        if (inner) gsap.to(inner, { yPercent: 10, scale: 1.08, ease: "none", scrollTrigger: st });
        if (imgWrap.current) gsap.to(imgWrap.current, { yPercent: -6, ease: "none", scrollTrigger: st });
        if (copy.current) gsap.to(copy.current, { yPercent: -10, opacity: 0.2, ease: "none", scrollTrigger: st });
      }, el);
      ScrollTrigger.refresh();
    };

    whenInteractive().then(start);
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      data-theme="dark"
      data-thread
      aria-label="Introduction"
      className="relative isolate overflow-hidden bg-burgundy text-ivory"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_82%_30%,rgb(var(--espresso)/0.55),transparent_62%),radial-gradient(80%_70%_at_0%_100%,rgb(var(--ink)/0.6),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute -right-[18vw] top-1/2 -z-10 aspect-square w-[78vw] -translate-y-1/2 rounded-full border border-ivory/10 lg:w-[52vw]"
      />

      {/* the thread — draws in, passes behind the copy and into the circle */}
      <svg
        aria-hidden
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="hero-thread pointer-events-none absolute inset-0 -z-[5] hidden h-full w-full text-sky md:block"
        fill="none"
      >
        <path
          pathLength={1}
          d="M-20 660 C 220 560, 330 760, 560 640 S 840 380, 1010 470 S 1180 300, 1330 250"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container grid min-h-[calc(100svh-78px)] items-center gap-10 pb-28 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-32">
        <div ref={copy} className="relative z-10 max-w-2xl">
          <p className="eyebrow hero-in" style={{ ["--d" as string]: "0.05s" }}>
            Since 2008 · Dubai &amp; Abu Dhabi
          </p>
          <h1 className="mt-5 text-[2.9rem] leading-[1.02] !text-ivory sm:text-6xl lg:text-[5.1rem]">
            <span className="line-mask">
              <span className="line-rise" style={{ ["--d" as string]: "0.1s" }}>
                The Perfect Fit,
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ ["--d" as string]: "0.3s" }}>
                <em className="italic">Wherever You Are.</em>
              </span>
            </span>
          </h1>
          <p
            className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-ivory/85"
            style={{ ["--d" as string]: "0.65s" }}
          >
            Expert clothing alterations, repairs, and home fitting service — across 11
            locations in Dubai and Abu Dhabi.
          </p>
          <div
            className="hero-in mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ ["--d" as string]: "0.85s" }}
          >
            <BookButton label="Book Appointment" variant="onDark" />
            <FindBranchButton label="Find a Branch" variant="outlineDark" />
          </div>
        </div>

        {/* image / video slot — circular mask (brand motif) */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div
            ref={imgWrap}
            className="hero-circle relative mx-auto aspect-square w-[min(86vw,34rem)] overflow-hidden rounded-full ring-1 ring-ivory/25"
          >
            <SmartImage
              src={imageSrc}
              alt="A Stitch In Time tailor hand-finishing the label of a tailored jacket"
              priority
              sizes="(max-width: 1024px) 86vw, 520px"
              label="Hero photography coming soon"
              tone="espresso"
            />
          </div>
          {/* dashed stitch ring around the circle */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="hero-in pointer-events-none absolute left-1/2 top-1/2 h-[calc(min(86vw,34rem)+3rem)] w-[calc(min(86vw,34rem)+3rem)] -translate-x-1/2 -translate-y-1/2 text-sky"
            style={{ ["--d" as string]: "1.1s" }}
          >
            <circle
              cx="50"
              cy="50"
              r="49.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.35"
              strokeDasharray="1.6 1.6"
            />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="container mb-6 flex items-center justify-between">
          <span
            className="hero-in flex items-center gap-3 font-subheader text-[0.62rem] uppercase tracking-luxe text-sky"
            style={{ ["--d" as string]: "1.2s" }}
          >
            <span className="relative block h-10 w-px overflow-hidden bg-sky/30">
              <span className="scroll-cue absolute inset-0 block bg-sky" />
            </span>
            Scroll
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
        <StripeBand tone="dark" />
      </div>
    </section>
  );
}
