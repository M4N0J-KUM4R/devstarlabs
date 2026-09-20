import Link from "next/link";
import Doodle from "@/components/system/Doodle";
import HoverAccent from "@/components/system/HoverAccent";

/* follow.art's landing footer: one hairline-top band split in three
   zones — © + contact + social squares (left), small utility links
   (center), studio credit (right). */
const SMALL_LINKS = [
  { href: "/our-product", label: "Brand Kit" },
  { href: "/gift-card", label: "Buy Gift Card" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookies-policy", label: "Cookie Policy" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23 12s0-3.85-.5-5.68a2.9 2.9 0 0 0-2.05-2.05C18.63 3.77 12 3.77 12 3.77s-6.63 0-8.45.5A2.9 2.9 0 0 0 1.5 6.32C1 8.15 1 12 1 12s0 3.85.5 5.68a2.9 2.9 0 0 0 2.05 2.05c1.82.5 8.45.5 8.45.5s6.63 0 8.45-.5a2.9 2.9 0 0 0 2.05-2.05C23 15.85 23 12 23 12Zm-13.5 3.27V8.73L15.5 12l-6 3.27Z" />
      </svg>
    ),
  },
  {
    label: "Substack",
    href: "https://substack.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M3 4h18v2.2H3V4Zm0 4.4h18v2.2H3V8.4ZM3 13h18v7l-9-3.6L3 20v-7Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.87.24-1.46 1.49-1.46h1.6V4.95c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.41-3.9 4v2.17H7.7v3h2.65v7h3.15Z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer
      className="relative z-[2] bg-[var(--c-orange)] px-[var(--page-spacing)] pb-10 pt-8 text-[var(--c-ink)]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}
    >
      <div className="grid gap-10 md:grid-cols-[1.25fr_1fr_1fr] md:gap-6">
        {/* left — © + email + social squares */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-display text-[15px] uppercase tracking-tight">
              {new Date().getFullYear()} &copy; DevStar Labs
            </p>
            <a
              href="mailto:help@devstarlabs.dev"
              className="btn btn--link text-sm normal-case tracking-normal"
            >
              <span className="relative z-10">help@devstarlabs.dev</span>
              <HoverAccent />
            </a>
          </div>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center bg-[var(--c-ink)] text-[var(--c-paper)] no-underline transition-transform duration-300 hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* center — small utility links (original's stack) */}
        <nav aria-label="Utility" className="flex flex-col items-start gap-1">
          {SMALL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="btn btn--link text-sm normal-case tracking-normal"
            >
              <span className="relative z-10">{l.label}</span>
              <HoverAccent />
            </Link>
          ))}
        </nav>

        {/* right — credit */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            href="https://github.com/M4N0J-KUM4R/devstarlabs"
            target="_blank"
            rel="noreferrer"
            className="btn btn--link text-sm normal-case tracking-normal"
          >
            <span className="relative z-10">
              Digital product development by DevStar Labs
            </span>
            <HoverAccent />
          </a>
          <Doodle name="star" className="w-7" rotate={14} />
        </div>
      </div>
    </footer>
  );
}
