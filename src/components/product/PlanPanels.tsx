"use client";

import { useState } from "react";
import Link from "next/link";
import HoverAccent from "@/components/system/HoverAccent";
import { PLANS } from "@/data/plans";

/* Port of the original card-plan block: three panels — Sprint (light),
   Annual (dark, center), Monthly (light). On mobile the original swaps
   the grid for a tab switcher (.card-plan__tabs); this component keeps
   one markup and drives visibility with data-panel-active + CSS. */
export default function PlanPanels() {
  const [active, setActive] = useState("annual");

  return (
    <div className="card-plan">
      {/* mobile tabs (hidden on md-up by CSS below) */}
      <div className="card-plan__tabs mb-4 flex gap-2 lg:hidden" role="tablist">
        {PLANS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={active === p.id}
            onClick={() => setActive(p.id)}
            className={`btn flex-1 text-sm normal-case tracking-normal ${
              active === p.id ? "btn--pill btn--solid" : "frame-line"
            }`}
          >
            <span className="relative z-10">{p.name.replace(" plan", "")}</span>
            {active === p.id && <HoverAccent />}
          </button>
        ))}
      </div>

      <div className="grid gap-[var(--page-spacing)] lg:grid-cols-3">
        {PLANS.map((p) => {
          const dark = p.id === "annual";
          return (
            <article
              key={p.id}
              data-panel={p.id}
              data-panel-active={active === p.id}
              className={`plan-panel motion-card ${
                dark ? "frame-ink bg-[var(--c-ink)] text-[var(--c-paper)]" : "frame-line"
              }`}
            >
              <header className="mb-4">
                <h3 className="font-display text-[clamp(22px,2.4vw,32px)] uppercase leading-none tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm opacity-80">{p.tagline}</p>
                <p className="mt-1 text-sm opacity-60">{p.bestWhen}</p>
              </header>

              <ul className="mb-6 flex flex-col">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="row-line flex items-center gap-3 py-3 text-[15px] leading-snug"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5 shrink-0 text-[var(--c-orange)]"
                      aria-hidden="true"
                    >
                      <circle cx="6" cy="6" r="6" fill="currentColor" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <footer className="mt-auto">
                <p className="price font-display text-[clamp(30px,3vw,44px)] leading-none tracking-tight">
                  ${p.price.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-sm opacity-70">
                  ${p.price.toLocaleString("en-US")} {p.per}
                  {p.annualNote ? ` — ${p.annualNote}` : ""}
                </p>
                <Link
                  href="/signup"
                  className="btn btn--pill btn--solid btn--block mt-4 justify-between text-base normal-case tracking-normal"
                >
                  <span className="relative z-10">Join</span>
                  <HoverAccent />
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path d="M8 12h7m0 0-3-3m3 3-3 3" />
                  </svg>
                </Link>
              </footer>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 979px) {
          .card-plan [data-panel] { display: none; }
          .card-plan [data-panel-active="true"] { display: flex; }
        }
        @media (min-width: 980px) {
          .card-plan__tabs { display: none; }
        }
      `}</style>
    </div>
  );
}
