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
  contentClassName = "",
  id,
  style,
  motion,
  children,
}: {
  theme: Theme;
  tilt?: boolean;
  tiltRight?: boolean;
  className?: string;
  /** classes for the sweep variant's .sheet__content (py, clipping) —
      vertical padding must live here, never on the section box */
  contentClassName?: string;
  id?: string;
  style?: CSSProperties;
  /** data-motion hook for PageMotion ("sweep" = the layered tilted sheet) */
  motion?: string;
  children: ReactNode;
}) {
  const tiltClass = tilt
    ? tiltRight
      ? "sheet--tilt-top-r"
      : "sheet--tilt-top"
    : "";

  /* sweep sheets are the reference's stacked-paper construction: a
     transparent section pulled up over the previous sheet's tail, holding
     one in-flow sheet (.sheet__layer) that carries the color AND the
     content together — it scrolls with the page, tilts 15° on entry, and
     pins to the viewport top while the next sheet sweeps in (measured
     off the live reference: sticky top:0, resting rotate 15°). Vertical
     padding belongs on .sheet__content via contentClassName — the
     section box is pure geometry (overlap margin on top, tail spacer
     below); padding there would shift the layer's pin range. */
  if (motion === "sweep") {
    return (
      <section
        id={id}
        style={style}
        data-motion={motion}
        className={`sheet ui-${theme} sheet--sweep ${className}`}
      >
        <div className="sheet__layer">
          <div className={`sheet__content ${contentClassName}`}>{children}</div>
        </div>
        <div className="sheet__tail" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section
      id={id}
      style={style}
      data-motion={motion}
      className={`sheet ui-${theme} ${tiltClass} ${className}`}
    >
      {children}
    </section>
  );
}
