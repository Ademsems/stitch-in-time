import * as React from "react";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
  delay?: number;
  id?: string;
}

/**
 * Section headline whose lines rise through a mask (GSAP SplitText), with the
 * italic accent word (<em>) arriving last. A SERVER component: it only renders
 * the `data-split` element; MotionObservers upgrades it lazily when it nears
 * the viewport. Text is visible if JS or the animation fails.
 */
export function SplitHeading({
  as: Tag = "h2",
  className,
  children,
  delay = 0,
  id,
}: SplitHeadingProps) {
  return (
    <Tag
      id={id}
      data-split
      data-split-delay={delay || undefined}
      className={cn("[text-wrap:balance]", className)}
    >
      {children}
    </Tag>
  );
}
