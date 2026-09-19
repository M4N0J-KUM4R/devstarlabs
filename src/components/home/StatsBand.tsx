import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import { STATS } from "@/data/content";

export default function StatsBand() {
  return (
    <ThemeSection theme="sand" tilt className="overflow-hidden pb-24 pt-28">
      <Doodle
        name="cross"
        className="pointer-events-none absolute -right-16 top-10 w-72 text-[rgba(var(--c-orange-rgb),0.5)]"
        rotate={12}
      />
      <div className="ed items-end">
        <h2 className="display-md max-w-[5ch] text-[var(--t-heading)] max-md:!text-[clamp(36px,9vw,80px)]">
          Proof, not promises
        </h2>
        <p className="max-w-md text-lg">
          Numbers our clients and students audit every quarter — published
          plainly, like everything else we do.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-6"
            style={{ background: "rgba(var(--c-ink-rgb),0.9)", color: "var(--c-paper)" }}
          >
            <p className="font-display text-[clamp(36px,4.5vw,64px)] leading-none text-[var(--c-orange)]">
              {s.value}
            </p>
            <p className="mt-3 text-sm opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
    </ThemeSection>
  );
}
