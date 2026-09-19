"use client";

import { useMemo, useRef } from "react";
import {
  CardLayout,
  CurvedCard,
  Scene,
  drawStar,
  makeCanvasTexture,
  useCardScene,
  wrapText,
} from "@/components/webgl/CardScene";

/* ------------------------------------------------------------------ */
/* Service card faces — drawn on canvas, no external assets            */
/* ------------------------------------------------------------------ */

type CardSpec = { title: string; sub: string; accent: string };

const INK = "#0d0d0d";

function drawFront(ctx: CanvasRenderingContext2D, spec: CardSpec) {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, 512, 640);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 492, 620);

  drawStar(ctx, 66, 76, 44, spec.accent);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 58px 'Arial Narrow', sans-serif";
  let y = 210;
  for (const w of spec.title.toUpperCase().split(" ")) {
    ctx.fillText(w, 44, y);
    y += 64;
  }

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 26px sans-serif";
  y = wrapText(ctx, spec.sub, 44, y + 4, 420, 34);

  ctx.fillStyle = spec.accent;
  ctx.beginPath();
  ctx.roundRect(44, y + 56, 190, 64, 32);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "700 24px sans-serif";
  ctx.fillText("DEVSTAR", 74, y + 96);

  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(44, 540, 200, 60);
  ctx.fillRect(268, 540, 200, 60);
}

function drawBack(ctx: CanvasRenderingContext2D, spec: CardSpec) {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, 512, 640);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 492, 620);

  drawStar(ctx, 256, 250, 240, spec.accent, "rgba(255,255,255,0.85)", 5);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "800 34px 'Arial Narrow', sans-serif";
  ctx.fillText("DEVSTAR.LABS", 128, 470);
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "400 20px sans-serif";
  ctx.fillText("BUILD · SHIP · SCALE", 168, 510);
}

/* ------------------------------------------------------------------ */

const CARDS: CardSpec[] = [
  { title: "UI / UX", sub: "Design systems & prototypes", accent: "#f4793a" },
  { title: "WEB & APP", sub: "Next.js · React Native", accent: "#c5939d" },
  { title: "CLOUD", sub: "AWS · Hosting · SRE", accent: "#8498ac" },
  { title: "AI & DATA", sub: "LLMs in production", accent: "#8e9487" },
];

/* diagonal cascade; speeds tuned so a full spin takes ~55–70s (the
   follow.art `--card-spin: 60s` estimate) and neighbours counter-rotate */
const LAYOUT: CardLayout[] = [
  { pos: [-2.6, -0.9, 0], rot: 0.5, speed: 0.105, scrollTwist: 0.5, phase: 0, depth: 0.6 },
  { pos: [-0.85, 0.15, 0.7], rot: 0.28, speed: -0.09, scrollTwist: 0.7, phase: 1.6, depth: 1 },
  { pos: [0.95, -0.25, 0.4], rot: -0.18, speed: 0.12, scrollTwist: 0.6, phase: 3.1, depth: 0.8 },
  { pos: [2.7, 0.75, -0.3], rot: -0.42, speed: -0.115, scrollTwist: 0.45, phase: 4.7, depth: 0.5 },
];

function StaticFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {CARDS.map((c, i) => (
        <div
          key={c.title}
          className="absolute rounded-2xl p-5"
          style={{
            width: "22%",
            aspectRatio: "4/5",
            left: `${12 + i * 19}%`,
            top: `${18 + (i % 2 === 0 ? 8 : -4)}%`,
            background: INK,
            color: "#fff",
            transform: `rotate(${[8, 15, -8, -14][i]}deg)`,
            boxShadow: "0 24px 60px rgba(0,0,0,.35)",
            zIndex: 4 - i,
          }}
        >
          <div className="text-xl font-bold" style={{ color: c.accent }}>
            ★
          </div>
          <div
            className="font-display mt-4 text-[clamp(14px,1.6vw,26px)] uppercase"
            style={{ lineHeight: 1 }}
          >
            {c.title}
          </div>
          <div className="mt-2 text-[11px] opacity-55">{c.sub}</div>
          <div
            className="mt-5 rounded-full px-3 py-1.5 text-[10px] font-bold text-black"
            style={{ background: c.accent, width: "fit-content" }}
          >
            DEVSTAR
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Hero 3D card cascade — curved service cards in a diagonal cascade,
 * each slowly spinning around its own axis (front → back → front),
 * drifting with scroll and parallaxed to the pointer, over the giant
 * wordmark. Static card stack on the server / reduced motion / no WebGL.
 */
export default function CardCascade() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { mode, active } = useCardScene(wrapperRef);

  const textures = useMemo(() => {
    if (mode !== "webgl") return null;
    return CARDS.map((spec) => ({
      front: makeCanvasTexture(512, 640, (ctx) => drawFront(ctx, spec)),
      back: makeCanvasTexture(512, 640, (ctx) => drawBack(ctx, spec)),
    }));
  }, [mode]);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      {mode === "webgl" && textures ? (
        <Scene active={active}>
          {CARDS.map((spec, i) => (
            <CurvedCard
              key={spec.title}
              front={textures[i].front}
              back={textures[i].back}
              layout={LAYOUT[i]}
              reduced={false}
            />
          ))}
        </Scene>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
