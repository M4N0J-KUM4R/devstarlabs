"use client";

import { useEffect, useRef } from "react";
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  Curve,
  DataTexture,
  DataUtils,
  DoubleSide,
  HalfFloatType,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  PlaneGeometry,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  SRGBColorSpace,
  SkinnedMesh,
  Vector3,
  WebGLRenderer,
} from "three";
import { CARDS } from "@/data/cards";
import {
  CARD_REF_H,
  CARD_REF_W,
  drawCardFace,
  loadCardMedia,
  siteCardFonts,
  type CardData,
} from "@/components/webgl/cardTemplate";

/* =====================================================================
   Hero card carousel — a port of follow.art's "Landing1IntroWebGl"
   (three.js Flow spine-bend). The card planes ride a horizontal ring
   (r=15) while the camera carries a cursor-driven tilt. Two stacked
   canvases create the depth trick around the DOM wordmark:

     - FRONT canvas (z-index 2, over the word): the TEXTURED cards,
       camera far = 69 -> only the near half of the ring renders.
     - BACK canvas (z-index -1, under the word): the same cards with
       a flat accent material, camera near = 69 / far = 200 -> the far
       half slides behind the title.

   Card faces are drawn at runtime by the shared template
   (components/webgl/cardTemplate.ts) from the entries in
   data/cards.ts — add an entry there and it rides the ring.

   Both cameras: fov 28 (contain-fitted), position (0,-14,-70),
   rotation (-192deg, 0, -25deg). Path speed: dt * -5e-5 -> ~20s per
   revolution. Motion constants were runtime-probed against the live
   site, not guessed.
   ===================================================================== */

/* ---------------- Flow (official three.js example, as bundled) -------- */
const ROWS = 4;
const WIDTH = 1024;

type FlowUniforms = {
  spineTexture: { value: DataTexture };
  pathOffset: { value: number };
  pathSegment: { value: number };
  spineOffset: { value: number };
  spineLength: { value: number };
  flow: { value: number };
};

