"use client";

import dynamic from "next/dynamic";
import { Roaster } from "@/lib/types";

const MapView = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapWrapper({ roasters }: { roasters: Roaster[] }) {
  return <MapView roasters={roasters} />;
}
