import { referralHighlights } from "@/lib/content";

export function ReferralSection() {
  return (
    <section
      id="referral"
      className="mx-auto mt-24 w-full max-w-6xl px-6 lg:px-10"
    >
      <div className="grid gap-10 rounded-[3rem] border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.55)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Referral intelligence
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Incentives and compliance finally in the same loop.
          </h2>
          <p className="text-base text-slate-300">
            Launch referral programs that understand risk signals. Aryzz-Storezz
            auto-adjusts payouts, monitors identities, and safeguards against
            abuse without slowing momentum.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {referralHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800/60 bg-slate-950/65 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
                  {item.title}
                </p>
                <p className="mt-3 text-2xl font-semibold text-sky-300">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm text-slate-300">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Growth control plane
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              {[
                "Dynamic reward tiers bound by AML/KYC rules.",
                "Referral audit log streaming to your warehouse.",
                "Zero-knowledge proof support for privacy-preserving programs.",
                "Fine-grained console roles for marketing, finance, and compliance.",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Partner experience
            </p>
            <p className="mt-4 text-lg font-semibold text-white">
              Partners access compliance-ready referral portals with SSO, MFA, and
              real-time payout transparency.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Built-in guardrails ensure referral codes can’t be abused or
              recycled. Suspicious activity triggers just-in-time verification for
              continued access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
