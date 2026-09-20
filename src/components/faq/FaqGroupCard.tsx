"use client";

import { useState } from "react";

/* Port of the original faq-section card: a flat dark sheet holding one
   group; each item is a header row with a 1px --t-line bottom border
   (except the last), a select-list arrow that rotates 180° when open,
   and a grid-rows height transition for the answer. */
export default function FaqGroupCard({
  title,
  items,
}: {
  title: string;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-card plan-panel frame-ink bg-[var(--c-ink)] text-[var(--c-paper)]">
      <h2 className="font-display text-[clamp(22px,2.4vw,32px)] uppercase leading-none tracking-tight">
        {title}
      </h2>
      <ul className="mt-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="faq-item-header text-[15px] leading-snug"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  className="faq-item-arrow"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>
              <div className="faq-item-body">
                <div>
                  <p className="pb-4 pr-6 text-sm leading-relaxed opacity-75">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
