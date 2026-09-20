import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import PageMotion from "@/components/system/PageMotion";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { PROJECTS } from "@/data/content";

export const metadata: Metadata = {
  title: "Showcase & Case Studies — Software & AI Engineering",
  description:
    "Explore production platforms, AI agent swarms, distributed fintech engines, and cloud architectures shipped by DevStarLabs.",
  alternates: { canonical: "/showcase" },
};

export default function ShowcasePage() {
  return (
    <PageMotion>
      {/* Hero Header: Sand Sheet */}
      <ThemeSection
        theme="sand"
        className="overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-36"
        style={{
          ["--t-heading"]: "var(--c-ink)",
          ["--t-text"]: "var(--c-paper)",
          ["--t-muted"]: "hsla(0,0%,100%,.85)",
          ["--t-line"]: "hsla(0,0%,100%,.35)",
        } as React.CSSProperties}
      >
        <div className="relative">
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            Selected Work · Case Studies
          </span>
          <div className="relative overflow-y-clip">
            <h1 className="display-hero text-[var(--t-heading)] max-md:!text-[clamp(52px,16vw,220px)]">
              Case Studies
            </h1>
          </div>
          <p className="mt-6 max-w-2xl font-display text-2xl uppercase leading-tight text-[var(--t-text)] md:text-4xl">
            Real production architectures<span className="text-[var(--t-heading)]">.</span> Scaled to millions of requests with sub-50ms latency.
          </p>
        </div>
      </ThemeSection>

      {/* Projects Grid: Light / Paper Sheet */}
      <ThemeSection theme="light" motion="sweep" className="pt-24 pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div>
            <span className="label uppercase opacity-60">Production Deployments</span>
            <DisplayWordmark size="lg" className="mt-2 text-[var(--c-ink)] max-md:!text-[clamp(40px,10vw,90px)]">
              Featured Systems
            </DisplayWordmark>
          </div>
          <p className="max-w-md text-base opacity-75">
            Each case study represents end-to-end delivery: architecture, interface design, testing, and cloud operations.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.slug}
              className="group rounded-3xl border border-black/10 bg-white p-8 md:p-12 shadow-md transition-all hover:border-black/30 hover:shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--c-orange)] bg-black/5 px-3 py-1 rounded-full">
                    {proj.category}
                  </span>
                  <span className="text-xs opacity-50">&middot;</span>
                  <span className="text-xs font-mono opacity-60">{proj.year}</span>
                </div>
                <span className="label text-xs uppercase tracking-wider opacity-60">
                  Client: {proj.client}
                </span>
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h2 className="font-display text-4xl uppercase tracking-tight text-[var(--c-ink)] group-hover:text-[var(--c-orange)] transition-colors md:text-5xl">
                    {proj.title}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-black/80">
                    {proj.tagline}
                  </p>
                  <p className="mt-4 text-base leading-relaxed opacity-75">
                    {proj.summary}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="mt-8 space-y-4 rounded-2xl bg-black/[0.02] p-6 text-sm">
                    <div>
                      <span className="font-bold uppercase tracking-wider text-xs text-[var(--c-orange)] block mb-1">
                        The Challenge
                      </span>
                      <p className="opacity-80 leading-relaxed">{proj.challenge}</p>
                    </div>
                    <div className="border-t border-black/5 pt-3">
                      <span className="font-bold uppercase tracking-wider text-xs text-[var(--c-ink)] block mb-1">
                        The Engineering Solution
                      </span>
                      <p className="opacity-80 leading-relaxed">{proj.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Metrics & Stack */}
                <div className="space-y-6">
                  {/* Metrics Tiles */}
                  <div className="grid grid-cols-3 gap-3">
                    {proj.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-center"
                      >
                        <span className="font-display block text-3xl font-bold text-[var(--c-orange)] md:text-4xl">
                          {m.value}
                        </span>
                        <span className="label block text-[10px] uppercase opacity-70 mt-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Note */}
                  <div className="rounded-2xl border border-black/10 bg-[var(--c-sand)]/10 p-6">
                    <div className="flex items-center gap-2 font-display text-sm uppercase">
                      <Doodle name="spark" className="w-4 text-[var(--c-orange)]" />
                      Client Impact
                    </div>
                    <p className="mt-2 text-sm leading-relaxed opacity-85">
                      {proj.impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <span className="label block text-xs uppercase tracking-widest opacity-60 mb-2">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-black/5 px-3 py-1 font-mono text-xs font-medium text-black/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
                <span className="text-xs font-mono opacity-50 uppercase">
                  Verified Case Study 0{idx + 1}
                </span>
                <FillButton href="/contact">
                  Build a similar system →
                </FillButton>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-20 rounded-3xl border border-black/10 bg-[var(--c-ink)] p-8 md:p-14 text-white shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <span className="label text-xs uppercase tracking-widest text-[var(--c-orange)]">
                Next Platform Launch
              </span>
              <h3 className="font-display mt-2 text-4xl uppercase tracking-tight text-white md:text-6xl">
                Ready to ship your product?
              </h3>
              <p className="mt-3 max-w-xl text-base text-white/80 leading-relaxed">
                From initial Figma design systems to production Kubernetes clusters and LLM pipelines — we deliver with speed and architectural rigor.
              </p>
            </div>
            <FillButton href="/contact">Start a Discussion</FillButton>
          </div>
        </div>
      </ThemeSection>
    </PageMotion>
  );
}
