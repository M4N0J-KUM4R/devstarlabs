/* ================================================================== */
/* Reusable profile-card face template                                 */
/*                                                                     */
/* Everything is authored against a 700 × 1080 reference frame (the    */
/* card-1…9 references) and scaled to whatever canvas it is drawn on,  */
/* so a face looks identical as a WebGL texture, a <canvas> preview,   */
/* or an exported PNG. Data lives in src/data/cards.ts.                */
/* ================================================================== */

export const CARD_REF_W = 700;
export const CARD_REF_H = 1080;

/** Anything drawImage() accepts — a loaded <img>, or a <video> for the
    live-portrait variant of the reference cards. */
export type CardMedia = HTMLImageElement | HTMLVideoElement;

export type CardData = {
  /** Wraps automatically; up to three lines before it starts shrinking. */
  name: string;
  role: string;
  /** "US, New York" style — country + city. */
  location: string;
  /** Short bio, rendered as a grey caption under the media window. */
  description?: string | null;
  /** Portrait / video poster. Rendered cover-cropped into the media window. */
  media?: string | null;
  /** Which edge of the photo to keep when cover-cropping a taller/wider
      image into the media window. Default "center"; tall portraits
      usually want "top". */
  mediaFocus?: "top" | "center" | "bottom";
  /** Right-hand pill. Set to null to omit. Default "Contact Me". */
  supportLabel?: string | null;
  /** Coin-sticker colour. Default is the site orange. */
  accent?: string;
  /** Symbol inside the coin sticker. Default "@". */
  coinSymbol?: string;
  /** Bottom-left badge text — small line over big line. Set to null to
      hide the badge. Default { small: "View", big: "Portfolio" }. */
  badge?: { small: string; big: string } | null;
};

export type CardFaceOptions = {
  media?: CardMedia | null;
  /** CSS font families; fall back to grotesque system faces. */
  displayFont?: string;
  bodyFont?: string;
};

/* ---------------- layout constants (reference units) ---------------- */

const M = 40; // page margin
const INK = "#000000";
const WHITE = "#ffffff";
const GREY = "#8b8b8b";
const RULE = "rgba(255,255,255,0.28)";
const NAME_SIZE = 62;
const NAME_LEAD = 73;
const NAME_MAX_LINES = 3;
const META_SIZE = 29;
const ROLE_Y = 378;
const LOCATION_Y = 418;
const PILL_H = 56;
const PILL_TEXT = 26;
const RULE_Y = 460;
const MEDIA = { x: 360, y: 500, w: 300, h: 305 };
const BADGE = { x: M, y: 718, w: 256, h: 82, r: 27 };
const DESCRIPTION = { x: 360, y: 850, w: 300, size: 21, lead: 29, maxLines: 6 };

/* ---------------- helpers ---------------- */

/** Wrap `text`, shrinking the font only if a single word can't fit. */
function wrapName(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  font: string,
): { font: string; lines: string[] } {
  ctx.font = font;
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  let size = NAME_SIZE;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    // a single word wider than the column — shrink until it fits
    ctx.font = font;
    while (size > 34 && ctx.measureText(word).width > maxWidth) {
      size -= 2;
      ctx.font = `${size}px ${font.slice(font.indexOf(" ") + 1)}`;
    }
  }
  if (line) lines.push(line);
  return { font: ctx.font, lines: lines.slice(0, NAME_MAX_LINES) };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** External-link glyph for the showcase badge: box with an arrow out. */
function drawLinkIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx.save();
  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  // open box
  ctx.beginPath();
  ctx.moveTo(x + w * 0.1, y + h * 0.32);
  ctx.lineTo(x + w * 0.1, y + h * 0.9);
  ctx.quadraticCurveTo(x + w * 0.1, y + h, x + w * 0.24, y + h);
  ctx.lineTo(x + w * 0.76, y + h);
  ctx.quadraticCurveTo(x + w * 0.9, y + h, x + w * 0.9, y + h * 0.9);
  ctx.lineTo(x + w * 0.9, y + h * 0.32);
  ctx.stroke();
  // arrow pointing out, top-right
  ctx.beginPath();
  ctx.moveTo(x + w * 0.42, y + h * 0.06);
  ctx.lineTo(x + w * 0.94, y + h * 0.06);
  ctx.moveTo(x + w * 0.94, y + h * 0.06);
  ctx.lineTo(x + w * 0.94, y + h * 0.56);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + w * 0.42, y + h * 0.58);
  ctx.lineTo(x + w * 0.94, y + h * 0.06);
  ctx.stroke();
  ctx.restore();
}

/* ---------------- the face ---------------- */

