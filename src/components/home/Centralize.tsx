"use client";

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
      line1: "Unified",
      line2: "Design System",
    },
    back: "Tokens mapped 1:1 from Figma into Tailwind, React 19, and native mobile components.",
  },
  {
    number: "2",
    front: {
      line1: "Monorepo &",
      line2: "Type-Safe APIs",
    },
    back: "Strictly typed schemas shared across web frontends, microservices, and mobile.",
  },
  {
    number: "3",
    front: {
      line1: "Cloud & GitOps",
      line2: "Infrastructure",
    },
    back: "Multi-region AWS/GCP clusters, Terraform IaC, automated canary rollouts & 99.99% SLA.",
  },
  {
    number: "4",
    front: {
      line1: "Autonomous",
      line2: "AI Pipelines",
    },
    back: "Enterprise LLM agent swarms, vector retrieval, and self-evaluating workflows.",
  },
];

export default function Centralize() {
  return (
    <ThemeSection
      theme="sage"
      motion="sweep"
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
              scattered links, repositories, and fragmented agency teams.
              <br />
              <br />
              Have your entire product ecosystem together in one cohesive, high-performance architecture.
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
