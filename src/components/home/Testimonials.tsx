"use client";

import TestimonialCarousel from "@/components/webgl/TestimonialCarousel";
import { S9_HEAD_HTML } from "@/components/sections/rawSections";

/* follow.art section-9 (Testimonials) in its original Section/Sticky
   scaffold — the wordart header is the reference markup, the cards are
   the repo's ported WebGL review carousel (drag + inertia + snap, the
   Landing9 construction). The layer pins by its bottom edge while the
   next sheet sweeps over it (data-sticky-bottom, engine-driven). */
export default function Testimonials() {
  return (
    <section
      className="landing-section ui-blue"
      data-page-header-theme="blue"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section section--under-next">
        <div
          className="section__layer section__layer--sticky ui-background"
          data-sticky-bottom
        >
          <div className="section-9 pb-1 pt-promo-header">
            {/* display:contents — the reference has the description <p>
                and the header <div> as DIRECT flex children of
                .section-9 (justify-content:space-between + the
                description's col--last:md order:1 put the wordmark on
                top and "Our Members Say" at the bottom); a plain
                wrapper div would swallow them out of the flex layout */}
            <div
              style={{ display: "contents" }}
              dangerouslySetInnerHTML={{ __html: S9_HEAD_HTML }}
            />
            <div className="section-9__cards">
              <TestimonialCarousel />
            </div>
            <div
              className="fixed-sign-up-button-stub mt-3 is-hidden:md-up"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