function createSplineTexture(n = 1) {
  const data = new Uint16Array(WIDTH * ROWS * n * ROWS);
  const tex = new DataTexture(data, WIDTH, ROWS * n, RGBAFormat, HalfFloatType);
  tex.wrapS = tex.wrapT = ClampToEdgeWrapping;
  tex.magFilter = tex.minFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function writeSample(
  tex: DataTexture,
  i: number,
  x: number,
  y: number,
  z: number,
  row: number,
) {
  const { data } = tex.image as { data: Uint16Array };
  const off = ROWS * WIDTH * row;
  data[i * ROWS + off + 0] = DataUtils.toHalfFloat(x);
  data[i * ROWS + off + 1] = DataUtils.toHalfFloat(y);
  data[i * ROWS + off + 2] = DataUtils.toHalfFloat(z);
  data[i * ROWS + off + 3] = DataUtils.toHalfFloat(1);
}

function writeCurve(tex: DataTexture, curve: Curve<Vector3>, ci = 0) {
  const count = Math.floor(WIDTH * (ROWS / 4));
  curve.arcLengthDivisions = count / 2;
  curve.updateArcLengths();
  const pts = curve.getSpacedPoints(count);
  const frames = curve.computeFrenetFrames(count, true);
  for (let a = 0; a < count; a++) {
    const seg = Math.floor(a / WIDTH);
    const col = a % WIDTH;
    let p = pts[a];
    writeSample(tex, col, p.x, p.y, p.z, 0 + seg + ROWS * ci);
    p = frames.tangents[a];
    writeSample(tex, col, p.x, p.y, p.z, 1 + seg + ROWS * ci);
    p = frames.normals[a];
    writeSample(tex, col, p.x, p.y, p.z, 2 + seg + ROWS * ci);
    p = frames.binormals[a];
    writeSample(tex, col, p.x, p.y, p.z, 3 + seg + ROWS * ci);
  }
  tex.needsUpdate = true;
}

function flowUniforms(tex: DataTexture): FlowUniforms {
  return {
    spineTexture: { value: tex },
    pathOffset: { value: 0 },
    pathSegment: { value: 1 },
    spineOffset: { value: 161 },
    spineLength: { value: 400 },
    flow: { value: 1 },
  };
}

function patchFlow(mat: MeshBasicMaterial, uni: FlowUniforms, e = 1) {
  if ((mat as MeshBasicMaterial & { __ok?: boolean }).__ok) return;
  (mat as MeshBasicMaterial & { __ok?: boolean }).__ok = true;
  mat.onBeforeCompile = (shader) => {
    if ((shader as typeof shader & { __modified?: boolean }).__modified) return;
    (shader as typeof shader & { __modified?: boolean }).__modified = true;
    Object.assign(shader.uniforms, uni);
    const vs = `
            uniform sampler2D spineTexture;
            uniform float pathOffset;
            uniform float pathSegment;
            uniform float spineOffset;
            uniform float spineLength;
            uniform int flow;

            float textureLayers = ${ROWS * e}.;
            float textureStacks = ${ROWS / 4}.;

            ${shader.vertexShader}
            `
      .replace("#include <beginnormal_vertex>", "")
      .replace("#include <defaultnormal_vertex>", "")
      .replace("#include <begin_vertex>", "")
      .replace(
        /void\s*main\s*\(\)\s*\{/,
        `
void main() {
#include <beginnormal_vertex>

vec4 worldPos = modelMatrix * vec4(position, 1.);

bool bend = flow > 0;
float xWeight = bend ? 0. : 1.;

#ifdef USE_INSTANCING
float pathOffsetFromInstanceMatrix = instanceMatrix[3][2];
float spineLengthFromInstanceMatrix = instanceMatrix[3][0];
float spinePortion = bend ? (worldPos.x + spineOffset) / spineLengthFromInstanceMatrix : 0.;
float mt = (spinePortion * pathSegment + pathOffset + pathOffsetFromInstanceMatrix)*textureStacks;
#else
float spinePortion = bend ? (worldPos.x + spineOffset) / spineLength : 0.;
float mt = (spinePortion * pathSegment + pathOffset)*textureStacks;
#endif

mt = mod(mt, textureStacks);
float rowOffset = floor(mt);

#ifdef USE_INSTANCING
rowOffset += instanceMatrix[3][1] * ${ROWS}.;
#endif

vec3 spinePos = texture2D(spineTexture, vec2(mt, (0. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 a =        texture2D(spineTexture, vec2(mt, (1. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 b =        texture2D(spineTexture, vec2(mt, (2. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 c =        texture2D(spineTexture, vec2(mt, (3. + rowOffset + 0.5) / textureLayers)).xyz;
mat3 basis = mat3(a, b, c);

vec3 transformed = basis
        * vec3(worldPos.x * xWeight, worldPos.y * 1., worldPos.z * 1.)
        + spinePos;

vec3 transformedNormal = normalMatrix * (basis * objectNormal);
                        `,
      )
      .replace(
        "#include <project_vertex>",
        `vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
                                gl_Position = projectionMatrix * mvPosition;`,
      );
    shader.vertexShader = vs;
  };
}

class Flow {
  curveArray: (Curve<Vector3> | undefined)[];
  curveLengthArray: number[];
  object3D: Mesh;
  splineTexture: DataTexture;
  uniforms: FlowUniforms;

  constructor(mesh: Mesh, n = 1) {
    const obj = mesh.clone();
    const tex = createSplineTexture(n);
    const uni = flowUniforms(tex);
    obj.traverse((o) => {
      if (o instanceof Mesh || o instanceof SkinnedMesh) {
        if (Array.isArray(o.material)) {
          const arr = [];
          for (const m of o.material) {
            if (m instanceof MeshBasicMaterial) {
              /* each Flow binds its OWN uniforms — a material shared
                 between flows would stack every mesh on one ring slot */
              const c = m.clone();
              patchFlow(c, uni, n);
              arr.push(c);
            }
          }
          o.material = arr;
        } else if (o.material instanceof MeshBasicMaterial) {
          o.material = o.material.clone();
          patchFlow(o.material, uni);
        }
      }
    });
    this.curveArray = new Array(n);
    this.curveLengthArray = new Array(n);
    this.object3D = obj as Mesh;
    this.splineTexture = tex;
    this.uniforms = uni;
  }

  updateCurve(i: number, curve: Curve<Vector3>) {
    if (i >= this.curveArray.length) throw Error("Flow: Index out of range.");
    const len = curve.getLength();
    this.uniforms.spineLength.value = len;
    this.curveArray[i] = curve;
    this.curveLengthArray[i] = len;
    writeCurve(this.splineTexture, curve, i);
  }

  moveAlongCurve(t: number) {
    this.uniforms.pathOffset.value += t;
  }
}

/* The ring curve: circle radius 15 in the XZ plane. */
class RingCurve extends Curve<Vector3> {
  options = { scale: 15 };
  /* three's types mark Curve's constructor protected */
  constructor() {
    super();
  }
  getPoint(t: number, target = new Vector3()) {
    const s = this.options.scale;
    return target.set(
      Math.cos(t * Math.PI * 2) * s,
      0,
      Math.sin(t * Math.PI * 2) * s,
    );
  }
}

/* ---------------- the component -------------------------------------- */

type App = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  canvas: HTMLCanvasElement;
};

export default function HeroCardCarousel({ show }: { show: boolean }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dispose: (() => void) | undefined;
    try {
      dispose = build(wrapper, reduceMotion);
    } catch (err) {
      console.warn("hero webgl skipped:", err);
    }
    return () => dispose?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`hero-card-webgl pointer-events-none absolute inset-0 ${
        show ? "hero-card-webgl--show" : ""
      }`}
    />
  );
}

