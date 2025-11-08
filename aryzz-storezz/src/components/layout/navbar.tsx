"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { heroActions, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-3xl px-6 py-4 transition-all duration-300 lg:px-10",
        "bg-slate-950/60 backdrop-blur-xl",
        isScrolled
          ? "mt-4 border border-slate-800/60 shadow-[0_10px_45px_rgba(15,23,42,0.35)]"
          : "mt-8 border border-transparent",
      )}
      role="banner"
    >
      <Logo withTagline className="shrink-0" />

      <nav className="hidden items-center gap-1 text-sm font-medium text-slate-200 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full px-4 py-2 transition-all duration-200 hover:bg-slate-800/80 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        {heroActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
              action.variant === "primary"
                ? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-slate-950 shadow-[0_10px_30px_rgba(56,189,248,0.35)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.45)]"
                : "border border-slate-700/70 bg-slate-900/60 text-slate-100 hover:border-slate-500/80 hover:bg-slate-900/80",
            )}
          >
            {action.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/60 text-slate-100 hover:border-slate-500/70 hover:text-white md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-[calc(100%+1rem)] w-full rounded-3xl border border-slate-800/80 bg-slate-950/95 p-6 shadow-[0_18px_60px_rgba(8,47,73,0.5)] backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-2 text-base font-medium text-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 transition-colors hover:bg-slate-800/60"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            {heroActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "rounded-2xl px-5 py-3 text-center text-sm font-semibold transition-all",
                  action.variant === "primary"
                    ? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-slate-950"
                    : "border border-slate-700/80 bg-slate-900/60 text-slate-100 hover:border-slate-500/70 hover:bg-slate-900/70",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
