"use client";

import * as React from "react";
import { LogoImage } from "@/components/Logo";

/**
 * First-visit-per-session intro (~1.5s, skippable). The animation itself is
 * pure CSS (see globals.css) so it starts at first paint and never waits for
 * hydration; it sits over content that is already in the DOM, so it cannot
 * delay LCP. The whole lockup fades in as one piece, a thread line draws
 * beneath it, then a burgundy curtain lifts. JS only wires Skip/Escape and
 * records the visit. Not rendered at all under reduced motion.
 */
export function Intro() {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("has-intro")) return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("sit-intro", "1");
      } catch {}
      html.classList.remove("has-intro");
      window.dispatchEvent(new Event("sit:intro-done"));
    };

    const natural = window.setTimeout(finish, 1500);
    const skip = () => {
      if (done) return;
      window.clearTimeout(natural);
      el.classList.add("is-skipped");
      window.setTimeout(finish, 320);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    el.addEventListener("click", skip);
    return () => {
      window.clearTimeout(natural);
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("click", skip);
    };
  }, []);

  return (
    <div
      ref={root}
      data-theme="dark"
      aria-hidden
      className="intro-overlay fixed inset-0 z-[120] flex-col items-center justify-center bg-burgundy"
    >
      <div className="intro-logo px-6">
        <LogoImage tone="light" height={62} className="max-w-[78vw]" priority />
      </div>
      <svg viewBox="0 0 320 28" className="intro-thread mt-6 h-7 w-[min(70vw,320px)] text-sky" fill="none">
        <path
          pathLength={1}
          d="M2 20 C 50 2, 90 2, 130 14 S 210 26, 250 12 S 300 4, 318 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          root.current?.click();
        }}
        className="absolute bottom-8 flex min-h-11 items-center px-4 font-subheader text-[0.68rem] uppercase tracking-luxe text-ivory/70 transition-colors hover:text-ivory"
      >
        Skip
      </button>
    </div>
  );
}
