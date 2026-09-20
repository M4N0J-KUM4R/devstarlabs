import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import PlanDifference from "@/components/pricing/PlanDifference";
import GiftSection from "@/components/gift/GiftSection";

export const metadata: Metadata = {
  title: "Subscription & Pricing",
  description:
    "The DevStar Card: free Starter Card and PRO Card plans. Annual, monthly and weekly billing — plus the DevStar Gift Card.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      {/* 1] title band — pink, mirrors subscription-and-pricing */}
      <ThemeSection theme="sand" className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-4)]">
        <div className="relative">
          <p className="label mb-3 text-[var(--t-muted)]">1]</p>
          <h1 className="font-display text-[clamp(44px,7.4vw,110px)] uppercase leading-[0.9] tracking-tight text-[var(--t-heading)]">
            Subscription
            <br />
            &amp; Pricing
          </h1>
          <span
            className="deco-mask title-deco"
            style={
              {
                "--deco-url": "url(/decos/title-decoration.svg)",
                width: "clamp(56px,5.6vw,88px)",
                height: "clamp(56px,5.6vw,88px)",
                color: "var(--c-orange)",
              } as React.CSSProperties
            }
          />
        </div>
      </ThemeSection>

      {/* 2] Subscription — the two plan frames */}
      <ThemeSection theme="sand" className="pb-[var(--sp-6)]" id="subscription">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(30px,4.6vw,64px)] uppercase leading-[0.92] tracking-tight text-[var(--t-heading)]">
            Subscription
          </h2>
          <Doodle name="spark" className="w-8 text-[var(--c-ink)]" rotate={10} />
        </div>
        <PlanDifference />
      </ThemeSection>

      {/* 3] gift card — dark sheet, shared component */}
      <ThemeSection theme="dark" className="py-[var(--sp-6)]" id="gift-card">
        <GiftSection compact />
      </ThemeSection>
    </>
  );
}
