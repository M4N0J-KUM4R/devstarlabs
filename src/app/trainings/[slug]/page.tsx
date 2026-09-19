import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { TRAININGS, CATEGORY_LABELS } from "@/data/content";

export function generateStaticParams() {
  return TRAININGS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TRAININGS.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `${t.title} Training`,
    description: `${t.cert} — ${t.duration} hands-on training at DevStarLabs. ${t.outcome}`,
    alternates: { canonical: `/trainings/${t.slug}` },
  };
}

const THEME_TEXT: Record<string, { text: string; heading: string }> = {
  orange: { text: "var(--c-ink)", heading: "var(--c-paper)" },
  sand: { text: "var(--c-ink)", heading: "var(--c-ink)" },
  sage: { text: "var(--c-paper)", heading: "var(--c-ink)" },
  steel: { text: "var(--c-paper)", heading: "var(--c-ink)" },
};

export default async function TrainingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TRAININGS.find((x) => x.slug === slug);
  if (!t) notFound();

  const palette = THEME_TEXT[t.theme];
  const idx = TRAININGS.findIndex((x) => x.slug === slug);
  const next = TRAININGS[(idx + 1) % TRAININGS.length];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${t.title} — ${t.cert}`,
    description: t.outcome,
    provider: { "@type": "Organization", name: "DevStarLabs" },
    educationalLevel: t.level,
    timeRequired: t.duration,
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: t.format.toLowerCase().includes("online") ? "online" : "onsite",
      courseWorkload: t.duration,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <ThemeSection
        theme={t.theme}
        className="overflow-hidden pb-16 pt-32 md:pt-40"
      >
        <Doodle
          name="spark"
          className="pointer-events-none absolute right-12 top-28 w-14"
          style={{ color: palette.heading }}
        />
        <p className="label" style={{ color: palette.text, opacity: 0.7 }}>
          {CATEGORY_LABELS[t.category]} track · {String(idx + 1).padStart(2, "0")}/
          {TRAININGS.length}
        </p>
        <h1
          className="display-hero max-md:!text-[clamp(56px,17vw,235px)]"
          style={{ color: palette.heading }}
        >
          {t.title}
        </h1>
        <p className="mt-4 font-display text-xl uppercase md:text-2xl" style={{ color: palette.text }}>
          {t.cert}
        </p>

        <div
          className="mt-10 grid max-w-3xl grid-cols-3 divide-x rounded-2xl"
          style={{
            background: "rgba(10,10,10,0.85)",
            color: "var(--c-paper)",
          }}
        >
          {[
            { k: "Duration", v: t.duration },
            { k: "Format", v: t.format },
            { k: "Level", v: t.level },
          ].map((m) => (
            <div key={m.k} className="p-5">
              <p className="label opacity-50">{m.k}</p>
              <p className="mt-2 font-bold">{m.v}</p>
            </div>
          ))}
        </div>
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-24 pt-20">
        <div className="ed gap-12">
          <div>
            <h2 className="display-sm mb-6">Outcome</h2>
            <p className="text-lg leading-relaxed">{t.outcome}</p>
            <div className="mt-10">
              <FillButton href="/contact">Enroll in this track</FillButton>
            </div>
          </div>

          <aside>
            <h2 className="label mb-5 text-[var(--t-muted)]">Curriculum</h2>
            <ol className="space-y-3">
              {t.modules.map((m, i) => (
                <li
                  key={m}
                  className="flex items-baseline gap-4 border-b pb-3 text-[15px]"
                  style={{ borderColor: "var(--ink-10)" }}
                >
                  <span className="font-display text-lg text-[var(--c-orange)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8"
          style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
        >
          <div>
            <p className="label opacity-60">Next track</p>
            <Link
              href={`/trainings/${next.slug}`}
              className="font-display mt-2 text-4xl uppercase no-underline transition-colors hover:text-[var(--c-orange)]"
            >
              {next.title} →
            </Link>
          </div>
          <FillButton href="/contact">Book a skill consult</FillButton>
        </div>
      </ThemeSection>
    </>
  );
}
