"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import { Maximize2, Minimize2, MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  DUBAI_BRANCHES,
  ABU_DHABI_BRANCHES,
  directionsUrl,
  telHref,
  type Branch,
} from "@/data/branches";
import { cn } from "@/lib/utils";

// Leaflet must not run on the server — load the map client-side only.
const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-taupe/40">
      <span className="font-sans text-sm uppercase tracking-luxe text-espresso/60">
        Loading map…
      </span>
    </div>
  ),
});

export function LocationsExplorer() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const markerRefs = React.useRef<Record<string, L.Marker | null>>({});
  const mapRef = React.useRef<L.Map | null>(null);

  const registerMarker = React.useCallback((slug: string, marker: L.Marker | null) => {
    markerRefs.current[slug] = marker;
  }, []);

  const registerMap = React.useCallback((map: L.Map) => {
    mapRef.current = map;
  }, []);

  const handleSelect = React.useCallback((slug: string) => {
    setSelectedSlug(slug);
    // Open the matching popup once the map has flown to it.
    const marker = markerRefs.current[slug];
    if (marker) {
      window.setTimeout(() => marker.openPopup(), 850);
    }
  }, []);

  // Close fullscreen on Escape.
  React.useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const mapPanel = (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-taupe",
        expanded ? "h-full w-full" : "h-[420px] w-full lg:h-full"
      )}
    >
      <BranchMap
        selectedSlug={selectedSlug}
        onSelect={handleSelect}
        expanded={expanded}
        registerMarker={registerMarker}
        registerMap={registerMap}
      />
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Exit fullscreen map" : "Expand map to fullscreen"}
        className="absolute right-3 top-3 z-[500] inline-flex h-10 w-10 items-center justify-center rounded-sm bg-cream/95 text-espresso shadow-md ring-1 ring-espresso/10 transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {expanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );

  const list = (
    <div
      className={cn(
        "flex flex-col",
        expanded ? "h-full overflow-y-auto" : "lg:h-full lg:overflow-y-auto"
      )}
    >
      <BranchGroup
        title="Dubai"
        count={DUBAI_BRANCHES.length}
        branches={DUBAI_BRANCHES}
        selectedSlug={selectedSlug}
        onSelect={handleSelect}
      />
      <BranchGroup
        title="Abu Dhabi"
        count={ABU_DHABI_BRANCHES.length}
        branches={ABU_DHABI_BRANCHES}
        selectedSlug={selectedSlug}
        onSelect={handleSelect}
      />
    </div>
  );

  return (
    <>
      {/* Inline layout: list + map side by side on desktop. */}
      <div
        className={cn(
          "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:h-[620px]",
          expanded && "invisible"
        )}
      >
        <div className="order-2 lg:order-1 lg:h-full lg:overflow-hidden">{list}</div>
        <div className="order-1 lg:order-2">{mapPanel}</div>
      </div>

      {/* Fullscreen overlay */}
      {expanded && (
        <div
          className="fixed inset-0 z-[60] bg-cream p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Branch map — fullscreen"
        >
          <div className="grid h-full grid-rows-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:grid-rows-1">
            <div className="hidden lg:block lg:h-full lg:overflow-hidden">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-espresso">Our Locations</h2>
              </div>
              {list}
            </div>
            <div className="h-full">{mapPanel}</div>
          </div>
        </div>
      )}
    </>
  );
}

function BranchGroup({
  title,
  count,
  branches,
  selectedSlug,
  onSelect,
}: {
  title: string;
  count: number;
  branches: Branch[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="sticky top-0 z-10 bg-cream/95 py-2 font-sans text-xs uppercase tracking-luxe text-burgundy backdrop-blur">
        {title} — {count} {count === 1 ? "Location" : "Locations"}
      </h3>
      <ul className="mt-2 space-y-2">
        {branches.map((branch) => {
          const active = branch.slug === selectedSlug;
          return (
            <li key={branch.slug}>
              <div
                className={cn(
                  "rounded-md border p-4 transition-colors",
                  active
                    ? "border-burgundy bg-burgundy/5"
                    : "border-taupe/70 bg-cream/60 hover:border-burgundy/50"
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(branch.slug)}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  aria-pressed={active}
                >
                  <p className="flex items-start justify-between gap-2 font-serif text-lg text-espresso">
                    {branch.name}
                    {branch.embroidery && (
                      <span className="mt-1 shrink-0 rounded-full bg-sky/30 px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-wide text-espresso">
                        Embroidery
                      </span>
                    )}
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-ink/75">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-burgundy" />
                    {branch.address}
                  </p>
                  <div className="mt-2 flex items-start gap-1.5 text-xs text-ink/65">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-burgundy" />
                    <span>
                      {branch.hours.map((h) => (
                        <span key={h} className="block">
                          {h}
                        </span>
                      ))}
                    </span>
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-taupe/50 pt-3">
                  <a
                    href={telHref(branch.phone)}
                    className="inline-flex items-center gap-1.5 text-sm text-espresso hover:text-burgundy"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {branch.phone}
                  </a>
                  <a
                    href={directionsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:text-espresso"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Get directions
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
