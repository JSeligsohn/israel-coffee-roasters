"use client";

import { useState } from "react";
import { getAllRoasters, getAllRegions, getAllRoastStyles, filterRoasters } from "@/lib/roasters";
import RoasterCard from "@/components/RoasterCard";
import SearchFilter from "@/components/SearchFilter";

const allRoasters = getAllRoasters();
const regions = getAllRegions();
const roastStyles = getAllRoastStyles();

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedRoastStyle, setSelectedRoastStyle] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = filterRoasters(allRoasters, {
    search,
    region: selectedRegion || undefined,
    roastStyle: selectedRoastStyle || undefined,
    onlineOnly: onlineOnly || undefined,
  });

  return (
    <div>
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="flex justify-center gap-3 mb-6">
            <span className="text-5xl">☕</span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Israel Coffee Roasters
          </h1>
          <p className="mt-4 text-lg text-amber-100 max-w-xl mx-auto">
            Discover specialty coffee roasters from across Israel &mdash; from
            the bustling streets of Tel Aviv to the hills of Jerusalem and
            beyond.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <SearchFilter
        search={search}
        onSearchChange={setSearch}
        regions={regions}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        roastStyles={roastStyles}
        selectedRoastStyle={selectedRoastStyle}
        onRoastStyleChange={setSelectedRoastStyle}
        onlineOnly={onlineOnly}
        onOnlineOnlyChange={setOnlineOnly}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((roaster) => (
            <RoasterCard key={roaster.slug} roaster={roaster} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-stone-500">
            No roasters found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}
