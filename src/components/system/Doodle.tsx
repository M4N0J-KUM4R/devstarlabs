import type { CSSProperties } from "react";

type DoodleName =
  | "star"
  | "ring"
  | "arrow"
  | "spark"
  | "squiggle"
  | "cross"
  | "slash"
  | "curved-arrow"
  | "circle-arrow";

const PATHS: Record<DoodleName, React.ReactNode> = {
  star: (
    <>
      <path
        d="M32 2 C34 14 36 18 46 20 C36 23 34 27 32 40 C30 27 28 23 18 20 C28 18 30 14 32 2 Z"
        fill="currentColor"
      />
      <path
        d="M54 34 C55 41 57 43 63 44.5 C57 46 55 48 54 55 C53 48 51 46 45 44.5 C51 43 53 41 54 34 Z"
        fill="currentColor"
      />
    </>
  ),
  ring: (
    <path
      d="M46 6 C24 4 7 16 6 29 C5 43 22 54 44 54 C66 55 84 45 85 31 C86 16 68 7 47 7 C40 7 34 8 30 10 M14 18 C10 22 8 26 8 30"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  arrow: (
    <path
      d="M4 8 C30 4 62 10 84 30 M84 30 L66 24 M84 30 L74 14"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  spark: (
    <>
      <path
        d="M12 4 L14 22 M4 13 L22 11"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 26 L35 38 M28 32 L41 31"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  squiggle: (
    <path
      d="M4 20 C14 6 22 6 30 16 C38 26 46 26 56 14 C64 5 72 6 82 16 C90 25 98 25 108 14"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  cross: (
    <>
      <path
        d="M10 8 C40 30 60 48 88 82 M86 10 C60 34 38 52 12 84"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </>
  ),
  /* scratchy marker slash (follow.art intro__title-decoration look) */
  slash: (
    <>
      <path
        d="M6 4 C48 22 108 62 166 118"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 8 C34 20 58 38 78 56"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M46 27 C88 45 138 82 174 121"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 30 C100 50 146 86 180 122"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M55 39 C95 58 140 92 176 127"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  /* small hook arrow curving down (follow.art promo-next look) */
  "curved-arrow": (
    <path
      d="M21 31 L29 21 M21 31 L13 21 M21 31 V21 C21 10.5 13.5 2 2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  /* circle with a right arrow through it (follow.art step-next look) */
  "circle-arrow": (
    <path
      d="M1 9a8 8 0 1 0 16 0 8 8 0 0 0-16 0ZM2.5 9H14M14 9 9.5 4.5M14 9l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

/**
 * Hand-drawn SVG doodle layer — the human counterpoint to the
 * industrial display type. Purely decorative.
 */
export default function Doodle({
  name,
  className = "",
  style,
  rotate = 0,
}: {
  name: DoodleName;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
}) {
  const VIEWBOXES: Record<DoodleName, string> = {
    star: "0 0 64 60",
    spark: "0 0 64 60",
    ring: "0 0 90 60",
    arrow: "0 0 90 60",
    squiggle: "0 0 112 32",
    cross: "0 0 96 92",
    slash: "0 0 220 150",
    "curved-arrow": "0 0 31 33",
    "circle-arrow": "0 0 18 18",
  };
  return (
    <svg
      viewBox={VIEWBOXES[name]}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        ...style,
        transform: rotate ? `rotate(${rotate}deg)` : style?.transform,
      }}
    >
      {PATHS[name]}
    </svg>
  );
}
