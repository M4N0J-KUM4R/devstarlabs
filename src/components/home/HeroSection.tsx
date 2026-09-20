"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Doodle from "@/components/system/Doodle";
import HeroCardCarousel from "@/components/webgl/HeroCardCarousel";
import { HERO_WORD, HERO_WORD_MOBILE } from "@/data/heroWord";

/* Motion constants lifted from FOLLOW.ART's production TitleAnimation
   (entry.js): the uf() smoother defaults and the rAF frame cap. */
const LERP = 0.05; // target chase rate per 16ms frame
const SNAP = 1 / 2500; // convergence threshold
const MAX_DT = 160; // frame-delta cap (ms)
const LOADING_MS = 2200; // loader hold: one full doodle cycle
const LOADER_FADE_MS = 400;
const INTRO_SEEN_KEY = "dsl-intro-seen";

const ENTRANCE_REST = "translateY(0) scaleY(1)";
const ENTRANCE_START = "translateY(-80%) scaleY(0)";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function HeroSection() {
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const [showWord, setShowWord] = useState(false);
  const [loader, setLoader] = useState<"on" | "fading" | "off">("on");

  /* intro loader -> entrance reveal (plays once per session) */
  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      /* storage unavailable (privacy mode) — just play the intro */
    }
    if (reduced || seen) {
      setLoader("off");
      window.setTimeout(() => setShowWord(true), 60);
      return;
    }
    /* flag is written when the intro finishes, not on start — Strict
       Mode's double effect run would otherwise play, clean up, then
       skip on the re-run because the flag was already set */
    document.documentElement.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => {
        setShowWord(true);
        setLoader("fading");
      }, LOADING_MS),
      window.setTimeout(
        () => {
          try {
            sessionStorage.setItem(INTRO_SEEN_KEY, "1");
          } catch {
            /* ignore */
          }
          setLoader("off");
          document.documentElement.style.overflow = "";
        },
        LOADING_MS + LOADER_FADE_MS + 100,
      ),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  /* cursor-typography deformation — FOLLOW.ART's TitleAnimation:
     one lerped cursor value squashes and stretches each letter path
     around its resting data-scale-y "skyline" height. */
  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;
    const paths = Array.from(
      word.querySelectorAll<SVGPathElement>("path[data-char]"),
    );
    if (!paths.length) return;
    const count = paths.length;
    const bases = paths.map((p) => Number(p.dataset.scaleY) || 1);

    const applyBase = () => {
      paths.forEach((path, i) => {
        path.style.transform = `scaleY(${bases[i]})`;
      });
    };
    applyBase();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = 0.5; // raw normalized cursor position
    let smoothX = 0.5; // the single lerped value driving the word
    let appliedX: number | null = null;
    let raf = 0;
    let lastTime = performance.now() - 16;
    let inview = true;
    // Ax() semantics: a touch pins the word to center and muzzles the
    // mouse until 500ms after the touch ends.
    let touchLock = false;
    let touchUnlockTimer = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!touchLock) {
        mouseX = e.clientX / document.documentElement.clientWidth;
      }
    };
    const onTouchStart = () => {
      clearTimeout(touchUnlockTimer);
      touchLock = true;
      mouseX = 0.5;
    };
    const endTouch = () => {
      clearTimeout(touchUnlockTimer);
      touchUnlockTimer = window.setTimeout(() => {
        touchLock = false;
      }, 500);
    };

    const apply = () => {
      const dir = smoothX > 0.5 ? 1 : -1;
      const amp = Math.abs(smoothX - 0.5) * 2;
      paths.forEach((path, i) => {
        const base = bases[i];
        // position factor: +1 at the word's left edge, -1 at its right
        const g = count > 1 ? 1 - (2 * i) / count : 0;
        let scale = base;
        if (amp > 0) {
          const v = Math.min(1.5 - base, 0.2);
          scale = base - g * dir * amp * v;
          scale = Math.max(0.1, Math.min(1, scale));
        }
        path.style.transform = `scaleY(${scale})`;
      });
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(MAX_DT, now - lastTime);
      lastTime = now;
      if (!inview) return;
      const next = smoothX + ((mouseX - smoothX) * LERP * dt) / 16;
      smoothX = Math.abs(next - mouseX) < SNAP ? mouseX : next;
      if (smoothX !== appliedX) {
        appliedX = smoothX;
        apply();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inview = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(word);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", endTouch, { passive: true });
    window.addEventListener("touchcancel", endTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      clearTimeout(touchUnlockTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", endTouch);
      window.removeEventListener("touchcancel", endTouch);
      applyBase();
    };
  }, []);

  const entrance = {
    transform: showWord ? ENTRANCE_REST : ENTRANCE_START,
  };

  /* follow.art stack: the panel pins full-height while the next sheet
     slides over the 100svh of scroll reserved below it (--s-und).
     The sticky wrapper is a plain div — .sheet's unlayered
     position:relative would override the sticky utility. */
  return (
    <div className="relative">
      {/* sticky creates a stacking context, so the loader-covering z lift
          must sit HERE to outrank the fixed header's z-index:10 */}
      <div
        className={`sticky top-0 min-h-[100svh] ${
          loader !== "off" ? "z-[60]" : ""
        }`}
      >
        {/* while the intro loader is up, the section paints above the
            header so the loading screen covers the chrome too */}
        <section className="ui-orange sheet isolate flex min-h-[100svh] flex-col overflow-hidden">
          {/* rotating card carousel — two stacked WebGL scenes: the back
              half renders under the wordmark, the front half over it */}
          <HeroCardCarousel show={showWord} />

          {/* interactive wordmark — one hand-set SVG, FOLLOW.ART .title pattern */}
          <h1
            ref={wordRef}
            className="relative select-none pt-[calc(var(--scale-px)*110)] lg:pt-[calc(var(--scale-px)*60)] font-display text-[calc(var(--scale-px)*235)] uppercase leading-[0.8] text-[var(--c-paper)]"
          >
            <span className="sr-only">
              DevStarLabs — software studio and AI engineering lab
            </span>
            <svg
              className="hero-word-svg hidden lg:block transition-transform duration-[1500ms] [transition-timing-function:cubic-bezier(.55,0,.1,1)]"
              style={entrance}
              viewBox={HERO_WORD.viewBox}
              focusable="false"
              aria-hidden="true"
            >
              {HERO_WORD.glyphs.map((glyph, i) => (
                <g
                  key={`${glyph.char}-${i}`}
                  transform={`translate(${glyph.x} 0)`}
                >
                  {glyph.paths.map((d, j) => (
                    <path
                      key={j}
                      d={d}
                      data-char={glyph.char}
                      data-scale-y={glyph.scaleY}
                      className="fill-[var(--c-paper)]"
                    />
                  ))}
                </g>
              ))}
            </svg>
            <svg
              className="hero-word-svg hero-word-svg--mobile block max-h-[48svh] transition-transform duration-[1500ms] [transition-timing-function:cubic-bezier(.55,0,.1,1)] lg:hidden"
              style={entrance}
              viewBox={HERO_WORD_MOBILE.viewBox}
              focusable="false"
            >
              {HERO_WORD_MOBILE.lines.map((line) => (
                <g key={line.y} transform={`translate(0 ${line.y})`}>
                  {line.glyphs.map((glyph, i) => (
                    <g
                      key={`${glyph.char}-${i}`}
                      transform={`translate(${glyph.x} 0)`}
                    >
                      {glyph.paths.map((d, j) => (
                        <path key={j} d={d} className="fill-[var(--c-paper)]" />
                      ))}
                    </g>
                  ))}
                </g>
              ))}
            </svg>

            {/* title decoration — scratchy marker slash across the word
                (follow.art intro__title-decoration), fades in with it */}
            <Doodle
              name="slash"
              className={`pointer-events-none absolute left-[50%] top-[70%] w-[30%] text-[var(--c-ink)] transition-opacity delay-300 duration-[1500ms] [transition-timing-function:cubic-bezier(.55,0,.1,1)] ${
                showWord ? "opacity-90" : "opacity-0"
              }`}
            />
          </h1>

          {/* value prop — slides up into place with the word (intro__footer);
              the bottom padding clears the fixed Join bar pinned over it */}
          <div
            className="relative z-10 mt-auto flex flex-col gap-4 pb-24 pt-4 transition-transform duration-[1500ms] [transition-timing-function:cubic-bezier(.55,0,.1,1)] md:flex-row md:items-end md:justify-between md:pb-[calc(var(--scale-px)*104)]"
            style={{
              transform: showWord ? "translateY(0)" : "translateY(120%)",
            }}
          >
            <div>
              <p className="font-display text-[clamp(20px,2vw,30px)] uppercase leading-[1.15] text-[var(--t-text)]">
                One Lab.
                <br />
                Build it. Ship it. Scale it.
              </p>
              <p className="mt-3 flex items-center gap-2 font-medium text-[var(--t-text)]">
                Services for your product. Training for your team.
                <Doodle
                  name="curved-arrow"
                  className="hidden w-[14px] shrink-0 text-[var(--t-text)] md:block"
                />
              </p>
            </div>
          </div>

          {/* intro loader — orange overlay with blinking hand-drawn doodles */}
          {loader !== "off" && (
            <div
              id="dsl-loader"
              aria-hidden="true"
              className={`fixed inset-0 z-[90] bg-[var(--t-bg)] transition-opacity duration-[400ms] [transition-timing-function:cubic-bezier(.25,.74,.22,.99)] ${
                loader === "fading"
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            >
              <noscript>
                <style>{`#dsl-loader{display:none}`}</style>
              </noscript>
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
          )}
        </section>
      </div>

      {/* one viewport of pin range — the reference's exact geometry:
          hero wrapper = layer + 100svh tail, and the next sweep sheet's
          -100svh margin puts its resting tilted edge precisely at the
          fold, sloping DOWN-right so nothing peeks over the hero */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}
