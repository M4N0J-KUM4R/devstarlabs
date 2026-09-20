/* Community Board threads — the original /community-board shows a
   reverse-chronological wall of thread cards: member (avatar, name,
   role, time), rich text message, attached media, and a collaborate
   row (avatars of engaged members + Join action). Media reuses the
   network's own card faces and portraits. */

export type Thread = {
  id: string;
  author: string;
  role: string;
  time: string;
  message: string[];
  media?: { src: string; alt: string }[];
  engaged?: { name: string; avatar: string }[];
  pinned?: boolean;
};

export const COMMUNITY_MEMBERS = [
  { name: "Manoj Kumar", avatar: "/cards/manoj.png" },
  { name: "Cassandra Zampini", avatar: "/cards/portrait-cassandra.jpg" },
  { name: "Maria Isserlis", avatar: "/cards/portrait-maria.jpg" },
  { name: "Georgina Koutifiari", avatar: "/cards/portrait-georgina.jpg" },
  { name: "Venus Nwaokoro", avatar: "/cards/portrait-venus-nwaokoro.jpg" },
  { name: "Mantas Valentukonis", avatar: "/cards/portrait-mantas-valentukonis.jpg" },
  { name: "Leigh Witherell", avatar: "/cards/portrait-leigh-witherell.jpg" },
  { name: "Robert Banat", avatar: "/cards/portrait-robert-banat.jpg" },
];

export const THREADS: Thread[] = [
  {
    id: "t1",
    author: "DevStar Labs",
    role: "Lab Desk",
    time: "2 hours ago",
    message: [
      "OPEN CALL | BUILD SEASON 2026",
      "Product teams are invited to apply for Build Season — six weeks of scoped delivery with a senior DevStar pod: architecture review, implementation, hardening, handover.",
      "🗓 Cohort starts 16 October 2026 · ⏳ Applications close 11 October 2026 · 🔗 Apply from your Card with one click.",
      "Be seen. Ship real. Join Build Season 2026.",
    ],
    engaged: [COMMUNITY_MEMBERS[0], COMMUNITY_MEMBERS[1], COMMUNITY_MEMBERS[2]],
  },
  {
    id: "t2",
    author: "Venus Nwaokoro",
    role: "Engineer · Lagos",
    time: "5 hours ago",
    message: [
      "My DevStar Card is officially live — portfolio, booking and Support My Practice all in one place.",
      "If you have been looking for a frontend engineer who cares about design systems: the QR code on my card books a review call directly. No forms, no PDFs.",
    ],
    media: [{ src: "/cards/portrait-venus-nwaokoro.jpg", alt: "Venus Nwaokoro" }],
    engaged: [COMMUNITY_MEMBERS[0], COMMUNITY_MEMBERS[4]],
  },
  {
    id: "t3",
    author: "Maria Isserlis",
    role: "Curator · Berlin",
    time: "yesterday",
    message: [
      "Solo exhibition — “What Was … Still Remains,” at Art space DUUJA, Berlin",
      "August 27th – September 18th.",
      "Fond memories of beautiful things and meaningful moments stay with us. Over time they may blur, yet they leave traces that recur in different forms. The exhibition brings together works from several series — Nostalgia, Quid Agatur?, and the recently completed Memory Thistle — in one dialogue about time and what still remains.",
      "Curated with the DevStar Connectory — thank you for the warm intros.",
    ],
    media: [{ src: "/cards/card-2.png", alt: "Exhibition card" }],
    engaged: [COMMUNITY_MEMBERS[2], COMMUNITY_MEMBERS[5]],
  },
  {
    id: "t4",
    author: "DevStar Labs",
    role: "Lab Desk",
    time: "2 days ago",
    message: [
      "Webinar hosted by DevStar Labs and Partners",
      "Could your engineering practice lead to brand or corporate collaboration? Whether you build, consult, or manage teams — this session is for you.",
      "A practical session on approaching companies: finding the right businesses, pitching, pricing, and avoiding the common mistakes that cost you the deal.",
      "📅 16 September · 12 PM CEST · 💻 Online · 45 min. Sign up free from the Community Board.",
    ],
    engaged: [COMMUNITY_MEMBERS[0], COMMUNITY_MEMBERS[3]],
  },
  {
    id: "t5",
    author: "Mantas Valentukonis",
    role: "Cloud Architect · Vilnius",
    time: "3 days ago",
    message: [
      "2026 EDGE INFRASTRUCTURE GRANTS",
      "An incredible opportunity for platform engineers with 2–10 years of practice. Apply for a chance to receive a $5,000 grant supporting a current or new open-source infrastructure project.",
      "Applications are open until August 31, 2026. Follow the link on the Community Board sidebar to apply.",
    ],
    media: [{ src: "/cards/card-5.png", alt: "Infrastructure grant card" }],
    engaged: [COMMUNITY_MEMBERS[5], COMMUNITY_MEMBERS[6]],
  },
  {
    id: "t6",
    author: "Georgina Koutifiari",
    role: "Curator · Athens",
    time: "4 days ago",
    message: [
      "THREE VIEWS, ONE SYSTEM",
      "Three case studies from the same platform — the discovery view, the studio view, and the archive view — exploring how one design system changes perception across contexts.",
      "What interests me is how a simple change of perspective transforms the relationship between the work and its space. From one screen to another, posture, distance and scale change, while the same intimate system remains.",
      "Full write-up on my Card.",
    ],
    media: [
      { src: "/cards/card-3.png", alt: "Case study card 1" },
      { src: "/cards/card-4.png", alt: "Case study card 2" },
    ],
    engaged: [COMMUNITY_MEMBERS[3], COMMUNITY_MEMBERS[1]],
  },
  {
    id: "t7",
    author: "Leigh Witherell",
    role: "Product Designer · Portland",
    time: "5 days ago",
    message: [
      "Welcome to the DevStar Labs YouTube channel 🧡",
      "Hi! I'm Leigh, and I'm Head of Video Production here at DevStar Labs. We've started building a library of videos made specifically for engineers and founders.",
      "What you'll find there:",
      "— Tutorials on setting up and optimizing your DevStar Card",
      "— Tips on presenting technical work and building support from your audience",
      "— Insights from the lab's founders on what clients and collectors of good engineering look for",
      "If you're serious about your practice, it's worth a subscribe. New videos going up regularly.",
    ],
    engaged: [COMMUNITY_MEMBERS[6], COMMUNITY_MEMBERS[0]],
  },
  {
    id: "t8",
    author: "Robert Banat",
    role: "Photographer · Toronto",
    time: "1 week ago",
    message: [
      "Art on receipts",
      "I shoot on receipts.",
      "Not because I find them beautiful, but because I find them incredibly honest. A receipt is a tiny record of our everyday life. It tells us what we bought, where we were, what we needed — and, increasingly, how much it costs simply to live.",
      "I started collecting receipts almost without thinking. Then I began shooting them. The series lives on my Card — scans, prints and the full statement.",
    ],
    media: [{ src: "/cards/card-7.png", alt: "Receipts series card" }],
    engaged: [COMMUNITY_MEMBERS[7], COMMUNITY_MEMBERS[2]],
  },
];

export const INVITE_TEXT =
  "This community grows when you bring people in. Invite a fellow builder or curator to JOIN!";
