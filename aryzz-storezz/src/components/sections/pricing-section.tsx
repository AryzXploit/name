import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pricingPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10"
    >
      <div className="rounded-[3rem] border border-slate-800/70 bg-slate-950/70 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.5)]">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Pricing for trusted commerce
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Choose the right protection and growth acceleration for your stage.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300">
            Every tier includes hardening guardrails, no-ops deployments, and
            referral intelligence. Upgrade without downtime or migration risk.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex h-full flex-col rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-6 text-left transition-all duration-200",
                plan.highlighted &&
                  "border-sky-400/60 shadow-[0_20px_60px_rgba(56,189,248,0.35)]",
              )}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
                  {plan.name}
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {plan.price}
                  {!plan.price.includes("Talk") && (
                    <span className="text-sm font-medium text-slate-400">
                      /month
                    </span>
                  )}
                </p>
                <p className="mt-3 text-sm text-slate-300">{plan.pitch}</p>
              </div>
              <ul className="mt-6 flex flex-1 flex-col space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={cn(
                  "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                  plan.highlighted
                    ? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-slate-950 hover:shadow-[0_18px_65px_rgba(56,189,248,0.45)]"
                    : "border border-slate-700/70 bg-slate-900/60 text-slate-100 hover:border-slate-500/70 hover:bg-slate-900/70",
                )}
              >
                {plan.highlighted ? "Book a secure rollout" : "Talk to us"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
