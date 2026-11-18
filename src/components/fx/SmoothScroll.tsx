"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { whenInteractive } from "@/lib/idle";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in
 * sync. Disabled entirely under prefers-reduced-motion. Elements that must
 * scroll natively (dialogs, the map) carry `data-lenis-prevent`.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      await whenInteractive();
      if (cancelled) return;
      const [{ default: LenisCtor }, g] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;
      const { gsap, ScrollTrigger } = g.ensureGsap();
      const lenis = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      cleanup = () => {
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
