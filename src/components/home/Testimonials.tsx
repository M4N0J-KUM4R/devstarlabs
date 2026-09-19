"use client";

import { useState } from "react";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import { TESTIMONIALS } from "@/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <ThemeSection theme="steel" tilt className="overflow-hidden pb-24 pt-28">
      <div className="relative select-none" aria-hidden="true">
        <p className="display-xl display-crop text-[var(--t-heading)] opacity-90">
          Said about
        </p>
      </div>
      <h2 className="sr-only">Testimonials</h2>
      <Doodle
        name="ring"
        className="pointer-events-none absolute left-[6%] top-24 w-28 text-[var(--c-paper)]"
        rotate={-8}
      />

      <div className="relative mx-auto mt-6 max-w-2xl">
        {/* tilted sheets behind the quote card */}
        <div
          className="absolute inset-x-10 top-4 hidden h-full rounded-xl bg-[rgba(var(--c-paper-rgb),0.4)] md:block"
          style={{ transform: "rotate(5deg)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-16 top-8 hidden h-full rounded-xl bg-[rgba(var(--c-paper-rgb),0.25)] md:block"
          style={{ transform: "rotate(-4deg)" }}
          aria-hidden="true"
        />

        <figure
          key={index}
          className="relative rounded-xl bg-white p-8 text-[var(--c-ink)] shadow-2xl"
          style={{ animation: "bob 0.5s var(--ease-out)" }}
        >
          <blockquote className="text-lg leading-relaxed md:text-xl">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4 border-t pt-5"
            style={{ borderColor: "rgba(var(--c-ink-rgb),0.12)" }}>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full font-display text-lg text-white"
              style={{ background: "var(--c-ink)" }}
              aria-hidden="true"
            >
              {t.name[0]}
            </span>
            <span>
              <span className="block text-sm font-bold">{t.name}</span>
              <span className="block text-sm opacity-60">{t.role}</span>
            </span>
            <span className="ml-auto text-2xl" aria-label="country">
              {t.flag}
            </span>
          </figcaption>
        </figure>

        <div className="mt-8 flex items-center justify-between">
          <button onClick={prev} className="btn btn--pill !px-6" aria-label="Previous testimonial">
            ← Prev
          </button>
          <span className="label text-[var(--t-text)] opacity-70">
            {index + 1} / {TESTIMONIALS.length}
          </span>
          <button onClick={next} className="btn btn--pill !px-6" aria-label="Next testimonial">
            Next →
          </button>
        </div>
      </div>
    </ThemeSection>
  );
}
