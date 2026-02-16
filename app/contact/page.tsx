export const metadata = {
  title: "Contact — Israel Coffee Roasters",
  description: "Submit a correction, suggest a new roaster, or request removal from the directory.",
};

// Replace FORMSPREE_ID with your actual Formspree form ID (e.g. "xpzgkryq")
// Sign up free at https://formspree.io
const FORMSPREE_ID = "FORMSPREE_ID";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Contact Us</h1>
      <p className="mt-3 text-stone-500 leading-relaxed">
        Found incorrect information? Know a roaster we&apos;re missing? Want to be removed from the
        directory? Use the form below and we&apos;ll get back to you.
      </p>

      <form
        action={`https://formspree.io/f/${FORMSPREE_ID}`}
        method="POST"
        className="mt-8 space-y-5"
      >
        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-stone-700 mb-1">
            What is this about?
          </label>
          <select
            id="type"
            name="type"
            required
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="">Select a topic…</option>
            <option value="suggest-roaster">Suggest a new roaster</option>
            <option value="correction">Correct existing information</option>
            <option value="removal">Request removal from directory</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Roaster name */}
        <div>
          <label htmlFor="roaster" className="block text-sm font-medium text-stone-700 mb-1">
            Roaster name <span className="text-stone-400 font-normal">(if applicable)</span>
          </label>
          <input
            type="text"
            id="roaster"
            name="roaster"
            placeholder="e.g. Cafelix, Nahat Coffee…"
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
            Details <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Please share as much detail as possible — correct address, website, opening year, roast styles, etc."
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-y"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Your email <span className="text-stone-400 font-normal">(optional, for follow-up)</span>
          </label>
          <input
            type="email"
            id="email"
            name="_replyto"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
        >
          Send message
        </button>
      </form>

      <p className="mt-6 text-xs text-stone-400 leading-relaxed">
        This directory is an independent community project and is not affiliated with any of the
        listed roasters. If you represent a business listed here and wish to be removed, select
        &ldquo;Request removal&rdquo; above. We aim to respond within a few business days.
      </p>
    </div>
  );
}
