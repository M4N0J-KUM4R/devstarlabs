import Link from "next/link";
import type { ReactNode } from "react";
import HoverAccent from "@/components/system/HoverAccent";

/**
 * The site button — follow.art's .btn system: on hover a hand-drawn
 * marker scribble snaps out behind the label (CSS only in
 * .btn__hover-accent), rendered as a link when `href` is present.
 */
export default function FillButton({
  href,
  onClick,
  type = "button",
  variant = "solid",
  block = false,
  disabled = false,
  className = "",
  children,
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
  block?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `btn btn--accent ${variant === "outline" ? "btn--outline" : "btn--pill"} ${
    block ? "btn--block" : ""
  } ${className}`;

  const inner = (
    <>
      {children}
      <HoverAccent />
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
