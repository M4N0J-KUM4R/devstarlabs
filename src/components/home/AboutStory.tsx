"use client";

import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import StoryVideo from "@/components/about/StoryVideo";
import FillButton from "@/components/system/FillButton";

interface StoryBeat {
  label: string;
  body: string;
}

const STORY_BEATS: readonly StoryBeat[] = [
  {
    label: "Product Studio & AI Lab",
    body: "We operate as a full-stack product studio and AI engineering agency. Senior engineers design, architect, and deploy production systems that scale gracefully.",
  },
  {
    label: "One accountable bench",
    body: "No junior handoffs or black boxes. The exact practitioners who design your distributed backends, WebGL frontends, and AI agent swarms build and maintain your systems.",
  },
  {
    label: "Built in production",
    body: "Every engagement ships with automated CI/CD pipelines, complete documentation, and 99.99% reliability — proven across 140+ client platform deployments worldwide.",
  },
];

export default function AboutStory() {
  return (
    <ThemeSection
      theme="sand"
      motion="sweep"
      className="overflow-x-clip"
      contentClassName="pt-24 pb-28 md:pt-32 md:pb-36"
      style={{
        ["--t-heading"]: "var(--c-ink)",
        ["--t-text"]: "var(--c-paper)",
        ["--t-muted"]: "hsla(0,0%,100%,.85)",
        ["--t-line"]: "hsla(0,0%,100%,.35)",
      } as React.CSSProperties}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,1.1fr)]">
        {/* Left Column: Editorial Narrative Rows */}
        <section aria-labelledby="story-heading" data-motion="stagger" className="space-y-4">
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            01 &middot; Our Story &amp; Philosophy
          </span>
          <h2 id="story-heading" className="font-display text-[clamp(36px,5vw,72px)] uppercase leading-[0.9] text-[var(--t-heading)]">
            Architects &amp; Builders.
          </h2>

          <div className="mt-8 divide-y divide-[var(--t-line)] border-y border-[var(--t-line)]">
            {STORY_BEATS.map((beat) => (
              <article key={beat.label} className="flex flex-col sm:flex-row sm:items-start gap-6 py-6">
                <h3 className="font-display text-2xl uppercase tracking-tight text-[var(--t-heading)] sm:w-48 shrink-0">
                  {beat.label}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-[var(--t-text)] opacity-95 md:text-lg">
                  {beat.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-4">
            <FillButton href="/about">Read our full story</FillButton>
            <div className="frame-line inline-block px-4 py-2 leading-tight">
              <span className="label block text-[10px] opacity-80 text-[var(--t-text)]">Client Rating</span>
              <span className="font-display block text-2xl text-[var(--t-heading)]">4.9 / 5</span>
              <span className="label block text-[10px] opacity-80 text-[var(--t-text)]">140+ Deployments</span>
            </div>
          </div>
        </section>

        {/* Right Column: Monumental Pinned Wordmark & Tilted Video Card */}
        <aside aria-label="Story media" className="relative col-divider pl-6">
          <div className="lg:sticky lg:top-[120px]">
            <div className="-mt-8 overflow-y-clip" style={{ transform: "translateX(24%)" }}>
              <span
                data-motion="mask"
                className="display-hero block whitespace-nowrap select-none text-[var(--c-ink)] opacity-90 max-md:!text-[clamp(64px,24vw,240px)]"
                style={{ fontSize: "calc(var(--scale-px) * 380)" }}
              >
                Our
                <br />
                story
              </span>
            </div>

            <div className="absolute left-[6%] top-[20%] w-[52%] max-md:left-auto max-md:bottom-[4%] max-md:right-0 max-md:top-auto max-md:w-[68%]">
              <div data-motion="settle" data-motion-from="-24" data-motion-delay="0.2">
                <StoryVideo />
              </div>
            </div>

            <span className="absolute bottom-2 left-0 block w-8 animate-[bob_7s_ease-in-out_infinite] text-[var(--c-paper)]">
              <Doodle name="curved-arrow" className="w-full" rotate={-40} />
            </span>
          </div>
        </aside>
      </div>
    </ThemeSection>
  );
}
