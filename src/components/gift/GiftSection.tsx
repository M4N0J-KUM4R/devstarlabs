import GiftForm from "@/components/gift/GiftForm";
import HoverAccent from "@/components/system/HoverAccent";

/* The original's gift-card-section: sticky title + "what your gift
   unlocks" list on the left, form + partners on the right. Used on
   /gift-card (full height) and inside /pricing (compact). */

const UNLOCKS = [
  "A professional profile that replaces endless PDFs and portfolio websites",
  "Space to present projects, case studies and systems",
  "Access to direct financial support from people who value the work",
  "Links to social media, publications and repositories",
  "Visibility insights and profile statistics",
  "Access to a global network of builders and curators",
];

const PARTNERS = [
  { src: "/gift-partners/artdaily.png", alt: "ArtDaily" },
  { src: "/gift-partners/world-art-news.png", alt: "World Art News" },
  { src: "/gift-partners/all-about-art.png", alt: "All About Art" },
  { src: "/gift-partners/art-plugged.png", alt: "Art Plugged" },
  { src: "/gift-partners/cold.png", alt: "Cold" },
  { src: "/gift-partners/18-83.png", alt: "18-83" },
];

export default function GiftSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* left — sticky title + texts */}
      <div
        className="gift-left flex flex-col"
        style={compact ? undefined : { minHeight: "calc(100svh - var(--scale-px) * 150)" }}
      >
        <div className="relative" style={compact ? undefined : { position: "sticky", top: "calc(var(--scale-px) * 120)" }}>
          <p className="label mb-3 text-[var(--t-muted)]">gift</p>
          <h2 className="font-display text-[clamp(40px,6.4vw,96px)] uppercase leading-[0.9] tracking-tight text-[var(--t-heading)]">
            Gift
            <br />
            Card
          </h2>
          <span
            className="deco-mask title-deco"
            style={
              {
                "--deco-url": "url(/decos/flower.min.svg)",
                width: "clamp(48px,5vw,76px)",
                height: "clamp(42px,4.4vw,66px)",
                color: "var(--c-orange)",
              } as React.CSSProperties
            }
          />
          <h3 className="mt-8 max-w-md text-2xl font-normal leading-snug text-[var(--t-heading)]">
            Give your favorite builder or curator a full year of professional
            visibility.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--t-text)] opacity-80">
            DevStar Labs is a global network where builders and curators
            present their work, connect professionally and receive direct
            support from their audience.
          </p>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.08em] text-[var(--t-heading)]">
            What your gift unlocks:
          </p>
          <ul className="advantage-list mt-3 flex flex-col">
            {UNLOCKS.map((u) => (
              <li key={u} className="row-line flex items-start gap-3 py-2.5 text-sm leading-snug text-[var(--t-text)] opacity-85">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0"
                  style={{ background: "var(--c-orange)" }}
                  aria-hidden="true"
                />
                {u}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--t-text)] opacity-70">
            A thoughtful, practical gift for emerging engineers, curators,
            recent graduates or anyone building their professional presence.
            After purchase, we&apos;ll send activation instructions by email —
            either directly to the recipient or to you.
          </p>
        </div>
      </div>

      {/* right — form + partners */}
      <div className="flex flex-col justify-center gap-8">
        <GiftForm />
        <div>
          <p className="label mb-3 text-[var(--t-muted)]">Media outlets and partners</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-80">
            {PARTNERS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className="h-8 w-auto"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <a
          href="mailto:sales@devstarlabs.dev"
          className="btn btn--link w-fit text-sm normal-case tracking-normal"
        >
          <span className="relative z-10">Bulk or team orders — sales@devstarlabs.dev</span>
          <HoverAccent />
        </a>
      </div>

      <style>{`
        @media (max-width: 979px) {
          .gift-left > div { position: static !important; }
        }
      `}</style>
    </div>
  );
}
