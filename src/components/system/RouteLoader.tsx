"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* Full-screen loading sheet shown between route changes. It covers the
   header and footer too, so a switch reads as one clean swap instead of
   partial content re-rendering in place. */

const FADE_MS = 350;
const MAX_SHOW_MS = 8000; // safety: never trap the user behind the overlay

type Phase = "off" | "on" | "fading";

export default function RouteLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("off");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const arm = useCallback(() => {
    setPhase((p) => {
      if (p !== "off") return p;
      timers.current.push(
        window.setTimeout(() => setPhase("fading"), MAX_SHOW_MS),
      );
      return "on";
    });
  }, []);

  /* same-origin link clicks and history navigation arm the overlay */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      )
        return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const el = anchor as HTMLAnchorElement;
      const raw = el.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      if (el.hasAttribute("download") || el.target === "_blank") return;
      const url = new URL(el.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search)
        return;
      arm();
    };
    const onPop = () => arm();
    const onPageShow = () => setPhase("off"); // bfcache restore: page is live

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPop);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pageshow", onPageShow);
      clearTimers();
    };
  }, [arm]);

  /* the new page commits in the same render that changes the pathname —
     hold the overlay until that paint, then fade it away */
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    clearTimers();
    setPhase((p) => {
      if (p === "off") return p;
      timers.current.push(
        window.setTimeout(() => setPhase("off"), FADE_MS + 50),
      );
      return "fading";
    });
  }, [pathname]);

  if (phase === "off") return null;

  return (
    <div
      id="dsl-route-loader"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] bg-[var(--c-orange)] transition-opacity duration-[350ms] [transition-timing-function:cubic-bezier(.25,.74,.22,.99)] ${
        phase === "fading"
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      {[1, 2, 3, 4, 5].map((n, i) => (
        <img
          key={n}
          src={`/intro/doodle-${n}.svg`}
          alt=""
          className="intro-doodle w-[18vw] md:w-[7vw]"
          style={{ animationDelay: `${(i * 0.3).toFixed(1)}s` }}
        />
      ))}
    </div>
  );
}
