import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-stone-900">
          Israel Coffee Roasters
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/map"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            Map
          </Link>
          <Link
            href="/about"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            Why Local?
          </Link>
          <Link
            href="/contact"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
