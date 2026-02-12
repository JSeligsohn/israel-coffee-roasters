import Link from "next/link";
import Image from "next/image";
import { Roaster } from "@/lib/types";

export default function RoasterCard({ roaster }: { roaster: Roaster }) {
  return (
    <Link
      href={`/roasters/${roaster.slug}`}
      className="group block rounded-lg border border-stone-200 bg-white p-5 transition-all hover:shadow-md hover:border-stone-300"
    >
      <div className="flex items-start gap-4">
        {roaster.image && (
          <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-lg bg-stone-50 border border-stone-100 p-1.5">
            <Image
              src={roaster.image}
              alt={`${roaster.name} logo`}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
              {roaster.name}
            </h3>
            {roaster.onlineOrdering.available && (
              <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                Order Online
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-stone-500">
            {roaster.city} &middot; {roaster.region}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-stone-600 line-clamp-2">
        {roaster.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {roaster.roastStyles.map((style) => (
          <span
            key={style}
            className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600"
          >
            {style}
          </span>
        ))}
      </div>
    </Link>
  );
}
