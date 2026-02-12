import { Roaster } from "./types";
import roastersData from "@/data/roasters.json";

export function getAllRoasters(): Roaster[] {
  return roastersData as Roaster[];
}

export function getRoasterBySlug(slug: string): Roaster | undefined {
  return getAllRoasters().find((r) => r.slug === slug);
}

export function getAllRegions(): string[] {
  const regions = new Set(getAllRoasters().map((r) => r.region));
  return Array.from(regions).sort();
}

export function getAllRoastStyles(): string[] {
  const styles = new Set(getAllRoasters().flatMap((r) => r.roastStyles));
  return Array.from(styles).sort();
}

export function filterRoasters(
  roasters: Roaster[],
  {
    search,
    region,
    roastStyle,
    onlineOnly,
  }: {
    search?: string;
    region?: string;
    roastStyle?: string;
    onlineOnly?: boolean;
  }
): Roaster[] {
  let filtered = roasters;

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }

  if (region) {
    filtered = filtered.filter((r) => r.region === region);
  }

  if (roastStyle) {
    filtered = filtered.filter((r) => r.roastStyles.includes(roastStyle));
  }

  if (onlineOnly) {
    filtered = filtered.filter((r) => r.onlineOrdering.available);
  }

  return filtered;
}
