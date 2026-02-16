"use client";

import dynamic from "next/dynamic";
import { Roaster } from "@/lib/types";
import { FlyToFn } from "@/components/Map";

const MapView = dynamic(() => import("@/components/Map"), { ssr: false });

interface MapWrapperProps {
  roasters: Roaster[];
  userLocation?: { lat: number; lng: number } | null;
  flyRef?: React.MutableRefObject<FlyToFn | null>;
  fitCoords?: [number, number][] | null;
}

export default function MapWrapper({ roasters, userLocation, flyRef, fitCoords }: MapWrapperProps) {
  return <MapView roasters={roasters} userLocation={userLocation} flyRef={flyRef} fitCoords={fitCoords} />;
}
