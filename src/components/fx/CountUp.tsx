"use client";

import * as React from "react";

/** Count-up number (eases out, once, on entering the viewport). */
export function CountUp({
  to,
  duration = 1600,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(to);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setValue(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
