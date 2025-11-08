import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  Fingerprint,
  Gauge,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
};

export type Metric = {
  label: string;
  value: string;
  caption: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  pitch: string;
  features: string[];
  highlighted?: boolean;
};

export type ReferralHighlight = {
  title: string;
  caption: string;
  stat: string;
};

export const navLinks: NavLink[] = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Security", href: "#security" },
  { label: "Referral", href: "#referral" },
  { label: "Pricing", href: "#pricing" },
];

export const heroMetrics: Metric[] = [
  {
    label: "Onboarded identities",
    value: "2.7M+",
    caption: "Verified with multi-factor trust policies",
  },
  {
    label: "Fraud reduction",
    value: "93%",
    caption: "Dynamic risk scoring stops threats in real-time",
  },
  {
    label: "Time to market",
    value: "6x faster",
    caption: "Composable building blocks ship new verticals rapidly",
  },
];

export const trustedBrands = [
  "NeuraPay",
  "Helix Bank",
  "Northwind Health",
  "Chronicle Cloud",
  "Vector ID",
  "Orora Labs",
] as const;

export const coreFeatures: Feature[] = [
  {
    title: "Adaptive Identity Orchestration",
    description:
      "Design frictionless customer journeys with orchestration that adapts to risk posture in milliseconds.",
    highlight: "Step-up auth routes suspicious sessions to biometric checks.",
    icon: Fingerprint,
  },
  {
    title: "Zero-Trust Commerce Security",
    description:
      "Embedded security policies enforce least-privilege access across teams, regions, and integration partners.",
    highlight:
      "Continuous compliance guardrails apply security baselines automatically.",
    icon: ShieldCheck,
  },
  {
    title: "Unified Growth Intelligence",
    description:
      "See conversion, churn, and referral pipelines in a single control center powered by hybrid analytics.",
    highlight:
      "Experiment safely with multi-arm referral campaigns driven by predictive scoring.",
    icon: Activity,
  },
  {
    title: "Composable Checkout Blocks",
    description:
      "Build domain-specific experiences with reusable checkout primitives tuned for regulated industries.",
    highlight:
      "API-first components, SLAs, and audit trails pre-approved for enterprise buyers.",
    icon: Layers,
  },
];

export const securityHighlights: Feature[] = [
  {
    title: "Keyless MFA Everywhere",
    description:
      "WebAuthn, passkeys, and certified hardware tokens included out-of-the-box for every account tier.",
    highlight: "Policy-driven fallbacks ensure business continuity 24/7.",
    icon: Lock,
  },
  {
    title: "Live Threat Telemetry",
    description:
      "Stream risk indicators with millisecond latency into your SIEM or data warehouse.",
    highlight: "Anomaly models continuously retrain on fresh telemetry.",
    icon: Gauge,
  },
  {
    title: "Compliance Made Continuous",
    description:
      "SOC 2, ISO 27001, GDPR, PCI DSS, and PSD2 controls mapped to actionable dashboards.",
    highlight:
      "Auto-generated audit trails keep every deployment verifiable and exportable.",
    icon: BadgeCheck,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Aryzz-Storezz unified our identity flows and checkout into one surface. Fraud losses dropped to nearly zero while conversion increased double digits.",
    name: "Kaori Nishimura",
    role: "Chief Product Officer",
    company: "Helix Bank",
  },
  {
    quote:
      "The admin console gives engineering, ops, and compliance the same real-time truth. We launch new digital channels in weeks, not quarters.",
    name: "Diego Martínez",
    role: "VP Digital Platforms",
    company: "Northwind Health",
  },
  {
    quote:
      "Referral intelligence from Aryzz-Storezz drives our fastest growth segments. Incentives adjust dynamically, keeping CAC lean at scale.",
    name: "Renee Park",
    role: "Head of Growth",
    company: "Vector ID",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Launch",
    price: "$299",
    pitch: "Everything needed to validate a regulated digital venture.",
    features: [
      "Up to 25K verified identities/month",
      "Prebuilt conversion dashboards",
      "Policy templates for AML/KYC",
      "Unlimited referral campaigns",
      "Email + knowledge base support",
    ],
  },
  {
    name: "Scale",
    price: "$999",
    pitch: "Advanced automations, faster insights, and premium security.",
    features: [
      "Up to 250K verified identities/month",
      "Predictive risk scoring and alerts",
      "Multi-region data residency controls",
      "Realtime analytics warehouse sync",
      "Dedicated success architect",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    pitch: "Custom orchestration, SLAs, and private deployment options.",
    features: [
      "Unlimited verified identities",
      "Private cloud or on-prem delivery",
      "Signed BAAs + custom DPAs",
      "Security posture automation",
      "24/7 critical response team",
    ],
  },
];

export const referralHighlights: ReferralHighlight[] = [
  {
    title: "Risk-aware incentives",
    caption: "Reward the right behavior with signals from fraud intelligence.",
    stat: "37% lift",
  },
  {
    title: "Lifecycle automation",
    caption: "Segment referrals by compliance stage, role, or vertical instantly.",
    stat: "4.5x ROI",
  },
  {
    title: "Shared dashboards",
    caption: "Marketing, ops, and finance align on live performance metrics.",
    stat: "< 2 min sync",
  },
];

export const heroActions = [
  { label: "Start your pilot", href: "#pricing", variant: "primary" as const },
  { label: "Explore the console", href: "/admin", variant: "ghost" as const },
];

export const footerLinks = [
  {
    title: "Product",
    links: ["Platform", "Solutions", "Pricing", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Trust Center"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Status", "Support"],
  },
];

export type TimelineItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const growthTimeline: TimelineItem[] = [
  {
    title: "Identity foundation",
    description:
      "Launch a compliant onboarding flow with adaptive KYC/KYB, biometrics, and document verification baked in.",
    icon: ShieldCheck,
  },
  {
    title: "Commerce expansion",
    description:
      "Orchestrate subscriptions, regulated payments, and vertical-specific checkout experiences effortlessly.",
    icon: Rocket,
  },
  {
    title: "Network-scale intelligence",
    description:
      "Leverage referential data, anomaly models, and zero-trust governance to optimize for sustainable growth.",
    icon: Sparkles,
  },
  {
    title: "Unified operations",
    description:
      "Operational dashboards align compliance, operations, and growth teams around a single secure console.",
    icon: Users,
  },
];
