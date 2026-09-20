"use client";

import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import TestimonialCarousel from "@/components/webgl/TestimonialCarousel";

/**
 * "Said about" — the WebGL review rail. Eight review cards ride a
 * bent-cylinder track (the follow.art Landing9 construction): drag
 * with inertia, snap to the nearest card, or step with the Prev/Next
 * buttons. All the WebGL lives in TestimonialCarousel.
 */
export default function Testimonials() {
  return (
    <ThemeSection theme="steel" motion="sweep" contentClassName="overflow-hidden pb-24 pt-28">
      <div className="relative select-none" aria-hidden="true">
        <p className="display-xl display-crop text-[var(--t-heading)] opacity-90">
          Said about
        </p>
      </div>
      <h2 className="sr-only">Testimonials</h2>
      <Doodle
        name="ring"
        className="pointer-events-none absolute left-[6%] top-24 w-28 text-[var(--c-paper)]"
        rotate={-8}
      />

      <TestimonialCarousel />
    </ThemeSection>
  );
}
