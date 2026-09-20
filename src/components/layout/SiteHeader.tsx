"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import HoverAccent from "@/components/system/HoverAccent";
import LogoMark from "@/components/system/LogoMark";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/showcase", label: "Showcase" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
];
const NAV_RIGHT = [
  { href: "/contact", label: "Contact" },
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

  const style: React.CSSProperties = theme
    ? ({
        "--t-text": theme.text,
        "--t-heading": theme.heading,
        "--t-accent": theme.accent,
        "--t-line": theme.line,
        color: theme.heading,
      } as React.CSSProperties)
    : { color: "var(--c-ink)" };

  return (
    <>
      <header
        className="promo-header fixed top-0 left-0 z-50 w-full transition-colors duration-200 border-b border-[color:var(--t-line)]"
        style={style}
      >
        <div className="promo-header__inner mx-auto flex max-w-7xl items-center justify-between px-[var(--page-spacing)] py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-2xl uppercase tracking-tighter"
            aria-label="DevStarLabs homepage"
            onClick={closeMenu}
          >
            <span className="font-display tracking-tight text-xl md:text-2xl">
              Dev
            </span>
            <LogoMark className="size-7 text-[var(--c-orange)]" />
            <span className="font-display tracking-tight text-xl md:text-2xl">
              Lab
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`btn btn--nav text-sm uppercase tracking-wider font-medium ${
                    active ? "is-active font-bold" : ""
                  }`}
                >
                  {n.label}
                  <HoverAccent />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Nav Links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_RIGHT.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={`btn btn--nav text-sm uppercase tracking-wider font-medium ${
                    active ? "is-active font-bold" : ""
                  }`}
                >
                  {n.label}
                  <HoverAccent />
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="font-mono text-lg font-bold">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Panel */}
      <div
        id="menu-panel"
        className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--c-ink)] p-8 pt-24 text-[var(--c-paper)] md:hidden"
        style={{ visibility: "hidden" }}
      >
        <nav className="flex flex-col space-y-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="font-display text-4xl uppercase tracking-tight hover:text-[var(--c-orange)]"
          >
            Home
          </Link>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={closeMenu}
              className="font-display text-4xl uppercase tracking-tight hover:text-[var(--c-orange)]"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="font-display text-4xl uppercase tracking-tight hover:text-[var(--c-orange)]"
          >
            Contact
          </Link>
        </nav>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-white/50">
            DevStarLabs Studio &amp; AI Lab
          </p>
          <a
            href="mailto:manoj@devstarlabs.cloud"
            className="mt-2 block font-display text-xl uppercase text-white hover:text-[var(--c-orange)]"
          >
            manoj@devstarlabs.cloud
          </a>
        </div>
      </div>
    </>
  );
}
