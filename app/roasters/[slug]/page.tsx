import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllRoasters, getRoasterBySlug } from "@/lib/roasters";

export function generateStaticParams() {
  return getAllRoasters().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const roaster = getRoasterBySlug(slug);
    if (!roaster) return { title: "Not Found" };
    return {
      title: `${roaster.name} — Israel Coffee Roasters`,
      description: roaster.description,
    };
  });
}

export default async function RoasterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roaster = getRoasterBySlug(slug);
  if (!roaster) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-6"
      >
        &larr; Back to all roasters
      </Link>

      <div className="rounded-lg border border-stone-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            {roaster.image && (
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-lg bg-stone-50 border border-stone-100 p-2">
                <Image
                  src={roaster.image}
                  alt={`${roaster.name} logo`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {roaster.name}
              </h1>
              {roaster.nameHe && (
                <p className="mt-1 text-lg text-stone-500" dir="rtl">
                  {roaster.nameHe}
                </p>
              )}
            </div>
          </div>
          {roaster.foundedYear && (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
              Est. {roaster.foundedYear}
            </span>
          )}
        </div>

        <p className="mt-1 text-stone-500">
          {roaster.city}, {roaster.region}
        </p>

        <p className="mt-6 text-stone-700 leading-relaxed">
          {roaster.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {roaster.roastStyles.map((style) => (
            <span
              key={style}
              className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800"
            >
              {style}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
              Website
            </h2>
            <a
              href={roaster.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-amber-700 hover:text-amber-800 underline underline-offset-2 break-all"
            >
              {roaster.website}
            </a>
          </div>

          {roaster.onlineOrdering.available && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                Online Ordering
              </h2>
              {roaster.onlineOrdering.url ? (
                <a
                  href={roaster.onlineOrdering.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-full sm:w-auto items-center justify-center gap-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                >
                  Order Online &rarr;
                </a>
              ) : (
                <p className="mt-1 text-stone-600">
                  Available — check their website for details
                </p>
              )}
            </div>
          )}

          {roaster.retailLocations.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                Where to Find
              </h2>
              <ul className="mt-1 space-y-1">
                {roaster.retailLocations.map((loc) => (
                  <li key={loc} className="text-stone-600">
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