export function drawCardFace(
  ctx: CanvasRenderingContext2D,
  data: CardData,
  opts: CardFaceOptions = {},
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const s = Math.min(w / CARD_REF_W, h / CARD_REF_H);
  ctx.save();
  ctx.translate((w - CARD_REF_W * s) / 2, (h - CARD_REF_H * s) / 2);
  ctx.scale(s, s);
  const font = (px: number, weight = 400, family = opts.bodyFont ?? "'Heading Now', 'Helvetica Neue', Arial, sans-serif") =>
    `${weight} ${px}px ${family}`;

  // ground
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, CARD_REF_W, CARD_REF_H);

  // name — top left, wraps like the references. The reference face is a
  // normal-width grotesque (Heading Now), not the condensed display face.
  const name = wrapName(ctx, data.name, CARD_REF_W - 2 * M, font(NAME_SIZE, 400));
  ctx.fillStyle = WHITE;
  ctx.font = name.font;
  ctx.textBaseline = "alphabetic";
  name.lines.forEach((line, i) => ctx.fillText(line, M, 88 + i * NAME_LEAD));

  // role + location
  ctx.font = font(META_SIZE);
  ctx.fillStyle = WHITE;
  ctx.fillText(data.role, M, ROLE_Y);
  ctx.fillStyle = GREY;
  ctx.fillText(data.location, M, LOCATION_Y);

  // contact pill + coin sticker
  const label = data.supportLabel === undefined ? "Contact Me" : data.supportLabel;
  if (label) {
    ctx.font = font(PILL_TEXT, 500);
    const pad = 24;
    const pillW = Math.min(ctx.measureText(label).width + pad * 2, CARD_REF_W - 2 * M - 160);
    const pillX = CARD_REF_W - M - pillW;
    const pillY = 362;
    ctx.fillStyle = WHITE;
    roundRect(ctx, pillX, pillY, pillW, PILL_H, 4);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.fillText(label, pillX + pad, pillY + PILL_H / 2 + PILL_TEXT * 0.34);

    const cx = pillX + 2;
    const cy = pillY + 2;
    const r = 21.5;
    ctx.fillStyle = data.accent ?? "#f4793a";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = WHITE;
    ctx.font = font(26, 600);
    const sym = data.coinSymbol ?? "@";
    ctx.fillText(sym, cx - ctx.measureText(sym).width / 2, cy + 9);
  }

  // divider
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(M, RULE_Y);
  ctx.lineTo(CARD_REF_W - M, RULE_Y);
  ctx.stroke();

  // media window — cover-cropped portrait / video frame
  const { x, y, w: mw, h: mh } = MEDIA;
  if (opts.media) {
    const src = opts.media;
    const sw = "videoWidth" in src ? src.videoWidth : src.naturalWidth;
    const sh = "videoHeight" in src ? src.videoHeight : src.naturalHeight;
    if (sw && sh) {
      ctx.save();
      roundRect(ctx, x, y, mw, mh, 2);
      ctx.clip();
      const scale = Math.max(mw / sw, mh / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const focus = data.mediaFocus ?? "center";
      const dy =
        focus === "top" ? y : focus === "bottom" ? y + mh - dh : y + (mh - dh) / 2;
      ctx.drawImage(src, x + (mw - dw) / 2, dy, dw, dh);
      ctx.restore();
    }
  } else {
    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(x, y, mw, mh);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, mw - 1, mh - 1);
  }

  // description — grey caption under the media window
  if (data.description) {
    ctx.font = font(DESCRIPTION.size);
    ctx.fillStyle = GREY;
    let line = "";
    let yy = DESCRIPTION.y + DESCRIPTION.size;
    let lines = 0;
    for (const word of data.description.split(/\s+/)) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > DESCRIPTION.w && line) {
        ctx.fillText(line, DESCRIPTION.x, yy);
        line = word;
        yy += DESCRIPTION.lead;
        if (++lines >= DESCRIPTION.maxLines - 1) break;
      } else {
        line = test;
      }
    }
    if (line && lines < DESCRIPTION.maxLines) ctx.fillText(line, DESCRIPTION.x, yy);
  }

  // showcase badge — bottom left, links out to the portfolio
  const badge = data.badge === undefined ? { small: "View", big: "Portfolio" } : data.badge;
  if (badge) {
    ctx.fillStyle = INK;
    roundRect(ctx, BADGE.x, BADGE.y, BADGE.w, BADGE.h, BADGE.r);
    ctx.fill();
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 2.5;
    roundRect(ctx, BADGE.x, BADGE.y, BADGE.w, BADGE.h, BADGE.r);
    ctx.stroke();
    drawLinkIcon(ctx, BADGE.x + 22, BADGE.y + 22, 44, 38);
    ctx.fillStyle = WHITE;
    ctx.font = font(17);
    ctx.fillText(badge.small, BADGE.x + 82, BADGE.y + 42);
    ctx.font = font(26, 500);
    ctx.fillText(badge.big, BADGE.x + 82, BADGE.y + 70);
  }

  ctx.restore();
}

/* ---------------- asset loading ---------------- */

export function loadCardMedia(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Resolve the hashed next/font families from the CSS variables so the
    canvas matches the site's Hardbop / Heading Now faces. */
export function siteCardFonts(): { displayFont?: string; bodyFont?: string } {
  if (typeof window === "undefined") return {};
  const css = getComputedStyle(document.documentElement);
  const read = (v: string) => css.getPropertyValue(v).trim() || undefined;
  return {
    displayFont: read("--font-hardbop") ? `${read("--font-hardbop")}, 'Arial Narrow', sans-serif` : undefined,
    bodyFont: read("--font-headingnow") ? `${read("--font-headingnow")}, 'Helvetica Neue', Arial, sans-serif` : undefined,
  };
}
