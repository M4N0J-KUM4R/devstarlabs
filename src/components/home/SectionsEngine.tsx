"use client";

import { useEffect } from "react";
import * as THREE from "three";

/* ============================================================
   Sections engine — verbatim port of the follow.art scroll
   orchestration + the Landing2GetSeenWebGl / Landing5NexusWebGl
   components, driving the raw sections injected by RawSections
   (and the flip cards of the React Centralize). All constants are
   the reverse-engineered originals: layer-under-next p²·15° sweep,
   the T(top,from,1) lerp reveals, the video twist exit, the flip
   card params, the fov-contain factory.
   ============================================================ */

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;
function mapC(v: number, a: number, b: number, c: number, d: number, cl?: boolean) {
  let r = c + ((v - a) / (b - a)) * (d - c);
  if (cl) r = clamp(r, Math.min(c, d), Math.max(c, d));
  return r;
}
const easeInOutSine = (x: number) => -0.5 * (Math.cos(Math.PI * x) - 1);
const easeInSine = (x: number) => 1 - Math.cos((x * Math.PI) / 2);
const mob980 = () => matchMedia("(max-width:979px)").matches;

/* their scroll animator T(elTop, from, to, {lerp, delay}) */
function scrollVal(from: number, to: number, k: number, delay = 0) {
  return {
    v: from,
    update(top: number, vh: number) {
      let u = 1 - clamp(top / (vh / 1.5), 0, 1);
      if (delay > 0) u = u > delay ? (u - delay) / (1 - delay) : 0;
      const t = from + (to - from) * Math.min(u, 1);
      this.v = lerpN(this.v, t, k);
      return this.v;
    },
  };
}
function chaser(get: () => number, k: number) {
  return { v: get(), update() { this.v = lerpN(this.v, get(), k); return this.v; } };
}

/* their shared three.js app factory (u()/dp()) — fov contain factor,
   pixelRatio 2, transparent renderer */
function makeApp(
  container: HTMLElement,
  { fov, near = 0, far = 200, position = [0, 0, 4], rotation = [0, 0, 0] }: {
    fov: number; near?: number; far?: number;
    position?: [number, number, number]; rotation?: [number, number, number];
  },
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(2);
  renderer.toneMapping = THREE.NoToneMapping;
  container.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
  camera.position.set(...position);
  camera.rotation.set(...rotation);
  const scene = new THREE.Scene();
  function resize() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.fov = fov * (Math.max(0, 1.8717948717948718 - (w / h)) * 0.5 + 1);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();
  let running = false, rafId = 0;
  const renderFns: Array<() => void> = [];
  function loop() {
    for (const f of renderFns) f();
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(loop);
  }
  return {
    scene, camera, renderer,
    start() { if (!running) { running = true; loop(); } },
    stop() { running = false; cancelAnimationFrame(rafId); },
    onRender(f: () => void) { renderFns.push(f); },
    dispose() { ro.disconnect(); this.stop(); renderer.dispose(); },
  };
}

