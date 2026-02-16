import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-stone-500">
        <p>Israel Coffee Roasters &mdash; A directory of coffee roasters across Israel</p>
        <p className="mt-1 text-stone-400">Proudly roasted &amp; crafted in Israel 🇮🇱</p>
        <p className="mt-3 text-xs text-stone-400 max-w-xl mx-auto leading-relaxed">
          This is an independent community directory and is not affiliated with, endorsed by, or
          connected to any of the listed roasters. Information is provided for reference only.{" "}
          <Link href="/contact" className="underline hover:text-stone-600 transition-colors">
            Contact us
          </Link>{" "}
          to correct information or request removal.
        </p>
      </div>
    </footer>
  );
}
