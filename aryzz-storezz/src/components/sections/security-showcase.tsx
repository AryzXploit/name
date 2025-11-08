import { ShieldAlert } from "lucide-react";
import { securityHighlights } from "@/lib/content";

export function SecurityShowcase() {
  return (
    <section
      id="security"
      className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-[3rem] border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-sky-600/30 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-[140px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
              Hardening without compromise
            </div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Zero-trust controls, continuous compliance, and live threat
              intelligence — by default.
            </h2>
            <p className="text-base text-slate-300">
              Security decisions stay transparent. Every configuration change is
              logged, validated, and ready for export. No silent failures, no
              brittle toggles, no misconfigurations.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {securityHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-sky-300">
                    {item.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/70 bg-slate-900/70 p-8">
            <div className="absolute -right-10 top-12 h-48 w-48 rounded-full bg-sky-500/20 blur-[120px]" />
            <div className="relative space-y-8">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/70 px-4 py-3">
                <ShieldAlert className="h-5 w-5 text-amber-300" />
                <div>
                  <p className="text-sm font-semibold text-white">Alerts</p>
                  <p className="text-xs text-slate-400">
                    Real-time streaming to your SIEM via secure webhooks.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Configuration posture",
                    value: "100% compliant",
                    description: "Zero pending control deviations.",
                  },
                  {
                    title: "Policy drift",
                    value: "0 findings",
                    description: "Policies auto-remediated within 3 seconds.",
                  },
                  {
                    title: "Encryption coverage",
                    value: "AES-256 everywhere",
                    description: "Keys rotated 4x per day by default.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
