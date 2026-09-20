"use client";

import { useState } from "react";
import Link from "next/link";
import HoverAccent from "@/components/system/HoverAccent";

/* Port of the original /signin /signup right column: the Join/Login
   tab pair in display type, social buttons, hairline email/password
   groups, and the black pill submit with the arrow-circle icon.
   Submitting validates client-side and flips to a confirmation state —
   no real auth backend. */
export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [tab, setTab] = useState<"join" | "login">(
    mode === "signin" ? "login" : "join",
  );
  const [done, setDone] = useState(false);

  const login = tab === "login";

  return (
    <div className="w-full max-w-[430px]">
      {/* tabs */}
      <div className="mb-8 flex" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "join"}
          onClick={() => setTab("join")}
          className={`auth-tab font-display uppercase ${tab === "join" ? "is-active" : ""}`}
        >
          Join
        </button>
        <button
          role="tab"
          aria-selected={tab === "login"}
          onClick={() => setTab("login")}
          className={`auth-tab font-display uppercase ${tab === "login" ? "is-active" : ""}`}
        >
          Login
        </button>
      </div>

      {done ? (
        <div className="frame-line p-6">
          <p className="font-display text-xl uppercase tracking-tight text-[var(--t-heading)]">
            {login ? "Welcome back" : "Almost there"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--t-text)] opacity-80">
            {login
              ? "This is a demo build — authentication isn't wired to a backend yet. Your Card is waiting."
              : "This is a demo build — accounts aren't created yet, but your DevStar Card is one real backend away."}
          </p>
          <Link
            href="/"
            className="btn btn--link mt-4 text-sm normal-case tracking-normal"
          >
            <span className="relative z-10">Back to the landing</span>
            <HoverAccent />
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          {/* social buttons — original: two outlined boxes side by side */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            {[
              {
                label: "Facebook",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.87.24-1.46 1.49-1.46h1.6V4.95c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.41-3.9 4v2.17H7.7v3h2.65v7h3.15Z" />
                  </svg>
                ),
              },
              {
                label: "Google",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="#EA4335" d="M12 5.04c1.7 0 3.22.59 4.42 1.74l3.29-3.29C17.73 1.63 15.09.5 12 .5 7.5.5 3.62 3.07 1.72 6.84l3.84 2.98C6.47 7.02 9 5.04 12 5.04Z" />
                    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.28 1.48-1.12 2.73-2.39 3.57l3.72 2.89c2.17-2 3.72-4.96 3.72-8.65Z" />
                    <path fill="#FBBC05" d="M5.57 14.18a7.05 7.05 0 0 1 0-4.36L1.72 6.84a11.52 11.52 0 0 0 0 10.32l3.85-2.98Z" />
                    <path fill="#34A853" d="M12 23.5c3.09 0 5.69-1.02 7.58-2.77l-3.72-2.89c-1.03.69-2.35 1.1-3.86 1.1-3 0-5.53-1.98-6.44-4.76l-3.84 2.98C3.62 20.93 7.5 23.5 12 23.5Z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                className="btn frame-line justify-between px-4 text-[15px] normal-case tracking-normal text-[var(--t-heading)]"
              >
                <span className="relative z-10">{s.label}</span>
                <HoverAccent />
                {s.icon}
              </button>
            ))}
          </div>

          <p className="mb-4 text-sm text-[var(--t-muted)]">
            {login ? "or login with e-mail" : "or join with e-mail"}
          </p>

          <div className="flex flex-col gap-4">
            <label className="input-line">
              <span className="input-line__label">
                Email <span className="req">*</span>
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className="input-line__field"
              />
            </label>

            <label className="input-line relative">
              <span className="input-line__label">
                {login ? "Password" : "Password (8 characters min)"}{" "}
                <span className="req">*</span>
              </span>
              <input
                required
                minLength={login ? 1 : 8}
                type="password"
                name="password"
                autoComplete={login ? "current-password" : "new-password"}
                placeholder={login ? "Password" : "Password (8 characters min)"}
                className="input-line__field pr-12"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-[var(--t-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                <circle cx="12" cy="12" r="2.6" />
              </svg>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {login ? (
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--t-text)]">
                <input type="checkbox" name="remember" className="peer sr-only" />
                <span
                  className="frame-line flex h-[18px] w-[18px] items-center justify-center peer-checked:bg-[var(--c-ink)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 10 8" className="h-2 w-2.5 text-[var(--c-paper)] peer-checked:block">
                    <path d="M1 4l2.5 3L9 1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                Remember me for 24 hours
              </label>
            ) : (
              <>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[var(--t-text)]">
                  <input required type="checkbox" name="terms" className="peer sr-only" />
                  <span
                    className="frame-line mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center peer-checked:bg-[var(--c-ink)]"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 10 8" className="h-2 w-2.5 text-[var(--c-paper)]">
                      <path d="M1 4l2.5 3L9 1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <span>
                    I agree to the{" "}
                    <Link href="/terms-and-conditions" className="underline underline-offset-2">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-2">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[var(--t-text)]">
                  <input type="checkbox" name="newsletter" className="peer sr-only" />
                  <span
                    className="frame-line mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center peer-checked:bg-[var(--c-ink)]"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 10 8" className="h-2 w-2.5 text-[var(--c-paper)]">
                      <path d="M1 4l2.5 3L9 1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                  Subscribe to DevStar Labs&apos; newsletter
                </label>
              </>
            )}
          </div>

          {login && (
            <p className="mt-5 flex items-center gap-2 text-sm text-[var(--t-muted)]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="7" />
                <path d="M8 7v4M8 4.6v.2" />
              </svg>
              <a href="mailto:help@devstarlabs.dev" className="hover:text-[var(--t-heading)]">
                I forgot my password
              </a>
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-4">
            <button
              type="submit"
              className="btn btn--block btn--solid justify-between px-6 text-base normal-case tracking-normal"
            >
              <span className="relative z-10">{login ? "Login" : "Continue"}</span>
              <HoverAccent />
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="11" />
                <path d="M8 12h7m0 0-3-3m3 3-3 3" />
              </svg>
            </button>
            {!login && <p className="text-sm text-[var(--t-muted)]">Step 1 of 2</p>}
          </div>
        </form>
      )}
    </div>
  );
}
