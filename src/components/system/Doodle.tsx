import type { CSSProperties } from "react";

type DoodleName = "star" | "ring" | "arrow" | "spark" | "squiggle" | "cross";

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
  const viewBox = name === "cross" ? "0 0 96 92" : name === "ring" || name === "arrow" ? "0 0 90 60" : name === "squiggle" ? "0 0 112 32" : "0 0 64 60";
  return (
    <svg
      viewBox={viewBox}
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
