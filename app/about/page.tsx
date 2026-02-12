import Link from "next/link";

export const metadata = {
  title: "Why Buy Local — Israel Coffee Roasters",
  description:
    "Why freshly roasted local coffee from Israeli roasters beats big-brand imports every time.",
};

function CoffeeBeansIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <ellipse cx="22" cy="32" rx="14" ry="20" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
      <path d="M22 12c-3 7-3 19 0 26s3 7 0 14" className="stroke-amber-600" strokeWidth="1.5" fill="none" />
      <ellipse cx="42" cy="32" rx="14" ry="20" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
      <path d="M42 12c-3 7-3 19 0 26s3 7 0 14" className="stroke-amber-600" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <circle cx="32" cy="36" r="22" className="fill-amber-50 stroke-amber-600" strokeWidth="2" />
      <rect x="29" y="6" width="6" height="6" rx="1" className="fill-amber-600" />
      <line x1="32" y1="36" x2="32" y2="22" className="stroke-amber-700" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="36" x2="42" y2="36" className="stroke-amber-500" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="36" r="2" className="fill-amber-700" />
    </svg>
  );
}

function HeartHandsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <path d="M32 52 C16 40 8 30 8 22a10 10 0 0 1 10-10c4 0 8 2 10 5v0" className="fill-red-50 stroke-red-400" strokeWidth="2" />
      <path d="M32 52 C48 40 56 30 56 22a10 10 0 0 0-10-10c-4 0-8 2-10 5v0" className="fill-red-50 stroke-red-400" strokeWidth="2" />
      <path d="M16 56c4-4 8-6 16-6s12 2 16 6" className="stroke-amber-600" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <polygon
        points="32,6 39,24 58,24 43,36 48,54 32,44 16,54 21,36 6,24 25,24"
        className="fill-amber-100 stroke-amber-600"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <rect x="12" y="20" width="32" height="30" rx="4" className="fill-amber-50 stroke-amber-600" strokeWidth="2" />
      <path d="M44 28h8a6 6 0 0 1 0 12h-8" className="stroke-amber-600" strokeWidth="2" fill="none" />
      <path d="M18 52h20v4a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2v-4z" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
      <path d="M22 26c0-3 2-5 2-8M28 26c0-3 2-5 2-8M34 26c0-3 2-5 2-8" className="stroke-amber-400" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="flex justify-center gap-3 mb-6">
            <span className="text-5xl">☕</span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Why Buy Local Coffee?
          </h1>
          <p className="mt-4 text-lg text-amber-100 max-w-xl mx-auto">
            The best coffee doesn't come from a global chain — it comes from
            passionate roasters right here in Israel, roasting beans days before
            they reach your cup.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Intro */}
        <p className="text-lg text-stone-600 leading-relaxed text-center max-w-2xl mx-auto">
          Many people assume great coffee has to come from Starbucks, Italy, or
          some exotic far-off place. But here's a secret every coffee
          professional knows:{" "}
          <strong className="text-stone-800">freshness is everything</strong>,
          and nobody does fresh like your local roaster.
        </p>

        {/* Cards */}
        <div className="mt-12 space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 flex gap-5">
            <div className="shrink-0 mt-1">
              <TimerIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                Freshness You Can Taste
              </h2>
              <p className="mt-2 text-stone-600 leading-relaxed">
                Coffee is at its peak flavor within days to weeks of roasting —
                not months. Those bags sitting on supermarket shelves or shipped
                across oceans? They've already lost much of what makes coffee
                special. When you buy from a local Israeli roaster, your beans
                were likely roasted days ago. That difference is unmistakable —
                brighter flavors, richer aromas, and a complexity that stale
                coffee simply can't deliver.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 flex gap-5">
            <div className="shrink-0 mt-1">
              <CoffeeBeansIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                Craft Over Corporate
              </h2>
              <p className="mt-2 text-stone-600 leading-relaxed">
                Large chains optimize for consistency and scale. Local roasters
                optimize for quality and character. Israeli roasters carefully
                source beans from farms around the world, then develop unique
                roast profiles that bring out each origin's best qualities.
                Every batch gets personal attention — something a factory
                producing millions of bags a year simply cannot match.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 flex gap-5">
            <div className="shrink-0 mt-1">
              <HeartHandsIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                Support Israeli Businesses
              </h2>
              <p className="mt-2 text-stone-600 leading-relaxed">
                When you buy from a local roaster, your money stays in the
                community. It supports Israeli entrepreneurs, creates local
                jobs, and fuels a growing specialty coffee culture right here at
                home. These aren't faceless corporations — they're passionate
                people who chose to build something meaningful in Israel.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 flex gap-5">
            <div className="shrink-0 mt-1">
              <StarIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                Israel's Coffee Scene Is World-Class
              </h2>
              <p className="mt-2 text-stone-600 leading-relaxed">
                Israel has quietly become one of the most exciting specialty
                coffee markets in the world. Israeli roasters compete
                internationally, win awards, and push boundaries. From Tel Aviv
                to the Galilee, roasters here bring global sourcing expertise
                combined with the kind of obsessive attention to detail that
                this country is known for. You don't need to look to Italy or
                Seattle — great coffee is being roasted right down the street.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-8 text-center">
          <CupIcon />
          <h2 className="mt-3 text-xl font-semibold text-stone-900">
            Try It Yourself
          </h2>
          <p className="mt-2 text-stone-600 max-w-lg mx-auto">
            The best way to understand the difference is to taste it. Pick a
            roaster, order a bag, and brew it side by side with whatever you
            usually drink. We're confident you won't go back.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-amber-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800 transition-colors"
          >
            Browse Roasters
          </Link>
        </div>
      </div>
    </div>
  );
}
