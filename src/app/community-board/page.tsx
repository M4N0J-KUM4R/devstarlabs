import type { Metadata } from "next";
import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import HoverAccent from "@/components/system/HoverAccent";
import ThreadWall from "@/components/community/ThreadWall";
import { THREADS } from "@/data/community";

export const metadata: Metadata = {
  title: "Community Board — Open Calls & Opportunities",
  description:
    "The DevStar Labs Community Board: open calls, build seasons, exhibitions, grants and threads from builders and curators across the network.",
  alternates: { canonical: "/community-board" },
};

export default function CommunityBoardPage() {
  return (
    <>
      {/* board — sage sheet (the original's ui-green page) */}
      <ThemeSection
        theme="sage"
        className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-6)]"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="relative">
            <p className="label mb-3 text-[var(--t-muted)]">1]</p>
            <h1 className="font-display text-[clamp(44px,7.4vw,110px)] uppercase leading-[0.9] tracking-tight text-[var(--t-heading)]">
              Community
              <br />
              Board
            </h1>
          </div>
          <p className="label text-[var(--t-muted)]">
            {THREADS.length} Threads
          </p>
        </div>

        {/* invite strip — the original's banner above the wall */}
        <p className="frame-line motion-card mb-8 flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-[15px] text-[var(--t-heading)]">
          <span>
            This community grows when you bring people in. Invite a fellow
            builder or curator to{" "}
            <Link href="/signup" className="inline underline underline-offset-4">
              JOIN!
            </Link>
          </span>
          <Link
            href="/signup"
            className="btn btn--pill btn--solid text-sm normal-case tracking-normal"
          >
            <span className="relative z-10">Invite</span>
            <HoverAccent />
          </Link>
        </p>

        <ThreadWall />
      </ThemeSection>

      {/* join band — orange (the original's orange tail sheet) */}
      <ThemeSection theme="orange" motion="sweep" contentClassName="pb-[var(--sp-7)] pt-[var(--sp-6)]">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <h2 className="font-display text-[clamp(44px,9vw,150px)] uppercase leading-[0.85] tracking-tight text-[var(--t-heading)]">
            Join
            <br />
            Us
          </h2>
          <div className="max-w-md">
            <p className="text-lg leading-snug text-[var(--t-text)]">
              Post your open call, show your build, find your collaborators —
              the Board is where the network meets.
            </p>
            <Link
              href="/signup"
              className="btn btn--pill btn--solid mt-6 justify-between text-base normal-case tracking-normal"
            >
              <span className="relative z-10">Join</span>
              <HoverAccent />
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="11" />
                <path d="M8 12h7m0 0-3-3m3 3-3 3" />
              </svg>
            </Link>
          </div>
        </div>
      </ThemeSection>
    </>
  );
}
