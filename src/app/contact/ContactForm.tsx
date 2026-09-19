"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";

type State = { ok: boolean; message: string } | null;

const inputCls =
  "w-full rounded-lg border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-[var(--c-orange)]";
const border = "var(--ink-15)";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    submitContact,
    null,
  );

  if (state?.ok) {
    return (
      <div
        className="rounded-2xl p-8"
        style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
        role="status"
      >
        <DoodleStar />
        <h2 className="font-display mt-4 text-3xl uppercase">Message sent</h2>
        <p className="mt-3 text-sm opacity-75">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block text-[var(--t-muted)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
            style={{ borderColor: border }}
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block text-[var(--t-muted)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            style={{ borderColor: border }}
            placeholder="ada@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="label mb-2 block text-[var(--t-muted)]">
          I&apos;m here for
        </label>
        <select
          id="topic"
          name="topic"
          className={inputCls}
          style={{ borderColor: border }}
          defaultValue="project"
        >
          <option value="project">A software project</option>
          <option value="training">Certification training</option>
          <option value="consult">A skill consult</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block text-[var(--t-muted)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputCls}
          style={{ borderColor: border }}
          placeholder="What are you building — or what do you want to certify?"
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm font-medium" style={{ color: "var(--c-error)" }}>
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn--pill">
        {pending ? "Sending…" : "Send message →"}
      </button>
      <p className="text-xs text-[var(--t-muted)]">
        We reply within one business day. No newsletters, no spam.
      </p>
    </form>
  );
}

function DoodleStar() {
  return (
    <svg viewBox="0 0 64 60" className="w-10 text-[var(--c-orange)]" aria-hidden="true">
      <path
        d="M32 2 C34 14 36 18 46 20 C36 23 34 27 32 40 C30 27 28 23 18 20 C28 18 30 14 32 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
