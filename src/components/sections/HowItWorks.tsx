"use client";

import * as React from "react";
import { BookButton } from "@/components/BookButton";
import { Reveal } from "@/components/fx/Reveal";
import { whenInteractive } from "@/lib/idle";
import { SplitHeading } from "@/components/fx/SplitHeading";

export interface Step {
  n: string;
  title: string;
  copy: string;
}

/**
 * How Home Fitting Works — 4 steps on espresso, step numbers in Sky Blue
 * (AA on dark). Desktop: the section pins and a thread draws from step to
 * step while each step lights up and its number rises into place. Mobile /
 * reduced motion: stacked reveals, everything visible.
 */
export function HowItWorks({
  steps,
  heading = "How Our Home Fitting Service Works",
  eyebrow = "Home Fitting Service",
  showCta = true,
}: {
  steps: Step[];
  heading?: string;
  eyebrow?: string;
  showCta?: boolean;
}) {
  const root = React.useRef<HTMLElement>(null);
  const thread = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    const el = root.current;
    const p = thread.current;
    if (!el || !p) return;
    let cancelled = false;
    let mm: { revert: () => void } | undefined;

    (async () => {
      await whenInteractive();
      if (cancelled) return;
      const { gsap, ScrollTrigger } = (await import("@/lib/gsap")).ensureGsap();
      if (cancelled) return;
      const m = gsap.matchMedia();
      m.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", el);
        const nums = gsap.utils.toArray<HTMLElement>("[data-step-n]", el);
        const nodes = gsap.utils.toArray<HTMLElement>("[data-step-node]", el);
        gsap.set(items, { opacity: 0.22 });
        gsap.set(nums, { yPercent: 40, opacity: 0.4 });
        gsap.set(p, { strokeDashoffset: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2400",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });
        tl.to(p, { strokeDashoffset: 0, duration: items.length }, 0);
        items.forEach((it, i) => {
          const at = i * 0.92;
          tl.to(it, { opacity: 1, duration: 0.5 }, at);
          tl.to(nums[i], { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, at);
          tl.to(nodes[i], { backgroundColor: "rgb(157 180 206)", scale: 1.25, duration: 0.3 }, at);
        });
        tl.to({}, { duration: 0.4 });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set([...items, ...nums, ...nodes, p], { clearProps: "all" });
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
      data-theme="dark"
      data-thread
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-espresso text-ivory lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <div className="container section lg:!py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <SplitHeading
            id="how-heading"
            className="mt-4 text-4xl leading-[1.05] !text-ivory md:text-6xl"
          >
            {heading}
          </SplitHeading>
        </div>

        <div className="relative mt-16 lg:mt-24">
          {/* desktop thread connecting the steps */}
          <svg
            aria-hidden
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-[6px] hidden h-10 w-full text-sky lg:block"
            fill="none"
          >
            <path
              d="M 60 20 C 200 -4, 260 44, 380 20 S 600 -4, 640 20 S 800 44, 940 20"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="5 6"
            />
            <path
              ref={thread}
              pathLength={1}
              d="M 60 20 C 200 -4, 260 44, 380 20 S 600 -4, 640 20 S 800 44, 940 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            />
          </svg>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.08} className="relative" data-step>
                <span
                  data-step-node
                  aria-hidden
                  className="relative z-10 hidden h-3.5 w-3.5 rounded-full bg-espresso ring-2 ring-sky lg:block"
                />
                <div className="lg:mt-7">
                  <span
                    data-step-n
                    className="block font-serif text-7xl leading-none text-sky md:text-8xl"
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-serif text-[1.65rem] leading-tight !text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-ivory/80">
                    {step.copy}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="stitch-line mt-10 block w-20 text-sky/40 lg:hidden"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        {showCta && (
          <Reveal className="mt-16 flex flex-col items-center gap-5 text-center lg:mt-20">
            <p className="font-subheader text-[0.7rem] uppercase tracking-luxe text-ivory/75">
              No call-out fee · Available across Dubai and Abu Dhabi
            </p>
            <BookButton label="Book a Home Fitting" variant="onDark" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
