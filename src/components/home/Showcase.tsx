"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import FillButton from "@/components/system/FillButton";

type Screen = {
  title: string;
  kind: string;
  bars: number[];
  accent: string;
};

const SCREENS: Screen[] = [
  { title: "Fintech dashboard", kind: "Web platform", bars: [72, 45, 90, 60, 84], accent: "#f4793a" },
  { title: "Delivery app", kind: "iOS + Android", bars: [55, 80, 62, 92, 48], accent: "#000000" },
  { title: "ML analytics", kind: "AI solution", bars: [88, 40, 66, 74, 58], accent: "#8498ac" },
];

/** Fake product screen drawn in divs — no proprietary assets needed. */
function ScreenCard({ screen }: { screen: Screen }) {
  return (
    <div
      className="w-[min(72vw,340px)] shrink-0 overflow-hidden rounded-xl"
      style={{
        background: "#101010",
        color: "#fff",
        boxShadow: "0 30px 70px rgba(0,0,0,.35)",
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(255,255,255,.07)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: screen.accent }} />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-3 text-[10px] uppercase tracking-widest opacity-50">
          {screen.kind}
        </span>
      </div>
      <div className="p-4">
        <p className="font-display text-lg uppercase leading-none">{screen.title}</p>
        <div className="mt-4 flex h-28 items-end gap-2">
          {screen.bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: i === 2 ? screen.accent : "rgba(255,255,255,.16)" }}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const stackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    const section = sectionRef.current;
    if (!stack || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = Array.from(stack.children) as HTMLElement[];
      // fan the stack open as the sticky section scrolls through
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
        })
        .from(cards, {
          rotate: (i: number) => (i === 0 ? -4 : i === 1 ? 3 : 10),
          x: (i: number) => i * 90,
          y: (i: number) => i * -30,
          stagger: 0.05,
          ease: "none",
          transformOrigin: "50% 120%",
        });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <ThemeSection theme="steel" tiltRight>
      <div ref={sectionRef} className="relative min-h-[200svh]">
        <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center py-24">
          <DisplayWordmark size="lg" align="center" className="max-md:!text-[clamp(40px,10vw,90px)]">
            Shipped work
          </DisplayWordmark>
          <p className="mx-auto mt-4 max-w-md text-center text-[var(--t-text)] opacity-80">
            A fan of recent builds — platforms, apps, AI systems. Scroll to
            spread the deck.
          </p>

          <div
            ref={stackRef}
            className="relative mx-auto mt-12 flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {SCREENS.map((s) => (
              <div key={s.title} className="mx-[-24px]">
                <ScreenCard screen={s} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <FillButton href="/services">Explore services</FillButton>
          </div>
        </div>
      </div>
    </ThemeSection>
  );
}
