import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Create your DevStar Card — showcase your practice and receive direct support.",
  alternates: { canonical: "/signup" },
};

/* Original /signup layout: the orange poster variant of the auth split. */
export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="auth-left bg-[var(--c-orange)] text-[var(--c-ink)]">
        <Link
          href="/"
          className="font-display text-[clamp(44px,7.2vw,110px)] uppercase leading-[0.82] tracking-tight"
          aria-label="DevStar Labs homepage"
        >
          DevStar
          <br />
          .Labs
        </Link>

        <div className="pointer-events-none relative flex flex-1 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/card-9.png"
            alt=""
            aria-hidden="true"
            className="auth-card-float -rotate-[12deg]"
            style={{ left: "14%", top: "12%" }}
          />
          <svg
            viewBox="0 0 60 60"
            className="absolute bottom-[16%] right-[12%] w-14 text-white"
            aria-hidden="true"
          >
            <path
              d="M6 52 C10 36 14 24 22 12 M28 50 C34 38 40 28 50 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </svg>
          <svg
            viewBox="0 0 60 60"
            className="absolute left-[8%] bottom-[10%] w-12 text-[var(--c-ink)]"
            aria-hidden="true"
          >
            <path
              d="M30 4 C34 20 38 24 54 28 C38 32 34 38 30 56 C26 38 22 32 6 28 C22 24 26 20 30 4Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <p className="max-w-md text-[clamp(24px,2.6vw,38px)] leading-[1.06] text-[var(--c-ink)]">
          Create your Card to showcase your practice and receive direct
          financial support.
        </p>
      </div>

      <div className="auth-right bg-[var(--c-paper)] text-[var(--c-ink)]">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
