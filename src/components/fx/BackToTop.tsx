"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const R = 22;
const C = 2 * Math.PI * R;

/** Back-to-top: spool icon inside a circular scroll-progress ring. */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const ring = React.useRef<SVGCircleElement>(null);

  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      ring.current?.setAttribute("stroke-dashoffset", String(C * (1 - p)));
      setVisible(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ivory shadow-lg shadow-burgundy/20 ring-1 ring-burgundy/10 transition-all duration-500 ease-silk hover:scale-105 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgb(var(--burgundy) / 0.14)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgb(var(--burgundy))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      {/* spool glyph (decorative, simplified) */}
      <svg viewBox="0 0 20 24" className="relative h-5 w-5 text-burgundy" aria-hidden>
        <path fill="currentColor" d="M2 1h16v3h-3.2c-.6 0-.8.3-.8.9v14.2c0 .6.2.9.8.9H18v3H2v-3h3.2c.6 0 .8-.3.8-.9V4.9c0-.6-.2-.9-.8-.9H2z" />
        <path d="M7 9c3-1 6-1 8-.5M7 13c3-1 6-1 8-.5" stroke="rgb(var(--ivory))" strokeWidth="1" fill="none" />
      </svg>
    </button>
  );
}
