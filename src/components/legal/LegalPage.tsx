import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";

/* The original's TextPage: a two-column split where the title column is
   sticky on the RIGHT with a 1px divider between the columns, and the
   content column scrolls. `updated` and `contact` sit at the bottom of
   the sticky title block, like the original's meta line. */
export type LegalSection = { heading: string; paras: string[]; list?: string[] };

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <ThemeSection
      theme="light"
      className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-7)]"
    >
      <div className="grid gap-[var(--page-spacing)] lg:grid-cols-2">
        {/* content — left column */}
        <div className="text-page-content order-2 lg:order-1 lg:pr-[var(--sp-5)]">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paras.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-[var(--t-text)] opacity-90">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li} className="text-[15px] leading-relaxed text-[var(--t-text)] opacity-90">
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* sticky title — right column */}
        <div className="order-1 lg:order-2 lg:pl-[var(--sp-5)]">
          <div className="text-page-title">
            <h1 className="font-display text-[clamp(40px,4.6vw,68px)] uppercase leading-[0.92] tracking-tight text-[var(--t-heading)]">
              {title}
            </h1>
            <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
              <p className="label text-[var(--t-muted)]">Updated {updated}</p>
              <Link
                href="/community-board"
                className="btn btn--link text-sm normal-case tracking-normal"
              >
                <span className="relative z-10">Questions — Community Board</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeSection>
  );
}
