import { trustedBrands } from "@/lib/content";

export function TrustedBy() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10">
      <div className="rounded-[2.5rem] border border-slate-800/70 bg-slate-950/60 px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Trusted by secure-first innovators
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 text-sm font-semibold uppercase tracking-[0.45em] text-slate-400 md:text-base">
            {trustedBrands.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-slate-800/60 px-6 py-3 text-slate-300/90"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
