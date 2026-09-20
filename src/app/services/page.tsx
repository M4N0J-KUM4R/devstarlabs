import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import PageMotion from "@/components/system/PageMotion";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { SERVICES } from "@/data/content";

export const metadata: Metadata = {
  title: "Services & Capabilities — Full-Stack Product & AI Studio",
  description:
    "DevStarLabs engineers high-performance web platforms, mobile apps, managed cloud infrastructure, SEO growth architectures, and autonomous AI automation pipelines.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageMotion>
      {/* Hero Header: Orange Sheet */}
      <ThemeSection
        theme="orange"
        className="overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-36"
      >
        <div className="relative">
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            Capabilities &middot; Software Studio &amp; AI Lab
          </span>
          <div className="relative overflow-y-clip">
            <h1 className="display-hero text-[var(--t-heading)] max-md:!text-[clamp(52px,16vw,220px)]">
              What We Build
            </h1>
          </div>
          <p className="mt-6 max-w-2xl font-display text-2xl uppercase leading-tight text-[var(--t-text)] md:text-4xl">
            From zero to scaled production<span className="text-[var(--t-heading)]">.</span> We design interfaces, engineer platforms, and deploy autonomous AI systems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <FillButton href="/contact">Inquire</FillButton>
            <FillButton href="/showcase" variant="outline">
              View Case Studies
            </FillButton>
          </div>
        </div>
      </ThemeSection>

      {/* 5 Core Pillars Detailed Breakdown: Sand Sheet */}
      <ThemeSection
        theme="sand"
        motion="sweep"
        className="overflow-x-clip pt-24 pb-32"
        style={{
          ["--t-heading"]: "var(--c-ink)",
          ["--t-text"]: "var(--c-paper)",
          ["--t-muted"]: "hsla(0,0%,100%,.85)",
          ["--t-line"]: "hsla(0,0%,100%,.35)",
        } as React.CSSProperties}
      >
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--t-line)] pb-8">
          <div>
            <span className="label uppercase text-[var(--t-muted)]">Core Ecosystem</span>
            <DisplayWordmark size="lg" className="mt-2 text-[var(--t-heading)] max-md:!text-[clamp(40px,10vw,90px)]">
              5 Engineering Pillars
            </DisplayWordmark>
          </div>
          <p className="max-w-md text-base text-[var(--t-text)] leading-relaxed">
            Strictly typed, token-driven, and designed for sub-second performance across all touchpoints.
          </p>
        </div>

        {/* Pillar Solid Flat Cards */}
        <div className="mt-16 space-y-12">
          {SERVICES.map((s, idx) => (
            <div
              key={s.slug}
              id={s.slug}
              className="rounded-3xl p-8 md:p-12 transition-all hover:shadow-2xl"
              style={{
                background: "var(--c-ink)",
                color: "var(--c-paper)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/15 pb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-orange)] font-bold">
                      Pillar 0{idx + 1}
                    </span>
                    <Doodle name="spark" className="w-4 text-[var(--c-orange)]" />
                  </div>
                  <h2 className="font-display mt-3 text-4xl uppercase tracking-tight text-white md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-lg text-white/80 font-medium">
                    {s.tagline}
                  </p>
                </div>

                {s.metrics && (
                  <div className="flex gap-4">
                    {s.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center"
                      >
                        <span className="font-display block text-2xl text-[var(--c-orange)] md:text-3xl">
                          {m.value}
                        </span>
                        <span className="label block text-[10px] uppercase text-white/60">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Descriptions */}
                <div className="space-y-4 text-base leading-relaxed text-white/80">
                  {s.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Deliverables & Stack */}
                <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div>
                    <h3 className="label text-xs uppercase tracking-widest text-[var(--c-orange)] mb-3">
                      Production Deliverables
                    </h3>
                    <ul className="space-y-2 text-sm text-white/90">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-orange)]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h3 className="label text-xs uppercase tracking-widest text-white/60 mb-2">
                      Engineered With
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {s.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-white/10 px-3 py-1 font-mono text-xs text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-wider text-white/60 font-mono">
                  SLA: 24/7 Dedicated Support &middot; Fixed Scope or Retainer
                </span>
                <FillButton href="/contact">
                  Inquire on {s.title.split("&")[0].trim()}
                </FillButton>
              </div>
            </div>
          ))}
        </div>
      </ThemeSection>

      {/* Engagement Models & Delivery Process: Steel Sheet */}
      <ThemeSection theme="steel" motion="sweep" className="pt-24 pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-8">
          <div>
            <span className="label block uppercase tracking-widest text-white/70">
              How We Engage
            </span>
            <h2 className="font-display mt-2 text-5xl uppercase tracking-tight text-white md:text-7xl">
              Engagement Models
            </h2>
          </div>
          <p className="max-w-md text-base text-white/80">
            Tailored sprints and dedicated pods with transparent milestones and senior engineering accountability.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div
            className="rounded-3xl p-8 text-white shadow-xl"
            style={{
              background: "var(--c-ink)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-orange)]">
              Model 01
            </span>
            <h3 className="font-display mt-4 text-3xl uppercase tracking-tight text-white">
              Full Product Sprint
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              End-to-end design, architecture, and launch of greenfield web/mobile applications and AI systems. Fixed scope and guaranteed milestones.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 text-white shadow-xl"
            style={{
              background: "var(--c-ink)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-orange)]">
              Model 02
            </span>
            <h3 className="font-display mt-4 text-3xl uppercase tracking-tight text-white">
              Dedicated Engineering Pod
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              A specialized pod of senior full-stack, AI, and DevOps engineers embedded alongside your team to accelerate product delivery.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 text-white shadow-xl"
            style={{
              background: "var(--c-ink)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-orange)]">
              Model 03
            </span>
            <h3 className="font-display mt-4 text-3xl uppercase tracking-tight text-white">
              Managed Cloud &amp; Growth
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              24/7 cloud hosting, Kubernetes maintenance, technical SEO optimization, and ongoing AI workflow enhancements.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-12">
          <div>
            <h3 className="font-display text-4xl uppercase tracking-tight text-white md:text-5xl">
              Have a platform to build?
            </h3>
            <p className="mt-2 text-base text-white/70">
              Book a 20-minute technical discovery call with our principal architect.
            </p>
          </div>
          <FillButton href="/contact">Book Technical Discovery</FillButton>
        </div>
      </ThemeSection>
    </PageMotion>
  );
}
