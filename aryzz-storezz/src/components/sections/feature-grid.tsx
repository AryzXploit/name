import { coreFeatures, growthTimeline } from "@/lib/content";

export function FeatureGrid() {
  return (
    <section
      id="solutions"
      className="mx-auto mt-24 flex w-full max-w-6xl flex-col gap-12 px-6 lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-start lg:px-10"
    >
      <div className="rounded-[2.5rem] border border-slate-800/70 bg-slate-950/70 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.5)]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Composable by design
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Assemble verified commerce journeys with adaptable, security-first
            building blocks.
          </h2>
          <p className="text-base text-slate-300">
            Every module is orchestrated with policy controls, audit trails, and
            deep observability so you can focus on differentiation without
            sacrificing trust.
          </p>
        </div>
        <div className="mt-10 space-y-6">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 transition-all duration-200 hover:border-sky-400/60 hover:shadow-[0_18px_55px_rgba(59,130,246,0.35)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-slate-300">{feature.description}</p>
              <p className="mt-3 text-sm font-medium text-sky-300">
                {feature.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2.5rem] border border-slate-800/70 bg-gradient-to-br from-slate-900/80 via-slate-900/65 to-slate-950/70 p-8 shadow-[0_25px_70px_rgba(2,6,23,0.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Growth storyline
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Align product, risk, and operations across the growth lifecycle.
          </h3>
          <div className="mt-8 space-y-6">
            {growthTimeline.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-3xl border border-slate-800/60 bg-slate-950/65 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Phase {index + 1}
                    </span>
                    <span className="h-px flex-1 bg-slate-800/60" aria-hidden />
                  </div>
                  <h4 className="mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
