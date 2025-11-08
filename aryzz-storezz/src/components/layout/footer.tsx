import { Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { footerLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-800/60 bg-slate-950/70">
      <div className="absolute inset-x-0 -top-16 flex justify-center">
        <div className="flex max-w-4xl items-center gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/80 px-8 py-6 shadow-[0_15px_60px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/80 via-blue-500/80 to-indigo-500/80 text-slate-950 shadow-[0_12px_35px_rgba(59,130,246,0.45)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-slate-400">
              Trust Center
            </p>
            <p className="text-base text-slate-200">
              Security, compliance, and privacy documentation updated daily.
            </p>
          </div>
          <Link
            href="#security"
            className="ml-auto hidden rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-500/70 hover:bg-slate-900/80 sm:inline-flex"
          >
            View posture
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-28 md:flex-row lg:px-10">
        <div className="max-w-sm">
          <p className="text-2xl font-semibold tracking-tight text-slate-100">
            Aryzz-Storezz brings secure digital commerce to every regulated
            industry.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Built on a zero-trust foundation with privacy and compliance
            controls available from day zero.
          </p>
          <Link
            href="mailto:security@aryzz-storezz.com"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <Mail className="h-4 w-4" />
            security@aryzz-storezz.com
          </Link>
        </div>

        <div className="grid w-full gap-8 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="transition-colors hover:text-sky-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Aryzz-Storezz. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Status", "Privacy", "Terms", "Responsible Disclosure"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className={cn(
                    "transition-colors hover:text-slate-300",
                    item === "Responsible Disclosure" && "text-sky-300",
                  )}
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
