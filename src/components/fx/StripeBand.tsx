"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The packaging STRIPE band: parallel sky / (ivory|burgundy) stripes that draw
 * across (scaleX) when they enter the viewport. Decorative.
 */
export function StripeBand({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mid = tone === "dark" ? "bg-ivory" : "bg-burgundy";
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("stripe-band flex w-full flex-col gap-[3px]", className)}
    >
      <span style={{ ["--i" as string]: 0 }} className="block h-[7px] w-full bg-sky" />
      <span style={{ ["--i" as string]: 1 }} className={cn("block h-[2px] w-full", mid)} />
      <span style={{ ["--i" as string]: 2 }} className="block h-[7px] w-full bg-sky" />
    </div>
  );
}
