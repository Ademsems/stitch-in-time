"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { BRANCHES, directionsUrl, telHref, type Branch } from "@/data/branches";

/**
 * Leaflet map of all branches. Pins are custom spool-shaped burgundy markers
 * (inline SVG div-icons) — no external marker image assets, and OpenStreetMap
 * tiles only, so there is no API key and nothing that can 404.
 */

const SPOOL =
  "M2 1h16v3h-3.2c-.6 0-.8.3-.8.9v14.2c0 .6.2.9.8.9H18v3H2v-3h3.2c.6 0 .8-.3.8-.9V4.9c0-.6-.2-.9-.8-.9H2z";

function pinIcon(active: boolean, nearest: boolean) {
  const html = `
    <div class="sit-pin${active ? " is-active" : ""}${nearest ? " is-nearest" : ""}">
      <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 0C9 0 0 8.7 0 19.5 0 33 20 52 20 52s20-19 20-32.5C40 8.7 31 0 20 0z" fill="#561B26"/>
        <circle cx="20" cy="19.5" r="13.5" fill="#FFFEFA"/>
        <g transform="translate(12.5 7) scale(0.75)"><path d="${SPOOL}" fill="#561B26"/></g>
        <path d="M14.5 16.6c3-1.2 8-1.2 11 0M14.5 21.2c3-1.2 8-1.2 11 0" stroke="#FFFEFA" stroke-width="0.9" fill="none"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "sit-pin-wrap",
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -46],
  });
}

const userIcon = L.divIcon({
  html: `<div style="width:18px;height:18px;border-radius:9999px;background:#9DB4CE;border:3px solid #FFFEFA;box-shadow:0 0 0 6px rgba(157,180,206,.35)"></div>`,
  className: "sit-user",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function MapController({
  selectedSlug,
  expanded,
  userPos,
  nearestSlug,
  registerMap,
}: {
  selectedSlug: string | null;
  expanded: boolean;
  userPos: [number, number] | null;
  nearestSlug: string | null;
  registerMap: (map: L.Map) => void;
}) {
  const map = useMap();

  React.useEffect(() => {
    registerMap(map);
  }, [map, registerMap]);

  React.useEffect(() => {
    map.fitBounds(L.latLngBounds(BRANCHES.map((b) => [b.lat, b.lng])), { padding: [48, 48] });
  }, [map]);

  React.useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 320);
    if (expanded) map.scrollWheelZoom.enable();
    else map.scrollWheelZoom.disable();
    return () => clearTimeout(t);
  }, [map, expanded]);

  // Smooth fly-to on selection.
  React.useEffect(() => {
    if (!selectedSlug) return;
    const b = BRANCHES.find((x) => x.slug === selectedSlug);
    if (!b) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.setView([b.lat, b.lng], 15, { animate: false });
    else map.flyTo([b.lat, b.lng], 15, { duration: 1.4, easeLinearity: 0.2 });
  }, [map, selectedSlug]);

  // "Near me": frame the user and the closest branch together.
  React.useEffect(() => {
    if (!userPos || !nearestSlug) return;
    const b = BRANCHES.find((x) => x.slug === nearestSlug);
    if (!b) return;
    map.flyToBounds(L.latLngBounds([userPos, [b.lat, b.lng]]), {
      padding: [90, 90],
      maxZoom: 14,
      duration: 1.6,
    });
  }, [map, userPos, nearestSlug]);

  return null;
}

interface BranchMapProps {
  selectedSlug: string | null;
  nearestSlug: string | null;
  userPos: [number, number] | null;
  onSelect: (slug: string) => void;
  expanded: boolean;
  registerMarker: (slug: string, marker: L.Marker | null) => void;
  registerMap: (map: L.Map) => void;
}

export default function BranchMap({
  selectedSlug,
  nearestSlug,
  userPos,
  onSelect,
  expanded,
  registerMarker,
  registerMap,
}: BranchMapProps) {
  return (
    <MapContainer
      center={[24.9, 54.9]}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="Map of Stitch In Time branches across Dubai and Abu Dhabi"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController
        selectedSlug={selectedSlug}
        expanded={expanded}
        userPos={userPos}
        nearestSlug={nearestSlug}
        registerMap={registerMap}
      />
      {userPos && <Marker position={userPos} icon={userIcon} interactive={false} keyboard={false} />}
      {BRANCHES.map((branch) => (
        <Marker
          key={branch.slug}
          position={[branch.lat, branch.lng]}
          icon={pinIcon(branch.slug === selectedSlug, branch.slug === nearestSlug)}
          title={branch.name}
          alt={`${branch.name} branch`}
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
    <div className="min-w-[220px] font-sans text-espresso">
      <p className="font-serif text-[1.35rem] leading-tight text-burgundy">{branch.name}</p>
      <p className="mt-0.5 font-subheader text-[0.6rem] uppercase tracking-luxe text-burgundy">
        {branch.emirate}
      </p>
      <p className="mt-2.5 text-sm leading-snug text-espresso/85">{branch.address}</p>
      <ul className="mt-2 text-xs text-espresso/75">
        {branch.hours.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <a
        href={telHref(branch.phone)}
        className="mt-2 block text-sm text-espresso underline-offset-2 hover:text-burgundy hover:underline"
      >
        {branch.phone}
      </a>
      <a
        href={directionsUrl(branch)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center justify-center rounded-sm bg-burgundy px-4 font-subheader text-[0.64rem] uppercase tracking-wide2 !text-ivory hover:bg-ink"
      >
        Get directions →
      </a>
    </div>
  );
}
