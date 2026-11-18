/** Resolves when the browser is idle (or after `timeout` ms) — keeps non-critical JS off the critical path. */
export function whenIdle(timeout = 1500): Promise<void> {
  return new Promise((resolve) => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) w.requestIdleCallback(() => resolve(), { timeout });
    else window.setTimeout(resolve, 400);
  });
}

/**
 * Resolves on the first user interaction (scroll, pointer, key, touch) or after
 * `timeout` ms, whichever comes first. Used to keep heavy scroll-driven setup
 * (Lenis, ScrollTrigger pins, the page thread) out of the load window so it
 * can't hurt LCP / TBT; real users trigger it the moment they start scrolling.
 */
export function whenInteractive(timeout = 6000): Promise<void> {
  return new Promise((resolve) => {
    const events = ["scroll", "wheel", "pointerdown", "pointermove", "keydown", "touchstart"] as const;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, go));
      window.clearTimeout(t);
      resolve();
    };
    const t = window.setTimeout(go, timeout);
    // Already scrolled (reload / hash link)? Don't wait.
    if (window.scrollY > 0) go();
    events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
  });
}
