import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import Doodle from "@/components/system/Doodle";
import { SERVICES } from "@/data/content";

export default function WhatWeDo() {
  return (
    <ThemeSection theme="sage" tilt className="pb-20 pt-28 md:pt-32">
      <div className="ed items-end">
        <DisplayWordmark size="lg" className="max-md:!text-[clamp(44px,11vw,96px)]">
          What we do
        </DisplayWordmark>
        <p className="max-w-md text-lg md:text-xl">
          <span className="underline-hand">Eight disciplines</span>, one
          accountable team. From first wireframe to production cluster.
        </p>
      </div>

      <div className="hairline mt-12" />

      <div className="grid md:grid-cols-2 md:gap-x-16">
        {SERVICES.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="hairline group flex items-baseline justify-between gap-6 py-6 no-underline"
          >
            <span className="flex items-baseline gap-5">
              <span className="label text-[var(--t-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(24px,3.2vw,44px)] uppercase leading-none text-[var(--t-heading)] transition-colors group-hover:text-[var(--t-accent)]">
                {s.title}
              </span>
            </span>
            <span className="hidden max-w-[180px] text-right text-sm text-[var(--t-text)] opacity-70 md:block">
              {s.short}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Doodle name="squiggle" className="w-24 text-[var(--t-heading)]" />
        <p className="text-sm text-[var(--t-text)] opacity-80">
          Every service ships with documentation, CI, and a handover — no
          black boxes.
        </p>
      </div>
    </ThemeSection>
  );
}
