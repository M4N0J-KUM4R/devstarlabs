"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HoverAccent from "@/components/system/HoverAccent";
import { PRO_GROUPS, PERIODS, COMPARISONS } from "@/data/plans";

/* Port of the original plans-difference block: the Pro frame carries
   the ink inset frame (plans-difference__frame_upgraded), the Starter
   frame the hairline inset (frame_free); grouped feature rows with the
   disabled rows dimmed (--t-line); the Annual/Monthly/Weekly toggle
   swaps the price footer; the "less than" line rotates comparisons. */
export default function PlanDifference() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["id"]>("monthly");
  const [cmp, setCmp] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCmp((c) => (c + 1) % COMPARISONS.length), 2600);
    return () => clearInterval(t);
  }, []);

  const p = PERIODS.find((x) => x.id === period)!;

  return (
    <div className="plans-difference grid gap-[var(--page-spacing)] lg:grid-cols-2">
      {/* PRO — upgraded frame (ink inset) */}
      <article className="plan-panel frame-ink motion-card bg-[var(--c-paper)] text-[var(--c-ink)]">
        <header>
          <h3 className="font-display text-[clamp(24px,2.6vw,36px)] uppercase leading-none tracking-tight">
            Pro Card
          </h3>
          <p className="mt-2 text-sm opacity-75">
            Show more. Share better. Earn directly.
          </p>
        </header>

        {PRO_GROUPS.map((g) => (
          <section key={g.title} className="mt-4">
            <h4 className="row-line py-2 text-[13px] uppercase tracking-[0.08em] opacity-70">
              {g.title}
            </h4>
            <ul>
              {g.rows.map((r) => (
                <li
                  key={r.label}
                  className={`row-line plan-feature-row text-[15px] ${
                    r.free ? "" : "opacity-100"
                  }`}
                  style={r.free ? undefined : { color: "var(--c-ink)" }}
                >
                  <span className="flex items-center gap-2">
                    {r.free ? (
                      <svg viewBox="0 0 14 14" className="h-3 w-3 text-[var(--c-orange)]" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="7" cy="7" r="2.4" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 14 14" className="h-3 w-3 text-[var(--c-ink)]" aria-hidden="true">
                        <path d="M2 7.5 5.5 11 12 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                    {r.label}
                  </span>
                  {!r.free && (
                    <span className="text-xs opacity-60">Pro</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* period toggle — original RadioGroup pill row */}
        <div className="mt-6 flex gap-2" role="radiogroup" aria-label="Billing period">
          {PERIODS.map((x) => (
            <button
              key={x.id}
              role="radio"
              aria-checked={period === x.id}
              onClick={() => setPeriod(x.id)}
              className={`btn text-sm normal-case tracking-normal ${
                period === x.id ? "btn--pill btn--solid" : "frame-line"
              }`}
            >
              <span className="relative z-10">{x.label}</span>
              {period === x.id && <HoverAccent />}
            </button>
          ))}
        </div>

        <footer className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm opacity-70">Get your PRO Card for just</p>
            <p className="price font-display text-[clamp(30px,3vw,44px)] leading-none tracking-tight">
              ${p.price}
              <span className="text-[0.45em]">{p.per}</span>
            </p>
            <p className="mt-1 text-sm opacity-70">
              That&apos;s less than{" "}
              <span key={cmp} className="reveal-swap inline-block">
                {COMPARISONS[cmp]}
              </span>
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <p className="text-sm opacity-70">{p.note}</p>
            <Link
              href="/signup"
              className="btn btn--pill btn--solid justify-between text-base normal-case tracking-normal"
            >
              <span className="relative z-10">Join</span>
              <HoverAccent />
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="11" />
                <path d="M8 12h7m0 0-3-3m3 3-3 3" />
              </svg>
            </Link>
          </div>
        </footer>

        <style>{`
          .reveal-swap { animation: reveal-swap .45s cubic-bezier(.25,.74,.22,.99); }
          @keyframes reveal-swap {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </article>

      {/* STARTER — free frame (hairline inset) */}
      <article className="plan-panel frame-line motion-card bg-[var(--c-paper)] text-[var(--c-ink)]">
        <header>
          <h3 className="font-display text-[clamp(24px,2.6vw,36px)] uppercase leading-none tracking-tight">
            Starter Card
          </h3>
          <p className="mt-2 text-sm opacity-75">A first impression.</p>
        </header>

        {PRO_GROUPS.map((g) => (
          <section key={g.title} className="mt-4">
            <h4 className="row-line py-2 text-[13px] uppercase tracking-[0.08em] opacity-70">
              {g.title}
            </h4>
            <ul>
              {g.rows.map((r) => (
                <li
                  key={r.label}
                  className="plan-feature-row text-[15px]"
                  style={r.free ? undefined : { color: "var(--t-line)" }}
                >
                  <span className="flex items-center gap-2">
                    {r.free ? (
                      <svg viewBox="0 0 14 14" className="h-3 w-3 text-[var(--c-orange)]" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="7" cy="7" r="2.4" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden="true" style={{ color: "var(--t-line)" }}>
                        <path d="M3 3l8 8M11 3l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                    {r.label}
                  </span>
                  {!r.free && <span className="text-xs">Pricing</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-10">
          <div>
            <p className="price font-display text-[clamp(30px,3vw,44px)] leading-none tracking-tight">
              Free
            </p>
            <p className="mt-1 text-sm opacity-70">Free forever. No card required.</p>
          </div>
          <Link
            href="/signup"
            className="btn btn--pill btn--solid ml-auto justify-between text-base normal-case tracking-normal"
          >
            <span className="relative z-10">Join</span>
            <HoverAccent />
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="11" />
              <path d="M8 12h7m0 0-3-3m3 3-3 3" />
            </svg>
          </Link>
        </footer>
      </article>
    </div>
  );
}