/* their shared card-vertex shader (CRzV2p0b.js) — vertical bend */
const CARD_VERT = `
#ifndef PI
#define PI 3.141592653589
#endif
uniform float progress;
uniform float progressScale;
uniform float offset;
uniform float radius;
varying vec2 vUv;
#define HEIGHT 1.0
void main() {
    vUv = uv;
    float angle = HEIGHT / radius;
    float anglePoint = angle * (uv.y - 0.5) * 2.0 + offset + progress * progressScale;
    float z = cos(anglePoint) * radius;
    float y = sin(anglePoint) * radius;
    vec4 bentPosition = vec4(position.x, y, z, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * bentPosition;
}`;
const CARD_FRAG = `
varying vec2 vUv;
uniform sampler2D imageTexture;
uniform float alpha;
void main() {
    gl_FragColor = texture2D(imageTexture, vec2(1.0 - vUv.x, vUv.y));
    gl_FragColor.a = alpha;
}`;
/* Landing2GetSeenWebGl shaders (BDU8auKu.js) — verbatim */
const GS_VERT = `
#ifndef PI
#define PI 3.141592653589
#endif
#define BUBBLE_AMOUNT 0.2
#define BUBBLE_RADIUS 0.9
uniform vec2 mousePos;
uniform float progressStart;
uniform float progressEnd;
uniform float radius;
varying vec2 vUv;
float scaleValue(float value, float valueMin, float valueMax, float targetMin, float targetMax) {
    return clamp(targetMin + (value - valueMin) / (valueMax - valueMin) * (targetMax - targetMin), min(targetMin, targetMax), max(targetMin, targetMax));
}
vec4 bend(vec4 coords, float progressStart, float progressEnd) {
    vec4 bentCoords = coords;
    float yAnimationOffset = 0.25;
    float adjustedProgress = progressStart + (1.0 - coords.y) * yAnimationOffset;
    if (progressStart > 0.5) {
        float endProgressStart = scaleValue(progressStart, 0.5, 1.0, 0.0, 1.0);
        adjustedProgress = progressStart * endProgressStart + adjustedProgress * (1.0 - endProgressStart);
    }
    float angle = (1.0 - adjustedProgress) * PI;
    float zOffset = (2.0 - cos(angle) * 2.0);
    #if USE_MOUSE
        float yOffset = (1.0 - progressStart) * 0.25 + progressEnd * 2.25;
    #else
        float yOffset = (1.0 - progressStart) * 0.55 + progressEnd * 2.25;
    #endif
    bentCoords.y = bentCoords.y * cos(angle) + yOffset;
    bentCoords.z = bentCoords.z * sin(angle) - zOffset;
    return bentCoords;
}
void main() {
    vUv = uv;
    vec4 bentPosition = bend(vec4(position, 1.0), progressStart, progressEnd);
    vec4 pos = modelViewMatrix * bentPosition;
    vec4 posScreen = projectionMatrix * pos;
    vec3 posScreenNormalized = posScreen.xyz / posScreen.w;
    #if USE_MOUSE
        float mouseDistance = length(mousePos.xy - posScreenNormalized.xy);
        float displacementStrength = 1.0 - smoothstep(0.0, BUBBLE_RADIUS, mouseDistance);
        float displacement = displacementStrength * BUBBLE_AMOUNT;
        pos.z += displacement;
    #endif
    gl_Position = projectionMatrix * pos;
}`;
const GS_FRAG = `
varying vec2 vUv;
uniform sampler2D imageTexture;
void main() {
    gl_FragColor = texture2D(imageTexture, vUv);
}`;

