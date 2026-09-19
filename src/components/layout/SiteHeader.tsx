"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Doodle from "@/components/system/Doodle";
import HoverAccent from "@/components/system/HoverAccent";

// follow.art's promo-header items, in its order. Hrefs marked TODO are
// placeholders — placement of our existing pages comes from the user.
const NAV = [
  { href: "/about", label: "About" },
  { href: "#", label: "Our Product" }, // TODO
  { href: "#", label: "Community Board" }, // TODO
  { href: "#", label: "Pricing" }, // TODO
  { href: "#", label: "FAQ" }, // TODO
];
const NAV_RIGHT = [
  { href: "#", label: "Login" }, // TODO
  { href: "/contact", label: "Join" },
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
  // a throwaway probe inside the section resolves the section's --t-*
  // tokens to real color values (CSS vars can't be read resolved)
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
  // theme of the sheet currently under the header band
  const [theme, setTheme] = useState<HeaderTheme | null>(null);

  useEffect(() => {
    let raf = 0;
    let last: Element | null = null;
    const update = () => {
      raf = 0;
      const band = 60; // middle of the header row
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

  // close the menu on route change
  useEffect(() => {
    setOpen(false);
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
      document.documentElement.style.overflow = "hidden";
    } else {
      gsap.to(panel, {
        yPercent: -100,
        duration: 0.45,
        ease: "power4.in",
        onComplete: () => {
          panel.style.visibility = "hidden";
        },
      });
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  const headColor = theme?.heading ?? "var(--t-heading)";
  const textColor = theme?.text ?? "var(--t-text)";

  // follow.art promo-header link: plain text + scribble hover; the current
  // page keeps the black scribble drawn with a knocked-out white label
  // (.btn.is-active in globals.css)
  const renderNavLink = (item: { href: string; label: string }) => {
    const active = item.href !== "#" && pathname.startsWith(item.href);
    return (
      <Link
        key={item.label}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`btn btn--link btn--accent btn--text-smaller promo-header__animated-button${
          active ? " is-active" : ""
        }`}
        style={active ? undefined : { color: textColor }}
      >
        {item.label}
        <HoverAccent />
      </Link>
    );
  };

  // the header's bottom hairline draws itself in after load
  // (follow.art .promo-header--border-auto:after)
  const [lineShown, setLineShown] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLineShown(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <header
      className="promo-header"
      style={{ color: headColor, paddingInline: "var(--page-spacing)" }}
    >
      {/* painted band in the underlying sheet's color — follow.art's
          promo-header__previous-bg — keeps the bar readable over any
          section (white over the orange hero, white over dark) */}
      <div
        className="promo-header__previous-bg"
        style={{ backgroundColor: theme?.bg ?? "transparent" }}
      />
      <div className="promo-header__row">
        <div
          className={`promo-hairline${lineShown ? " promo-hairline--shown" : ""}`}
          style={{ borderColor: theme?.line ?? "var(--t-line)" }}
        />
        <div className="promo-header__logo">
          <Link
            href="/"
            className="btn btn--link btn--accent btn--text-smaller"
            style={{ color: headColor }}
            aria-label="DevStarLabs home"
          >
            DEV
            <svg
              viewBox="0 0 64 60"
              className="mx-0.5 inline-block h-[0.85em] w-auto"
              aria-hidden="true"
            >
              <path
                d="M32 2 C34 14 36 18 46 20 C36 23 34 27 32 40 C30 27 28 23 18 20 C28 18 30 14 32 2 Z"
                fill="var(--c-orange)"
                stroke={headColor}
                strokeWidth="3"
              />
            </svg>
            STAR.LABS
            <HoverAccent />
          </Link>
        </div>

        <nav className="promo-header__desktop-links max-[979px]:hidden" aria-label="Primary">
          {NAV.map(renderNavLink)}
        </nav>

        <div className="promo-header__content-right promo-header__desktop-links max-[979px]:hidden">
          {NAV_RIGHT.map(renderNavLink)}
        </div>

        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 min-[980px]:hidden"
          aria-expanded={open}
          aria-controls="menu-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="block h-0.5 w-7 transition-transform"
            style={{
              background: headColor,
              transform: open ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-7 transition-transform"
            style={{
              background: headColor,
              transform: open ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* mobile menu panel */}
      <div
        id="menu-panel"
        className="ui-dark sheet fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-24 md:hidden"
        style={{ visibility: "hidden", transform: "translateY(-100%)" }}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[...NAV, ...NAV_RIGHT].map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="display-sm no-underline"
              style={{ color: "var(--t-heading)" }}
            >
              <span className="mr-3 text-sm text-[var(--t-muted)]">
                0{i + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-end justify-between">
          <p className="label text-[var(--t-muted)]">
            Build. Ship. Scale.
          </p>
          <Doodle name="star" className="w-10 text-[var(--c-orange)]" />
        </div>
      </div>
    </header>
  );
}
