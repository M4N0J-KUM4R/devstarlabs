/**
 * "DEVSTARLABS" wordmark — laid out the way FOLLOW.ART ships its hero
 * (.intro__title): ONE full-width SVG whose letter paths sit at designed
 * x-positions (real kerning, gap 14 in the 500-unit em), each path carrying
 * its data-scale-y skyline for the cursor deformation. The demo comp's
 * equal-width flex slots are what made the letter spacing look wrong.
 *
 * Mobile mirrors the production trick of a separate stacked artwork
 * (FOLLOW / .ART): here DEVSTAR / LABS share one viewBox, left-aligned,
 * and the per-letter data attributes are omitted so the word stays static
 * (no cursor on touch screens) while the container entrance still plays.
 *
 * Paths come from heroGlyphs.ts; only positions are computed here.
 */
import { HERO_GLYPHS } from "./heroGlyphs";

/** kerning gap between letter ink edges, in viewBox units */
const GAP = 14;
/** vertical gap between the two mobile lines */
const LINE_GAP = 71;

/** ink width of each letter, measured from its path data */
const INK_WIDTH: Record<string, number> = {
  D: 116,
  E: 112,
  V: 144,
  S: 112,
  T: 119,
  A: 146,
  R: 139,
  L: 103,
  B: 124,
};

export interface HeroWordGlyph {
  char: string;
  /** x of the letter's ink edge inside its line */
  x: number;
  scaleY: number;
  paths: string[];
}

export interface HeroWordLine {
  y: number;
  glyphs: HeroWordGlyph[];
}

function layoutLine(from: number, to: number): {
  glyphs: HeroWordGlyph[];
  width: number;
} {
  let x = 0;
  const glyphs = HERO_GLYPHS.slice(from, to).map((glyph) => {
    const placed: HeroWordGlyph = {
      char: glyph.char,
      x,
      scaleY: glyph.scaleY,
      paths: glyph.paths,
    };
    x += (INK_WIDTH[glyph.char] ?? 146) + GAP;
    return placed;
  });
  return { glyphs, width: x - GAP };
}

const desktop = layoutLine(0, HERO_GLYPHS.length);
const mobileTop = layoutLine(0, 7);
const mobileBottom = layoutLine(7, HERO_GLYPHS.length);

export const HERO_WORD = {
  viewBox: `0 0 ${desktop.width} 500`,
  glyphs: desktop.glyphs,
} as const;

export const HERO_WORD_MOBILE = {
  viewBox: `0 0 ${mobileTop.width} ${500 + LINE_GAP + 500}`,
  lines: [
    { y: 0, glyphs: mobileTop.glyphs },
    { y: 500 + LINE_GAP, glyphs: mobileBottom.glyphs },
  ] as HeroWordLine[],
} as const;
