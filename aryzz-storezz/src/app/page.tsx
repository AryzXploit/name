import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CallToAction } from "@/components/sections/cta-section";
import { CustomerStories } from "@/components/sections/customer-stories";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReferralSection } from "@/components/sections/referral-section";
import { SecurityShowcase } from "@/components/sections/security-showcase";
import { TrustedBy } from "@/components/sections/trusted-by";

export default function Home() {
  return (
    <div className="relative mx-auto min-h-screen max-w-full overflow-x-hidden pb-24">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,_rgba(56,189,248,0.45),_rgba(14,165,233,0)_65%)] blur-[160px]" />
      <div className="absolute inset-y-0 left-36 hidden w-px bg-gradient-to-b from-slate-800/0 via-slate-700/40 to-slate-800/0 lg:block" />
      <div className="absolute inset-y-0 right-36 hidden w-px bg-gradient-to-b from-slate-800/0 via-slate-700/40 to-slate-800/0 lg:block" />

      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-20">
          <HeroSection />
          <TrustedBy />
          <FeatureGrid />
          <SecurityShowcase />
          <CustomerStories />
          <ReferralSection />
          <PricingSection />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
}
