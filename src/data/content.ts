export type Service = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  theme: "orange" | "sand" | "sage" | "steel";
  deliverables: string[];
  stack: string[];
  description: string[];
  metrics?: { label: string; value: string }[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Full-Stack Web" | "Mobile App" | "AI & Automation" | "Cloud & DevOps" | "UI/UX & Design";
  year: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  theme: "orange" | "sand" | "sage" | "steel";
};

export type Program = {
  slug: string;
  title: string;
  cert: string;
  category: "cloud" | "devops" | "development" | "ai-data";
  duration: string;
  format: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  outcome: string;
  modules: string[];
  theme: "orange" | "sand" | "sage" | "steel";
};

export type TeamMember = {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  years: string;
  accent: string;
  email: string;
  photo?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  flag: string;
};

/* ------------------------------------------------------------------ */
/* 5 CORE SERVICE PILLARS                                             */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX & Design Systems",
    short: "Interfaces that feel inevitable",
    tagline: "Research, design tokens, interactive prototypes — design engineered for production.",
    theme: "sage",
    deliverables: [
      "Product discovery & interactive wireframing",
      "Token-driven multi-theme design systems",
      "High-fidelity WebGL & micro-interaction prototypes",
      "Accessibility audits (WCAG 2.2 AAA standard)",
    ],
    stack: ["Figma", "Design Tokens", "Storybook", "Framer Motion", "Tailwind CSS"],
    description: [
      "We design interfaces the way senior software engineers architect systems: starting with solid composable foundations. Every engagement pairs user psychology with a token-driven component architecture your team can deploy without friction.",
      "Our designs are directly tied to measurable conversion outcomes — sub-second interaction feedback, flawless mobile ergonomics, and aesthetic authority.",
    ],
    metrics: [
      { label: "Design-to-Dev Velocity", value: "+300%" },
      { label: "Accessibility Score", value: "100/100" },
    ],
  },
  {
    slug: "full-stack-web-apps",
    title: "Full-Stack Web & Mobile Apps",
    short: "Fast, scalable production software",
    tagline: "Next.js platforms, React Native mobile apps, and high-throughput Node/Go backends.",
    theme: "orange",
    deliverables: [
      "Modern full-stack web applications & SaaS dashboards",
      "Native iOS and Android cross-platform apps",
      "High-throughput REST, GraphQL & tRPC APIs",
      "Real-time state synchronization & WebSocket channels",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "React Native", "Node.js", "Go", "PostgreSQL"],
    description: [
      "We build web and mobile products using the modern frontier stack — strictly typed end-to-end, server-rendered with edge hydration, and optimized for sub-100ms response times.",
      "Every project ships with comprehensive CI/CD, automated integration test suites, and clean documentation so your team owns complete sovereignty over the codebase.",
    ],
    metrics: [
      { label: "Core Web Vitals", value: "Green 99+" },
      { label: "P99 API Latency", value: "< 45ms" },
    ],
  },
  {
    slug: "cloud-hosting-devops",
    title: "Cloud Hosting & Infrastructure",
    short: "Infrastructure that never wakes you up",
    tagline: "Managed cloud architecture, Kubernetes clusters, and zero-surprise uptime.",
    theme: "sand",
    deliverables: [
      "Multi-region AWS & GCP cloud architecture",
      "Automated GitOps CI/CD delivery pipelines",
      "Infrastructure as Code (Terraform & OpenTofu)",
      "24/7 Managed Cloud Hosting & Disaster Recovery",
    ],
    stack: ["AWS", "GCP", "Kubernetes", "Terraform", "Docker", "Cloudflare", "Prometheus"],
    description: [
      "We manage and host high-availability systems with predictable costs. Your infrastructure gets battle-tested architecture reviews, automated scaling policies, and round-the-clock monitoring by engineers who have run live production clusters.",
      "Uptime is non-negotiable. We enforce strict SLOs, automated failovers, and transparent runbooks.",
    ],
    metrics: [
      { label: "Historical Uptime", value: "99.99%" },
      { label: "Cloud Cost Reduction", value: "Avg 35%" },
    ],
  },
  {
    slug: "seo-digital-marketing",
    title: "SEO Optimization & Growth",
    short: "Rank for high-intent buyer queries",
    tagline: "Technical SEO, programmatic architectures, and conversion-rate optimization.",
    theme: "steel",
    deliverables: [
      "Technical Core Web Vitals & crawlability audits",
      "Programmatic SEO architecture & schema markup",
      "High-converting landing page funnels & CRO",
      "Event-driven product analytics & attribution models",
    ],
    stack: ["Schema.org", "Google Search Console", "Ahrefs", "PostHog", "GA4"],
    description: [
      "We practice what we build — high-performance semantic markup, sub-second TTFB, and structured rich snippets that dominate search rankings for high-intent queries.",
      "No fragile shortcuts: we build compounding technical foundations paired with conversion funnels that drive real enterprise leads.",
    ],
    metrics: [
      { label: "Organic Growth", value: "+240% YoY" },
      { label: "PageSpeed Index", value: "0.8s" },
    ],
  },
  {
    slug: "ai-automation-integrations",
    title: "AI Integrations & Automations",
    short: "Autonomous agents & LLMs in production",
    tagline: "RAG pipelines, custom AI agent swarms, and enterprise workflow automations.",
    theme: "orange",
    deliverables: [
      "Autonomous AI agent workflows & tool calling",
      "Production RAG pipelines over enterprise data",
      "Fine-tuned models & multi-modal AI endpoints",
      "Guardrails, eval suites, and token cost optimization",
    ],
    stack: ["OpenAI", "Anthropic Claude", "LangChain", "pgvector", "Vercel AI SDK", "Temporal"],
    description: [
      "The gap between an AI demo and a reliable production product is evaluation, latency, and cost control. We close that gap.",
      "We build resilient AI pipelines where LLMs and autonomous agents automate real business operations — safely, with strict guardrails and evaluation benchmarks.",
    ],
    metrics: [
      { label: "Workflow Efficiency", value: "10× Faster" },
      { label: "Accuracy & Eval Pass", value: "99.2%" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* CASE STUDIES & SHOWCASE PROJECTS                                   */
/* ------------------------------------------------------------------ */

export const PROJECTS: Project[] = [
  {
    slug: "hyperflow-fintech",
    title: "HyperFlow Distributed Settlement",
    client: "Global Capital Network",
    category: "Full-Stack Web",
    year: "2025",
    tagline: "Sub-millisecond global liquidity routing and real-time ledger orchestration.",
    summary:
      "Engineered an ultra-low latency settlement portal handling $40M+ in daily transaction volume with real-time WebSocket telemetry and sub-50ms regional failover.",
    challenge:
      "The client's legacy settlement platform suffered from slow synchronization locks and intermittent database contention during market volatility peaks.",
    solution:
      "Architected an event-driven Go and Next.js platform powered by distributed Redis Streams, partitioned PostgreSQL, and edge-routed WebSockets.",
    impact:
      "Reduced transaction settlement latency by 85% while scaling transaction throughput 12× with zero downtime across 18 global regions.",
    metrics: [
      { label: "Daily Volume", value: "$40M+" },
      { label: "P99 Latency", value: "32ms" },
      { label: "Uptime", value: "99.999%" },
    ],
    stack: ["Next.js", "Go", "PostgreSQL", "Redis Streams", "Kubernetes", "AWS"],
    theme: "orange",
  },
  {
    slug: "cortex-ai-copilot",
    title: "Cortex Enterprise Agent Swarm",
    client: "Nexus Industrial Intelligence",
    category: "AI & Automation",
    year: "2025",
    tagline: "Multi-agent autonomous triage and document intelligence pipeline.",
    summary:
      "Built an autonomous LLM agent swarm that extracts, parses, and cross-verifies complex supply chain contracts and compliance certifications across 50,000 documents weekly.",
    challenge:
      "Manual contract review took 4 business days per compliance tier with an unacceptable human error rate during cross-jurisdictional audits.",
    solution:
      "Deployed a resilient RAG pipeline with custom vector embeddings (pgvector), automated evaluation gates via TypeSafe AI, and human-in-the-loop validation.",
    impact:
      "Cut document review cycle time from 96 hours to under 3 minutes with a verified 99.4% factual extraction accuracy rate.",
    metrics: [
      { label: "Cycle Reduction", value: "98%" },
      { label: "Weekly Docs", value: "50,000+" },
      { label: "Accuracy", value: "99.4%" },
    ],
    stack: ["Anthropic Claude", "OpenAI", "pgvector", "Python", "Temporal", "Next.js"],
    theme: "sand",
  },
  {
    slug: "strata-cloud-platform",
    title: "Strata Cloud Infrastructure",
    client: "AeroTelemetry Global",
    category: "Cloud & DevOps",
    year: "2024",
    tagline: "Automated multi-cloud Kubernetes deployment and disaster recovery suite.",
    summary:
      "Architected a zero-downtime GitOps infrastructure spanning AWS and GCP with automated canary deployments and instant failover capabilities.",
    challenge:
      "Complex microservice deployments caused frequent staging delays and manual configuration drift across developer environments.",
    solution:
      "Implemented modular Terraform IaC, ArgoCD automated GitOps pipelines, and comprehensive Prometheus/Grafana observability clusters.",
    impact:
      "Accelerated deployment frequency from bi-weekly releases to 14 daily production deploys while slashing infrastructure hosting costs by 42%.",
    metrics: [
      { label: "Deploys / Day", value: "14+" },
      { label: "Cloud Cost Saved", value: "42%" },
      { label: "MTTR", value: "< 2 mins" },
    ],
    stack: ["Terraform", "Kubernetes", "AWS", "GCP", "ArgoCD", "Prometheus"],
    theme: "steel",
  },
  {
    slug: "lumina-design-system",
    title: "Lumina Studio Design System",
    client: "Vivid Creator Network",
    category: "UI/UX & Design",
    year: "2024",
    tagline: "Monumental typography, 60 FPS WebGL shaders, and token-driven multi-platform UI.",
    summary:
      "Designed and engineered an award-winning creative portfolio and brand identity studio featuring real-time WebGL card physics and seamless mobile responsiveness.",
    challenge:
      "The client needed a digital presence that would stand out among global creative agencies while maintaining 100/100 Core Web Vitals on mobile.",
    solution:
      "Created a tokenized design system in Figma, translated into custom Three.js shader uniforms and a modular Next.js component suite.",
    impact:
      "Increased user session duration by 340% and earned Awwwards Site of the Day honors with zero layout shift.",
    metrics: [
      { label: "Session Duration", value: "+340%" },
      { label: "Mobile Speed", value: "100/100" },
      { label: "Awards", value: "Awwwards SOTD" },
    ],
    stack: ["Three.js", "WebGL", "Figma", "Next.js", "Tailwind CSS"],
    theme: "sage",
  },
];

/* ------------------------------------------------------------------ */
/* DEDICATED ENGINEERING PROGRAMS & CERTIFICATIONS                     */
/* ------------------------------------------------------------------ */

export const PROGRAMS: Program[] = [
  {
    slug: "aws-cloud-architect",
    title: "AWS Cloud Architecture Track",
    cert: "AWS Solutions Architect Professional",
    category: "cloud",
    duration: "8 weeks",
    format: "Live labs + production clusters",
    level: "Intermediate",
    outcome:
      "Architect and operate resilient, cost-optimized AWS multi-account systems with infrastructure-as-code and Well-Architected rigor.",
    modules: [
      "VPC networking, transit gateways & cross-region peering",
      "Container orchestration: ECS, Fargate & EKS deep-dive",
      "Serverless event pipelines with Lambda & SQS/EventBridge",
      "High-availability relational & NoSQL data architectures",
      "Enterprise IAM governance, KMS encryption & security audits",
      "Cost optimization models & Well-Architected review lab",
      "Real-world production capstone & certification drill",
    ],
    theme: "orange",
  },
  {
    slug: "kubernetes-cka-ckad",
    title: "Kubernetes & Cloud-Native Engineering",
    cert: "CKA / CKAD Certified Kubernetes Engineer",
    category: "devops",
    duration: "6 weeks",
    format: "Hands-on cluster troubleshooting",
    level: "Advanced",
    outcome:
      "Master Kubernetes cluster operations, CNI networking, storage lifecycle, and secure workload deployment on live clusters.",
    modules: [
      "Cluster architecture, kubeadm bootstrap & etcd backups",
      "Workload primitives: Deployments, StatefulSets & DaemonSets",
      "Advanced ingress controllers, CoreDNS & network policies",
      "Persistent storage orchestration (CSI, StorageClasses)",
      "RBAC security policies, service accounts & Pod Security Standards",
      "Live cluster incident triage & node failure recovery",
      "Timed performance exam simulations",
    ],
    theme: "steel",
  },
  {
    slug: "generative-ai-engineering",
    title: "Generative AI & LLM Systems Track",
    cert: "DevStarLabs AI Systems Engineer",
    category: "ai-data",
    duration: "10 weeks",
    format: "Live project build & eval pipelines",
    level: "Intermediate",
    outcome:
      "Build production-grade LLM applications: multi-agent swarms, hybrid vector search (RAG), and automated evaluation suites.",
    modules: [
      "LLM mechanics, token budgets & prompt engineering",
      "Vector embeddings, chunking strategies & pgvector indexing",
      "Autonomous agents, tool calling & MCP integration",
      "Multi-modal generative pipelines (vision, voice, code)",
      "Evaluation benchmarks, guardrails & latency optimization",
      "Fine-tuning vs retrieval-augmented generation trade-offs",
      "Production capstone: deploy autonomous AI copilot",
    ],
    theme: "orange",
  },
  {
    slug: "fullstack-production-react",
    title: "Full-Stack Web & Next.js Professional",
    cert: "DevStarLabs Full-Stack Engineer",
    category: "development",
    duration: "12 weeks",
    format: "Live coding + 4 production capstones",
    level: "Beginner",
    outcome:
      "Design, build, and deploy high-performance web applications using React 19, Next.js 16, TypeScript, and modern database systems.",
    modules: [
      "Modern JavaScript ES2024 & strict TypeScript architecture",
      "React 19 Server Components, Actions & state management",
      "Next.js Turbopack routing, data fetching & SSR/SSG caching",
      "Database schema modeling with PostgreSQL & Prisma",
      "Authentication, payment processing & webhook handling",
      "End-to-end testing with Vitest & Playwright",
      "Capstone: launch and monetize a production SaaS platform",
    ],
    theme: "sage",
  },
  {
    slug: "terraform-iac-devops",
    title: "Terraform & GitOps Pipeline Track",
    cert: "HashiCorp Certified: Terraform Associate",
    category: "devops",
    duration: "4 weeks",
    format: "Hands-on cloud lab environments",
    level: "Intermediate",
    outcome:
      "Write maintainable, modular Infrastructure as Code and automate multi-environment deployments via GitOps workflows.",
    modules: [
      "HCL syntax, providers, resources & dynamic blocks",
      "State management, remote backends & distributed locking",
      "Module architecture, registry publishing & variable hierarchies",
      "CI/CD automation with GitHub Actions & Terraform Cloud",
      "Policy as Code with Sentinel & OPA",
      "Disaster recovery and state drift remediation",
      "Certification exam drill and practical lab test",
    ],
    theme: "sand",
  },
];

/* ------------------------------------------------------------------ */
/* TEAM LEADERSHIP & STAKEHOLDERS                                     */
/* ------------------------------------------------------------------ */

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Manoj Kumar",
    role: "Founder & Principal Architect",
    specialty: "Distributed Systems · Cloud & AI",
    bio: "Leads engineering architecture and client product engagements. 12+ years designing scalable cloud backends and AI systems.",
    years: "12 yrs",
    accent: "#f4793a",
    email: "manoj@devstarlabs.cloud",
  },
  {
    name: "Aiden Vance",
    role: "Head of Product Design",
    specialty: "UI/UX · Design Systems · WebGL",
    bio: "Directs visual hierarchy, brand identity, and interactive 3D interfaces. Former lead designer for global SaaS and fintech platforms.",
    years: "10 yrs",
    accent: "#8498ac",
    email: "aiden@devstarlabs.cloud",
  },
  {
    name: "Siddharth Rao",
    role: "Principal AI Engineer",
    specialty: "LLM Workflows · RAG · Agents",
    bio: "Specializes in multi-agent orchestration, pgvector pipelines, and high-throughput model serving infrastructure.",
    years: "9 yrs",
    accent: "#c5939d",
    email: "siddharth@devstarlabs.cloud",
  },
  {
    name: "Elena Rostova",
    role: "Lead DevOps & Cloud Engineer",
    specialty: "Kubernetes · Terraform · GitOps",
    bio: "Architects high-availability multi-region clusters, automated CI/CD pipelines, and zero-downtime migration protocols.",
    years: "11 yrs",
    accent: "#8e9487",
    email: "elena@devstarlabs.cloud",
  },
  {
    name: "Marcus Chen",
    role: "Staff Full-Stack Engineer",
    specialty: "Next.js · React 19 · Node.js",
    bio: "Focuses on sub-second rendering, edge hydration, and end-to-end type safety across enterprise web and mobile applications.",
    years: "8 yrs",
    accent: "#f4793a",
    email: "marcus@devstarlabs.cloud",
  },
  {
    name: "Amara Okonjo",
    role: "Director of SEO & Growth",
    specialty: "Technical SEO · CRO · Analytics",
    bio: "Drives organic discovery architectures, schema modeling, and high-converting funnel optimization for client platforms.",
    years: "9 yrs",
    accent: "#8498ac",
    email: "amara@devstarlabs.cloud",
  },
];

// Backwards compatibility alias
export const TRAINERS = TEAM_MEMBERS;
export const TRAININGS = PROGRAMS;

/* ------------------------------------------------------------------ */
/* SOCIAL PROOF & STATS                                               */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "DevStarLabs built our enterprise platform on Next.js and cut latency by 75%. Their engineering rigor and communication are the best we have experienced.",
    name: "Ananya Rao",
    role: "CTO, Fintech Capital",
    flag: "🇮🇳",
  },
  {
    quote:
      "They deployed our multi-agent AI triage system in four weeks. It immediately automated 60% of our manual compliance workload with zero hallucination issues.",
    name: "Sofia Marin",
    role: "Head of Product, Nexus",
    flag: "🇪🇸",
  },
  {
    quote:
      "DevStarLabs' Kubernetes and cloud architecture migration was flawless. We now ship 10+ releases a day with 99.999% reliability.",
    name: "Marcus Lee",
    role: "VP of Engineering",
    flag: "🇸🇬",
  },
  {
    quote:
      "The dedicated engineering program leveled up our entire backend team. The hands-on labs reflect real production scenarios.",
    name: "David Okafor",
    role: "Platform Director",
    flag: "🇳🇬",
  },
];

export const STATS = [
  { value: "140+", label: "Platforms & Systems Shipped" },
  { value: "99.99%", label: "Average Infrastructure Uptime" },
  { value: "10×", label: "Client Deployment Velocity" },
  { value: "18", label: "Countries Served" },
];

export const CATEGORY_LABELS: Record<Program["category"], string> = {
  cloud: "Cloud",
  devops: "DevOps",
  development: "Development",
  "ai-data": "AI & Data",
};
