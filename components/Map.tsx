"use client";

import { useEffect, useRef, useState } from "react";
import { Roaster } from "@/lib/types";

const ROAST_STYLE_CLASSES: Record<string, string> = {
  light:           "bg-yellow-50 text-yellow-700",
  medium:          "bg-amber-50 text-amber-700",
  dark:            "bg-stone-200 text-stone-800",
  "single-origin": "bg-teal-50 text-teal-700",
  espresso:        "bg-orange-100 text-orange-800",
};

const ROAST_STYLE_LABELS: Record<string, string> = {
  light: "Light", medium: "Medium", dark: "Dark",
  "single-origin": "Single-Origin", espresso: "Espresso",
};

export type FlyToFn = (slug: string, lat: number, lng: number) => void;

interface MapViewProps {
  roasters: Roaster[];
  userLocation?: { lat: number; lng: number } | null;
  flyRef?: React.MutableRefObject<FlyToFn | null>;
  fitCoords?: [number, number][] | null;
}

export default function MapView({ roasters, userLocation, flyRef, fitCoords }: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center bg-stone-100 rounded-lg">
        <p className="text-stone-500">Loading map…</p>
      </div>
    );
  }

  return <MapInner roasters={roasters} userLocation={userLocation} flyRef={flyRef} fitCoords={fitCoords} />;
}

// Rendered inside MapContainer — can safely call useMap()
function MapController({
  flyRef,
  markerRefs,
  fitCoords,
}: {
  flyRef?: React.MutableRefObject<FlyToFn | null>;
  markerRefs: React.MutableRefObject<Record<string, any>>;
  fitCoords?: [number, number][] | null;
}) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { useMap } = require("react-leaflet") as typeof import("react-leaflet");
  const L = require("leaflet") as typeof import("leaflet");
  /* eslint-enable @typescript-eslint/no-require-imports */
  const map = useMap();

  useEffect(() => {
    if (!flyRef) return;
    flyRef.current = (slug, lat, lng) => {
      map.flyTo([lat, lng], 14, { duration: 0.8 });
      setTimeout(() => {
        markerRefs.current[slug]?.openPopup();
      }, 900);
    };
  }, [map, flyRef, markerRefs]);

  useEffect(() => {
    if (!fitCoords || fitCoords.length === 0) return;
    const timer = setTimeout(() => {
      map.invalidateSize();
      const bounds = L.latLngBounds(fitCoords);
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
    }, 150);
    return () => clearTimeout(timer);
  }, [map, fitCoords]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

function MapInner({ roasters, userLocation, flyRef, fitCoords }: MapViewProps) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const L = require("leaflet") as typeof import("leaflet");
  const { MapContainer, TileLayer, Marker, Popup } =
    require("react-leaflet") as typeof import("react-leaflet");
  /* eslint-enable @typescript-eslint/no-require-imports */

  const markerRefs = useRef<Record<string, any>>({});

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const userIcon = L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  const center: [number, number] = [31.5, 34.9];

  return (
    <MapContainer
      center={center}
      zoom={8}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController flyRef={flyRef} markerRefs={markerRefs} fitCoords={fitCoords} />

      {roasters.map((roaster) => (
        <Marker
          key={roaster.slug}
          position={[roaster.coordinates.lat, roaster.coordinates.lng]}
          icon={defaultIcon}
          ref={(el: any) => { markerRefs.current[roaster.slug] = el; }}
        >
          <Popup minWidth={210} maxWidth={260}>
            <div style={{ fontSize: 13 }}>
              {/* Logo + name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                {roaster.image && (
                  <div style={{ width: 40, height: 40, borderRadius: 6, background: "#f5f5f4", border: "1px solid #e7e5e4", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4, flexShrink: 0 }}>
                    <img src={roaster.image} alt={roaster.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 600, color: "#1c1917", lineHeight: 1.2 }}>{roaster.name}</div>
                  <div style={{ color: "#a8a29e", fontSize: 11, marginTop: 1 }}>{roaster.city} · {roaster.region}</div>
                </div>
              </div>

              {/* Roast style pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {roaster.roastStyles.map((style) => {
                  const cls = ROAST_STYLE_CLASSES[style];
                  // Map tailwind class pairs to inline styles for Leaflet popup
                  const styleMap: Record<string, React.CSSProperties> = {
                    light:           { background: "#fefce8", color: "#a16207" },
                    medium:          { background: "#fffbeb", color: "#b45309" },
                    dark:            { background: "#e7e5e4", color: "#44403c" },
                    "single-origin": { background: "#f0fdfa", color: "#0f766e" },
                    espresso:        { background: "#fff7ed", color: "#9a3412" },
                  };
                  return (
                    <span
                      key={style}
                      style={{
                        borderRadius: 999,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 500,
                        ...(styleMap[style] ?? { background: "#f5f5f4", color: "#57534e" }),
                      }}
                    >
                      {ROAST_STYLE_LABELS[style] ?? style}
                    </span>
                  );
                })}
              </div>

              {/* Footer: online badge + link */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {roaster.onlineOrdering.available ? (
                  <span style={{ fontSize: 11, color: "#15803d", fontWeight: 500 }}>● Order online</span>
                ) : <span />}
                <a
                  href={`/roasters/${roaster.slug}`}
                  style={{ fontSize: 12, color: "#b45309", fontWeight: 500, textDecoration: "none" }}
                >
                  View profile →
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>Your location</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
