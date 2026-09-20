"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import HoverAccent from "@/components/system/HoverAccent";

/* follow.art's exact nav: five center links, Login + Join on the right.
   The Join pill is the .btn--pill filled action. */
const NAV = [
  { href: "/about", label: "About" },
  { href: "/our-product", label: "Our Product" },
  { href: "/community-board", label: "Community Board" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

/* Resolved color set the header adopts from the sheet it currently
   floats over — follow.art's data-page-header-theme mechanism. */
type HeaderTheme = {
  bg: string;
  text: string;
  heading: string;
  accent: string;
  line: string;
};

function resolveSectionTheme(section: Element): HeaderTheme {
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none";
  section.appendChild(probe);
  const read = (token: string) => {
    probe.style.color = token;
    return getComputedStyle(probe).color;
  };
  const theme = {
    bg: getComputedStyle(section).backgroundColor,
    text: read("var(--t-text)"),
    heading: read("var(--t-heading)"),
    accent: read("var(--t-accent)"),
    line: read("var(--t-line)"),
  };
  probe.remove();
  return theme;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme | null>(null);

  useEffect(() => {
    let raf = 0;
    let last: Element | null = null;
    const update = () => {
      raf = 0;
      const band = 60;
      let target: Element | null = null;
      for (const s of document.querySelectorAll("main section, footer")) {
        const r = s.getBoundingClientRect();
        if (r.top <= band && r.bottom > band) target = s;
      }
      if (!target || target === last) return;
      last = target;
      setTheme(resolveSectionTheme(target));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // menu open/close animation + scroll lock
  useEffect(() => {
    const panel = document.getElementById("menu-panel");
    if (!panel) return;
    if (open) {
      panel.style.visibility = "visible";
      gsap.fromTo(
        panel,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: "power4.out" },
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(panel, {
        yPercent: -100,
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          panel.style.visibility = "hidden";
        },
      });
      document.body.style.overflow = "";
    }
  }, [open]);

  const closeMenu = () => setOpen(false);

  /* follow.art's header paints itself with the sheet colour it floats
     over (solid, never transparent) and draws a 1px --t-line bottom. */
  const style: React.CSSProperties = theme
    ? ({
        "--t-text": theme.text,
        "--t-heading": theme.heading,
        "--t-accent": theme.accent,
        "--t-line": theme.line,
        backgroundColor: theme.bg,
        color: theme.heading,
      } as React.CSSProperties)
    : ({
        backgroundColor: "var(--c-paper)",
        color: "var(--c-ink)",
      } as React.CSSProperties);

  return (
    <>
      <header
        className="promo-header fixed top-0 left-0 z-30 w-full"
        style={style}
      >
        <div className="promo-header__inner mx-auto flex max-w-[1720px] items-center justify-between gap-6 px-[var(--page-spacing)]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 no-underline"
            aria-label="DevStarLabs homepage"
            onClick={closeMenu}
          >
            <span className="font-display text-[19px] uppercase leading-none tracking-tight">
              DevStar
            </span>
            <span className="font-display text-[19px] uppercase leading-none tracking-tight text-[var(--c-orange)]">
              .
            </span>
            <span className="font-display text-[19px] uppercase leading-none tracking-tight">
              Labs
            </span>
            <span className="promo-header__logo-sub ml-1 hidden xl:block">
              One Practice. One Card.
            </span>
          </Link>

          {/* Desktop Nav — original's centered group */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`btn btn--nav text-sm normal-case tracking-normal ${
                    active ? "is-active" : ""
                  }`}
                >
                  {n.label}
                  <HoverAccent />
                </Link>
              );
            })}
          </nav>

          {/* Desktop right — Login text + Join filled pill */}
          <div className="hidden shrink-0 items-center gap-7 lg:flex">
            <Link
              href="/signin"
              className={`btn btn--nav text-sm normal-case tracking-normal ${
                pathname.startsWith("/signin") ? "is-active" : ""
              }`}
            >
              Login
              <HoverAccent />
            </Link>
            <Link
              href="/signup"
              className="btn btn--pill btn--solid text-sm normal-case tracking-normal"
            >
              Join
              <HoverAccent />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="Toggle menu"
            style={{ color: "inherit" }}
          >
            <span className="relative block h-3 w-5">
              <span
                className="absolute left-0 top-0 block h-px w-full"
                style={{ background: "currentColor" }}
              />
              <span
                className="absolute left-0 top-1.5 block h-px w-full"
                style={{ background: "currentColor" }}
              />
              <span
                className="absolute left-0 top-3 block h-px w-full"
                style={{ background: "currentColor" }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Panel */}
      <div
        id="menu-panel"
        className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--c-ink)] p-8 pt-24 text-[var(--c-paper)] lg:hidden"
        style={{ visibility: "hidden" }}
      >
        <nav className="flex flex-col space-y-6">
          {[
            { href: "/", label: "Home" },
            ...NAV,
            { href: "/signin", label: "Login" },
            { href: "/signup", label: "Join" },
          ].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={closeMenu}
              className="font-display text-4xl uppercase tracking-tight no-underline hover:text-[var(--c-orange)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-white/50">
            DevStar Labs — One Practice. One Card.
          </p>
          <a
            href="mailto:manoj@devstarlabs.cloud"
            className="mt-2 block font-display text-xl uppercase text-white no-underline hover:text-[var(--c-orange)]"
          >
            manoj@devstarlabs.cloud
          </a>
        </div>
      </div>
    </>
  );
}
