import { Sparkles } from "lucide-react";
import { testimonials } from "@/lib/content";

export function CustomerStories() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10">
      <div className="rounded-[3rem] border border-slate-800/70 bg-slate-950/70 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.5)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full max-w-sm space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
              Outcomes that compound
            </div>
            <h2 className="text-3xl font-semibold text-white">
              Secure trust. Accelerate growth.
            </h2>
            <p className="text-sm text-slate-300">
              Teams across finance, healthcare, and high-trust marketplaces choose
              Aryzz-Storezz to unify identity security and commercial expansion.
            </p>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
              <Sparkles className="h-5 w-5 text-sky-300" />
              79% of customers ship new secure experiences within their first
              quarter.
            </div>
          </div>
          <div className="grid flex-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={`${testimonial.name}-${testimonial.company}`}
                className="flex flex-col justify-between rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6"
              >
                <blockquote className="text-sm text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  <span className="block text-sm font-semibold tracking-tight text-white">
                    {testimonial.name}
                  </span>
                  <span className="mt-1 block text-[0.7rem] text-slate-400">
                    {testimonial.role} · {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
