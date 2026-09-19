import Link from "next/link";
import Doodle from "@/components/system/Doodle";
import { SERVICES, TRAININGS } from "@/data/content";

export default function SiteFooter() {
  return (
    <footer className="ui-dark sheet pt-16 pb-8" style={{ zIndex: 2 }}>
      <div className="hairline mb-10" style={{ borderColor: "var(--t-line)" }} />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link
            href="/"
            className="font-display text-2xl uppercase no-underline"
            style={{ color: "var(--t-heading)" }}
          >
            DEV<span className="text-[var(--c-orange)]">★</span>STAR.LABS
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[var(--t-muted)]">
            A software studio and training lab. We build digital products and
            the engineers who ship them.
          </p>
          <Doodle name="star" className="mt-6 w-8 text-[var(--c-orange)]" />
        </div>

        <nav aria-label="Services">
          <p className="label mb-4 text-[var(--t-muted)]">Services</p>
          <ul className="flex flex-col gap-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="no-underline transition-colors hover:text-[var(--c-orange)]"
                  style={{ color: "var(--t-text)" }}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Trainings">
          <p className="label mb-4 text-[var(--t-muted)]">Trainings</p>
          <ul className="flex flex-col gap-2 text-sm">
            {TRAININGS.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/trainings/${t.slug}`}
                  className="no-underline transition-colors hover:text-[var(--c-orange)]"
                  style={{ color: "var(--t-text)" }}
                >
                  {t.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/trainings"
                className="no-underline text-[var(--c-orange)]"
              >
                All trainings →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label mb-4 text-[var(--t-muted)]">Reach us</p>
          <a
            href="mailto:manoj@devstarlabs.cloud"
            className="text-sm no-underline underline-hand"
            style={{ color: "var(--t-text)" }}
          >
            manoj@devstarlabs.cloud
          </a>
          <div className="mt-6 flex gap-3">
            {["LinkedIn", "GitHub", "YouTube", "X"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="flex h-9 w-9 items-center justify-center rounded-md text-[10px] font-bold no-underline"
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

      <div
        className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-[var(--t-muted)]"
        style={{ borderTop: "1px solid var(--t-line)" }}
      >
        <p>© {new Date().getFullYear()} DevStarLabs. All rights reserved.</p>
        <p>Build. Ship. Scale.</p>
        <div className="flex gap-5">
          <Link href="/contact" className="no-underline hover:text-[var(--c-orange)]">
            Contact
          </Link>
          <Link href="/about" className="no-underline hover:text-[var(--c-orange)]">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
