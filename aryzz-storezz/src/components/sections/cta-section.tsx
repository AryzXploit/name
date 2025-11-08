import Link from "next/link";

export function CallToAction() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[3rem] border border-slate-800/70 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-slate-950/80 px-8 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.55)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_transparent_55%)]" />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-200">
            Ready for Aryzz-Storezz
          </p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Build a commerce stack stakeholders can trust instantly.
          </h2>
          <p className="max-w-2xl text-sm text-slate-200/90">
            Start a secure pilot in under a week. Our team provisions hardened
            environments, verifies identities, and trains your operators with a
            zero-misconfiguration guarantee.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/admin"
              className="inline-flex items-center gap-3 rounded-full bg-slate-950/90 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-950"
            >
              Explore the admin console
            </Link>
            <Link
              href="mailto:hello@aryzz-storezz.com"
              className="inline-flex items-center gap-3 rounded-full border border-slate-200/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70"
            >
              hello@aryzz-storezz.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
