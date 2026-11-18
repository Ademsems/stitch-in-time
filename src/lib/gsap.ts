"use client";

/**
 * Single GSAP entry point. Always imported dynamically from effects
 * (`const g = await import("@/lib/gsap")`) so the animation stack stays out of
 * the initial bundle and never runs during SSR.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
