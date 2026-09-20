"use client";

import type { CSSProperties } from "react";
import ThemeSection from "@/components/system/ThemeSection";

interface FeatureCard {
  number: string;
  front: {
    line1: string;
    line2: string;
  };
  back: string;
}

const CARDS: FeatureCard[] = [
  {
    number: "1",
    front: {
      line1: "Professional",
      line2: "presentation",
    },
    back: "Portfolio, biography, experience, links and contacts in one place.",
  },
  {
    number: "2",
    front: {
      line1: "Financial",
      line2: "support",
    },
    back: "Let people financially support your practice, instantly.",
  },
  {
    number: "3",
    front: {
      line1: "Instant",
      line2: "sharing",
    },
    back: "Use a link, QR code or Wallet pass during events and meetings.",
  },
  {
    number: "4",
    front: {
      line1: "Better",
      line2: "discovery",
    },
    back: "Be searchable through Connectory without algorithms or closed circles.",
  },
];

export default function Centralize({
  style,
}: {
  /* the sweep sheet's default -100svh pull is cancelled by the home
     stack composition — the raw section-5's under-next reserve already
     provides the overlap */
  style?: CSSProperties;
}) {
  return (
    <ThemeSection
      theme="sage"
      motion="sweep"
      style={style}
      contentClassName="pb-28 pt-24 md:pt-32"
    >
      <div className="section-4">
        {/* Left Column: Title & Description */}
        <div className="section-4__content">
          <h2 className="section-4__title">
            <span className="section-4__title-word--inline-block">CENTRA</span>
            <span className="section-4__title-word">
              <span className="section-4__title-word--inline-block">LIZE</span>
              <img
                src="/intro/doodle-1.svg"
                alt=""
                className="section-4__title-word-decoration"
                width={84}
                height={80}
              />
            </span>
          </h2>

          <div className="section-4__content-texts">
            <p className="section-4__description">
              <span className="underline-hand">
                No more
              </span>{" "}
              scattered links, PDFs, and half-finished profiles.
              <br />
              <br />
              Have your work together in one clear format.
            </p>
          </div>
        </div>

        {/* Right Column: 3D Flip Feature Cards with Cross Decoration */}
          <div className="section-4__cards-wrapper col-divider">
            <div className="section-4__cards-wrapper-decoration">
              <img src="/intro/cross.svg" alt="" />
            </div>

            <ol className="section-4__cards ui-dark">
              {CARDS.map((card) => (
                <li key={card.number} className="section-4__card">
                  <div className="section-4__card-inner">
                  <div className="section-4__card-front">
                    <span className="text-smaller">{card.number}</span>
                    <p className="text-small">
                      {card.front.line1}
                      <br />
                      {card.front.line2}
                    </p>
                  </div>
                  <div className="section-4__card-back">
                    <span className="text-smaller">{card.number}</span>
                    <p className="text-small">{card.back}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ThemeSection>
  );
}
