import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your DevStar Labs Card.",
  alternates: { canonical: "/signin" },
};

/* Original /signin layout: a sage poster sheet with the giant wordmark,
   a floating Card and the tagline; the right column holds the auth
   form. */
export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* left poster */}
      <div className="auth-left bg-[#8e9487] text-[var(--c-ink)]">
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
          {/* floating card — the original's tilted product shot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/card-1.png"
            alt=""
            aria-hidden="true"
            className="auth-card-float -rotate-[16deg]"
            style={{ left: "12%", top: "18%" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/card-4.png"
            alt=""
            aria-hidden="true"
            className="auth-card-float rotate-[9deg] opacity-90"
            style={{ right: "8%", bottom: "6%", width: "clamp(150px, 17vw, 240px)" }}
          />
          <svg
            viewBox="0 0 60 60"
            className="absolute left-[6%] top-[8%] w-16 text-[var(--c-orange)]"
            aria-hidden="true"
          >
            <path
              d="M8 44 C20 20 34 14 52 12 M20 48 C30 34 40 28 54 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="max-w-md text-[clamp(24px,2.6vw,38px)] leading-[1.06] text-white/95">
          The professional infrastructure for engineers and curators.
        </p>
      </div>

      {/* right form */}
      <div className="auth-right bg-[var(--c-paper)] text-[var(--c-ink)]">
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}
