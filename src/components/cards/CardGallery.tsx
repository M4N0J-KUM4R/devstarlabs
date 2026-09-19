"use client";

import { useRef } from "react";
import CardFaceCanvas from "@/components/cards/CardFaceCanvas";
import { CARDS } from "@/data/cards";

/** Gallery + per-card PNG export — click a card to download its face. */
export default function CardGallery() {
  const canvases = useRef<Record<string, HTMLCanvasElement | null>>({});

  function download(slug: string) {
    const canvas = canvases.current[slug];
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${slug}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  }

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-6 py-24 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => (
        <figure key={card.slug} className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => download(card.slug)}
            title="Download PNG"
            className="block w-full max-w-[300px] cursor-pointer rounded-sm shadow-[0_24px_60px_rgba(0,0,0,.5)] transition-transform duration-300 hover:-translate-y-1"
          >
            <CardFaceCanvas
              data={card}
              className="block h-auto w-full rounded-sm"
              canvasRef={(el) => {
                canvases.current[card.slug] = el;
              }}
            />
          </button>
          <figcaption className="text-center text-sm text-white/50">
            {card.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
