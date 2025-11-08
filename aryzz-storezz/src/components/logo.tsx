import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  withTagline?: boolean;
};

export function Logo({ className, withTagline }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Aryzz-Storezz home"
      className={cn(
        "group inline-flex items-center gap-3 text-left transition-colors",
        className,
      )}
    >
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-[0_15px_35px_rgba(59,130,246,0.45)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-[2px] rounded-[1.6rem] bg-slate-950" />
        <span className="relative text-xl font-bold text-sky-100">A</span>
      </span>
      <span className="flex flex-col">
        <span className="text-lg font-semibold tracking-[0.18em] text-slate-100">
          ARYZZ
          <span className="ml-1 rounded-full bg-gradient-to-r from-sky-400/60 via-cyan-300/60 to-indigo-400/70 px-2 py-0.5 text-[0.73rem] font-medium uppercase tracking-[0.35em] text-slate-900">
            STOREZZ
          </span>
        </span>
        {withTagline && (
          <span className="text-xs font-medium uppercase tracking-[0.33em] text-slate-400">
            Secure Commerce Identity
          </span>
        )}
      </span>
    </Link>
  );
}
