export interface Roaster {
  slug: string;
  name: string;
  nameHe?: string;
  city: string;
  region: string;
  coordinates: { lat: number; lng: number };
  description: string;
  website: string;
  onlineOrdering: { available: boolean; url?: string };
  retailLocations: string[];
  roastStyles: string[];
  foundedYear?: number;
  image?: string;
}
