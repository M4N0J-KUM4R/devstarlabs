import type { Metadata } from "next";
import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import MarqueeStrip from "@/components/system/MarqueeStrip";
import Doodle from "@/components/system/Doodle";
import { TRAININGS, CATEGORY_LABELS } from "@/data/content";

export const metadata: Metadata = {
  title: "Certification Trainings",
  description:
    "Hands-on certification training: AWS, Terraform, CKA, CKAD, Docker, Frontend, Full Stack, Generative AI, Data Engineering, Machine Learning, and IoT.",
  alternates: { canonical: "/trainings" },
};

const MARQUEE = TRAININGS.map((t) => (
  <span className="font-display mx-6 flex items-center gap-3 text-[clamp(22px,3vw,40px)] uppercase">
    <span className="text-[var(--c-orange)]">★</span>
    {t.title}
  </span>
));

const CATEGORIES = ["all", "cloud", "devops", "development", "ai-data"] as const;

export default function TrainingsPage() {
  return (
    <>
      <ThemeSection theme="orange" className="overflow-hidden pb-14 pt-32 md:pt-40">
        <h1 className="display-hero max-md:!text-[clamp(56px,16vw,235px)] text-[var(--t-heading)]">
          Trainings
        </h1>
        <p className="mt-4 font-display text-3xl uppercase text-[var(--t-text)] md:text-5xl">
          Certify like you mean it<span className="text-[var(--t-heading)]">.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="label rounded-full border px-4 py-2"
              style={{
                borderColor: "var(--t-line)",
                color: "var(--t-text)",
              }}
            >
              {c === "all" ? "All tracks" : CATEGORY_LABELS[c]}
            </span>
          ))}
        </div>
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-10 pt-10">
        <MarqueeStrip items={MARQUEE} period={44} className="py-4 text-[var(--c-ink)]" />
      </ThemeSection>

      <ThemeSection theme="light" className="pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TRAININGS.map((t, i) => (
            <Link
              key={t.slug}
              href={`/trainings/${t.slug}`}
              className="group flex flex-col rounded-2xl p-7 no-underline transition-transform hover:-translate-y-1"
              style={{
                background: `var(--c-${t.theme})`,
                color:
                  t.theme === "orange" || t.theme === "sand"
                    ? "var(--c-ink)"
                    : "var(--c-paper)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="label opacity-60">
                  {String(i + 1).padStart(2, "0")} · {CATEGORY_LABELS[t.category]}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase text-black"
                  style={{ background: t.theme === "orange" ? "var(--c-paper)" : "var(--c-orange)" }}
                >
                  {t.level}
                </span>
              </div>
              <span className="font-display mt-5 text-[clamp(26px,2.6vw,40px)] uppercase leading-none">
                {t.title}
              </span>
              <span className="mt-2 text-sm opacity-70">{t.cert}</span>
              <span className="mt-6 flex items-center justify-between border-t pt-4 text-sm"
                style={{ borderColor: "rgba(10,10,10,0.15)" }}>
                <span className="opacity-75">{t.duration} · {t.format}</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-4 rounded-2xl p-8" style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}>
          <Doodle name="spark" className="w-10 shrink-0 text-[var(--c-orange)]" />
          <p className="text-lg">
            Not sure which track? <span className="font-bold">Book a skill consult</span> — we map your experience to the right certification in 20 minutes.
          </p>
        </div>
      </ThemeSection>
    </>
  );
}
