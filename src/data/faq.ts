/* FAQ content for /faq — five groups mirroring the original's
   For Artists / For Curators / Support My Practice / What's Unique /
   Account Management structure, rebranded for DevStar Labs. */

export type FaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "For Builders",
    items: [
      {
        q: "How do I get started with DevStar Labs?",
        a: "Join, create your DevStar Card, and book an intro call. We map your product goals to a plan — sprint, monthly or annual — and match you with a senior pod within a week.",
      },
      {
        q: "What types of teams can join DevStar Labs?",
        a: "Founders, product teams, agencies and in-house engineering groups. If you ship software — web, mobile, cloud or AI — the lab is built for you.",
      },
      {
        q: "Do I need to be a company to join?",
        a: "No. Independent engineers, designers and researchers use DevStar Cards to present their practice, book reviews and receive support. Companies join for delivery pods and training.",
      },
      {
        q: "What is the DevStar Card?",
        a: "A living, shareable profile of your product or practice: portfolio, links, booking, and direct support in one place. One link and one QR code that always stay current.",
      },
      {
        q: "Why should I use the DevStar Card?",
        a: "It replaces scattered PDFs, decks and stale portfolios. Stakeholders get context instantly, and every interaction — scans, visits, support — is tracked for you.",
      },
      {
        q: "Is the DevStar Card free?",
        a: "Yes. The Starter Card is free forever: basic portfolio, link sharing and community access. The Pro Card unlocks full portfolio, QR sharing, Wallet and statistics.",
      },
      {
        q: "What information can I include in my Card?",
        a: "Case studies, architecture diagrams, live demos, repositories, publications, talks, pricing, availability, and any external link — plus your booking calendar.",
      },
      {
        q: "Can I sell products directly through my Card?",
        a: "You can receive direct support and route buyers to your checkout. The Card is not a marketplace — it is the professional front door to whatever you sell.",
      },
      {
        q: "Is my Card a standalone profile or part of a wider platform?",
        a: "Both. Your Card works standalone for clients, and lives inside the DevStar network: the Community Board, the Connectory and partner programs amplify it.",
      },
      {
        q: "How do I make the most out of my Card?",
        a: "Keep one clear case study at the top, refresh it after every ship, print your QR code into decks and event materials, and enable Support so your audience can back your work.",
      },
      {
        q: "What is the Connectory?",
        a: "The Connectory is our professional graph — a guided way to meet peers, reviewers and collaborators matched to your stack, stage and goals.",
      },
      {
        q: "How does the Connectory help me connect?",
        a: "It suggests relevant members, Warm intros replace cold outreach, and every connection starts from a full Card so nobody has to dig for context.",
      },
      {
        q: "How does the Connectory promote my work?",
        a: "Active Cards surface on the Community Board, in the weekly digest and in partner spotlights — no algorithmic feed, just curated professional visibility.",
      },
      {
        q: "How do I reach out to others?",
        a: "Open any Card and use Book a meeting or Get in touch. Messages land directly with the member — no gatekeeping, no spam layer.",
      },
    ],
  },
  {
    title: "For Clients & Partners",
    items: [
      {
        q: "How do I get started as a client?",
        a: "Join and create a client Card describing what you need. You will get a scoped proposal within days, with a fixed price or a retainer — your choice.",
      },
      {
        q: "Who can join as a partner?",
        a: "Studios, consultancies, cloud vendors, investor networks and education programs that want to offer members real opportunities — not ads.",
      },
      {
        q: "Do I need to be 18 to join?",
        a: "Yes. DevStar Labs is a professional network, and our terms require members to be at least 18 years old.",
      },
      {
        q: "What is the DevStar Card for partners?",
        a: "A verified profile of your organization: what you offer members, your reference work, and a direct booking channel — reviewable by the whole network.",
      },
      {
        q: "Why should partners use the DevStar Card?",
        a: "It builds trust before the first call. Members can see exactly who you are, what you ship, and how you have worked with the community.",
      },
      {
        q: "Is the DevStar Card free for partners?",
        a: "The Starter Card is free. Partners who run programs, sponsor challenges or hire through the network typically upgrade to Pro for insights and QR/Wallet sharing.",
      },
      {
        q: "What information can we add to our Card?",
        a: "Services, case studies, stack specializations, program terms, hiring needs, and your team — everything a member needs before reaching out.",
      },
      {
        q: "Is our Card a standalone profile or part of a wider platform?",
        a: "It is part of the platform: partner Cards appear in the Connectory, on the Community Board, and inside matching program pages.",
      },
      {
        q: "How do we make the most out of our Card?",
        a: "Publish one flagship collaboration, keep program terms current, respond to booking requests within 48 hours, and co-host one Community Board thread per quarter.",
      },
      {
        q: "How does the Connectory help partners?",
        a: "It matches your programs to members who fit them — by stack, region and stage — so your outreach list builds itself.",
      },
      {
        q: "How can we connect with talent?",
        a: "Search Cards, filter by specialization, and book intro meetings directly. Every Card shows availability and preferred contact style.",
      },
      {
        q: "Can partners connect with other partners?",
        a: "Yes — co-delivery is common. Joint Cards let two studios present one offer without merging companies.",
      },
    ],
  },
  {
    title: "Support My Practice",
    items: [
      {
        q: "What is Support My Practice?",
        a: "A direct way for your audience to financially back your work from your Card — one-time or recurring, with no platform commission.",
      },
      {
        q: "How does Support My Practice work?",
        a: "Enable it on your Card, share your link or QR, and supporters pay you directly through our payment provider. Everything lands in your account.",
      },
      {
        q: "Does DevStar Labs take a commission?",
        a: "No. 100% of support goes to the member, minus the payment processor's standard fee. Pro membership covers the platform, not a cut of your income.",
      },
      {
        q: "Who is Support My Practice for?",
        a: "Independent engineers, open-source maintainers, researchers and educators whose audience wants to back their work directly.",
      },
      {
        q: "Is Support My Practice only for solo builders?",
        a: "No — teams use it too. A lab, a community project or an open-source collective can enable support on a shared Card.",
      },
    ],
  },
  {
    title: "What's Unique About DevStar Labs",
    items: [
      {
        q: "What is DevStar Labs?",
        a: "A software studio and professional network in one: we build products for clients, and give every engineer and team a Card that works as hard as they do.",
      },
      {
        q: "Why is DevStar Labs better than a website or social media?",
        a: "A website is static and social media is a feed. Your Card is a professional instrument — booking, support, verified work, and a network that matches you with real opportunities.",
      },
      {
        q: "Is DevStar Labs a marketplace?",
        a: "No. We do not list gigs or take a cut of your deals. The lab is infrastructure for presenting, connecting and getting supported.",
      },
      {
        q: "Does DevStar Labs use algorithms to rank users?",
        a: "No ranking games. The Community Board is chronological, the Connectory is criteria-based, and your reach never depends on an opaque feed.",
      },
      {
        q: "Does DevStar Labs have a referral program?",
        a: "Yes — invite fellow builders and earn Pro membership months for each activation. Ambassadors earn annual plans.",
      },
      {
        q: "How does the referral program work?",
        a: "Share your invite link from your Card settings. When your invitee activates a paid plan, you both get credit. There is no cap.",
      },
      {
        q: "What is a DevStar Labs Gift Card?",
        a: "A prepaid year of Pro membership — the practical gift for a builder starting out, graduating, or leveling up. See the Gift Card page.",
      },
      {
        q: "Why is it a good gift for an engineer or founder?",
        a: "It buys a full year of professional visibility: a Pro Card, the Connectory, the Community Board and priority program access.",
      },
      {
        q: "Who can give a Gift Card?",
        a: "Anyone. Members, partners, friends, teams and companies that want to back a builder's next year.",
      },
      {
        q: "How does it work?",
        a: "Buy the Gift Card, and we email activation instructions — to you or directly to the recipient, your choice. The code redeems at signup.",
      },
      {
        q: "Where can I purchase one?",
        a: "On the Pricing and Gift Card pages. For bulk or team orders, write to sales@devstarlabs.dev.",
      },
      {
        q: "How can I become a DevStar Labs Ambassador?",
        a: "Run the Card in your community — meetups, campuses, bootcamps — and apply via the Community Board. Ambassadors get an annual plan and co-branded events.",
      },
      {
        q: "Can DevStar Labs host a workshop in my city or institution?",
        a: "Yes. We run build workshops and Card clinics worldwide — hybrid or on-site. Request one through the Community Board or sales email.",
      },
      {
        q: "Can I invite DevStar Labs to a panel or event?",
        a: "Absolutely. Our engineers speak on product, cloud and applied AI. Send the brief through the Community Board and we will confirm within a week.",
      },
      {
        q: "Can my organisation sponsor DevStar Labs programs or events?",
        a: "Yes — from community challenges to the annual showcase. Partner Cards describe the formats; sales@devstarlabs.dev handles the rest.",
      },
      {
        q: "Can we suggest another type of collaboration?",
        a: "Always. The best programs here started as member proposals. Post your idea on the Community Board or email it directly.",
      },
      {
        q: "Does DevStar Labs offer guidance?",
        a: "Every member gets onboarding guidance, and Pro members can book architecture and career reviews with senior engineers.",
      },
      {
        q: "How do I stay updated?",
        a: "The Community Board, the weekly digest, and our social channels. Pro members also get the delivery and platform newsletter.",
      },
      {
        q: "What are beta features?",
        a: "Experiments we ship early to gather feedback — new Card blocks, Connectory filters, booking tools. They may change or retire.",
      },
      {
        q: "What if I access beta features?",
        a: "You opt in from settings. Beta features are provided as-is, and your feedback goes straight to the team building them.",
      },
    ],
  },
  {
    title: "Account Management and Legal Framework",
    items: [
      {
        q: "Can I change my username later?",
        a: "Usernames are permanent — they are your Card's URL and your identity in the network. Choose the one you want to keep.",
      },
      {
        q: "What happens if my account is inactive?",
        a: "Nothing dramatic. Your Card stays online; after 12 months of inactivity we may archive it, and you can restore it by logging in.",
      },
      {
        q: "What if someone uses a name similar to mine?",
        a: "Usernames are unique, and impersonation is a ban-level violation. Report lookalike Cards to help@devstarlabs.dev and we act within 48 hours.",
      },
      {
        q: "Who owns the content I upload?",
        a: "You do. DevStar Labs claims no rights over your work — you grant us only the license needed to display your Card.",
      },
      {
        q: "Can DevStar Labs feature my work for promotion?",
        a: "Only with your permission. We ask before featuring any Card in digests, showcases or partner spotlights.",
      },
      {
        q: "How do I protect my work?",
        a: "Share what you choose, watermark sensitive material, and use the Connectory's NDA-friendly booking flow for private reviews.",
      },
      {
        q: "Where can I find pricing information?",
        a: "On the Pricing page: the free Starter Card, Pro Card plans, and Gift Cards. No hidden fees, cancel anytime.",
      },
      {
        q: "How much does DevStar Labs PRO cost?",
        a: "Pro starts at $499/mo billed annually, with monthly and weekly options. Delivery pods and training are scoped separately.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Cancel from settings and your plan runs to the end of the period. We do not do retention calls.",
      },
      {
        q: "Do you offer discounts or promo codes?",
        a: "Students, ambassadors and partner communities get codes. Watch the Community Board — that is where they drop.",
      },
      {
        q: "How does DevStar Labs handle my data?",
        a: "Minimal collection, encrypted transport, no advertising data brokers. Details live in the Privacy Policy — written to be read.",
      },
      {
        q: "Does DevStar Labs use my data to rank or promote me through algorithms?",
        a: "No. Your activity powers your own insights — statistics, reach, engagement — never someone else's feed position.",
      },
      {
        q: "What laws govern DevStar Labs?",
        a: "Our terms are governed by the laws of the platform's operating entity, with consumer protections preserved for your local jurisdiction.",
      },
      {
        q: "How will I know about changes to the Terms?",
        a: "Material changes are emailed to every member and posted on the Community Board 14 days before they take effect.",
      },
      {
        q: "Where is DevStar Labs based?",
        a: "The lab operates globally, with engineering pods across 18 countries and a distributed leadership team.",
      },
      {
        q: "Who is behind DevStar Labs?",
        a: "A senior bench of engineers, designers and researchers — meet them on the About page.",
      },
      {
        q: "Email",
        a: "help@devstarlabs.dev for support, sales@devstarlabs.dev for partnerships and delivery. Humans answer both.",
      },
    ],
  },
];
