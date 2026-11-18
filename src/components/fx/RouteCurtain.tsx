"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Short brand-colour page transitions. A burgundy curtain with a sky stripe
 * rises over the page on internal link clicks, the route changes underneath,
 * then it lifts away. Falls back to plain navigation for modified clicks,
 * external links and reduced-motion users.
 */
export function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const el = React.useRef<HTMLDivElement>(null);
  const covered = React.useRef(false);
  const failsafe = React.useRef<number | undefined>(undefined);

  const reveal = React.useCallback(() => {
    const node = el.current;
    if (!node || !covered.current) return;
    covered.current = false;
    window.clearTimeout(failsafe.current);
    const a = node.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      { duration: 650, easing: EASE, fill: "forwards" }
    );
    a.onfinish = () => {
      node.style.visibility = "hidden";
    };
  }, []);

  React.useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (rm.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // hash / same page
      const node = el.current;
      if (!node) return;
      e.preventDefault();
      covered.current = true;
      node.style.visibility = "visible";
      const anim = node.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        { duration: 480, easing: EASE, fill: "forwards" }
      );
      anim.onfinish = () => router.push(url.pathname + url.search + url.hash);
      failsafe.current = window.setTimeout(reveal, 3500);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router, reveal]);

  React.useEffect(() => {
    // Route changed: let the new page paint, then lift the curtain.
    const t = window.setTimeout(reveal, 120);
    return () => window.clearTimeout(t);
  }, [pathname, reveal]);

  return (
    <div
      ref={el}
      aria-hidden
      style={{ visibility: "hidden", transform: "translateY(100%)" }}
      className="pointer-events-none fixed inset-0 z-[110] bg-burgundy"
    >
      <span className="absolute inset-x-0 top-1/2 block h-[7px] -translate-y-1/2 bg-sky" />
      <span className="absolute inset-x-0 top-1/2 mt-[10px] block h-[2px] bg-ivory" />
    </div>
  );
}
