"use client";

import { useRef, useState } from "react";
import Doodle from "@/components/system/Doodle";

/**
 * The story section's tilted media object — a video that plays in place
 * behind a hand-drawn play chip, exactly the reference's role.
 *
 * Drop a file into /public/video and paste its path below (poster too if
 * you have one); until then it renders the ink placeholder tile.
 */
const VIDEO_SRC = ""; // e.g. "/video/our-story.mp4"
const VIDEO_POSTER = ""; // e.g. "/video/our-story-poster.jpg"

export default function StoryVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v || !VIDEO_SRC) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative -rotate-[15deg] bg-[var(--c-ink)] shadow-2xl">
      <span className="absolute -left-10 -top-8 block w-14 animate-[bob_6s_ease-in-out_infinite] text-[var(--c-paper)]">
        <Doodle name="spark" className="w-full" rotate={-14} />
      </span>
      <video
        ref={ref}
        src={VIDEO_SRC || undefined}
        poster={VIDEO_POSTER || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        className="aspect-[4/3] w-full object-cover"
      />
      {VIDEO_SRC ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[var(--c-ink)] text-xl text-[var(--c-paper)] shadow-[inset_0_0_0_1px_var(--c-paper)] max-md:size-12"
        >
          {playing ? "❚❚" : "▶"}
        </button>
      ) : (
        /* no video wired up yet: a non-interactive slate instead of a
           play button that would do nothing */
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--c-paper)]"
        >
          <span className="font-display text-2xl uppercase tracking-wide opacity-90">
            Our story
          </span>
          <span className="label text-[10px] uppercase tracking-[0.2em] opacity-50">
            Film coming soon
          </span>
        </span>
      )}
    </div>
  );
}
