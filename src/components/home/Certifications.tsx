import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import MarqueeStrip from "@/components/system/MarqueeStrip";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { TRAININGS, CATEGORY_LABELS } from "@/data/content";

const MARQUEE = TRAININGS.map((t) => (
  <span className="font-display mx-6 flex items-center gap-3 text-[clamp(22px,3vw,40px)] uppercase">
    <span className="text-[var(--c-orange)]">★</span>
    {t.title}
  </span>
));

export default function Certifications() {
  return (
    <ThemeSection theme="sage" tiltRight className="pb-24 pt-28">
      <div className="ed items-end">
        <DisplayWordmark size="lg" className="max-md:!text-[clamp(40px,9.5vw,92px)]">
          Certification training
        </DisplayWordmark>
        <p className="max-w-md text-lg">
          Hands-on tracks taught by working engineers. Real clusters, real
          pipelines, real exams.
        </p>
      </div>

      <div className="hairline my-10" style={{ borderColor: "var(--t-line)" }} />

      <MarqueeStrip
        items={MARQUEE}
        period={42}
        className="py-4 text-[var(--t-heading)]"
      />

      <div className="hairline my-10" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRAININGS.map((t, i) => (
          <Link
            key={t.slug}
            href={`/trainings/${t.slug}`}
            className="group flex flex-col rounded-2xl p-6 no-underline transition-transform hover:-translate-y-1"
            style={{
              background: "rgba(var(--c-ink-rgb),0.9)",
              color: "var(--c-paper)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="label opacity-60">
                {String(i + 1).padStart(2, "0")} ·{" "}
                {CATEGORY_LABELS[t.category]}
              </span>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase text-black"
                style={{ background: "var(--c-orange)" }}
              >
                {t.level}
              </span>
            </div>
            <p className="font-display mt-5 text-3xl uppercase leading-none">
              {t.title}
            </p>
            <p className="mt-2 text-sm opacity-60">{t.cert}</p>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="opacity-70">
                {t.duration} · {t.format}
              </span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <FillButton href="/trainings" variant="outline">
          Browse all 11 tracks
        </FillButton>
        <div className="flex items-center gap-3 text-sm text-[var(--t-text)]">
          <Doodle name="spark" className="w-6 text-[var(--c-orange)]" />
          94% first-attempt pass rate
        </div>
      </div>
    </ThemeSection>
  );
}
