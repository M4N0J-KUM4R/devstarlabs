"use client";

import { useState } from "react";
import HoverAccent from "@/components/system/HoverAccent";

/* Gift Card purchase form — mirrors the original's form-wrapper column:
   minimal fields, hairline inputs, one black pill CTA, and a friendly
   confirmation state (no real backend). */
export default function GiftForm() {
  const [sent, setSent] = useState(false);
  const [qty, setQty] = useState(1);
  const price = 5988;

  if (sent) {
    return (
      <div className="frame-line plan-panel bg-[var(--c-paper)] text-[var(--c-ink)]">
        <h3 className="font-display text-2xl uppercase tracking-tight">
          Gift wrapped
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">
          Activation instructions are on their way by email —{" "}
          {qty === 1 ? "one" : qty} DevStar Pro year
          {qty > 1 ? "s" : ""} of professional visibility. Check your inbox
          in the next few minutes.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn btn--link mt-5 text-sm normal-case tracking-normal"
        >
          <span className="relative z-10">Send another</span>
          <HoverAccent />
        </button>
      </div>
    );
  }

  return (
    <form
      className="plan-panel frame-line bg-[var(--c-paper)] text-[var(--c-ink)]"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="input-line sm:col-span-2">
          <span className="input-line__label">
            Recipient email <span className="req">*</span>
          </span>
          <input
            required
            type="email"
            name="recipient"
            placeholder="artist@studio.com"
            className="input-line__field"
          />
        </label>
        <label className="input-line">
          <span className="input-line__label">Your name</span>
          <input
            type="text"
            name="from"
            placeholder="Optional"
            className="input-line__field"
          />
        </label>
        <label className="input-line">
          <span className="input-line__label">Quantity</span>
          <input
            type="number"
            name="qty"
            min={1}
            max={20}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className="input-line__field"
          />
        </label>
        <label className="input-line sm:col-span-2">
          <span className="input-line__label">Message</span>
          <textarea
            name="message"
            rows={3}
            placeholder="Say something kind…"
            className="input-line__field"
            style={{ height: "auto", resize: "vertical" }}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="price font-display text-[clamp(28px,3vw,42px)] leading-none tracking-tight">
          ${(price * qty).toLocaleString("en-US")}
          <span className="text-[0.4em]"> / {qty === 1 ? "year" : `${qty} years`}</span>
        </p>
        <button
          type="submit"
          className="btn btn--pill btn--solid justify-between px-6 text-base normal-case tracking-normal"
        >
          <span className="relative z-10">Buy Gift Card</span>
          <HoverAccent />
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="11" />
            <path d="M8 12h7m0 0-3-3m3 3-3 3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
