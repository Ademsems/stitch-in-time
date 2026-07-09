"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { BRANCHES, directionsUrl, telHref, type Branch } from "@/data/branches";

/**
 * Leaflet map of all branches. Custom SVG div-icons are used so we depend on
 * NO external marker image assets (the classic broken-marker issue) and NO
 * tile API key — OpenStreetMap tiles only.
 */

// Burgundy teardrop pin. `active` renders larger/espresso for the focused pin.
function pinIcon(active: boolean) {
  const fill = active ? "#4a3428" : "#6b1f2a";
  const scale = active ? 1.15 : 1;
  const html = `
    <div style="transform: translate(-50%, -100%) scale(${scale}); transform-origin: bottom center;">
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="${fill}"/>
        <circle cx="15" cy="15" r="5.5" fill="#e8e2d8"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "sit-pin",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -38],
  });
}

/** Imperatively fit/fly the map in response to selection + fullscreen toggles. */
function MapController({
  selectedSlug,
  expanded,
  registerMap,
}: {
  selectedSlug: string | null;
  expanded: boolean;
  registerMap: (map: L.Map) => void;
}) {
  const map = useMap();

  React.useEffect(() => {
    registerMap(map);
  }, [map, registerMap]);

  // Fit all branches on first render.
  React.useEffect(() => {
    const bounds = L.latLngBounds(BRANCHES.map((b) => [b.lat, b.lng]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [map]);

  // Recalculate size after the container resizes (fullscreen toggle / layout).
  React.useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 260);
    return () => clearTimeout(t);
  }, [map, expanded]);

  // Fly to the selected branch.
  React.useEffect(() => {
    if (!selectedSlug) return;
    const branch = BRANCHES.find((b) => b.slug === selectedSlug);
    if (branch) {
      map.flyTo([branch.lat, branch.lng], 14, { duration: 0.8 });
    }
  }, [map, selectedSlug]);

  return null;
}

interface BranchMapProps {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  expanded: boolean;
  /** Called with each marker's Leaflet ref so the parent can open popups. */
  registerMarker: (slug: string, marker: L.Marker | null) => void;
  registerMap: (map: L.Map) => void;
}

export default function BranchMap({
  selectedSlug,
  onSelect,
  expanded,
  registerMarker,
  registerMap,
}: BranchMapProps) {
  return (
    <MapContainer
      // Centre roughly between Dubai & Abu Dhabi; controller fits bounds after.
      center={[24.9, 54.9]}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
      // a11y: the container is focusable and labelled.
      aria-label="Map of Stitch In Time branches across Dubai and Abu Dhabi"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController
        selectedSlug={selectedSlug}
        expanded={expanded}
        registerMap={registerMap}
      />
      {BRANCHES.map((branch) => (
        <Marker
          key={branch.slug}
          position={[branch.lat, branch.lng]}
          icon={pinIcon(branch.slug === selectedSlug)}
          ref={(ref) => registerMarker(branch.slug, ref)}
          eventHandlers={{ click: () => onSelect(branch.slug) }}
        >
          <Popup>
            <BranchPopup branch={branch} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function BranchPopup({ branch }: { branch: Branch }) {
  return (
    <div className="min-w-[210px] font-sans text-ink">
      <p className="font-serif text-lg text-espresso">{branch.name}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-burgundy">
        {branch.emirate}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink/80">{branch.address}</p>
      <ul className="mt-2 text-xs text-ink/70">
        {branch.hours.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <a
        href={telHref(branch.phone)}
        className="mt-2 block text-sm font-medium text-espresso hover:text-burgundy"
      >
        {branch.phone}
      </a>
      <a
        href={directionsUrl(branch)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center rounded-sm bg-[#6b1f2a] px-3 py-1.5 text-xs font-medium text-[#e8e2d8] hover:bg-[#4a3428]"
      >
        Get directions →
      </a>
    </div>
  );
}
