import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import PageMotion from "@/components/system/PageMotion";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { PROGRAMS, CATEGORY_LABELS } from "@/data/content";

export const metadata: Metadata = {
  title: "Engineering Programs & Certification Labs — DevStarLabs",
  description:
    "Intensive hands-on engineering programs in AWS Cloud Architecture, Kubernetes CKA/CKAD, Generative AI Systems, Full-Stack Next.js, and Terraform GitOps.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <PageMotion>
      {/* Hero Header: Orange Sheet */}
      <ThemeSection
        theme="orange"
        className="overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-36"
      >
        <div className="relative">
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            Engineering Benching &middot; Certification Labs
          </span>
          <div className="relative overflow-y-clip">
            <h1 className="display-hero text-[var(--t-heading)] max-md:!text-[clamp(52px,16vw,220px)]">
              Programs
            </h1>
          </div>
          <p className="mt-6 max-w-2xl font-display text-2xl uppercase leading-tight text-[var(--t-text)] md:text-4xl">
            Taught on live production clusters<span className="text-[var(--t-heading)]">.</span> We train senior engineers to architect, scale, and certify.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <FillButton href="/contact">Enroll in a Track</FillButton>
            <FillButton href="/services" variant="outline">
              Explore Studio Services
            </FillButton>
          </div>
        </div>
      </ThemeSection>

      {/* Program Tracks Grid: Sage Sheet */}
      <ThemeSection
        theme="sage"
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
            <span className="label uppercase text-[var(--t-muted)]">Curriculum Directory</span>
            <DisplayWordmark size="lg" className="mt-2 text-[var(--t-heading)] max-md:!text-[clamp(40px,10vw,90px)]">
              5 Certification Labs
            </DisplayWordmark>
          </div>
          <p className="max-w-md text-base text-[var(--t-text)] leading-relaxed">
            Every track is led by active studio practitioners with live labs, timed certification exam drills, and capstone reviews.
          </p>
        </div>

        {/* Tracks List */}
        <div className="mt-16 space-y-12">
          {PROGRAMS.map((prog, idx) => (
            <div
              key={prog.slug}
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
                      {CATEGORY_LABELS[prog.category]} &middot; Track 0{idx + 1}
                    </span>
                    <Doodle name="spark" className="w-4 text-[var(--c-orange)]" />
                  </div>
                  <h2 className="font-display mt-3 text-4xl uppercase tracking-tight text-white md:text-5xl">
                    {prog.title}
                  </h2>
                  <p className="mt-2 text-base font-mono text-[var(--c-orange)] font-semibold">
                    Target Certification: {prog.cert}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase text-white">
                    ⏱ {prog.duration}
                  </span>
                  <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase text-white">
                    🎯 Level: {prog.level}
                  </span>
                  <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase text-white">
                    💻 {prog.format}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="label text-xs uppercase tracking-widest text-white/60 mb-3">
                    Program Learning Outcome
                  </h3>
                  <p className="text-base leading-relaxed text-white/90">
                    {prog.outcome}
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-2 font-display text-sm uppercase text-[var(--c-orange)]">
                      <Doodle name="star" className="w-4" />
                      Production Lab Cluster
                    </div>
                    <p className="mt-2 text-xs text-white/75 leading-relaxed">
                      Students receive dedicated cloud credentials with isolated sandbox environments to break, troubleshoot, and fix real infrastructure incidents.
                    </p>
                  </div>
                </div>

                {/* Modules Syllabus */}
                <div>
                  <h3 className="label text-xs uppercase tracking-widest text-[var(--c-orange)] mb-3">
                    Syllabus Modules
                  </h3>
                  <ol className="space-y-2.5 text-sm text-white/80">
                    {prog.modules.map((mod, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[var(--c-orange)] font-bold">
                          0{i + 1}.
                        </span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-wider text-white/60 font-mono">
                  Includes 1-on-1 mentorship &middot; Capstone project review &middot; Lifetime community access
                </span>
                <FillButton href="/contact">
                  Apply for Track 0{idx + 1}
                </FillButton>
              </div>
            </div>
          ))}
        </div>
      </ThemeSection>

      {/* Training Methodology: Sand Sheet */}
      <ThemeSection theme="sand" motion="sweep" className="pt-24 pb-32">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="border-t border-black/15 pt-6">
            <span className="font-display text-4xl uppercase text-[var(--c-ink)]">
              Live Production Labs
            </span>
            <p className="mt-3 text-sm opacity-80 leading-relaxed text-black">
              No simulated slides. Every exercise runs on actual AWS accounts, Kubernetes clusters, and LLM endpoints.
            </p>
          </div>
          <div className="border-t border-black/15 pt-6">
            <span className="font-display text-4xl uppercase text-[var(--c-ink)]">
              Senior Practitioners
            </span>
            <p className="mt-3 text-sm opacity-80 leading-relaxed text-black">
              Courses are designed and instructed by engineers who architect and ship client systems every day.
            </p>
          </div>
          <div className="border-t border-black/15 pt-6">
            <span className="font-display text-4xl uppercase text-[var(--c-ink)]">
              94% Pass Rate
            </span>
            <p className="mt-3 text-sm opacity-80 leading-relaxed text-black">
              Proven curriculum that prepares engineers to pass demanding performance-based exams on the first attempt.
            </p>
          </div>
        </div>
      </ThemeSection>
    </PageMotion>
  );
}
