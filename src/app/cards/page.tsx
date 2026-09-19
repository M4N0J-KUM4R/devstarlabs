import type { Metadata } from "next";
import CardGallery from "@/components/cards/CardGallery";

export const metadata: Metadata = {
  title: "Card Template",
  robots: { index: false, follow: false },
};

/**
 * Working preview of the reusable card template (Card-1…9 reference
 * layout). Add entries to src/data/cards.ts and they appear here; click
 * a card to export its face as a PNG sized 1400 × 2160.
 */
export default function CardTemplatePage() {
  return (
    <section className="min-h-screen overflow-x-clip bg-black text-white">
      <header className="mx-auto max-w-[1200px] px-6 pt-24">
        <h1 className="text-3xl font-medium">Card template</h1>
        <p className="mt-3 max-w-prose text-white/55">
          Every card is rendered from data in{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">src/data/cards.ts</code>{" "}
          through one shared canvas template. Add an entry to create a new
          card; click a card to download its face as a PNG.
        </p>
      </header>
      <CardGallery />
    </section>
  );
}
