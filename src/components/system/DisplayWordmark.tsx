/**
 * Monumental display wordmark — the type-as-architecture element.
 * `crop` bleeds it past the section edges; `align` mirrors editorial layouts.
 */
export default function DisplayWordmark({
  children,
  size = "xl",
  crop = false,
  align = "left",
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  size?: "hero" | "xl" | "lg" | "md";
  crop?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  as?: "h1" | "h2" | "p" | "div";
}) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";
  return (
    <Tag
      className={`display-${size} text-[var(--t-heading)] ${crop ? "display-crop" : ""} ${alignClass} ${className}`}
      style={{ overflowX: "clip" }}
    >
      {children}
    </Tag>
  );
}
