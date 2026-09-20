import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import GiftSection from "@/components/gift/GiftSection";

export const metadata: Metadata = {
  title: "Gift Card",
  description:
    "Gift a DevStar Card — a full year of PRO professional visibility for a builder or curator. Purchase, activation and what the gift unlocks.",
  alternates: { canonical: "/gift-card" },
};

export default function GiftCardPage() {
  return (
    <ThemeSection
      theme="orange"
      className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-6)]"
    >
      <GiftSection />
    </ThemeSection>
  );
}
