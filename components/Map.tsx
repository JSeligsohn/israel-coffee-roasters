"use client";

import { useEffect, useState } from "react";
import { Roaster } from "@/lib/types";

export default function MapView({ roasters }: { roasters: Roaster[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center bg-stone-100 rounded-lg">
        <p className="text-stone-500">Loading map...</p>
      </div>
    );
  }

  return <MapInner roasters={roasters} />;
}

function MapInner({ roasters }: { roasters: Roaster[] }) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const L = require("leaflet") as typeof import("leaflet");
  const { MapContainer, TileLayer, Marker, Popup } =
    require("react-leaflet") as typeof import("react-leaflet");
  /* eslint-enable @typescript-eslint/no-require-imports */

  // Fix default marker icons for Leaflet + webpack
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Center of Israel
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
      {roasters.map((roaster) => (
        <Marker
          key={roaster.slug}
          position={[roaster.coordinates.lat, roaster.coordinates.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{roaster.name}</p>
              <p className="text-stone-500">{roaster.city}</p>
              <a
                href={`/roasters/${roaster.slug}`}
                className="mt-1 inline-block text-amber-700 underline"
              >
                View profile
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
