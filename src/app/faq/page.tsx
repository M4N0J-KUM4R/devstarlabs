import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import HoverAccent from "@/components/system/HoverAccent";
import FaqGroupCard from "@/components/faq/FaqGroupCard";
import { FAQ_GROUPS } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — Answers for builders and curators",
  description:
    "Everything about the DevStar Card, plans, the Connectory, Support My Practice, gifts and account management.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      {/* sticky title column + dark accordion cards — the original's
          faq-section row on a sage sheet */}
      <ThemeSection
        theme="sage"
        className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-6)]"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <div
              className="faq-title-col"
              style={{ position: "sticky", top: "calc(var(--scale-px) * 120)" }}
            >
              <h1 className="font-display text-[clamp(56px,8.4vw,124px)] uppercase leading-[0.9] tracking-tight text-[var(--t-heading)]">
                FAQ
              </h1>
              <p className="mt-4 max-w-sm text-lg leading-snug text-[var(--t-text)]">
                {total} answers about the Card, plans, the Connectory and
                everything around the practice.
              </p>
              <p className="mt-6 text-sm text-[var(--t-text)] opacity-80">
                Still unsure about something?
              </p>
              <a
                href="mailto:help@devstarlabs.dev"
                className="btn btn--link mt-1 text-base normal-case tracking-normal"
              >
                <span className="relative z-10 underline underline-offset-4">
                  help@devstarlabs.dev
                </span>
                <HoverAccent />
              </a>
              <span
                className="deco-mask title-deco"
                style={
                  {
                    "--deco-url": "url(/decos/emoji-smile.min.svg)",
                    width: "clamp(44px,4.6vw,70px)",
                    height: "clamp(44px,4.5vw,70px)",
                    color: "var(--c-ink)",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {FAQ_GROUPS.map((g) => (
              <FaqGroupCard key={g.title} title={g.title} items={g.items} />
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 979px) {
            .faq-title-col { position: static !important; }
          }
        `}</style>
      </ThemeSection>
    </>
  );
}