function loadTex(src: string) {
  const t = new THREE.TextureLoader().load(src);
  t.colorSpace = THREE.SRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

export default function SectionsEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const frameFns: Array<(vh: number, vw: number) => void> = [];
    let raf = 0;
    const onFrame = (fn: (vh: number, vw: number) => void) => frameFns.push(fn);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      try {
        for (const f of frameFns) f(window.innerHeight, window.innerWidth);
      } catch (err) {
        console.error("[sections] frame fn error:", err instanceof Error ? err.message : err);
      }
    };

    const $ = <T extends Element>(s: string, r?: ParentNode) =>
      (r ?? document).querySelector<T>(s);
    const $$ = <T extends Element>(s: string, r?: ParentNode) =>
      Array.from((r ?? document).querySelectorAll<T>(s));

    const secs = $$("section.landing-section").map((sec) => ({
      sec,
      layer: $(".section__layer--sticky", sec) as HTMLElement | null,
      theme:
        sec.getAttribute("data-page-header-theme") ??
        $("[data-page-header-theme]", sec)?.getAttribute("data-page-header-theme") ??
        "orange",
    }));

    /* ---- 2. sticky layer slide/rotate (the under-next sweep) ---- */
    {
      const infos = secs.filter((s) => s.layer);
      onFrame((vh) => {
        for (const { sec, layer } of infos) {
          const top = sec.getBoundingClientRect().top;
          if (mob980()) {
            const q = clamp(mapC(top / vh, 0.25, 1, 0, 1), 0, 1);
            const r = q * q;
            layer!.style.transform = `translateX(${((r * -50 / 390) * 100).toFixed(4)}%) rotate(${(r * 15).toFixed(3)}deg)`;
          } else {
            const r = clamp(top / vh, 0, 1) ** 2;
            layer!.style.transform = `translateX(${((r * 124 / 1440) * 100).toFixed(4)}%) rotate(${(r * 15).toFixed(3)}deg)`;
          }
        }
      });
      /* sticky:"bottom" layers (nexus + testimonials): pin by bottom */
      const bottoms = secs
        .filter((s) => s.layer?.hasAttribute("data-sticky-bottom"))
        .map((s) => s.layer!);
      onFrame((vh) => {
        for (const l of bottoms) {
          const h = l.getBoundingClientRect().height;
          l.style.top = h > vh ? `${(vh - h).toFixed(2)}px` : "0px";
        }
      });
    }

    /* ---- 3. title scaleY reveals (their transformTitle / W(top,.6|.7)) ---- */
    {
      const els = $$("[data-reveal]").map((el) => ({
        el: el as HTMLElement,
        from: parseFloat(el.getAttribute("data-reveal") ?? "") || 0.7,
        k: parseFloat(el.getAttribute("data-reveal-k") ?? "") ||
          (el.getAttribute("data-reveal") === "0.6" ? 0.175 : 0.1),
        cur: parseFloat(el.getAttribute("data-reveal") ?? "") || 0.7,
      }));
      if (reduced) {
        for (const r of els) r.el.style.transform = "scaleY(1)";
      } else {
        onFrame((vh) => {
          for (const r of els) {
            const top = r.el.getBoundingClientRect().top;
            const u = 1 - clamp(top / (vh / 1.5), 0, 1);
            const target = r.from + (1 - r.from) * u;
            r.cur = lerpN(r.cur, target, r.k);
            r.el.style.transform = `scaleY(${r.cur.toFixed(4)})`;
          }
        });
      }
    }

    /* ---- 4. section-2 video preview 3D twist on exit ---- */
    {
      const gsSec = $(".js-get-seen-section");
      const vpWrap = $(".section-2__video-preview-wrapper") as HTMLElement | null;
      const vpInner = $(".section-2__video-preview-wrapper-inner") as HTMLElement | null;
      if (gsSec && vpWrap && vpInner && !reduced) {
        const rotY = scrollVal(-35, 0, 0.1);
        const rotX = scrollVal(-20, 0, 0.1);
        onFrame((vh) => {
          const top = gsSec!.getBoundingClientRect().top;
          const r = mapC(top, 0, -vh, 0, 10, true);
          vpWrap!.style.transform = `rotate3d(0, 1, 1, ${(rotY.update(top, vh) + r).toFixed(3)}deg) rotateX(${(rotX.update(top, vh) + r).toFixed(3)}deg)`;
          const rr = easeInOutSine(mapC(top, 0, -1.5 * vh, 0, 1.5, true));
          if (mob980()) {
            vpInner!.style.transform = `translateY(${(rr * -40).toFixed(2)}%) scaleY(${(1 - rr * 0.75).toFixed(4)})`;
          } else {
            vpInner!.style.transform = `translateY(${(rr * -40).toFixed(2)}%) scaleY(${(1 - rr * 0.75).toFixed(4)}) scaleX(${(1 - rr * 0.25).toFixed(4)})`;
          }
        });
      }
    }

    /* ---- 5. section-4 (centralize) flip cards — section-top driven ---- */
    {
      const sec = $(".section-4");
      const cards = $$(".section-4__card");
      if (sec && cards.length && !reduced) {
        const params: Array<[number, number, number]> = [
          [-100, -75, 0.3], [-180, -75, 0.3], [-180, -75, 0.6], [-200, -75, 0.6],
        ];
        const anims = cards.map((el, i) => {
          const [y, ry, d] = params[i] ?? params[params.length - 1];
          return {
            el: el as HTMLElement,
            y: scrollVal(y, 0, 0.1, d),
            ry: scrollVal(ry, 0, 0.1, d),
          };
        });
        onFrame((vh) => {
          const top = sec!.getBoundingClientRect().top;
          for (const a of anims) {
            a.el.style.transform = `translateY(${Math.abs(a.y.update(top, vh)).toFixed(2)}px) rotateY(${Math.abs(a.ry.update(top, vh)).toFixed(2)}deg)`;
          }
        });
      }
    }

    /* ---- 6a. underline-text-piece reveals ---- */
    {
      const io = new IntersectionObserver(
        (es) => {
          for (const e of es) {
            if (e.isIntersecting) {
              e.target.classList.add("underline-text-piece--shown");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      $$(".underline-text-piece").forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---- 6c. fixed CTA shows past .55 viewport heights ---- */
    {
      const fcta = $(".fixed-sign-up-button") as HTMLElement | null;
      if (fcta) {
        const update = () => {
          const show = window.scrollY > window.innerHeight * 0.55;
          fcta.style.transform = show ? "translateY(0px)" : "translateY(500%)";
          fcta.classList.toggle("fixed-sign-up-button--hidden", !show);
        };
        if (reduced) {
          window.addEventListener("scroll", update, { passive: true });
          update();
          cleanups.push(() => window.removeEventListener("scroll", update));
        } else {
          onFrame(update);
        }
      }
    }

    /* ---- 8. Landing2GetSeenWebGl — bending video preview plane ---- */
    {
      const container = $(".landing-2-get-seen-webgl") as HTMLElement | null;
      if (container) {
        const app = makeApp(container, {
          fov: 28, near: 0, far: 200,
          position: [0, -0.048, 2.04], rotation: [0, 0, 0],
        });
        const R = (1 / 460) * 540;
        const geo = new THREE.PlaneGeometry(1, R, 20, 20);
        const uniforms = {
          imageTexture: { value: loadTex("/sections/video-preview.png") },
          mousePos: { value: new THREE.Vector2(0, 0) },
          progressStart: { value: 0 },
          progressEnd: { value: 0 },
          radius: { value: 1 },
        };
        const mat = new THREE.ShaderMaterial({
          side: THREE.DoubleSide, fragmentShader: GS_FRAG, vertexShader: GS_VERT,
          uniforms, defines: { USE_MOUSE: mob980() ? 0 : 1 },
        });
        app.scene.add(new THREE.Mesh(geo, mat));

        let mouseX = 0.5, mouseY = 0.5;
        const onMouse = (e: MouseEvent) => {
          mouseX = e.clientX / window.innerWidth;
          mouseY = e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMouse, { passive: true });
        const mx = chaser(() => mouseX, 0.2);
        const my = chaser(() => mouseY, 0.2);

        const gsSec = $(".js-get-seen-section");
        app.onRender(() => {
          if (!mob980()) {
            uniforms.mousePos.value.set(mx.update() * 2 - 1, (my.update() * 2 - 1) * -1);
          }
          if (gsSec) {
            const top = gsSec.getBoundingClientRect().top;
            const vh = window.innerHeight;
            const o = mapC(top / vh, 0.75, 0, 0, 1, true);
            const s = mapC(top / vh, 0, -2, 0, 1, true);
            const a = easeInSine(s);
            const r = easeInOutSine(o - s);
            uniforms.progressStart.value = mapC(r, 0, 1, -0.25, 1);
            uniforms.progressEnd.value = a;
          }
        });
        const io = new IntersectionObserver(
          (es) => {
            if (es.some((e) => e.isIntersecting)) { app.start(); io.disconnect(); }
          },
          { rootMargin: "100% 0px" },
        );
        io.observe(container);
        cleanups.push(() => {
          io.disconnect();
          app.dispose();
          if (container.contains(app.renderer.domElement)) app.renderer.domElement.remove();
          window.removeEventListener("mousemove", onMouse);
        });
      }
    }

    /* ---- 9. Landing5NexusWebGl — orbit camera + two bent cards ---- */
    {
      const container = $(".landing-5-nexus-webgl__content") as HTMLElement | null;
      const nsec = $("#nexus-card");
      if (container && nsec) {
        const y = 0.4;
        const I = 8;
        let app: ReturnType<typeof makeApp> | null = null;
        let card1: THREE.Mesh | null = null;
        let card2: THREE.Mesh | null = null;
        let uni1: { value: number } | null = null;
        let mX = 0.5, mY = 0.5;
        const mx = chaser(() => mX, 0.2);
        const my = chaser(() => mY, 0.2);
        const onMouse = (e: MouseEvent) => {
          mX = e.clientX / window.innerWidth;
          mY = e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMouse, { passive: true });
        const base = [0, 0, 4];

        function build() {
          if (!container) return;
          const mobile = mob980();
          app = makeApp(container, {
            fov: mobile ? 28 : 30.65, far: 69,
            position: mobile ? [0, 0.75, 8.5] : [0, 0, 4], rotation: [0, 0, 0],
          });
          function makeCard(src: string, opt: {
            offset: number; radius: number;
            position: [number, number, number];
            rotation: [number, number, number]; scale: number;
          }) {
            const uniforms = {
              alpha: { value: 1 },
              imageTexture: { value: loadTex(src) },
              progress: uni1!,
              radius: { value: opt.radius },
              offset: { value: opt.offset },
              progressScale: { value: 1 },
            };
            const mat = new THREE.ShaderMaterial({
              side: THREE.DoubleSide, fragmentShader: CARD_FRAG, vertexShader: CARD_VERT, uniforms,
            });
            const geo = new THREE.PlaneGeometry(1, (1 / 390) * 780, 20, 20);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...opt.position);
            mesh.rotation.set(...opt.rotation);
            mesh.scale.setScalar(opt.scale);
            app!.scene.add(mesh);
            return mesh;
          }
          uni1 = { value: 0 };
          card1 = makeCard("/sections/nexus-card-1.png", { offset: -0.48, radius: 1.96, position: [-0.59, y, 0.5], rotation: [0, 2.6, 0.4], scale: 1.3 });
          card2 = makeCard("/sections/nexus-card-2.png", { offset: -1.04, radius: 0.87, position: [-0.3, 1.2, -3.5], rotation: [0, -2.4, -0.41], scale: 1.8 });

          app.onRender(() => {
            if (!app) return;
            const n = base;
            const i = I;
            const rx = (mx.update() - 0.5) * y + Math.PI * 0.5;
            const rm = (my.update() - 0.5) * y;
            const cx = n[0] + i * Math.cos(rx);
            const cy = n[1] + i * Math.sin(rm);
            const cz = n[2] + i * Math.sin(rx) * Math.cos(rm) - i;
            app.camera.position.set(cx, cy, cz);
            app.camera.lookAt(0, 0, n[2] - i);
          });
          app.start();
        }

        function scrollDrive() {
          if (!nsec || !card1 || !uni1) return;
          const top = nsec.getBoundingClientRect().top;
          const vh = window.innerHeight;
          const vw = window.innerWidth;
          const x = mob980()
            ? mapC(top, vh, -vh, 0, 1, true)
            : mapC(top, vh, (-(vw * 75 / 1460 * 876)) / 100, 0, 1, true);
          const r = easeInOutSine(mapC(x, 0.8, 1, 0, 1, true));
          card1.position.y = y + r * 1.1;
          if (card2) card2.position.y = 1.2 + r * 1.1;
          const m = easeInSine(x);
          uni1.value = mapC(m, 0, 1, -0.25, 1);
        }
        if (!reduced) onFrame(scrollDrive);

        const io = new IntersectionObserver(
          (es) => {
            if (es.some((e) => e.isIntersecting)) {
              build();
              scrollDrive();
              io.disconnect();
            }
          },
          { rootMargin: "60% 0px" },
        );
        io.observe(nsec);
        cleanups.push(() => {
          io.disconnect();
          app?.dispose();
          window.removeEventListener("mousemove", onMouse);
          card1 = null; card2 = null; uni1 = null;
        });
      }
    }

    /* ---- frame loop ---- */
    if (frameFns.length && !reduced) {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
