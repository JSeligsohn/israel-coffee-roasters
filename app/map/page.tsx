import Link from "next/link";
import { getAllRoasters } from "@/lib/roasters";
import MapWrapper from "@/components/MapWrapper";

const roasters = getAllRoasters();

export const metadata = {
  title: "Map — Israel Coffee Roasters",
  description: "Explore coffee roasters across Israel on an interactive map.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Roaster Map</h1>
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          &larr; Back to list
        </Link>
      </div>
      <div className="h-[calc(100vh-220px)] min-h-[400px]">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <MapWrapper roasters={roasters} />
      </div>
    </div>
  );
}
