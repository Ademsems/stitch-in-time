import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "up" | "left" | "right" | "fade" | "mask";
type Tag = "div" | "li" | "article" | "section" | "p" | "span" | "figure" | "ul";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  variant?: Variant;
  delay?: number;
}

const VARIANT_CLASS: Record<Variant, string> = {
  up: "",
  left: "rv-left",
  right: "rv-right",
  fade: "rv-fade",
  mask: "rv-mask",
};

/**
 * One-shot scroll reveal. A SERVER component: it only emits the `.rv` classes;
 * a single shared IntersectionObserver (see MotionObservers) adds `.is-in`
 * when each element scrolls into view. That keeps ~70 reveal wrappers off the
 * hydration path. Content is visible by default — hiding only applies under
 * `.js-anim`, and a CSS failsafe un-hides everything after 3s.
 */
export function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  return React.createElement(
    as,
    {
      className: cn("rv", VARIANT_CLASS[variant], className),
      style: { "--rv-delay": `${delay}s`, ...style } as React.CSSProperties,
      ...rest,
    },
    children
  );
}
