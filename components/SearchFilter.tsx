"use client";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  regions: string[];
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  roastStyles: string[];
  selectedRoastStyle: string;
  onRoastStyleChange: (value: string) => void;
  onlineOnly: boolean;
  onOnlineOnlyChange: (value: boolean) => void;
}

export default function SearchFilter({
  search,
  onSearchChange,
  regions,
  selectedRegion,
  onRegionChange,
  roastStyles,
  selectedRoastStyle,
  onRoastStyleChange,
  onlineOnly,
  onOnlineOnlyChange,
}: SearchFilterProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search roasters by name, city, or description..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onRegionChange("")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              selectedRegion === ""
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() =>
                onRegionChange(selectedRegion === region ? "" : region)
              }
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedRegion === region
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-stone-300 hidden sm:block" />

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onRoastStyleChange("")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              selectedRoastStyle === ""
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All Styles
          </button>
          {roastStyles.map((style) => (
            <button
              key={style}
              onClick={() =>
                onRoastStyleChange(selectedRoastStyle === style ? "" : style)
              }
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedRoastStyle === style
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-stone-300 hidden sm:block" />

        <button
          onClick={() => onOnlineOnlyChange(!onlineOnly)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            onlineOnly
              ? "bg-green-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Online Ordering
        </button>
      </div>
    </div>
  );
}
