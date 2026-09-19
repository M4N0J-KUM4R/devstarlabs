"use client";

import { useEffect, useRef, useState } from "react";
import {
  CARD_REF_H,
  CARD_REF_W,
  drawCardFace,
  loadCardMedia,
  siteCardFonts,
  type CardData,
  type CardMedia,
} from "@/components/webgl/cardTemplate";

/**
 * Renders one CardData entry through the shared canvas template — the
 * exact same draw call the WebGL scenes use for their textures, so the
 * preview always matches what ships on the 3D card. Rendered at 2× for
 * crispness; size it with CSS (`className` / `style`).
 */
export default function CardFaceCanvas({
  data,
  className,
  style,
  canvasRef,
}: {
  data: CardData;
  className?: string;
  style?: React.CSSProperties;
  /** Escape hatch for PNG export: receives the underlying <canvas>. */
  canvasRef?: (el: HTMLCanvasElement | null) => void;
}) {
  const innerRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState<{ src: string; img: CardMedia } | null>(null);

  useEffect(() => {
    if (!data.media) return;
    let live = true;
    loadCardMedia(data.media)
      .then((img) => live && setLoaded({ src: data.media as string, img }))
      .catch(() => {
        /* keep the placeholder frame */
      });
    return () => {
      live = false;
    };
  }, [data.media]);

  // derived: never show a portrait that belongs to a previous card
  const media = loaded && loaded.src === data.media ? loaded.img : null;

  useEffect(() => {
    const canvas = innerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let live = true;
    // next/font families land asynchronously — wait for them, then draw
    document.fonts.ready.then(() => {
      if (!live) return;
      drawCardFace(ctx, data, { media, ...siteCardFonts() });
    });
    return () => {
      live = false;
    };
  }, [data, media]);

  return (
    <canvas
      ref={(el) => {
        innerRef.current = el;
        canvasRef?.(el);
      }}
      width={CARD_REF_W * 2}
      height={CARD_REF_H * 2}
      role="img"
      aria-label={`${data.name} — ${data.role}, ${data.location}`}
      className={className}
      style={style}
    />
  );
}
