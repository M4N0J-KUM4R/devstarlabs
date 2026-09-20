"use client";

import { useActionState, useState } from "react";
import { submitContact } from "./actions";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";

type State = { ok: boolean; message: string } | null;

const TOPICS = [
  { id: "fullstack", label: "Full-Stack Web & Mobile" },
  { id: "ai", label: "AI Workflows & Agents" },
  { id: "cloud", label: "Cloud Hosting & DevOps" },
  { id: "uiux", label: "UI/UX & Design Systems" },
  { id: "seo", label: "SEO & Growth" },
  { id: "programs", label: "Engineering Programs" },
];

export default function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState("fullstack");
  const [state, formAction, pending] = useActionState<State, FormData>(
    submitContact,
    null,
  );

  if (state?.ok) {
    return (
      <div
        className="rounded-3xl p-10 text-center"
        style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}
        role="status"
      >
        <Doodle name="star" className="mx-auto w-12 text-[var(--c-orange)]" />
        <h2 className="font-display mt-6 text-4xl uppercase tracking-tight text-white">
          Inquiry Received
        </h2>
        <p className="mt-3 text-base text-white/80 max-w-md mx-auto leading-relaxed">
          {state.message}
        </p>
        <div className="mt-8">
          <FillButton href="/">
            Return to Studio
          </FillButton>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate={false}>
      {/* Topic Selection */}
      <fieldset>
        <legend className="label mb-3 block text-xs uppercase tracking-widest text-[var(--t-muted)]">
          Project Service Area
        </legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project Service Area">
          {TOPICS.map((t) => {
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedTopic(t.id)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-[var(--c-ink)] text-white shadow-sm"
                    : "bg-black/5 text-black/70 hover:bg-black/10 hover:text-black"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="topic" value={selectedTopic} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block text-xs uppercase tracking-widest text-[var(--t-muted)]">
            Full Name <span className="text-[var(--c-orange)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-base text-[var(--c-ink)] outline-none transition-colors focus:border-[var(--c-orange)] focus:ring-1 focus:ring-[var(--c-orange)]"
            placeholder="e.g. Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block text-xs uppercase tracking-widest text-[var(--t-muted)]">
            Email Address <span className="text-[var(--c-orange)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-base text-[var(--c-ink)] outline-none transition-colors focus:border-[var(--c-orange)] focus:ring-1 focus:ring-[var(--c-orange)]"
            placeholder="e.g. ada@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block text-xs uppercase tracking-widest text-[var(--t-muted)]">
          Project Scope &amp; Target Timeline <span className="text-[var(--c-orange)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-base text-[var(--c-ink)] outline-none transition-colors focus:border-[var(--c-orange)] focus:ring-1 focus:ring-[var(--c-orange)]"
          placeholder="Tell us about the platform, AI workflows, or cloud infrastructure you want to build..."
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm font-medium text-[var(--c-error)]">
          {state.message}
        </p>
      )}

      <div className="pt-2">
        <FillButton type="submit" disabled={pending} block>
          {pending ? "Submitting Inquiry..." : "Submit Project Inquiry"}
        </FillButton>
      </div>
    </form>
  );
}
