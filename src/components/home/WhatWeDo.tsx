"use client";

import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import Doodle from "@/components/system/Doodle";
import { SERVICES } from "@/data/content";

export default function WhatWeDo() {
  return (
    <ThemeSection
      theme="sage"
      motion="sweep"
      contentClassName="relative overflow-hidden pb-24 pt-28 md:pt-32"
    >
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
              02 &middot; Capabilities
            </span>
            <DisplayWordmark size="lg" className="mt-2 max-md:!text-[clamp(44px,11vw,96px)]">
              What we do
            </DisplayWordmark>
          </div>
          <p className="max-w-md text-lg text-[var(--t-text)] md:text-xl">
            <span className="underline underline-offset-4">Five core pillars</span>, one accountable engineering team. From UI/UX design to production Kubernetes and AI agent swarms.
          </p>
        </div>

        <div className="hairline mt-12 mb-4" />

        <div className="grid md:grid-cols-2 md:gap-x-16">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="hairline group flex items-baseline justify-between gap-6 py-6 no-underline transition-transform hover:-translate-x-1"
            >
              <span className="flex items-baseline gap-5">
                <span className="label text-[var(--t-muted)] font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(24px,3.2vw,44px)] uppercase leading-none text-[var(--t-heading)] transition-colors group-hover:text-[var(--c-orange)]">
                  {s.title}
                </span>
              </span>
              <span className="hidden max-w-[200px] text-right text-sm text-[var(--t-text)] opacity-80 md:block font-medium">
                {s.short}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--t-line)] pt-8">
          <div className="flex items-center gap-4">
            <Doodle name="squiggle" className="w-24 text-[var(--t-heading)]" />
            <p className="text-sm text-[var(--t-text)] opacity-90 font-medium">
              Every project ships with automated test suites, CI/CD, and complete handover docs.
            </p>
          </div>
          <Link
            href="/our-product"
            className="font-display text-base uppercase tracking-wider text-[var(--t-heading)] hover:text-[var(--c-orange)] transition-colors"
          >
            Explore all capabilities →
          </Link>
        </div>
      </div>
    </ThemeSection>
  );
}
