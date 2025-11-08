# Aryzz-Storezz

Aryzz-Storezz is a secure digital commerce experience built with a modern, Signicat-inspired visual language. It combines a marketing site with a hardened admin console that covers account lifecycle controls (create + ban), referral operations, and real-time security posture.

## ✨ Highlights

- **Immersive marketing site** with gradient-rich hero, composable platform story, security center, testimonial carousel, referral intelligence, pricing, and call-to-action sections.
- **Secure admin console** (`/admin`) featuring account creation with validation, ban/unban orchestration, referral counters, campaign automation, and inline security posture cards.
- **Defence-in-depth defaults** such as CSP, strict transport headers, zero-trust messaging, and guardrails that prevent misconfiguration scenarios.

## 🧱 Tech Stack

- [Next.js 16](https://nextjs.org) with the App Router + React 19
- [Tailwind CSS v4](https://tailwindcss.com) for design tokens and glassmorphism surfaces
- [TypeScript](https://www.typescriptlang.org/) with strict compiler rules
- [lucide-react](https://lucide.dev/) iconography for consistent UI affordances

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin console.

3. **Lint for correctness & security**
   ```bash
   npm run lint
   ```

> Requires Node.js 18.18+ or 20+.

## 🛡️ Security Posture

- Global Content Security Policy, HSTS, Referrer-Policy, Permissions-Policy, and anti-sniff headers enforced in `next.config.ts`.
- `tsconfig.json` tightened (no JS, consistent casing, no fallthrough, no implicit returns).
- Admin workflows validate inputs, normalise emails, prevent duplicate accounts, and gate higher-risk actions (ban/unban) with explicit toggles.
- Referral and campaign identifiers generated using `crypto.randomUUID` (with secure fallback) to avoid predictable codes.

## 📁 Project Structure

```
src/
  app/
    page.tsx          # Marketing site entry
    admin/page.tsx    # Admin console UI + logic
    globals.css       # Tailwind theme tokens & global styling
  components/
    layout/           # Navbar, footer
    sections/         # Marketing sections (hero, features, pricing, etc.)
    logo.tsx          # Brandmark component
  lib/
    content.ts        # Marketing copy + structured data
    admin-data.ts     # Admin seed data & types
    utils.ts          # Helpers (class names, date formatting)
```

## 👩‍💻 Admin Console Capabilities

- **Create account:** Validates name/email, assigns secure referral codes and role-scoped defaults.
- **Ban/unban:** Instant toggling updates risk score, maintaining audit-friendly state.
- **Referral insight:** Track referrals per user, increment validated referrals, and manage campaign programmes with role-appropriate guardrails.
- **Security telemetry:** Inline cards surface guardrails (policy enforcement, MFA/SSO, audit retention) to keep teams aware of the current posture.

## 📦 Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm run start` – start the production server
- `npm run lint` – static analysis (ESLint core web vitals config)

---

Questions, improvements, or deployment requests? Reach out at `hello@aryzz-storezz.com`. Secure commerce isn’t optional—Aryzz-Storezz ships it by default.
