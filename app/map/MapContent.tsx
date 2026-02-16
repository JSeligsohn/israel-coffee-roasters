"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { getAllRoasters } from "@/lib/roasters";
import MapWrapper from "@/components/MapWrapper";
import { Roaster } from "@/lib/types";
import { FlyToFn } from "@/components/Map";

const allRoasters = getAllRoasters();

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type UserLocation = { lat: number; lng: number };
type RoasterWithDist = Roaster & { distKm: number };

function formatDist(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export default function MapContent() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearest, setNearest] = useState<RoasterWithDist[]>([]);
  const [fitCoords, setFitCoords] = useState<[number, number][] | null>(null);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const flyRef = useRef<FlyToFn | null>(null);

  function computeNearest(loc: UserLocation) {
    const sorted = allRoasters
      .map((r) => ({
        ...r,
        distKm: haversineKm(loc.lat, loc.lng, r.coordinates.lat, r.coordinates.lng),
      }))
      .sort((a, b) => a.distKm - b.distKm);
    const top = sorted.slice(0, 5);
    setNearest(top);
    setFitCoords([
      [loc.lat, loc.lng],
      ...top.map((r): [number, number] => [r.coordinates.lat, r.coordinates.lng]),
    ]);
  }

  function handleGeolocate() {
    if (!navigator.geolocation) {
      setErrorMsg("Your browser doesn't support geolocation.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        computeNearest(loc);
        setStatus("idle");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg("Location access was denied. Please allow it in your browser settings and try again.");
        } else {
          setErrorMsg("Couldn't get your location. Try entering an address instead.");
        }
        setStatus("error");
      }
    );
  }

  async function handleSearch() {
    if (!address.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ", Israel")}&format=json&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      if (data[0]) {
        const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setUserLocation(loc);
        computeNearest(loc);
        setStatus("idle");
      } else {
        setErrorMsg("Couldn't find that address. Try a neighborhood or city name.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Search failed. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6 flex flex-col" style={{ height: "calc(100dvh - 72px)" }}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between shrink-0">
        <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Roaster Map</h1>
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors">
          &larr; Back to list
        </Link>
      </div>

      {/* Find nearest bar */}
      <div className="mb-2 flex gap-2 shrink-0">
        <button
          onClick={handleGeolocate}
          disabled={status === "loading"}
          title="Use my current location"
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-50"
        >
          📍 <span className="hidden sm:inline">My location</span>
        </button>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Address or neighborhood…"
          className="flex-1 min-w-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-amber-700 px-3 sm:px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "…" : "Search"}
        </button>
      </div>

      {status === "error" && errorMsg && (
        <p className="mb-2 text-xs text-red-500 shrink-0">{errorMsg}</p>
      )}

      {/* Map + optional nearest panel */}
      <div className="flex flex-col sm:flex-row flex-1 gap-3 min-h-0">
        {/* Map */}
        <div className="flex-1 min-h-0" style={{ minHeight: nearest.length > 0 ? undefined : "100%" }}>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
          <MapWrapper
            roasters={allRoasters}
            userLocation={userLocation}
            flyRef={flyRef}
            fitCoords={fitCoords}
          />
        </div>

        {/* Nearest panel — horizontal scroll on mobile, sidebar on desktop */}
        {nearest.length > 0 && (
          <>
            {/* Mobile: horizontal scrolling strip */}
            <div className="sm:hidden shrink-0 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
              <p className="shrink-0 self-center text-xs font-semibold text-stone-400 uppercase tracking-wide pr-1">
                Nearest:
              </p>
              {nearest.map((r, i) => (
                <button
                  key={r.slug}
                  onClick={() => flyRef.current?.(r.slug, r.coordinates.lat, r.coordinates.lng)}
                  className="shrink-0 flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 hover:border-amber-300 transition-all"
                >
                  <span className="text-xs font-bold text-stone-300 w-3">{i + 1}</span>
                  {r.image ? (
                    <div className="w-6 h-6 rounded bg-stone-50 border border-stone-100 flex items-center justify-center overflow-hidden p-0.5 shrink-0">
                      <img src={r.image} alt={r.name} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <span className="text-sm">☕</span>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-semibold text-stone-900 whitespace-nowrap">{r.name}</p>
                    <p className="text-xs text-stone-400">{formatDist(r.distKm)}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop: vertical sidebar */}
            <div className="hidden sm:flex w-60 shrink-0 flex-col gap-2 overflow-y-auto pr-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide shrink-0">
                Nearest roasters
              </p>
              {nearest.map((r, i) => (
                <button
                  key={r.slug}
                  onClick={() => flyRef.current?.(r.slug, r.coordinates.lat, r.coordinates.lng)}
                  className="text-left rounded-lg border border-stone-200 bg-white p-3 hover:border-amber-300 hover:shadow-sm transition-all shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-300 w-4 shrink-0">{i + 1}</span>
                    {r.image ? (
                      <div className="w-8 h-8 rounded bg-stone-50 border border-stone-100 flex items-center justify-center overflow-hidden p-0.5 shrink-0">
                        <img src={r.image} alt={r.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center shrink-0 text-base">
                        ☕
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-stone-900 truncate leading-tight">{r.name}</p>
                      <p className="text-xs text-stone-400">{formatDist(r.distKm)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
