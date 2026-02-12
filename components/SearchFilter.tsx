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

const ROAST_STYLE_LABELS: Record<string, string> = {
  light: "Light",
  medium: "Medium",
  dark: "Dark",
  "single-origin": "Single-Origin",
  espresso: "Espresso",
};

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-amber-700 text-white"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
      }`}
    >
      {children}
    </button>
  );
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
    <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, city, or description…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-stone-50 pl-9 pr-4 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {/* Region */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide mr-0.5">
            Region
          </span>
          <PillButton
            active={selectedRegion === ""}
            onClick={() => onRegionChange("")}
          >
            All
          </PillButton>
          {regions.map((region) => (
            <PillButton
              key={region}
              active={selectedRegion === region}
              onClick={() => onRegionChange(selectedRegion === region ? "" : region)}
            >
              {region}
            </PillButton>
          ))}
        </div>

        <div className="h-4 w-px bg-stone-200 hidden sm:block self-center" />

        {/* Roast style */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide mr-0.5">
            Roast
          </span>
          <PillButton
            active={selectedRoastStyle === ""}
            onClick={() => onRoastStyleChange("")}
          >
            All
          </PillButton>
          {roastStyles.map((style) => (
            <PillButton
              key={style}
              active={selectedRoastStyle === style}
              onClick={() =>
                onRoastStyleChange(selectedRoastStyle === style ? "" : style)
              }
            >
              {ROAST_STYLE_LABELS[style] ?? style}
            </PillButton>
          ))}
        </div>

        <div className="h-4 w-px bg-stone-200 hidden sm:block self-center" />

        {/* Online ordering */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={(e) => onOnlineOnlyChange(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-stone-300 text-amber-600 accent-amber-600 cursor-pointer"
          />
          <span className="text-xs font-medium text-stone-600">Online ordering</span>
        </label>
      </div>
    </div>
  );
}
