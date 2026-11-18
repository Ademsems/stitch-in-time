"use client";

import * as React from "react";
import { whenInteractive } from "@/lib/idle";

/**
 * The signature THREAD: one continuous SVG path that weaves down the page
 * (through sections marked `data-thread`) and draws itself, scrubbed to scroll
 * progress. The path is computed from real section positions, hugging the
 * gutters and crossing at section boundaries. Shortened/simplified on mobile
 * and not rendered at all under prefers-reduced-motion.
 */
export function PageThread() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const svg = React.useRef<SVGSVGElement>(null);
  const path = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    const host = wrap.current?.parentElement;
    const p = path.current;
    const s = svg.current;
    if (!host || !p || !s) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.current?.remove();
      return;
    }

    let cancelled = false;
    let st: { kill: () => void } | undefined;

    const build = () => {
      const hostRect = host.getBoundingClientRect();
      const W = hostRect.width;
      const H = host.scrollHeight;
      const mobile = W < 768;
      const secs = Array.from(host.querySelectorAll<HTMLElement>("[data-thread]"));
      if (secs.length < 2) return false;
      const pad = mobile ? 9 : 26;
      const xs = [pad, W - pad];
      const rel = secs.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - hostRect.top, bottom: r.bottom - hostRect.top };
      });
      s.setAttribute("viewBox", `0 0 ${W} ${H}`);
      s.setAttribute("width", String(W));
      s.setAttribute("height", String(H));

      // Mobile: cross only at every second boundary so the line stays calm.
      const stride = mobile ? 2 : 1;
      let side = 0;
      let d = `M ${xs[side]} ${rel[0].top + 40}`;
      for (let i = 0; i < rel.length - 1; i += 1) {
        const boundary = rel[i].bottom;
        const cross = (i + 1) % stride === 0;
        const ch = Math.min(110, (rel[i].bottom - rel[i].top) / 4);
        const x0 = xs[side];
        if (cross) {
          const x1 = xs[1 - side];
          d += ` L ${x0} ${boundary - ch} C ${x0} ${boundary + 4}, ${x1} ${boundary - 4}, ${x1} ${boundary + ch}`;
          side = 1 - side;
        } else {
          d += ` L ${x0} ${boundary + ch * 0.2}`;
        }
      }
      const last = rel[rel.length - 1];
      d += ` L ${xs[side]} ${last.bottom - 40}`;
      p.setAttribute("d", d);
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      return true;
    };

    (async () => {
      await whenInteractive();
      if (cancelled) return;
      const { gsap, ScrollTrigger } = (await import("@/lib/gsap")).ensureGsap();
      try {
        await document.fonts.ready;
      } catch {}
      if (cancelled || !build()) return;

      const make = () => {
        st?.kill();
        const tween = gsap.to(p, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: host,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.8,
          },
        });
        st = {
          kill: () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          },
        };
      };
      make();

      let t = 0;
      const rebuild = () => {
        window.clearTimeout(t);
        t = window.setTimeout(() => {
          if (cancelled) return;
          build();
          make();
          ScrollTrigger.refresh();
        }, 250);
      };
      const ro = new ResizeObserver(rebuild);
      ro.observe(host);
      window.addEventListener("load", rebuild);
      (wrap.current as HTMLElement & { _off?: () => void })._off = () => {
        ro.disconnect();
        window.removeEventListener("load", rebuild);
        window.clearTimeout(t);
      };
    })();

    const w = wrap.current;
    return () => {
      cancelled = true;
      st?.kill();
      (w as (HTMLElement & { _off?: () => void }) | null)?._off?.();
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <svg ref={svg} className="absolute left-0 top-0" fill="none">
        <path
          ref={path}
          stroke="rgb(var(--sky))"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
