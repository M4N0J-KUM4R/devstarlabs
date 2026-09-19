import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import { STATS } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "DevStarLabs is a software studio and training lab: senior engineers who build products by day and teach certification tracks by night.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Build in the open",
    body: "Docs, decisions, and pricing you can audit. Our clients own everything we produce.",
  },
  {
    title: "Teach what we ship",
    body: "Every trainer still does client work. Your Kubernetes course was written this quarter, not in 2019.",
  },
  {
    title: "Boring deploys",
    body: "We optimize for the 3 a.m. non-incident: SLOs, rollbacks, and runbooks from day one.",
  },
  {
    title: "Engineers, multiplied",
    body: "The lab model: juniors pair on real work under senior review. Clients get fresh eyes at sane rates.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ThemeSection theme="sand" className="overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="ed items-end">
          <h1 className="display-hero max-md:!text-[clamp(56px,16vw,235px)] text-[var(--t-heading)]">
            Our story
          </h1>
          <p className="max-w-md text-lg">
            Started by platform engineers who kept getting the same question:
            <span className="font-bold"> “can you also teach our team this?”</span>
          </p>
        </div>
        <Doodle name="arrow" className="mt-6 w-28 text-[var(--t-heading)]" rotate={12} />
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-20 pt-20">
        <div className="ed gap-12">
          <div className="space-y-6 text-lg">
            <p>
              DevStarLabs began as a two-person consultancy fixing cloud
              bills and CI pipelines. Every engagement ended the same way —
              clients didn&apos;t just want the fix, they wanted to
              understand it.
            </p>
            <p>
              So we built the lab: half studio, half classroom. The same
              engineers who architect your platform teach the certification
              tracks, on live clusters, with yesterday&apos;s production
              stories.
            </p>
            <p>
              Today we run eight service lines and eleven training tracks
              across 14 countries — and every project still ends with a
              handover your team can actually hold.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6"
                style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
              >
                <p className="font-display text-4xl text-[var(--c-orange)]">{s.value}</p>
                <p className="mt-2 text-sm opacity-75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ThemeSection>

      <ThemeSection theme="sage" tiltRight className="pb-24 pt-20">
        <h2 className="display-md max-md:!text-[clamp(32px,8vw,72px)] text-[var(--t-heading)]">
          How we work
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl p-7"
              style={{ background: "rgba(var(--c-ink-rgb),0.9)", color: "var(--c-paper)" }}
            >
              <span className="label text-[var(--c-orange)]">
                0{i + 1}
              </span>
              <h3 className="font-display mt-3 text-2xl uppercase">{v.title}</h3>
              <p className="mt-3 text-sm opacity-75">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <FillButton href="/contact">Work with us</FillButton>
        </div>
      </ThemeSection>
    </>
  );
}
