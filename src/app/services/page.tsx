import type { Metadata } from "next";
import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import { SERVICES } from "@/data/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "UI/UX design, web & app development, cloud hosting, DevOps, SEO, AI solutions, and digital marketing — one accountable team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ThemeSection theme="orange" className="pb-16 pt-32 md:pt-40">
        <h1 className="display-hero max-md:!text-[clamp(64px,19vw,235px)] text-[var(--t-heading)]">
          Services
        </h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-lg text-[var(--t-text)]">
            Eight disciplines. One team. Every engagement ships with docs,
            CI, and a clean handover.
          </p>
          <Doodle name="squiggle" className="w-32 text-[var(--t-heading)]" />
        </div>
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-24 pt-24">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`group flex flex-col rounded-2xl p-8 no-underline transition-transform hover:-translate-y-1 ${
                i % 2 === 1 ? "md:mt-12" : ""
              }`}
              style={{
                background: `var(--c-${s.theme === "sand" ? "sand" : s.theme})`,
                color:
                  s.theme === "orange" || s.theme === "sand"
                    ? "var(--c-ink)"
                    : "var(--c-paper)",
              }}
            >
              <span className="label opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display mt-4 text-[clamp(28px,3.4vw,48px)] uppercase leading-none">
                {s.title}
              </span>
              <span className="mt-3 max-w-sm text-sm opacity-75">
                {s.tagline}
              </span>
              <span className="mt-6 flex items-center gap-2 text-sm font-medium">
                Explore
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </ThemeSection>
    </>
  );
}
