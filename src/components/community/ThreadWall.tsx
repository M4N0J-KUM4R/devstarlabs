"use client";

import { useState } from "react";
import Link from "next/link";
import HoverAccent from "@/components/system/HoverAccent";
import { THREADS } from "@/data/community";

/* Port of the original connectory-explorer-list: reverse-chronological
   thread cards in a two-column masonry, an initial slice, and the
   centered load-more button (original .connectory-explorer-list__load-more). */
export default function ThreadWall() {
  const [shown, setShown] = useState(6);
  const visible = THREADS.slice(0, shown);
  const done = shown >= THREADS.length;

  return (
    <div>
      <div className="columns-1 gap-6 md:columns-2">
        {visible.map((t) => (
          <article key={t.id} className="thread-card motion-card mb-6 break-inside-avoid">
            <header className="flex items-center gap-3">
              {/* avatar: first letter disc (original .community-board-thread-card avatar) */}
              <span
                className="thread-avatar flex items-center justify-center bg-[var(--c-ink)] font-display text-sm uppercase text-[var(--c-paper)]"
                aria-hidden="true"
              >
                {t.author[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--t-heading)]">
                  {t.author}
                </p>
                <p className="text-xs text-[var(--t-muted)]">
                  {t.role} · {t.time}
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-2.5">
              {t.message.map((para, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed ${
                    i === 0
                      ? "text-[15px] font-medium text-[var(--t-heading)]"
                      : "text-[var(--t-text)] opacity-85"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            {t.media && (
              <div className="flex flex-col gap-3">
                {t.media.map((m) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={m.src}
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    className="thread-card__img max-h-[420px] object-cover object-top"
                  />
                ))}
              </div>
            )}

            {t.engaged && (
              <>
                <hr className="thread-card__line" />
                <footer className="flex items-center justify-between gap-3">
                  <div className="flex -space-x-2">
                    {t.engaged.map((m) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={m.name}
                        src={m.avatar}
                        alt={m.name}
                        title={m.name}
                        loading="lazy"
                        className="thread-avatar ring-2 ring-[var(--t-background)]"
                      />
                    ))}
                  </div>
                  <Link
                    href="/signup"
                    className="btn btn--pill btn--solid text-sm normal-case tracking-normal"
                  >
                    <span className="relative z-10">Join in</span>
                    <HoverAccent />
                  </Link>
                </footer>
              </>
            )}
          </article>
        ))}
      </div>

      {!done && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShown(THREADS.length)}
            className="btn btn--pill btn--solid px-8 text-base normal-case tracking-normal"
          >
            <span className="relative z-10">Load more threads</span>
            <HoverAccent />
          </button>
        </div>
      )}
    </div>
  );
}
