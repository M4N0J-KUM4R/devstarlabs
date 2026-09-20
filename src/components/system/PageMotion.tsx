"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* follow.art runs no animation library — its scroll choreography is
   hand-rolled JS + CSS keyframes on top of Lenis. This module matches
   that approach: IntersectionObserver decides when a block enters,
   the Web Animations API plays the tween, and a rAF loop scrubs the
   parallax layers. Markup drives everything via data-motion attributes:

     mask     type slides up from behind an overflow-y-clip wrapper
     rise     fade + rise (data-motion-delay="0.2" to hold it back)
     swing    sweeps in on a slight circular arc (data-motion-from = tilt)
     stagger  the direct children rise one after another
     settle   a rotated object swings into place (data-motion-from/-to
              give the start/end angle in degrees — animate a wrapper,
              keeping any static CSS rotation on an inner element)
     parallax scrubbed drift in vh (data-motion-speed, negative =
              counter-drift; a wrapper of its own — it owns transform)
     sweep    circular entrance for tilted sheets, scraped from the
              reference: the whole sheet (color + content as one block)
              scrolls with the page, entering rotated 15° about its
              top-left corner and easing level as it rises

   No-ops entirely under prefers-reduced-motion: nothing is ever
   hidden, the page simply renders still. */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // ease-out-expo

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rootEl = root.current;
    if (!rootEl) return;

    const observers: IntersectionObserver[] = [];
    const anims: Animation[] = [];
    let raf = 0;

    const num = (el: HTMLElement, key: string, fallback: number) => {
      const v = parseFloat(el.dataset[key] ?? "");
      return Number.isNaN(v) ? fallback : v;
    };

    /* fire once when the element crosses into the viewport */
    const observeOnce = (el: Element, play: () => void) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            play();
          }
        },
        { threshold: 0.12 },
      );
      io.observe(el);
      observers.push(io);
    };

    /* monumental type — rises through its clipping wrapper */
    rootEl.querySelectorAll<HTMLElement>("[data-motion='mask']").forEach((el) => {
      observeOnce(el, () => {
        anims.push(
          el.animate(
            [
              { transform: "translateY(115%)" },
              { transform: "translateY(0%)" },
            ],
            {
              duration: 1400,
              easing: EASE,
              delay: num(el, "motionDelay", 0) * 1000,
              fill: "both",
            },
          ),
        );
      });
    });

    /* editorial blocks — one lift per block */
    rootEl.querySelectorAll<HTMLElement>("[data-motion='rise']").forEach((el) => {
      observeOnce(el, () => {
        anims.push(
          el.animate(
            [
              { transform: "translateY(48px)", opacity: 0 },
              { transform: "translateY(0px)", opacity: 1 },
            ],
            {
              duration: 1100,
              easing: EASE,
              delay: num(el, "motionDelay", 0) * 1000,
              fill: "both",
            },
          ),
        );
      });
    });

    /* swing-in — sweeps in on a slight arc (data-motion-from gives the
       starting tilt in degrees): enters low and rotated, curls through a
       counter-tilt mid-point, settles level */
    rootEl.querySelectorAll<HTMLElement>("[data-motion='swing']").forEach((el) => {
      const from = num(el, "motionFrom", -6);
      observeOnce(el, () => {
        anims.push(
          el.animate(
            [
              { transform: `translate(-56px, 110px) rotate(${from}deg)`, opacity: 0 },
              {
                transform: `translate(16px, 26px) rotate(${(-from / 2.5).toFixed(2)}deg)`,
                opacity: 1,
                offset: 0.72,
              },
              { transform: "translate(0px, 0px) rotate(0deg)", opacity: 1 },
            ],
            {
              duration: 1300,
              easing: EASE,
              delay: num(el, "motionDelay", 0) * 1000,
              fill: "both",
            },
          ),
        );
      });
    });

    /* lists/rosters — children land one after another */
    rootEl.querySelectorAll<HTMLElement>("[data-motion='stagger']").forEach((group) => {
      observeOnce(group, () => {
        Array.from(group.children).forEach((child, i) => {
          anims.push(
            child.animate(
              [
                { transform: "translateY(48px)", opacity: 0 },
                { transform: "translateY(0px)", opacity: 1 },
              ],
              { duration: 1100, easing: EASE, delay: i * 120, fill: "both" },
            ),
          );
        });
      });
    });

    /* tilted objects — swing in over-rotated and settle */
    rootEl.querySelectorAll<HTMLElement>("[data-motion='settle']").forEach((el) => {
      const from = num(el, "motionFrom", -18);
      const to = num(el, "motionTo", 0);
      observeOnce(el, () => {
        anims.push(
          el.animate(
            [
              { transform: `rotate(${from}deg) scale(0.9)`, opacity: 0 },
              { transform: `rotate(${to}deg) scale(1)`, opacity: 1 },
            ],
            {
              duration: 1400,
              easing: EASE,
              delay: num(el, "motionDelay", 0) * 1000,
              fill: "both",
            },
          ),
        );
      });
    });

    /* hero layers — slow scrubbed drift tied to scroll position.
       Base offsets are captured pre-transform; transform feedback would
       otherwise shift the measured position each frame. */
    const layers = Array.from(
      rootEl.querySelectorAll<HTMLElement>("[data-motion='parallax']"),
    ).map((el) => ({ el, speed: num(el, "motionSpeed", 0.06), base: 0 }));

    /* tilted sheets — circular entrance scraped from the reference: the
       sheet enters rotated 15° about its top-left corner and eases level
       as it rises. Curve fitted to samples off the original: 15° while
       below the fold, 8.1° at 0.74vh down, 0.8° at 0.24vh, level just
       above the top — (1-p)^2.5 over a 1.26-viewport window.
       --sheet-progress drives the layer's translate+rotate in CSS;
       0 (level) is also the no-JS default. */
    const sweeps = Array.from(
      rootEl.querySelectorAll<HTMLElement>("[data-motion='sweep']"),
    );
    /* reference detail: a layer taller than the viewport pins with a
       negative sticky top so its content scrolls through before it
       holds (their CARD section pins at top:-575px); we bottom-align */
    const sweepLayers = sweeps
      .map((el) => el.querySelector<HTMLElement>(".sheet__layer"))
      .filter((l): l is HTMLElement => l !== null);

    const measure = () => {
      const vh = window.innerHeight;
      for (const layer of sweepLayers) {
        layer.style.top =
          layer.offsetHeight > vh ? `${vh - layer.offsetHeight}px` : "";
      }
      for (const l of layers) {
        l.el.style.transform = "";
        l.base = l.el.getBoundingClientRect().top + window.scrollY;
      }
    };
    const scrub = () => {
      const vh = window.innerHeight;
      for (const { el, speed, base } of layers) {
        const r = el.getBoundingClientRect();
        const center = base + r.height / 2 - window.scrollY;
        /* -1 … 1 across the element's journey through the viewport */
        const progress = (center - vh / 2) / (vh / 2 + r.height / 2);
        el.style.transform = `translateY(${(-progress * speed * 100).toFixed(2)}vh)`;
      }
      for (const el of sweeps) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 1.26)));
        el.style.setProperty("--sheet-progress", Math.pow(1 - p, 2.5).toFixed(4));
      }
      raf = requestAnimationFrame(scrub);
    }
    if (layers.length > 0 || sweeps.length > 0) {
      measure();
      window.addEventListener("resize", measure);
      /* layer heights settle once webfonts land — re-size then */
      document.fonts.ready.then(measure);
      raf = requestAnimationFrame(scrub);
    }

    return () => {
      observers.forEach((io) => io.disconnect());
      anims.forEach((a) => a.cancel());
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      sweeps.forEach((el) => {
        el.style.removeProperty("--sheet-progress");
      });
      sweepLayers.forEach((layer) => {
        layer.style.removeProperty("top");
      });
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
