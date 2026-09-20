import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import PageMotion from "@/components/system/PageMotion";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Start a Software Project | DevStarLabs",
  description:
    "Schedule a technical discovery call, start a software product sprint, or explore engineering programs with DevStarLabs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageMotion>
      {/* Contact Hero: Orange Sheet */}
      <ThemeSection
        theme="orange"
        className="overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-36"
      >
        <div className="relative">
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            Studio Dossier &middot; Direct Dispatch
          </span>
          <div className="relative overflow-y-clip">
            <h1 className="display-hero text-[var(--t-heading)] max-md:!text-[clamp(56px,16vw,235px)]">
              Contact
            </h1>
          </div>
          <p className="mt-4 font-display text-3xl uppercase text-[var(--t-text)] md:text-5xl">
            Let&apos;s build together<span className="text-[var(--c-ink)]">.</span>
          </p>
        </div>
      </ThemeSection>

      {/* Main Form: Sand Sheet with Sweep */}
      <ThemeSection
        theme="sand"
        motion="sweep"
        className="pt-24 pb-32"
        style={{
          ["--t-heading"]: "var(--c-ink)",
          ["--t-text"]: "var(--c-paper)",
          ["--t-muted"]: "hsla(0,0%,100%,.85)",
          ["--t-line"]: "hsla(0,0%,100%,.35)",
        } as React.CSSProperties}
      >
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Left Form Container */}
          <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12 shadow-2xl text-[var(--c-ink)]">
            <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-8">
              <div>
                <span className="label text-xs uppercase tracking-widest opacity-60">
                  Project Brief &middot; Direct Dispatch
                </span>
                <h2 className="font-display text-3xl uppercase tracking-tight text-[var(--c-ink)] md:text-4xl mt-1">
                  Start a Project
                </h2>
              </div>
              <Doodle name="spark" className="w-6 text-[var(--c-orange)]" />
            </div>
            <ContactForm />
          </div>

          {/* Right Aside Cards */}
          <aside className="space-y-6">
            <div
              className="rounded-3xl p-8 shadow-md"
              style={{
                background: "var(--c-ink)",
                color: "var(--c-paper)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span className="label mb-2 block text-xs uppercase tracking-widest text-[var(--c-orange)]">
                Direct Studio Email
              </span>
              <a
                href="mailto:manoj@devstarlabs.cloud"
                className="font-display text-2xl uppercase tracking-tight text-white hover:text-[var(--c-orange)] transition-colors block break-all"
              >
                manoj@devstarlabs.cloud
              </a>
              <p className="mt-2 text-xs text-white/70">
                Direct architectural reviews &amp; partnership inquiries.
              </p>
            </div>

            <div
              className="rounded-3xl p-8 shadow-md"
              style={{
                background: "var(--c-ink)",
                color: "var(--c-paper)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span className="label mb-2 block text-xs uppercase tracking-widest text-[var(--c-orange)]">
                Studio Response SLA
              </span>
              <p className="font-display text-xl uppercase tracking-wide text-white">
                Under 24 Hours
              </p>
              <p className="text-sm text-white/80 mt-1">
                Mon – Fri, 09:00 – 18:00 IST &middot; Dedicated Slack channels for active client engagements.
              </p>
            </div>

            <div
              className="rounded-3xl p-8 shadow-xl"
              style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
            >
              <div className="flex items-center gap-2">
                <Doodle name="spark" className="w-4 text-[var(--c-orange)]" />
                <span className="label text-[var(--c-orange)]">Technical Consult</span>
              </div>
              <h3 className="font-display mt-3 text-2xl uppercase tracking-tight text-white">
                20-Minute Architecture Review
              </h3>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">
                Book a <span className="font-bold text-white">20-minute architecture review</span> with our principal engineer to evaluate your tech stack, cloud hosting costs, or AI automation pipeline.
              </p>
            </div>
          </aside>
        </div>
      </ThemeSection>
    </PageMotion>
  );
}
