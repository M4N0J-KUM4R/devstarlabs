import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import { STATS } from "@/data/content";

export default function StatsBand() {
  return (
    <ThemeSection theme="sand" motion="sweep" contentClassName="overflow-hidden pb-24 pt-28">
      <Doodle
        name="cross"
        className="pointer-events-none absolute -right-16 top-10 w-72 text-[rgba(var(--c-orange-rgb),0.5)]"
        rotate={12}
      />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="label block uppercase tracking-widest text-[var(--t-muted)]">
            04 &middot; Verified Metrics
          </span>
          <h2 className="display-md max-w-[8ch] text-[var(--t-heading)] max-md:!text-[clamp(36px,9vw,80px)] mt-2">
            Proof, Not Promises
          </h2>
        </div>
        <p className="max-w-md text-lg text-[var(--t-text)] leading-relaxed">
          Production numbers audited across our client systems and multi-region infrastructure deployments.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="frame-line p-6 md:p-8"
            style={{
              background: "var(--c-ink)",
              color: "var(--c-paper)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <p className="font-display text-[clamp(36px,4.5vw,64px)] leading-none text-[var(--c-orange)]">
              {s.value}
            </p>
            <p className="mt-3 text-sm font-medium text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </ThemeSection>
  );
}
