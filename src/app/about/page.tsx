import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import MarqueeStrip from "@/components/system/MarqueeStrip";
import PageMotion from "@/components/system/PageMotion";
import StoryVideo from "@/components/about/StoryVideo";
import { TEAM_MEMBERS } from "@/data/content";

export const metadata: Metadata = {
  title: "About — Software Studio, AI Lab & Team",
  description:
    "DevStarLabs is a full-stack product development studio and AI engineering agency: senior practitioners designing and architecting scalable web platforms, mobile apps, and autonomous AI systems.",
  alternates: { canonical: "/about" },
};

const EMAIL = "manoj@devstarlabs.cloud";

const STORY_ROWS = [
  {
    label: "Devstar labs",
    body: (
      <>
        A full-stack software product studio and AI engineering agency for teams that ship. We build
        high-throughput web platforms, native mobile apps, and autonomous AI workflows — one senior
        bench leading design, architecture, and deployment.
      </>
    ),
    badge: (
      <div className="mt-6 inline-flex items-center gap-4 rounded-xl border border-[var(--c-ink)] bg-black/5 px-4 py-2 text-left">
        <div>
          <span className="label block text-[10px] uppercase text-[var(--c-ink)] opacity-70">Client Rating</span>
          <span className="font-display block text-2xl font-bold text-[var(--c-ink)]">4.9 / 5</span>
        </div>
        <div className="border-l border-black/20 pl-4">
          <span className="label block text-[10px] uppercase text-[var(--c-ink)] opacity-70">Experience</span>
          <span className="font-display block text-lg font-bold text-[var(--c-ink)]">140+ Systems Shipped</span>
        </div>
      </div>
    ),
  },
  {
    label: "Built in production",
    body: (
      <>
        DevStarLabs began as an independent engineering consultancy fixing distributed architecture
        bottlenecks, cloud reliability issues, and slow frontend pipelines. Every engagement ends the
        same way — clients don&apos;t just want a prototype, they want production-grade software that scales.
      </>
    ),
  },
  {
    label: "Engineering bench",
    body: (
      <>
        Today we operate global product sprints and dedicated engineering pods across 18
        countries — combining token-driven design systems, Kubernetes cloud hosting,
        and production LLM agent swarms.
      </>
    ),
  },
  {
    label: "Let's connect",
    body: (
      <>
        <a href={`mailto:${EMAIL}`} className="font-bold underline underline-offset-4 text-[var(--c-ink)] hover:opacity-80">
          {EMAIL}
        </a>
        <div className="mt-4 flex gap-2">
          {["gh", "in", "x"].map((s) => (
            <span
              key={s}
              className="flex size-8 items-center justify-center rounded-lg bg-[var(--c-ink)] text-xs font-bold uppercase text-[var(--c-paper)]"
            >
              {s}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    label: "Press & speaking",
    body: (
      <>
        For keynotes, technical case studies, and engineering consults — write to{" "}
        <a href={`mailto:${EMAIL}`} className="font-bold underline underline-offset-4 text-[var(--c-ink)] hover:opacity-80">
          {EMAIL}
        </a>{" "}
        and we&apos;ll respond within 24 hours.
      </>
    ),
  },
];

function MemberTile({ name, role, email, specialty }: { name: string; role: string; email: string; specialty: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <article className="group relative rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-black/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex aspect-square w-20 items-center justify-center rounded-2xl shadow-inner"
          style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
        >
          <span className="font-display text-3xl uppercase">{initials}</span>
        </div>
        <a
          href={`mailto:${email}`}
          aria-label={`Email ${name}`}
          className="flex size-9 items-center justify-center rounded-full border border-black/10 text-sm font-bold text-[var(--c-ink)] transition-colors hover:bg-[var(--c-ink)] hover:text-white"
        >
          ↗
        </a>
      </div>

      <h3 className="font-display mt-6 text-3xl uppercase tracking-tight text-[var(--c-ink)]">
        {name}
      </h3>

      <p className="mt-2 text-sm font-semibold text-[var(--c-orange)]">
        {role}
      </p>

      <p className="mt-1 text-xs leading-relaxed text-black/70">
        {specialty}
      </p>

      <div className="mt-6 border-t border-black/5 pt-4 text-xs font-mono text-black/50">
        {email}
      </div>
    </article>
  );
}

const PARTNER_NAMES = [
  "AWS",
  "OpenAI",
  "Anthropic",
  "Kubernetes",
  "Terraform",
  "Next.js",
  "PostgreSQL",
  "GCP",
  "Figma",
  "Docker",
  "Supabase",
  "Vercel",
];

export default function AboutPage() {
  return (
    <PageMotion>
      {/* Our Story: Sand Sheet */}
      <ThemeSection
        theme="sand"
        className="overflow-x-clip pt-32 pb-28 md:pt-40 md:pb-36"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: Editorial Story Rows */}
          <div>
            <span className="label block uppercase tracking-widest text-[var(--c-ink)] opacity-70">
              Studio Dossier · About
            </span>
            <h1 className="font-display mt-2 text-6xl uppercase tracking-tight text-[var(--c-ink)] md:text-8xl">
              Our Story
            </h1>

            <div className="mt-12 divide-y divide-black/15">
              {STORY_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-4 py-8 sm:grid-cols-[180px_1fr]"
                >
                  <h2 className="font-display text-2xl uppercase tracking-tight text-[var(--c-ink)]">
                    {row.label}
                  </h2>
                  <div className="text-base leading-relaxed text-[var(--c-ink)] opacity-90 md:text-lg">
                    <div>{row.body}</div>
                    {row.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured Story Media Card */}
          <div className="relative lg:pl-8">
            <div className="sticky top-28 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-black/15 bg-white p-3 shadow-xl">
                <StoryVideo />
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/5 p-6 text-sm text-[var(--c-ink)]">
                <div className="flex items-center gap-2 font-display text-lg uppercase">
                  <Doodle name="spark" className="w-4 text-[var(--c-orange)]" />
                  Engineering Philosophy
                </div>
                <p className="mt-2 text-sm opacity-80 leading-relaxed">
                  We treat software engineering as craft and science. We build systems that score green on Core Web Vitals, maintain 99.99% uptime, and leverage AI to drive real business leverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* Meet the Team: Steel Sheet */}
      <ThemeSection theme="steel" motion="sweep" className="overflow-x-clip pt-24 pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-8">
          <div>
            <span className="label block uppercase tracking-widest text-white/70">
              Leadership &amp; Engineering Benching
            </span>
            <h2 className="font-display mt-2 text-5xl uppercase tracking-tight text-white md:text-7xl">
              Meet The Team
            </h2>
          </div>
          <p className="max-w-md text-base text-white/80">
            A specialized collective of senior software architects, full-stack engineers, AI researchers, and cloud infrastructure specialists.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((t) => (
            <MemberTile
              key={t.name}
              name={t.name}
              role={t.role}
              specialty={t.specialty}
              email={t.email}
            />
          ))}
        </div>
      </ThemeSection>

      {/* Partners & Clients: Sage Sheet */}
      <ThemeSection theme="sage" motion="sweep" className="overflow-x-clip pt-24 pb-32">
        <div className="relative overflow-y-clip">
          <Doodle
            name="ring"
            className="absolute left-[28%] top-6 w-[38%] text-[var(--c-orange)]"
            rotate={-12}
          />
          <h2 className="relative select-none font-display text-5xl uppercase leading-[0.9] text-[var(--t-heading)] md:text-7xl">
            Technology Partners
            <br />
            &amp; Tool Ecosystem
          </h2>
        </div>

        <div className="mt-14 border-t border-[var(--t-line)] pt-10">
          <MarqueeStrip
            period={40}
            items={PARTNER_NAMES.map((n) => (
              <span
                key={n}
                className="mx-2 flex h-24 w-44 items-center justify-center rounded-2xl bg-[var(--c-ink)] px-4 text-center font-display text-xl uppercase tracking-wide text-[var(--c-paper)] shadow-md"
              >
                {n}
              </span>
            ))}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-[var(--t-line)] pt-8">
          <p className="max-w-md text-base text-[var(--t-text)] leading-relaxed opacity-90">
            We partner with industry-standard cloud providers, frontier AI labs, and modern framework ecosystems to build resilient products.
          </p>
          <FillButton href="/contact">Work with us</FillButton>
        </div>
      </ThemeSection>
    </PageMotion>
  );
}
