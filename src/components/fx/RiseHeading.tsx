import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page H1 with a pure-CSS masked rise (the italic accent word <em> arrives
 * last). No JS, so the heading paints at first paint — LCP-friendly — and
 * respects the first-visit intro offset via --intro-delay.
 */
export function RiseHeading({
  className,
  children,
  delay = 0.1,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  id?: string;
}) {
  return (
    <h1 id={id} className={cn("[text-wrap:balance]", className)}>
      <span className="line-mask">
        <span className="line-rise" style={{ ["--d" as string]: `${delay}s` }}>
          {children}
        </span>
      </span>
    </h1>
  );
}
