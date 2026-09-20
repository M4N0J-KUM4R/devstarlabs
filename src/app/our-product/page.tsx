import type { Metadata } from "next";
import Link from "next/link";
import ThemeSection from "@/components/system/ThemeSection";
import HoverAccent from "@/components/system/HoverAccent";
import Doodle from "@/components/system/Doodle";
import PlanPanels from "@/components/product/PlanPanels";

export const metadata: Metadata = {
  title: "Our Product — The DevStar Card",
  description:
    "Find your DevStar Card plan: portfolio, booking and direct support in one shareable card. Sprint, Annual and Monthly plans for engineers, curators and teams.",
  alternates: { canonical: "/our-product" },
};

const CARD_USES = [
  {
    place: "Interviews",
    body: "Hand over one link instead of a PDF. Your process, systems and availability are all there when the conversation turns to you.",
  },
  {
    place: "Online",
    body: "Use your Card as the one clear link across your digital presence, making it easy for people to discover your work and support it without searching.",
  },
  {
    place: "Meetings",
    body: "Keep your Card in your Wallet and share it instantly, so people leave the encounter with a clear way to remember you and your work.",
  },
  {
    place: "Follow-ups",
    body: "Give people one place to return to, so a brief encounter can become a follow-up, a collaboration, or a future opportunity.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Set up your Card in minutes",
    body: "Add your practice, portfolio and contacts — the Card renders itself, no builder skills required.",
  },
  {
    n: "02",
    title: "Add it to your Wallet",
    body: "Your Card lives next to your boarding passes: one tap to share, in person or online.",
  },
  {
    n: "03",
    title: "Share it anywhere",
    body: "One QR code and one link that never go stale — decks, posters, profiles, email signatures.",
  },
  {
    n: "04",
    title: "Receive support directly",
    body: "See how people interact with your Card and let it open the door to commissions and support.",
  },
];

export default function OurProductPage() {
  return (
    <>
      {/* 1] hero — orange band, title left / tagline + CTA right */}
      <ThemeSection theme="orange" className="pt-[calc(var(--scale-px)*130)] pb-[var(--sp-6)]">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="relative">
            <p className="label mb-3 text-[var(--t-muted)]">1]</p>
            <h1 className="font-display text-[clamp(48px,8.4vw,124px)] uppercase leading-[0.9] tracking-tight text-[var(--t-heading)]">
              Our
              <br />
              Product
            </h1>
            <span
              className="deco-mask title-deco hidden md:block"
              style={
                {
                  "--deco-url": "url(/decos/star.min.svg)",
                  width: "clamp(40px,4vw,64px)",
                  height: "clamp(42px,4.2vw,68px)",
                  color: "var(--c-paper)",
                } as React.CSSProperties
              }
            />
          </div>
          <div className="max-w-md">
            <p className="text-lg leading-snug text-[var(--t-text)]">
              Always working for you. One scan sends financial support, books
              a visit, and keeps you found.
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

      {/* 2] Find Your Card Plan — pink sheet with the three panels */}
      <ThemeSection theme="sand" className="py-[var(--sp-6)]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="relative">
            <p className="label mb-3 text-[var(--t-muted)]">2]</p>
            <h2 className="font-display text-[clamp(34px,5.4vw,80px)] uppercase leading-[0.92] tracking-tight text-[var(--t-heading)]">
              Find Your Card Plan
            </h2>
            <span
              className="deco-mask title-deco"
              style={
                {
                  "--deco-url": "url(/decos/loop-arrows.min.svg)",
                  width: "clamp(46px,4.6vw,72px)",
                  height: "clamp(32px,3.2vw,50px)",
                  color: "var(--c-ink)",
                } as React.CSSProperties
              }
            />
          </div>
          <p className="max-w-sm text-sm text-[var(--t-text)] opacity-80">
            Choose the right level of support for your ongoing practice.
          </p>
        </div>
        <PlanPanels />
      </ThemeSection>

      {/* 3] Your Card — dark sheet: steps + where the card works */}
      <ThemeSection theme="dark" className="py-[var(--sp-6)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="relative">
            <p className="label mb-3 text-[var(--t-muted)]">3]</p>
            <h2 className="font-display text-[clamp(34px,5.4vw,80px)] uppercase leading-[0.92] tracking-tight text-[var(--t-heading)]">
              Your Card
            </h2>
            <span
              className="deco-mask title-deco"
              style={
                {
                  "--deco-url": "url(/decos/vortex.min.svg)",
                  width: "clamp(44px,4.4vw,68px)",
                  height: "clamp(44px,4.4vw,68px)",
                  color: "var(--c-orange)",
                } as React.CSSProperties
              }
            />
            <div className="mt-8 flex flex-col">
              {STEPS.map((s) => (
                <div key={s.n} className="row-line py-5">
                  <p className="label mb-1 text-[var(--t-muted)]">{s.n}</p>
                  <h3 className="font-display text-xl uppercase tracking-tight text-[var(--t-heading)]">
                    {s.title}
                  </h3>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-[var(--t-text)] opacity-80">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/signup"
              className="btn btn--pill btn--solid mt-6 text-base normal-case tracking-normal"
            >
              <span className="relative z-10">Join</span>
              <HoverAccent />
            </Link>
          </div>

          {/* where the card works — the original's section-6 slides */}
          <div className="flex flex-col">
            <h3 className="font-display text-[clamp(26px,3.4vw,48px)] uppercase leading-[0.95] tracking-tight text-[var(--t-heading)]">
              Where the Card
              <br />
              works for You
            </h3>
            <p className="mt-2 max-w-md text-sm text-[var(--t-text)] opacity-70">
              Built to turn interest into real support.
            </p>
            <div className="mt-6 flex flex-1 flex-col">
              {CARD_USES.map((u, i) => (
                <div
                  key={u.place}
                  className="row-line grid flex-1 grid-cols-[1fr_1.4fr] items-start gap-4 py-5"
                  style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : undefined }}
                >
                  <h4 className="font-display text-lg uppercase tracking-tight text-[var(--c-orange)]">
                    {u.place}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--t-text)] opacity-85">
                    {u.body}
                  </p>
                </div>
              ))}
            </div>
            <Doodle name="curved-arrow" className="mt-4 w-16 self-end text-[var(--t-muted)]" rotate={-12} />
          </div>
        </div>
      </ThemeSection>

      {/* 4] Join band — orange, echoes the landing join-us */}
      <ThemeSection theme="orange" motion="sweep" contentClassName="pb-[var(--sp-7)] pt-[var(--sp-6)]">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <h2 className="font-display text-[clamp(44px,9vw,150px)] uppercase leading-[0.85] tracking-tight text-[var(--t-heading)]">
            Join
            <br />
            Us
          </h2>
          <div className="max-w-md">
            <p className="text-lg leading-snug text-[var(--t-text)]">
              Start with one clear Card you can share wherever your practice
              is seen.
            </p>
            <p className="mt-3 text-sm text-[var(--t-text)] opacity-80">
              Join 4,000+ builders and curators across 100+ countries on
              DevStar Labs for portfolio, contacts, booking, and direct
              financial support in one place.
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
