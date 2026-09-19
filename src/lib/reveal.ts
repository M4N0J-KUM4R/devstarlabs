"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-reveal for a container's direct children (staggered rise + fade).
 * No-ops under prefers-reduced-motion — content stays visible.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { y?: number; stagger?: number; start?: string },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(Array.from(el.children), {
        y: options?.y ?? 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 80%",
          once: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [ref, options?.y, options?.stagger, options?.start]);
}

/**
 * Parallax a layer against scroll progress (subtle, decorative only).
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength = 0.12,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: strength * 100,
        ease: "none",
        scrollTrigger: { trigger: el, scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, [ref, strength]);
}
