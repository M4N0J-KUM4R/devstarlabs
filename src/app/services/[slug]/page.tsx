import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { SERVICES } from "@/data/content";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const THEME_TEXT: Record<string, { text: string; heading: string }> = {
  orange: { text: "var(--c-ink)", heading: "var(--c-paper)" },
  sand: { text: "var(--c-ink)", heading: "var(--c-ink)" },
  sage: { text: "var(--c-paper)", heading: "var(--c-ink)" },
  steel: { text: "var(--c-paper)", heading: "var(--c-ink)" },
};

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const palette = THEME_TEXT[service.theme];
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    provider: { "@type": "Organization", name: "DevStarLabs" },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <ThemeSection
        theme={service.theme}
        className="overflow-hidden pb-16 pt-32 md:pt-40"
      >
        <Doodle
          name="star"
          className="pointer-events-none absolute right-10 top-24 w-16"
          style={{ color: palette.heading }}
          rotate={12}
        />
        <p className="label" style={{ color: palette.text, opacity: 0.7 }}>
          Service {String(idx + 1).padStart(2, "0")} / {SERVICES.length}
        </p>
        <h1
          className="display-hero max-md:!text-[clamp(56px,17vw,235px)]"
          style={{ color: palette.heading }}
        >
          {service.title}
        </h1>
        <p className="mt-6 max-w-xl text-xl" style={{ color: palette.text }}>
          {service.tagline}
        </p>
        <div className="mt-10">
          <FillButton href="/contact">Start this engagement</FillButton>
        </div>
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-24 pt-20">
        <div className="ed gap-12">
          <div className="space-y-6 text-lg">
            {service.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="label mb-5 text-[var(--t-muted)]">
                What you get
              </h2>
              <ul className="space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 border-b pb-3 text-[15px]" style={{ borderColor: "var(--ink-10)" }}>
                    <span className="text-[var(--c-orange)]">★</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="label mb-5 text-[var(--t-muted)]">Toolchain</h2>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--c-ink)] px-4 py-2 text-xs font-semibold text-[var(--c-paper)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8"
          style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
        >
          <div>
            <p className="label opacity-60">Next service</p>
            <Link
              href={`/services/${next.slug}`}
              className="font-display mt-2 text-4xl uppercase no-underline transition-colors hover:text-[var(--c-orange)]"
            >
              {next.title} →
            </Link>
          </div>
          <FillButton href="/contact">Start a project</FillButton>
        </div>
      </ThemeSection>
    </>
  );
}
