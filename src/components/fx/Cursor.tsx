"use client";

import * as React from "react";
import { whenInteractive } from "@/lib/idle";

/**
 * Desktop-only custom cursor: a small ring that follows the pointer (GSAP
 * quickTo), grows over interactive elements and shows a short label when the
 * element carries `data-cursor="View"`. Never rendered on touch devices.
 * The native cursor stays visible — this is an accent, not a replacement.
 */
export function Cursor() {
  const ring = React.useRef<HTMLDivElement>(null);
  const label = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ring.current;
    const lab = label.current;
    if (!el || !lab) return;

    let cancelled = false;
    let off = () => {};

    (async () => {
      await whenInteractive();
      if (cancelled) return;
      const { gsap } = (await import("@/lib/gsap")).ensureGsap();
      if (cancelled) return;
      const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      const onMove = (e: PointerEvent) => {
        el.style.opacity = "1";
        x(e.clientX);
        y(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        const t = e.target as HTMLElement | null;
        const hit = t?.closest<HTMLElement>("a, button, [role='button'], [data-cursor]");
        const dark = !!t?.closest('[data-theme="dark"]');
        el.dataset.dark = dark ? "1" : "0";
        if (hit) {
          const text = hit.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
          lab.textContent = text;
          el.dataset.state = text ? "label" : "link";
        } else {
          lab.textContent = "";
          el.dataset.state = "idle";
        }
      };
      const onLeave = () => {
        el.style.opacity = "0";
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      off = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    })();

    return () => {
      cancelled = true;
      off();
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      data-state="idle"
      data-dark="0"
      style={{ opacity: 0 }}
      className="sit-cursor pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-burgundy transition-[width,height,background-color,border-color,opacity] duration-300 ease-silk data-[dark='1']:border-sky data-[state=link]:h-14 data-[state=link]:w-14 data-[state=label]:h-20 data-[state=label]:w-20 data-[state=label]:bg-burgundy/90 data-[dark='1']:data-[state=label]:bg-sky/90"
    >
      <span
        ref={label}
        className="font-subheader text-[0.6rem] uppercase tracking-wide2 text-ivory [[data-dark='1']_&]:text-burgundy"
      />
    </div>
  );
}
