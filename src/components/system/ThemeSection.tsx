import type { CSSProperties, ReactNode } from "react";

type Theme = "light" | "dark" | "orange" | "sand" | "sage" | "steel";

/**
 * A full-bleed painted "sheet" — the section unit of the site.
 * One .ui-* class swaps every token inside it.
 * `tilt` overlaps the previous sheet with a slightly rotated edge,
 * the follow.art-style paper-stack transition.
 */
export default function ThemeSection({
  theme,
  tilt,
  tiltRight,
  className = "",
  id,
  style,
  children,
}: {
  theme: Theme;
  tilt?: boolean;
  tiltRight?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const tiltClass = tilt
    ? tiltRight
      ? "sheet--tilt-top-r"
      : "sheet--tilt-top"
    : "";
  return (
    <section
      id={id}
      style={style}
      className={`sheet ui-${theme} ${tiltClass} ${className}`}
    >
      {children}
    </section>
  );
}
