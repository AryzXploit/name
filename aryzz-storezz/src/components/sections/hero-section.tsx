import Link from "next/link";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { heroActions, heroMetrics } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="platform"
      className="relative mx-auto mt-12 flex w-full max-w-6xl flex-col overflow-hidden rounded-[3rem] border border-slate-800/70 bg-gradient-to-br from-slate-950/95 via-slate-900/60 to-slate-950/80 px-6 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.55)] lg:px-20"
    >
      <div className="absolute -left-32 top-12 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/25 blur-[140px]" />
      <div className="relative grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
            Aryzz-Storezz Platform
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Secure digital commerce orchestrated for{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                regulated growth.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Launch identity-first storefronts with adaptive trust policies,
              granular governance, and real-time referral intelligence. Built for
              teams who can’t afford misconfigurations or security blind spots.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            {heroActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                  action.variant === "primary"
                    ? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-slate-950 shadow-[0_15px_55px_rgba(56,189,248,0.45)] hover:shadow-[0_20px_65px_rgba(56,189,248,0.55)]"
                    : "border border-slate-700/70 bg-slate-900/60 text-slate-100 hover:border-slate-500/80 hover:bg-slate-900/70",
                )}
              >
                <span>{action.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-500/80 hover:bg-slate-900/70"
            >
              <PlayCircle className="h-5 w-5 text-sky-300" />
              Watch secure onboarding
            </button>
          </div>
          <div className="grid gap-6 border-t border-slate-800/70 pt-6 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-slate-800/70 bg-slate-900/50 px-5 py-6"
              >
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm text-slate-400">{metric.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-full overflow-hidden rounded-[2.5rem] border border-slate-800/70 bg-slate-900/60 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.45)] lg:block">
          <div className="absolute left-6 right-6 top-6 h-12 rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-900/90 backdrop-blur-sm" />
          <div className="relative mt-10 space-y-6">
            <div className="rounded-3xl border border-slate-800/60 bg-slate-950/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Identity posture
              </p>
              <p className="mt-2 text-3xl font-semibold text-sky-300">Low risk</p>
              <p className="mt-3 text-sm text-slate-400">
                Adaptive controls reduce attack surface while unlocking instant
                conversions.
              </p>
            </div>
            <div className="grid gap-4">
              {["Multi-factor passkeys", "Continuous compliance", "Referral integrity"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-300"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="h-4 w-4 text-sky-300" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
