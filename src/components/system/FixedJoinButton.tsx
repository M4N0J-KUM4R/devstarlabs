"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Doodle from "@/components/system/Doodle";
import HoverAccent from "@/components/system/HoverAccent";

/* follow.art's fixed-sign-up-button: a solid ink bar pinned to the
   bottom-right gutter (15vw on desktop, full width minus gutters on
   mobile), "Join" at its bottom-left and the step-next arrow at its
   top-right, sliding off with the header's 1.5s curve once the intro
   scroll is spent. */
export default function FixedJoinButton() {
  /* starts shown — matches the SSR markup (no hydration flip) and the
      first frames before any scroll/resize event has fired */
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const update = () => {
      /* the hero stays pinned for one viewport of scroll — past ~85%
          of it the next sheet starts covering, so the bar bows out */
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setShown(window.scrollY < vh * 0.85);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[var(--page-spacing)] right-[var(--page-spacing)] z-30 w-[calc(100%-var(--page-spacing)*2)] transition-transform duration-[1500ms] [transition-timing-function:cubic-bezier(.55,0,.1,1)] md:w-[15.0685vw] ${
        shown ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <Link
        href="/contact"
        aria-label="Join DevStarLabs — start a project or train with us"
        className="fixed-join-bar isolate flex h-[calc(var(--scale-px)*60)] w-full items-start justify-between bg-[var(--c-ink)] p-[calc(var(--scale-px)*12)] text-[var(--c-paper)] md:h-[calc(var(--scale-px)*80)]"
      >
        <span className="relative self-end font-medium">
          Join
          <span className="sr-only">
            Start a project or train with DevStarLabs
          </span>
          <HoverAccent color="var(--c-orange)" />
        </span>
        <Doodle name="circle-arrow" className="w-[18px] shrink-0" />
      </Link>
    </div>
  );
}
