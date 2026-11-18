"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * One client island that powers every scroll reveal on the page:
 *  • `.rv`          → adds `.is-in` when the element enters the viewport
 *  • `[data-split]` → lazily upgrades headings to masked line-by-line reveals
 *                     (GSAP SplitText) as they approach the viewport
 * Re-scans on route change. Under reduced motion everything is shown at once.
 */
export function MotionObservers() {
  const pathname = usePathname();

  React.useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const splits = Array.from(document.querySelectorAll<HTMLElement>("[data-split]"));

    if (rm || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      splits.forEach((el) => el.classList.add("is-split"));
      return;
    }

    // ——— reveals ———
    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            revealIO.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => revealIO.observe(el));

    // ——— split headings (lazy) ———
    let cancelled = false;
    const contexts: { revert: () => void }[] = [];
    const upgrade = async (el: HTMLElement) => {
      const { gsap, SplitText } = (await import("@/lib/gsap")).ensureGsap();
      if (cancelled) return;
      const delay = Number(el.dataset.splitDelay ?? 0);
      const ctx = gsap.context(() => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "split-line",
          onSplit(self) {
            el.classList.add("is-split");
            const ems = el.querySelectorAll("em");
            gsap.set(ems, { display: "inline-block" });
            const tl = gsap.timeline({ delay });
            tl.from(self.lines, { yPercent: 118, duration: 1.15, ease: "power4.out", stagger: 0.11 });
            if (ems.length) {
              tl.from(ems, { opacity: 0, yPercent: 35, duration: 0.9, ease: "power3.out" }, ">-0.45");
            }
            return tl;
          },
        });
      });
      contexts.push(ctx);
    };
    const splitIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            splitIO.unobserve(e.target);
            void upgrade(e.target as HTMLElement);
          }
        }
      },
      { rootMargin: "0px 0px 15% 0px" }
    );
    splits.forEach((el) => splitIO.observe(el));

    return () => {
      cancelled = true;
      revealIO.disconnect();
      splitIO.disconnect();
      contexts.forEach((c) => c.revert());
    };
  }, [pathname]);

  return null;
}
