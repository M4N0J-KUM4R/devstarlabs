/* Card-plan data for /our-product and /pricing, rebranded from the
   original's Weekly/Annual/Monthly FOLLOW.ART Card plans to DevStar
   Card engineering plans. Panel order matches the original: Sprint
   (light) — Annual (dark, center) — Monthly (light). */

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  bestWhen: string;
  features: string[];
  price: number;
  per: string;
  unit: string;
  annualNote?: string;
};

export const PLANS: Plan[] = [
  {
    id: "sprint",
    name: "Sprint plan",
    tagline: "For launch windows, hackathons and short build events.",
    bestWhen:
      "Best when you need to turn event momentum into working software before people leave the room.",
    features: [
      "Ship a scoped feature or MVP in one focused week",
      "Share one clear build link with stakeholders",
      "Give attendees instant access to live demos",
      "Senior engineer on call for the whole sprint",
      "Use it for one event without a long-term commitment",
    ],
    price: 599,
    per: "per week",
    unit: "/ week",
  },
  {
    id: "annual",
    name: "Annual plan",
    tagline: "Best value for year-round product and platform work.",
    bestWhen:
      "Best when you want one reliable partner for architecture, delivery and upskilling throughout the year.",
    features: [
      "Receive 550+ engineering hours on average per year",
      "Present your roadmap, systems and docs in one place",
      "Keep one stable delivery cadence all year",
      "Give your team one clear channel to request and track work",
      "Access dedicated cloud, DevOps and AI capacity on demand",
      "Use your credits across sprints, audits, trainings and reviews",
      "Track delivery, uptime and team progress in the client portal",
      "Get the best value and lowest proportional rate we offer",
    ],
    price: 5988,
    per: "per year",
    unit: "/ year",
    annualNote: "$499 / mo. billed annually",
  },
  {
    id: "monthly",
    name: "Monthly plan",
    tagline: "For longer projects, migrations and active growth periods.",
    bestWhen:
      "Best when your product needs dedicated visibility, delivery and tracking beyond a single launch.",
    features: [
      "Receive 150+ engineering hours on average per month",
      "Keep all project scope, systems and contacts in one place",
      "Use your build board across specs, reviews and standups",
      "Update scope easily as the product grows",
      "Track delivery, deployments and team activity",
      "Embed your build status anywhere stakeholders look",
    ],
    price: 1199,
    per: "per month",
    unit: "/ mo.",
  },
];

/* Pricing page — Pro vs Starter feature matrix, original layout:
   two frames (Pro upgraded = ink frame, Starter free = hairline),
   grouped rows with disabled (dimmed) rows for the free tier. */
export type PlanRow = { label: string; free: boolean };
export type PlanGroup = { title: string; rows: PlanRow[] };

export const PRO_GROUPS: PlanGroup[] = [
  {
    title: "Presentation",
    rows: [
      { label: "Full portfolio", free: false },
      { label: "Extended links", free: false },
    ],
  },
  {
    title: "Sharing",
    rows: [
      { label: "Link sharing", free: true },
      { label: "QR sharing", free: false },
      { label: "Add to Wallet", free: false },
    ],
  },
  {
    title: "Connections",
    rows: [
      { label: "Connectory", free: true },
      { label: "Community Board", free: true },
      { label: "Book a studio visit / meeting", free: true },
    ],
  },
  {
    title: "Support",
    rows: [{ label: "Support My Practice", free: true }],
  },
  {
    title: "Insights",
    rows: [{ label: "Card statistics", free: false }],
  },
];

export const PERIODS = [
  { id: "annual", label: "Annual", price: 499, per: "/ mo.", note: "$5,988 per year" },
  { id: "monthly", label: "Monthly", price: 549, per: "/ mo.", note: "$549 per month" },
  { id: "weekly", label: "Weekly", price: 149, per: "/ wk.", note: "$149 per week" },
] as const;

/* rotating "less than" comparisons — the original's playful counter */
export const COMPARISONS = [
  "one standing desk mat",
  "a team lunch",
  "one CI-hours overage bill",
  "a conference parking day",
];
