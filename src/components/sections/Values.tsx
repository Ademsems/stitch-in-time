"use client";

import * as React from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { VALUES, type ValueTone } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The six brand values as interactive circles (brandbook motif). Hover or
 * keyboard focus on desktop, tap on touch: the circle flips to reveal the
 * description. Colours follow the brandbook values page; text colours follow
 * the contrast rules (sky background → burgundy/espresso/ink text only).
 */
const TONE: Record<ValueTone, { face: string; back: string }> = {
  burgundy: { face: "bg-burgundy text-ivory", back: "bg-ink text-ivory" },
  ivory: { face: "bg-ivory text-burgundy ring-1 ring-burgundy/40", back: "bg-burgundy text-ivory" },
  cream: { face: "bg-cream text-burgundy", back: "bg-burgundy text-ivory" },
  espresso: { face: "bg-espresso text-ivory", back: "bg-burgundy text-ivory" },
  sky: { face: "bg-sky text-burgundy", back: "bg-espresso text-ivory" },
  ink: { face: "bg-ink text-ivory", back: "bg-burgundy text-ivory" },
};

function ValueCircle({ title, body, tone, index }: { title: string; body: string; tone: ValueTone; index: number }) {
  const [active, setActive] = React.useState(false);
  const t = TONE[tone];
  const hover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        aria-expanded={active}
        aria-label={`${title}. ${body}`}
        data-cursor="Read"
        onClick={() => setActive((v) => !v)}
        onMouseEnter={() => hover() && setActive(true)}
        onMouseLeave={() => hover() && setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={cn(
          "group relative aspect-square w-full max-w-[13.5rem] rounded-full [perspective:900px]",
          "transition-transform duration-700 ease-silk",
          active && "scale-[1.08]"
        )}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-transform [transition-duration:800ms] ease-silk [transform-style:preserve-3d]",
            active && "[transform:rotateY(180deg)]"
          )}
        >
          {/* front */}
          <span
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full p-6 text-center [backface-visibility:hidden]",
              t.face
            )}
          >
            <span className="font-subheader text-[0.58rem] tracking-luxe opacity-70">
              0{index + 1}
            </span>
            <span className="font-subheader text-[0.7rem] uppercase leading-snug tracking-wide2">
              {title}
            </span>
          </span>
          {/* back */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full p-5 text-center text-[0.76rem] leading-snug [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6 sm:text-[0.8rem]",
              t.back
            )}
          >
            {body}
          </span>
        </span>
      </button>
    </div>
  );
}

export function Values({
  eyebrow = "Brand Values",
  heading = (
    <>
      What we <em className="italic">stand for.</em>
    </>
  ),
  tone = "ivory",
}: {
  eyebrow?: string;
  heading?: React.ReactNode;
  tone?: "ivory" | "cream";
}) {
  return (
    <section data-thread className={cn("section", tone === "cream" ? "bg-cream" : "bg-ivory")}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-6xl">{heading}</SplitHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-sm text-espresso/75">
              Hover, focus or tap a circle to read what each value means in practice.
            </p>
          </Reveal>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-x-5">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.07}>
              <ValueCircle {...v} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
