"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import { LocateFixed, Maximize2, Minimize2, Navigation, Phone, Clock } from "lucide-react";
import { BRANCHES, directionsUrl, telHref, type Branch, type Emirate } from "@/data/branches";
import { cn } from "@/lib/utils";

const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-cream font-subheader text-[0.66rem] uppercase tracking-luxe text-burgundy">
      Loading map…
    </div>
  ),
});

type Filter = "All" | Emirate;

function haversineKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function LocationsExplorer() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<Filter>("All");
  const [expanded, setExpanded] = React.useState(false);
  const [userPos, setUserPos] = React.useState<[number, number] | null>(null);
  const [status, setStatus] = React.useState<string>("");
  const [locating, setLocating] = React.useState(false);

  const markers = React.useRef(new Map<string, L.Marker>());
  const mapRef = React.useRef<L.Map | null>(null);
  const shell = React.useRef<HTMLDivElement>(null);
  const closeBtn = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef(new Map<string, HTMLLIElement>());

  const registerMarker = React.useCallback((slug: string, m: L.Marker | null) => {
    if (m) markers.current.set(slug, m);
    else markers.current.delete(slug);
  }, []);
  const registerMap = React.useCallback((m: L.Map) => {
    mapRef.current = m;
  }, []);

  const distances = React.useMemo(() => {
    const d = new Map<string, number>();
    if (userPos) BRANCHES.forEach((b) => d.set(b.slug, haversineKm(userPos, [b.lat, b.lng])));
    return d;
  }, [userPos]);

  const nearestSlug = React.useMemo(() => {
    if (!userPos) return null;
    let best: string | null = null;
    let min = Infinity;
    distances.forEach((v, k) => {
      if (v < min) {
        min = v;
        best = k;
      }
    });
    return best;
  }, [distances, userPos]);

  const list = React.useMemo(() => {
    const base = BRANCHES.filter((b) => filter === "All" || b.emirate === filter);
    if (!userPos) return base;
    return [...base].sort((a, b) => (distances.get(a.slug) ?? 0) - (distances.get(b.slug) ?? 0));
  }, [filter, userPos, distances]);

  const select = React.useCallback((slug: string, fromMap = false) => {
    setSelected(slug);
    window.setTimeout(() => markers.current.get(slug)?.openPopup(), 700);
    if (fromMap) {
      itemRefs.current.get(slug)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setStatus("Your browser doesn’t support location. Browse the branches below instead.");
      return;
    }
    setLocating(true);
    setStatus("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(here);
        setFilter("All");
        let best = BRANCHES[0];
        let min = Infinity;
        for (const b of BRANCHES) {
          const d = haversineKm(here, [b.lat, b.lng]);
          if (d < min) {
            min = d;
            best = b;
          }
        }
        setSelected(best.slug);
        window.setTimeout(() => markers.current.get(best.slug)?.openPopup(), 1800);
        setStatus(`Nearest branch: ${best.name} — about ${min < 10 ? min.toFixed(1) : Math.round(min)} km away.`);
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setStatus(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was declined — no problem, all branches are listed below."
            : "We couldn’t work out your location. All branches are listed below."
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Fullscreen: Escape to close, scroll lock, focus handling + simple focus trap.
  React.useEffect(() => {
    if (!expanded) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key !== "Tab" || !shell.current) return;
      const f = shell.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
      prevFocus?.focus?.();
    };
  }, [expanded]);

  const FILTERS: Filter[] = ["All", "Dubai", "Abu Dhabi"];

  return (
    <div
      ref={shell}
      className={cn(
        expanded
          ? "fixed inset-0 z-[125] flex flex-col bg-ivory p-3 sm:p-5"
          : "grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8"
      )}
      {...(expanded ? { role: "dialog", "aria-modal": true, "aria-label": "Branch map, expanded" } : {})}
    >
      {/* ——— list column ——— */}
      <div className={cn("order-2 flex min-h-0 flex-col lg:order-1", expanded && "hidden")}>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Filter branches by emirate" className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "min-h-11 rounded-full border px-5 font-subheader text-[0.64rem] uppercase tracking-wide2 transition-colors",
                  filter === f
                    ? "border-burgundy bg-burgundy text-ivory"
                    : "border-burgundy/30 text-burgundy hover:bg-cream"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-burgundy px-5 font-subheader text-[0.64rem] uppercase tracking-wide2 text-ivory transition-colors hover:bg-ink disabled:opacity-60"
          >
            <LocateFixed className="h-4 w-4" aria-hidden />
            {locating ? "Locating…" : "Near me"}
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-espresso/80">
          {status}
        </p>

        <ul
          data-lenis-prevent
          className="mt-3 max-h-[34rem] space-y-3 overflow-y-auto pr-1 [scrollbar-color:rgb(var(--burgundy)/0.4)_transparent] [scrollbar-width:thin] lg:max-h-[41rem]"
        >
          {list.map((b: Branch) => {
            const active = selected === b.slug;
            const dist = distances.get(b.slug);
            return (
              <li
                key={b.slug}
                ref={(el) => {
                  if (el) itemRefs.current.set(b.slug, el);
                }}
              >
                <div
                  className={cn(
                    "rounded-md border p-5 transition-all duration-500 ease-silk",
                    active
                      ? "border-burgundy bg-cream shadow-[0_14px_34px_-22px_rgb(var(--burgundy)/0.7)]"
                      : "border-burgundy/15 bg-ivory hover:border-burgundy/45"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => select(b.slug)}
                    aria-pressed={active}
                    className="block w-full text-left"
                  >
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-serif text-2xl leading-tight text-burgundy">{b.name}</span>
                      <span className="font-subheader text-[0.58rem] uppercase tracking-luxe text-burgundy/80">
                        {b.emirate}
                      </span>
                      {b.slug === nearestSlug && (
                        <span className="rounded-full bg-sky px-2.5 py-0.5 font-subheader text-[0.56rem] uppercase tracking-wide2 text-burgundy">
                          Nearest
                        </span>
                      )}
                      {dist !== undefined && (
                        <span className="text-xs text-espresso/70">
                          {dist < 10 ? dist.toFixed(1) : Math.round(dist)} km
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block text-sm leading-snug text-espresso/85">{b.address}</span>
                  </button>
                  <div className="mt-3 grid gap-1.5 text-xs text-espresso/80">
                    <p className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-burgundy" aria-hidden />
                      <span>{b.hours.join(" · ")}</span>
                    </p>
                    {b.embroidery && (
                      <p className="font-subheader text-[0.58rem] uppercase tracking-wide2 text-burgundy">
                        Embroidery available at this branch
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    <a
                      href={telHref(b.phone)}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-burgundy underline-offset-4 hover:underline"
                    >
                      <Phone className="h-4 w-4" aria-hidden /> {b.phone}
                    </a>
                    <a
                      href={directionsUrl(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 font-subheader text-[0.64rem] uppercase tracking-wide2 text-burgundy underline-offset-4 hover:underline"
                    >
                      <Navigation className="h-4 w-4" aria-hidden /> Get directions
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ——— map column ——— */}
      <div
        className={cn(
          "relative order-1 overflow-hidden rounded-md border border-burgundy/20 lg:order-2",
          expanded ? "min-h-0 flex-1" : "h-[24rem] sm:h-[30rem] lg:sticky lg:top-28 lg:h-[41rem]"
        )}
      >
        <div data-lenis-prevent className="h-full w-full">
          <BranchMap
            selectedSlug={selected}
            nearestSlug={nearestSlug}
            userPos={userPos}
            onSelect={(slug) => select(slug, true)}
            expanded={expanded}
            registerMarker={registerMarker}
            registerMap={registerMap}
          />
        </div>
        <button
          ref={closeBtn}
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Exit full screen map" : "Expand map to full screen"}
          className="absolute right-3 top-3 z-[500] inline-flex min-h-11 items-center gap-2 rounded-full bg-ivory px-4 font-subheader text-[0.62rem] uppercase tracking-wide2 text-burgundy shadow-md ring-1 ring-burgundy/15 transition-colors hover:bg-cream"
        >
          {expanded ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
          {expanded ? "Close" : "Full screen"}
        </button>
        {expanded && (
          <div className="absolute bottom-3 left-3 z-[500] flex gap-2">
            <button
              type="button"
              onClick={locate}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-burgundy px-4 font-subheader text-[0.62rem] uppercase tracking-wide2 text-ivory"
            >
              <LocateFixed className="h-4 w-4" aria-hidden /> Near me
            </button>
            {status && (
              <p role="status" className="max-w-[16rem] self-center rounded bg-ivory/95 px-3 py-1.5 text-xs text-espresso shadow">
                {status}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
