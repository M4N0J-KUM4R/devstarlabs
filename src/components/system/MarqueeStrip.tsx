import type { ReactNode } from "react";

/**
 * Infinite CSS marquee — duplicated track, linear loop,
 * pauses on hover, disabled under reduced motion (see globals.css).
 */
export default function MarqueeStrip({
  items,
  period = 36,
  className = "",
  itemClassName = "",
}: {
  items: ReactNode[];
  period?: number;
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ ["--marquee-period" as string]: `${period}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`shrink-0 ${itemClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