function build(wrapper: HTMLElement, reduceMotion: boolean) {
  /* Their app factory multiplies the configured fov by a contain factor so
     the composition survives aspect changes:
       fov * (max(0, 1.8717948717948718 - aspect) * 0.5 + 1)
     At 1440x900 (aspect 1.6) that is 28 * 1.1359 = 31.8deg effective. */
  const fitFactor = () => {
    const w = Math.max(1, wrapper.clientWidth);
    const h = Math.max(1, wrapper.clientHeight);
    return Math.max(0, 1.8717948717948718 - w / h) * 0.5 + 1;
  };

  function makeApp(opts: { near?: number; far: number }): App {
    const scene = new Scene();
    const w = Math.max(1, wrapper.clientWidth);
    const h = Math.max(1, wrapper.clientHeight);
    const camera = new PerspectiveCamera(
      28 * fitFactor(),
      w / h,
      opts.near ?? 0.1,
      opts.far,
    );
    camera.position.set(0, -14, -70);
    camera.rotation.set(
      (Math.PI / 180) * -192,
      0,
      (Math.PI / 180) * -25,
    );
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(2); /* their factory pins DPR to 2 */
    renderer.setSize(w, h);
    const canvas = renderer.domElement;
    wrapper.appendChild(canvas);
    return { scene, camera, renderer, canvas };
  }

  /* back app first in DOM (canvas z-index -1), front app second */
  const back = makeApp({ near: 69, far: 200 });
  const front = makeApp({ far: 69 });

  const ring = new RingCurve();
  const backMat = new MeshBasicMaterial({
    color: new Color("#B05A2E"),
    side: DoubleSide,
  });
  const frontFlows: Flow[] = [];
  const backFlows: Flow[] = [];
  const frontMats: MeshBasicMaterial[] = [];

  /* The ring always shows at most RING_SLOTS cards. Extra entries wait
     on a bench and baton-pass onto the ring at the edge-on phase. */
  const RING_SLOTS = 9;
  const slotCount = Math.min(CARDS.length, RING_SLOTS);
  /* Exact edge-on phase. Derivation: card center's curve parameter is
     pathOffset + spineOffset/ringLength = pathOffset + 161/94.25 ≈
     pathOffset + 0.708 (mod 1); the camera (z = -70) faces ring point
     t = 0.75, so the front-facing card sits at pathOffset ≈ 0.042 and
     the edge-on points — where the card is perpendicular to the camera
     and a face swap is invisible — are 0.2917 (entering the front pass)
     and 0.7917 (leaving it). Swaps fire at the entering edge. */
  const EDGE_PHASE = 0.2917;

  /* portraits are shared across slots — load each URL once */
  const mediaCache = new Map<string, Promise<HTMLImageElement>>();
  const getMedia = (src: string) => {
    let p = mediaCache.get(src);
    if (!p) {
      p = loadCardMedia(src);
      mediaCache.set(src, p);
    }
    return p;
  };

  type Slot = {
    ctx: CanvasRenderingContext2D;
    tex: CanvasTexture;
    card: CardData;
    /** unwrapped ring phase; a drop in floor(phase - EDGE_PHASE) is the
       edge-on instant where this slot swaps faces */
    phase: number;
    redraw: (card: CardData) => void;
  };
  const slots: Slot[] = [];

  for (let i = 0; i < slotCount; i++) {
    const mat = new MeshBasicMaterial({ side: DoubleSide });

    /* PlaneGeometry(9, 12.6, 10, 1) — a FLAT sheet with 10 width segments
       so the Flow bend shader curves it along the ring (runtime-probed).
       NOT a BoxGeometry — the box's depth becomes an annular slab. */
    const frontMesh = new Mesh(new PlaneGeometry(9, 12.6, 10, 1), mat);
    const backMesh = new Mesh(
      new PlaneGeometry(9, 12.6, 10, 1),
      backMat,
    );

    const ff = new Flow(frontMesh);
    const bf = new Flow(backMesh);
    /* Flow clones the materials — bind the texture to the CLONE that is
       actually in the scene graph, not the prototype material above. */
    const sceneMat = (ff.object3D as Mesh).material as MeshBasicMaterial;
    frontMats.push(sceneMat);

    /* Face drawn by the shared template at 2× (1400×2160). */
    const face = document.createElement("canvas");
    face.width = CARD_REF_W * 2;
    face.height = CARD_REF_H * 2;
    const ctx2d = face.getContext("2d")!;
    const tex = new CanvasTexture(face);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;

    const slot: Slot = {
      ctx: ctx2d,
      tex,
      card: CARDS[i],
      phase: i / slotCount,
      redraw: (card: CardData) => {
        slot.card = card;
        const paint = (media: HTMLImageElement | null) => {
          drawCardFace(slot.ctx, card, { media, ...siteCardFonts() });
          slot.tex.needsUpdate = true;
        };
        paint(null);
        document.fonts.ready.then(() => {
          if (slot.card === card) paint(null);
        });
        if (card.media) {
          getMedia(card.media)
            .then((img) => {
              if (slot.card === card) paint(img);
            })
            .catch(() => {
              /* keep the placeholder frame */
            });
        }
      },
    };
    slots.push(slot);
    slot.redraw(CARDS[i]);
    sceneMat.map = tex;
    sceneMat.needsUpdate = true;

    ff.updateCurve(0, ring);
    bf.updateCurve(0, ring);
    ff.moveAlongCurve(i / slotCount);
    bf.moveAlongCurve(i / slotCount);

    front.scene.add(ff.object3D);
    back.scene.add(bf.object3D);
    frontFlows.push(ff);
    backFlows.push(bf);
  }

  /* more cards than slots: the extra card waits on an off-ring bench.
     The moment a slot reaches the edge-on phase it pulls the benched
     card in and its own card takes the bench — one card changes at a
     time, always at the invisible rotation edge, and the ring never
     shows duplicates. */
  const swapAtEdge = CARDS.length > slotCount;
  let ringMotion = 0;
  let offDeck: CardData | null = swapAtEdge ? CARDS[slotCount] : null;

  /* ---------------- the exact mouse tracker semantics ------------------- */
  let mouseX = 0.5;
  let smoothX = 0.5;
  let touchTimer = 0;
  const setFromClientX = (x: number) => {
    mouseX = x / document.documentElement.clientWidth;
  };
  const onMouseMove = (e: MouseEvent) => setFromClientX(e.clientX);
  const onTouchStart = (e: TouchEvent) => {
    clearTimeout(touchTimer);
    if (e.touches[0]) setFromClientX(e.touches[0].clientX);
  };
  const endTouch = () => {
    clearTimeout(touchTimer);
    touchTimer = window.setTimeout(() => {
      mouseX = 0.5;
    }, 500);
  };
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", endTouch, { passive: true });
  window.addEventListener("touchcancel", endTouch, { passive: true });

  function applyCamera() {
    const mobile = window.matchMedia("(max-width: 567px)").matches;
    const zBase = mobile ? -38 : -25;
    const xBase = mobile ? -200 : -192;
    const rz = (Math.PI / 180) * zBase + (smoothX - 0.5) * 0.2;
    const rx = (Math.PI / 180) * xBase;
    for (const app of [back, front]) {
      app.camera.rotation.z = rz;
      app.camera.rotation.x = rx;
      app.camera.position.x = mobile ? 4 : 0;
      app.camera.position.y = mobile ? -17 : -14;
    }
  }

  const onResize = () => {
    const w = Math.max(1, wrapper.clientWidth);
    const h = Math.max(1, wrapper.clientHeight);
    for (const app of [back, front]) {
      app.camera.aspect = w / h;
      app.camera.fov = 28 * fitFactor(); /* their dp() resize behavior */
      app.camera.updateProjectionMatrix();
      app.renderer.setSize(w, h);
    }
  };
  window.addEventListener("resize", onResize);

  /* ---------------- render loop ----------------------------------------- */
  let last = performance.now() - 16;
  let raf = 0;
  function loop(now: number) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(160, now - last); /* their dt cap */
    last = now;
    if (!reduceMotion) {
      const d = dt * -5e-5; /* their card speed: ~20s per revolution */
      for (const f of frontFlows) f.moveAlongCurve(d);
      for (const f of backFlows) f.moveAlongCurve(d);
      if (swapAtEdge && offDeck) {
        ringMotion += d;
        for (let i = 0; i < slots.length; i++) {
          const s = slots[i];
          const u = i / slotCount + ringMotion;
          /* floor(u - EDGE_PHASE) drops by one each time the slot passes
             the edge-on phase moving backward along the ring */
          if (Math.floor(s.phase - EDGE_PHASE) > Math.floor(u - EDGE_PHASE)) {
            const vacated = s.card;
            s.redraw(offDeck);
            offDeck = vacated;
          }
          s.phase = u;
        }
      }
    }

    /* their uf() lerp: 0.05 per 16ms, snap at 1/2500 */
    const next = smoothX + ((mouseX - smoothX) * 0.05 * dt) / 16;
    smoothX = Math.abs(mouseX - next) < 1 / 2500 ? mouseX : next;
    applyCamera();

    front.renderer.render(front.scene, front.camera);
    back.renderer.render(back.scene, back.camera);
  }
  applyCamera();
  raf = requestAnimationFrame(loop);

  const unload = () => {
    cancelAnimationFrame(raf);
    clearTimeout(touchTimer);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", endTouch);
    window.removeEventListener("touchcancel", endTouch);
    window.removeEventListener("resize", onResize);
    for (const app of [front, back]) {
      app.renderer.dispose();
      app.canvas.remove();
    }
    backMat.dispose();
    for (const m of frontMats) {
      m.map?.dispose();
      m.dispose();
    }
  };
  return unload;
}
