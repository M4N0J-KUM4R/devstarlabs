"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";

/* ================================================================== */
/* Shared "physical card" scene — the follow.art mechanic:             */
/* curved card meshes, continuous slow ambient rotation, mouse         */
/* parallax, scroll-driven drift. No external assets: every face is    */
/* drawn onto a canvas texture at runtime.                             */
/* ================================================================== */

export type CardLayout = {
  pos: readonly [number, number, number];
  /** base orientation (radians) */
  rot: number;
  /** continuous spin speed in rad/s — full loop ≈ 2π / speed (~60s) */
  speed: number;
  /** extra twist applied by scroll progress */
  scrollTwist: number;
  phase: number;
  depth: number;
};

/* ---------------- texture plumbing ---------------- */

export function makeCanvasTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  draw(ctx);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** brand sparkle star (same path as the header logo), scalable */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  fill: string,
  stroke?: string,
  lineWidth = 3,
) {
  const s = size / 64;
  ctx.save();
  ctx.translate(cx - 32 * s, cy - 30 * s);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(32, 2);
  ctx.bezierCurveTo(34, 14, 36, 18, 46, 20);
  ctx.bezierCurveTo(36, 23, 34, 27, 32, 40);
  ctx.bezierCurveTo(30, 27, 28, 23, 18, 20);
  ctx.bezierCurveTo(28, 18, 30, 14, 32, 2);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
): number {
  let line = "";
  let yy = y;
  for (const w of text.split(" ")) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
  return yy;
}

/* ---------------- curved card mesh ---------------- */

function useCurvedGeometry(w: number, h: number, bend: number) {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(w, h, 32, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const nx = pos.getX(i) / (w / 2);
      pos.setZ(i, bend * (1 - nx * nx));
    }
    geo.computeVertexNormals();
    return geo;
  }, [w, h, bend]);
}

const CARD_W = 1.7;
const CARD_H = 2.125;

export function CurvedCard({
  front,
  back,
  layout,
  reduced,
}: {
  front: THREE.Texture;
  back: THREE.Texture;
  layout: CardLayout;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const geo = useCurvedGeometry(CARD_W, CARD_H, 0.2);
  const backGeo = useCurvedGeometry(CARD_W * 0.996, CARD_H * 0.996, 0.2);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    if (reduced) return;
    const t = clock.getElapsedTime();
    // scroll progress across the first viewport — cards twist & drift
    const s = Math.min(1, Math.max(0, (window.scrollY || 0) / window.innerHeight));
    g.rotation.y = layout.rot + t * layout.speed + s * layout.scrollTwist;
    g.rotation.x = Math.sin(t * 0.4 + layout.phase) * 0.055 - 0.05;
    g.position.y =
      layout.pos[1] + Math.sin(t * 0.55 + layout.phase) * 0.11 - s * 0.35 * layout.depth;
    g.position.z = layout.pos[2] + s * layout.depth * 0.9;
  });

  return (
    <group
      ref={group}
      position={[layout.pos[0], layout.pos[1], layout.pos[2]]}
      rotation={[0, layout.rot, 0]}
    >
      <mesh geometry={geo}>
        <meshStandardMaterial map={front} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* back face: own mesh rotated to face rearward; its front-side
          texture therefore reads correctly without mirroring. Offset in
          z so the two sheets never kiss at the rim. */}
      <mesh geometry={backGeo} rotation={[0, Math.PI, 0]} position={[0, 0, -0.01]}>
        <meshStandardMaterial map={back} roughness={0.65} metalness={0.1} />
      </mesh>
    </group>
  );
}

/* ---------------- camera rig ---------------- */

function Rig({ reduced }: { reduced: boolean }) {
  useFrame(({ camera, pointer }) => {
    if (reduced) return;
    const s = Math.min(1, Math.max(0, (window.scrollY || 0) / window.innerHeight));
    camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.22 - camera.position.y) * 0.04;
    camera.position.z += (5.4 + s * 0.6 - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------------- scene shell + lifecycle ---------------- */

export function Scene({ children, active }: { children: ReactNode; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <pointLight position={[-5, -3, 4]} intensity={18} color="#ffd9c4" />
      {children}
      <Rig reduced={false} />
    </Canvas>
  );
}

export function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Scene lifecycle: render the CSS card stack on the server / reduced
 * motion / no WebGL; lazy-init the real scene in the browser; pause the
 * render loop whenever the section is off-screen.
 */
export function useCardScene(
  wrapperRef: React.RefObject<HTMLElement | null>,
): { mode: "static" | "webgl"; active: boolean } {
  const [mode, setMode] = useState<"static" | "webgl">("static");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && webglAvailable()) setMode("webgl");
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wrapperRef]);

  return { mode, active };
}
