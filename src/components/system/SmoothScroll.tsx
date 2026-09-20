"use client";

import { type ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll, set up per the Lenis README: `autoRaf` lets Lenis
 * run its own animation loop (driving it through the GSAP ticker caused
 * frame-timing jitter the reference site doesn't have), and the official
 * lenis.css ships the required html/scrollbar states. Stock options only —
 * lerp 0.1, smoothWheel — matching the reference site's feel.
 *
 * Skips smoothing entirely when the user prefers reduced motion, and
 * keeps ScrollTrigger in sync for the pages that still use GSAP.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
