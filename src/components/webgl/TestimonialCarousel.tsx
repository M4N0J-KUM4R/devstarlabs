"use client";

import { useEffect, useRef, useState } from "react";
import {
  DoubleSide,
  Mesh,
  NoToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import HoverAccent from "@/components/system/HoverAccent";

/* =====================================================================
   Testimonials 3D review carousel — a port of follow.art's
   "Landing9TestimonialsWebGl" (bundle DgImLHIQ.js) + their shared
   WebGL app factory, spring, pointer and drag composables. All
   constants verbatim from the original bundles (runtime-probed, not
   guessed):

     - 8 card planes on a bent-cylinder track; the CENTER card is
       flat (radius 4.24), side cards bend to 2.07 as they leave.
     - sine-eased keyframe track (W/E) for position + rotation.
     - drag with px/ms inertia (50ms sample reset), rubber band /5
       at both ends, snap floor/ceil on release, arrow-key drag.
     - position spring { precision:.002, time:1000 } (time-mode).
     - pointer x spring drives the subtle parallax offset.
     - renderer pinned to pixelRatio 2, alpha, NoToneMapping.
     - camera fov contain-fitted: fov * (max(0, 1.8718 - w/h)*.5 + 1).

   The three.js ShaderMaterial uniform gotcha from the reference port
   is preserved: `progress` MUST be `{ value: Vector2 }` — a raw
   Vector2 makes the renderer's uniform upload read `.x` of undefined
   and silently kills the frame loop (empty canvas).

   Structure (also verbatim): the root div IS the original
   `.landing-9-testimonials-webgl` — an absolute layer filling
   `.section-9__cards` and bleeding 5vw past it top and bottom. The
   canvas is appended straight into the root and the navigation bar is
   absolutely positioned inside it (width 31.5vw, centred, space-
   between), exactly like the reference render function:

     div.landing-9-testimonials-webgl (+.is-dragging)
       ├─ canvas                       (injected by the factory)
       └─ div.landing-9-testimonials-webgl__navigation
            ├─ btn block link accent / text-smaller — icon:step-back,
            │  title:"Prev", disabled on first card
            └─ btn block link accent / text-smaller — icon:step-next,
               title:"Next", disabled on last card
   ===================================================================== */

const COUNT = 8;
const RADIUS_CENTER = 4.24;
const RADIUS_SIDE = 2.07;

const REVIEW_IMAGES = Array.from(
  { length: COUNT },
  (_, i) => `/reviews/review-${i + 1}.png`,
);

/* icons.a4BZ7Lj0.svg#step-back / #step-next — verbatim symbol paths */
function StepIcon({ dir }: { dir: "back" | "next" }) {
  return (
    <svg
      className={`btn__icon icon icon-step-${dir}`}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeWidth="1.2"
        d={
          dir === "back"
            ? "M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Zm0 0H4m0 0 5-5M4 9l5 5"
            : "M1 9a8 8 0 1 0 16 0A8 8 0 0 0 1 9Zm0 0h13m0 0L9 4m5 5-5 5"
        }
      />
    </svg>
  );
}

const clampN = (v: number, a: number, b: number) =>
  Math.min(Math.max(v, a), b);
const lerpN = (a: number, b: number, t: number) => (1 - t) * a + t * b;
const mob980 = () => window.matchMedia("(max-width: 979px)").matches;

/* ---------------- their spring (uf/an) ------------------------------- */
type SpringOpts = {
  lerp?: number;
  threshold?: number;
  precision?: number;
  time?: number;
};
function makeSpring(target0: number, { lerp = 0.05, threshold = 1 / 2500, precision = 0, time = 0 }: SpringOpts = {}) {
  let cur = target0;
  let target = target0;
  const timeMode = precision > 0 && time > 0;
  return {
    get value() {
      return cur;
    },
    set target(v: number) {
      target = v;
    },
    reset(v: number) {
      cur = target = v;
    },
    step(dt: number) {
      const f = timeMode
        ? 1 - Math.pow(precision, dt / time)
        : (lerp * dt) / 16;
      const next = lerpN(cur, target, f);
      cur = Math.abs(next - target) < threshold ? target : next;
      return cur;
    },
  };
}

/* ---------------- their inertia speed tracker (CZJoKQvk) -------------- */
function makeSpeedTracker() {
  const samples: { value: number; timestamp: number }[] = [];
  return {
    add(v: number) {
      const now = Date.now();
      const last = samples[samples.length - 1];
      if (last && now - last.timestamp > 50) samples.length = 0;
      samples.push({ value: v, timestamp: now });
    },
    speed() {
      if (samples.length > 1) {
        const a = samples[0];
        const b = samples[samples.length - 1];
        return (b.value - a.value) / (b.timestamp - a.timestamp);
      }
      return 0;
    },
  };
}

/* ---------------- shaders (verbatim from DgImLHIQ.js) ----------------- */
const VERT = `
#ifndef PI
#define PI 3.141592653589
#endif

uniform vec2 progress;
uniform float progressScale;
uniform float offset;
uniform float radius;
uniform float effect;
varying vec2 vUv;

#define WIDTH 1.0
#define HEIGHT 1.0

vec3 getPoint(float radius, float anglePointX, float anglePointY) {
    return vec3(
        cos(anglePointX) * radius,
        sin(anglePointY) * radius,
        cos(anglePointY) * sin(anglePointX) * radius
    );
}

vec3 rotatePointAroundAnchorZ(vec3 point, vec3 anchor, float angle) {
    vec3 relativePoint = point - anchor;
    vec3 rotatedPoint = vec3(
        cos(angle) * relativePoint.x - sin(angle) * relativePoint.y,
        sin(angle) * relativePoint.x + cos(angle) * relativePoint.y,
        relativePoint.z
    );
    return rotatedPoint + anchor;
}

vec3 rotatePointAroundAnchorY(vec3 point, vec3 anchor, float angle) {
    vec3 relativePoint = point - anchor;
    vec3 rotatedPoint = vec3(
        cos(angle) * relativePoint.x - sin(angle) * relativePoint.z,
        relativePoint.y,
        sin(angle) * relativePoint.x + cos(angle) * relativePoint.z
    );
    return rotatedPoint + anchor;
}

void main() {
    vUv = uv;

    float angleX = WIDTH / radius;
    float angleY = HEIGHT / radius;
    float angleBaseX = offset + progress.x * progressScale;
    float angleBaseY = 0.0;

    float anglePointX = angleX * (uv.x - 0.5) * 2.0 + angleBaseX;
    float anglePointY = angleY * (uv.y - 0.5) * 2.0 + angleBaseY;

    vec3 point = getPoint(radius, anglePointX, anglePointY);
    vec3 anchor = getPoint(radius, anglePointX, 0.0);

    float baseDistanceScale = radius * cos(1.0 / radius);
    float baseSizeScale = radius * sin(1.0 / radius);

    vec3 pointBase = rotatePointAroundAnchorY(position * baseSizeScale * 2.0, vec3(0.0, 0.0, 0.0), PI / 2.0);

    pointBase = rotatePointAroundAnchorY(pointBase + vec3(baseDistanceScale, 0.0, 0.0), vec3(0.0, 0.0, 0.0), angleBaseX);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(mix(pointBase, point, effect), 1.0);
}
`;
const FRAG = `
varying vec2 vUv;
uniform sampler2D imageTexture;

void main() {
    gl_FragColor = texture2D(imageTexture, vUv);
}
`;

/* ---------------- keyframes (verbatim) -------------------------------- */
const W: number[][] = [
  [-22, -4.1, -29],
  [-10.6, -2.3, -23],
  [-3.9, 2.5, -17],
  [0, 0, 0],
  [3.9, 2.5, -17],
  [9.2, -1.4, -23],
  [22, -4.1, -29],
];
const E: number[][] = [
  [-0.8, 0, 0],
  [0.4, 0, 0],
  [-0.6, 0, 0],
  [0, 0, 0],
  [-0.6, 0, 0],
  [0.4, 0, 0],
  [-0.8, 0, 0],
];

/* their M(n, s) — sine-eased keyframe interpolation */
function keyLerp(n: number, arr: number[][]) {
  const r = Math.floor(n) + 3;
  const u = Math.ceil(n) + 3;
  const c = arr[r];
  const p = arr[u];
  if (c) {
    if (!p) return arr[arr.length - 1];
  } else return arr[0];
  const frac = n > 0 ? Math.abs(n) % 1 : 1 - (Math.abs(n) % 1);
  const d = Math.sin(frac * Math.PI * 0.5);
  return [
    c[0] + (p[0] - c[0]) * d,
    c[1] + (p[1] - c[1]) * d,
    c[2] + (p[2] - c[2]) * d,
  ];
}
/* their Q(c, 0, 1, L, fe) — clamped map */
const mapC = (v: number, a: number, b: number, c: number, d: number) =>
  clampN(c + ((v - a) / (b - a)) * (d - c), Math.min(c, d), Math.max(c, d));

/* ===================================================================== */

export default function TestimonialCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  /* engine handle: target index setter wired into the render loop */
  const navRef = useRef<{ next: () => void; prev: () => void } | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ---------- shared app factory (Rp/dp/mp) ---------- */
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.toneMapping = NoToneMapping;
    renderer.setPixelRatio(2); /* pinned, like the reference */
    const canvas = renderer.domElement;
    root.appendChild(canvas);

    const BASE_FOV = mob980() ? 18.5 : 28;
    const camera = new PerspectiveCamera(BASE_FOV, 1, 0.1, 69);
    camera.position.set(0, 0, 4);
    camera.rotation.set(0, 0, 0, "XYZ");
    const scene = new Scene();

    const resize = () => {
      const w = root.clientWidth || 1;
      const h = root.clientHeight || 1;
      renderer.setSize(w, h);
      const aspect = w / h;
      camera.aspect = aspect;
      camera.fov = BASE_FOV * (Math.max(0, 1.8717948717948718 - aspect) * 0.5 + 1);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();

    /* ---------- springs ---------- */
    const posSpring = makeSpring(0, { precision: 0.002, time: 1000 });
    const ptrSpring = makeSpring(0.5);
    let ptrTarget = 0.5;
    const onMouseMove = (e: MouseEvent) => {
      ptrTarget = e.clientX / window.innerWidth;
    };
    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    /* ---------- drag composable + state ---------- */
    let targetIdx = 0;
    let dragging = false;
    let dragPos = 0;
    let D = 0;

    const inertiaX = makeSpeedTracker();
    let activeKind: "pointerdown" | "mousedown" | "touchstart" | null = null;

    const pageXOf = (e: MouseEvent | TouchEvent | PointerEvent): number => {
      if ("touches" in e && e.touches && e.touches.length) {
        return e.touches[0].pageX;
      }
      return (e as MouseEvent).pageX;
    };

    const applyDrag = (start: number, xy: number) => {
      const divisor = mob980()
        ? window.innerWidth
        : (window.innerWidth / 1460) * 460;
      let e = (start - xy) / divisor / 2 + D;
      if (e < 0) e = e / 5; /* rubber band */
      else if (e > COUNT - 1) e = (e - COUNT + 1) / 5 + COUNT - 1;
      dragPos = e;
    };

    const onDragMove = (startXY: number, e: MouseEvent | TouchEvent | PointerEvent) => {
      if (!dragging) return;
      const xy = pageXOf(e);
      inertiaX.add(xy);
      applyDrag(startXY, xy);
    };

    const onDragEnd = (startXY: number, e: MouseEvent | TouchEvent | PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      root.classList.remove("is-dragging");
      const xy = pageXOf(e);
      inertiaX.add(xy);
      posSpring.reset(dragPos);
      const l = Math.abs(xy - startXY) >= 10 ? inertiaX.speed() : 0;
      let e2: number;
      if (l) e2 = l > 0 ? Math.floor(dragPos) : Math.ceil(dragPos);
      else e2 = dragPos % 1 > 0.5 ? Math.ceil(dragPos) : Math.floor(dragPos);
      targetIdx = clampN(e2, 0, COUNT - 1);
      setIndex(targetIdx);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (dragging || e.button !== 0) return;
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button")) return; /* nav stays clickable */
      dragging = true;
      activeKind = "pointerdown";
      const startXY = pageXOf(e);
      dragPos = D = posSpring.value;
      inertiaX.add(startXY);
      root.classList.add("is-dragging");
      const move = (ev: PointerEvent) => onDragMove(startXY, ev);
      const end = (ev: PointerEvent) => {
        onDragEnd(startXY, ev);
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", end);
        document.removeEventListener("pointercancel", end);
        activeKind = null;
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", end);
      document.addEventListener("pointercancel", end);
      e.preventDefault();
    };
    /* mouse fallback for browsers without pointer events */
    const onMouseDown = (e: MouseEvent) => {
      if (dragging || activeKind || e.button !== 0) return;
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button")) return;
      dragging = true;
      activeKind = "mousedown";
      const startXY = e.pageX;
      dragPos = D = posSpring.value;
      inertiaX.add(startXY);
      root.classList.add("is-dragging");
      const move = (ev: MouseEvent) => onDragMove(startXY, ev);
      const end = (ev: MouseEvent) => {
        onDragEnd(startXY, ev);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        activeKind = null;
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end);
      e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => {
      if (dragging || activeKind || !e.touches.length) return;
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button")) return;
      dragging = true;
      activeKind = "touchstart";
      const startXY = e.touches[0].pageX;
      dragPos = D = posSpring.value;
      inertiaX.add(startXY);
      root.classList.add("is-dragging");
      const move = (ev: TouchEvent) => onDragMove(startXY, ev);
      const end = (ev: TouchEvent) => {
        onDragEnd(startXY, ev);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
        document.removeEventListener("touchcancel", end);
        activeKind = null;
      };
      document.addEventListener("touchmove", move);
      document.addEventListener("touchend", end);
      document.addEventListener("touchcancel", end);
      e.preventDefault();
    };
    /* their keymove: arrow keys nudge the same drag pipeline */
    const onKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      if (e.key === "ArrowLeft") dx = -1;
      else if (e.key === "ArrowRight") dx = 1;
      else return;
      const startXY = window.innerWidth / 2;
      const xy = startXY + dx * step; /* their keymove: a synthesized drag */
      if (!dragging) {
        /* keyboard navigation without a drag gesture: hop one card */
        targetIdx = clampN(targetIdx + (dx > 0 ? 1 : -1), 0, COUNT - 1);
        setIndex(targetIdx);
        e.preventDefault();
        return;
      }
      applyDrag(startXY, xy);
      e.preventDefault();
    };
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("mousedown", onMouseDown);
    root.addEventListener("touchstart", onTouchStart, { passive: false });
    root.addEventListener("keydown", onKeyDown);

    /* ---------- build cards (verbatim ue() flow) ---------- */
    type Card = {
      mesh: Mesh;
      progress: Vector2;
      effect: { value: number };
      radius: { value: number };
      mat: ShaderMaterial;
      geo: PlaneGeometry;
    };
    const cards: Card[] = [];
    const loader = new TextureLoader();
    let disposed = false;

    Promise.all(
      REVIEW_IMAGES.map(
        (src) =>
          new Promise<import("three").Texture>((resolve, reject) =>
            loader.load(src, resolve, undefined, reject),
          ),
      ),
    )
      .then((textures: Texture[]) => {
        if (disposed) {
          textures.forEach((t) => t.dispose());
          return;
        }
        textures.forEach((tex, i) => {
          const progress = new Vector2(0, 0);
          const effect = { value: i === 0 ? 0 : 1 };
          const radius = { value: RADIUS_CENTER };
          const mat = new ShaderMaterial({
            side: DoubleSide,
            vertexShader: VERT,
            fragmentShader: FRAG,
            uniforms: {
              imageTexture: { value: tex },
              radius,
              offset: { value: Math.PI * -0.5 },
              progressScale: { value: 0.87 },
              /* verbatim: progress MUST be a { value: Vector2 } wrapper */
              progress: { value: progress },
              effect,
            },
          });
          const geo = new PlaneGeometry(1, 1, 20, 20);
          const mesh = new Mesh(geo, mat);
          mesh.frustumCulled = false;
          mesh.position.set(0, 0, 0);
          mesh.rotation.set(0, 0, 0);
          mesh.scale.setScalar(3.2);
          scene.add(mesh);
          cards.push({ mesh, progress, effect, radius, mat, geo });
        });
        layout(0, 0.5); /* their initial m(0,.5) */
      })
      .catch(() => {
        /* textures failed to load: leave the canvas empty rather than
           throwing inside the render loop */
      });

    /* their m(n, s) — n: float position, s: smoothed pointer x (0..1) */
    function layout(n: number, s: number) {
      cards.forEach((card, u) => {
        const c = clampN(n > u ? n - u : u - n, 0, 1);
        const p = s * 0.2 * c;
        const h = u - n - p;
        if (h < -3 || h > 3) {
          card.mesh.visible = false;
          return;
        }
        card.mesh.visible = true;
        card.progress.x = (n - u) * -1;
        const d = keyLerp(h, W);
        card.mesh.position.set(d[0], d[1], d[2]);
        const B = keyLerp(h, E);
        card.mesh.rotation.set(B[0], B[1], B[2]);
        card.effect.value = c;
        card.radius.value = mapC(c, 0, 1, RADIUS_CENTER, RADIUS_SIDE);
      });
    }

    /* ---------- nav api (their z/X + disabled ends) ---------- */
    const nav = {
      next: () => {
        if (targetIdx < COUNT - 1) {
          targetIdx++;
          setIndex(targetIdx);
        }
      },
      prev: () => {
        if (targetIdx > 0) {
          targetIdx--;
          setIndex(targetIdx);
        }
      },
    };
    navRef.current = nav;

    /* ---------- render loop ---------- */
    let last = performance.now() - 16;
    let raf = 0;
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(160, now - last);
      last = now;
      posSpring.target = targetIdx;
      posSpring.step(dt);
      ptrSpring.target = ptrTarget;
      ptrSpring.step(dt);
      layout(dragging ? dragPos : posSpring.value, ptrSpring.value);
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      navRef.current = null;
      window.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("mousedown", onMouseDown);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("keydown", onKeyDown);
      root.classList.remove("is-dragging");
      for (const c of cards) {
        scene.remove(c.mesh);
        (c.mat.uniforms.imageTexture.value as { dispose: () => void }).dispose();
        c.mat.dispose();
        c.geo.dispose();
      }
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  /* their render(): root layer + navigation with two block/link/accent
     text-smaller buttons — Prev (icon left) and Next (icon right),
     disabled at the ends. No counter in the reference. */
  return (
    <div
      ref={rootRef}
      className="landing-9-testimonials-webgl"
      role="group"
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <div className="landing-9-testimonials-webgl__navigation">
        <button
          type="button"
          className={`btn btn--block btn--link btn--accent btn--text-smaller${
            index === 0 ? " is-disabled" : ""
          }`}
          onClick={() => navRef.current?.prev()}
          disabled={index === 0}
          aria-label="Previous review"
        >
          <StepIcon dir="back" />
          <span className="btn__text">Prev</span>
          <HoverAccent />
        </button>
        <button
          type="button"
          className={`btn btn--block btn--link btn--accent btn--text-smaller${
            index === COUNT - 1 ? " is-disabled" : ""
          }`}
          onClick={() => navRef.current?.next()}
          disabled={index === COUNT - 1}
          aria-label="Next review"
        >
          <span className="btn__text">Next</span>
          <StepIcon dir="next" />
          <HoverAccent />
        </button>
      </div>
    </div>
  );
}
