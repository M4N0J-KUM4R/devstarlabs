import Link from "next/link";
import Doodle from "@/components/system/Doodle";
import LogoMark from "@/components/system/LogoMark";
import { SERVICES } from "@/data/content";

export default function SiteFooter() {
  return (
    <footer className="ui-dark sheet pt-16 pb-12" style={{ zIndex: 2 }}>
      <div className="hairline mb-12" style={{ borderColor: "var(--t-line)" }} />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr_1.1fr]">
        {/* Brand Column */}
        <div>
          <Link
            href="/"
            className="font-display text-2xl uppercase no-underline"
            style={{ color: "var(--t-heading)" }}
          >
            DEV
            <LogoMark
              idPrefix="ftr"
              className="mx-1.5 inline-block h-[1em] w-auto align-[-0.1em]"
            />
            LABS
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[var(--t-muted)] leading-relaxed">
            A software product studio &amp; AI engineering agency. We design, architect, and ship high-performance web platforms, mobile apps, and autonomous AI systems.
          </p>
          <Doodle name="star" className="mt-6 w-8 text-[var(--c-orange)]" />
        </div>

        {/* Navigation */}
        <nav aria-label="Explore Studio">
          <p className="label mb-4 text-[var(--t-muted)]">Studio</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { href: "/services", label: "Services & Capabilities" },
              { href: "/showcase", label: "Case Studies & Work" },
              { href: "/about", label: "About & Team" },
              { href: "/programs", label: "Engineering Programs" },
              { href: "/contact", label: "Start a Project →" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline transition-colors hover:text-[var(--c-orange)]"
                  style={{ color: "var(--t-text)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services Breakdown */}
        <nav aria-label="Core Services">
          <p className="label mb-4 text-[var(--t-muted)]">Core Capabilities</p>
          <ul className="flex flex-col gap-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="no-underline transition-colors hover:text-[var(--c-orange)]"
                  style={{ color: "var(--t-text)" }}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reach Us */}
        <div>
          <p className="label mb-4 text-[var(--t-muted)]">Direct Contact</p>
          <a
            href="mailto:manoj@devstarlabs.cloud"
            className="text-sm no-underline underline underline-offset-4"
            style={{ color: "var(--t-text)" }}
          >
            manoj@devstarlabs.cloud
          </a>
          <p className="mt-2 text-xs text-[var(--t-muted)]">
            Global studio operations &middot; Response within 24 hours.
          </p>
          <div className="mt-6 flex gap-3">
            {["LinkedIn", "GitHub", "YouTube", "X"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold no-underline transition-transform hover:scale-105"
                style={{
                  background: "var(--paper-10)",
                  color: "var(--t-text)",
                }}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-[var(--t-line)] pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--t-muted)]">
        <p>&copy; {new Date().getFullYear()} DevStarLabs Studio. All rights reserved.</p>
        <p className="font-mono">Engineered with Next.js 16 &middot; WebGL &middot; TypeSafe AI</p>
      </div>
    </footer>
  );
}
