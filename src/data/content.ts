export type Service = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  theme: "orange" | "sand" | "sage" | "steel";
  deliverables: string[];
  stack: string[];
  description: string[];
};

export type Training = {
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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  flag: string;
};

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Interfaces that feel inevitable",
    tagline: "Research, design systems, prototypes — design that ships.",
    theme: "sage",
    deliverables: [
      "Product discovery & user research",
      "Wireframes and interactive prototypes",
      "Design systems & component libraries",
      "Usability testing and iteration",
    ],
    stack: ["Figma", "Design tokens", "Storybook", "Maze"],
    description: [
      "We design interfaces the way engineers build systems: on foundations. Every engagement starts with research and ends with a token-driven design system your developers can implement without guessing.",
      "Our design process is measurably tied to product outcomes — activation, retention, task completion — not just aesthetics.",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, scalable web products",
    tagline: "Next.js platforms, marketing sites, and web apps that score green.",
    theme: "orange",
    deliverables: [
      "Marketing sites and landing systems",
      "SaaS platforms and dashboards",
      "E-commerce storefronts",
      "Performance and Core Web Vitals audits",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    description: [
      "We build web products with the same stack the best sites on the internet use — typed end to end, server-rendered by default, and obsessed with Core Web Vitals.",
      "Every project ships with CI, preview environments, and documentation, so your team owns it as much as we do.",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    short: "Native-feel apps, one codebase",
    tagline: "iOS and Android apps built for the store and for scale.",
    theme: "steel",
    deliverables: [
      "Cross-platform mobile apps (React Native / Flutter)",
      "App Store and Play Store launch support",
      "Offline-first data sync",
      "Push notifications and deep links",
    ],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
    description: [
      "One codebase, native feel. We ship apps that pass store review the first time and stay maintainable for years.",
      "From MVP to v5 — we handle architecture, release pipelines, and the unglamorous 20% that makes apps feel finished.",
    ],
  },
  {
    slug: "cloud-hosting",
    title: "Cloud Hosting",
    short: "Infrastructure that never wakes you up",
    tagline: "Managed cloud, tuned costs, zero-surprise uptime.",
    theme: "sand",
    deliverables: [
      "Cloud architecture and migration",
      "Managed hosting and 24/7 monitoring",
      "Cost optimization reviews",
      "Backup, disaster recovery, and runbooks",
    ],
    stack: ["AWS", "GCP", "Azure", "Vercel", "Cloudflare"],
    description: [
      "We host what we build — and what others built. Your infrastructure gets architecture reviews, cost tuning, and on-call engineers who have actually been paged before.",
      "Uptime is a feature. We treat it like one, with SLOs, alerting that matters, and postmortems you can read.",
    ],
  },
  {
    slug: "devops",
    title: "DevOps",
    short: "Ship daily without fear",
    tagline: "CI/CD, Kubernetes, and IaC — delivery pipelines that scale.",
    theme: "sage",
    deliverables: [
      "CI/CD pipeline design and implementation",
      "Kubernetes clusters and GitOps workflows",
      "Infrastructure as Code (Terraform)",
      "Observability: logs, metrics, traces",
    ],
    stack: ["Kubernetes", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus"],
    description: [
      "Deploys should be boring. We build pipelines where 'ship it' means a merged pull request, not a war room.",
      "Everything as code: infrastructure, policies, dashboards. Auditable, reproducible, and handed over with training.",
    ],
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    short: "Rank for what your buyers search",
    tagline: "Technical SEO, content strategy, and measurable organic growth.",
    theme: "steel",
    deliverables: [
      "Technical audits and Core Web Vitals fixes",
      "Keyword and content strategy",
      "Schema markup and structured data",
      "Rank tracking and reporting",
    ],
    stack: ["Search Console", "Ahrefs", "Lighthouse", "Schema.org"],
    description: [
      "We practice what we sell — this site ships with structured data, semantic HTML, and sub-second loads. Your site gets the same treatment.",
      "No black-hat shortcuts: compounding technical foundations plus content that answers real queries.",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    short: "LLMs in production, not in demos",
    tagline: "RAG systems, agents, and AI features your users actually use.",
    theme: "orange",
    deliverables: [
      "AI product strategy and prototyping",
      "RAG pipelines over your data",
      "LLM-powered features and agents",
      "Evaluation, guardrails, and cost control",
    ],
    stack: ["OpenAI", "Anthropic", "LangChain", "pgvector", "Vercel AI SDK"],
    description: [
      "The gap between an AI demo and an AI product is evaluation, latency, and cost. We close it.",
      "We integrate LLMs where they genuinely beat the alternative — and tell you honestly where they don't.",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Demand that compounds",
    tagline: "Paid, lifecycle, and analytics wired to revenue.",
    theme: "sand",
    deliverables: [
      "Performance campaigns (search, social)",
      "Landing pages and CRO experiments",
      "Lifecycle email and automation",
      "Analytics setup and attribution",
    ],
    stack: ["GA4", "Meta Ads", "Google Ads", "HubSpot", "PostHog"],
    description: [
      "Marketing that respects engineering: clean tracking, fast landing pages, experiments with real statistics.",
      "We report in revenue, not impressions.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* TRAININGS                                                           */
/* ------------------------------------------------------------------ */

export const TRAININGS: Training[] = [
  {
    slug: "aws-certification",
    title: "AWS Certification",
    cert: "AWS Solutions Architect / Cloud Practitioner",
    category: "cloud",
    duration: "8 weeks",
    format: "Live online + labs",
    level: "Beginner",
    outcome:
      "Design and operate resilient, cost-efficient AWS infrastructure — and pass the associate-level exam with confidence.",
    modules: [
      "AWS core services and account architecture",
      "VPC networking, security groups, IAM deep-dive",
      "Compute: EC2, containers, Lambda, ECS",
      "Storage and databases: S3, RDS, DynamoDB",
      "High availability and auto-scaling patterns",
      "Cost optimization and Well-Architected reviews",
      "Exam drills and practice scenarios",
    ],
    theme: "orange",
  },
  {
    slug: "terraform-associate",
    title: "Terraform Associate",
    cert: "HashiCorp Certified: Terraform Associate",
    category: "devops",
    duration: "4 weeks",
    format: "Live online + labs",
    level: "Intermediate",
    outcome:
      "Write production-grade infrastructure as code and pass the HashiCorp Terraform Associate exam.",
    modules: [
      "IaC principles and Terraform workflow",
      "HCL: resources, variables, outputs, modules",
      "State management, backends, and locking",
      "Workspaces and multi-environment patterns",
      "Provisioners, functions, and dynamic blocks",
      "Registry modules and testing",
      "Exam preparation lab",
    ],
    theme: "sage",
  },
  {
    slug: "cka",
    title: "CKA",
    cert: "Certified Kubernetes Administrator",
    category: "devops",
    duration: "6 weeks",
    format: "Live online + lab cluster",
    level: "Advanced",
    outcome:
      "Administer production Kubernetes clusters and pass the hands-on CKA performance-based exam.",
    modules: [
      "Cluster architecture and kubeadm bootstrap",
      "Workloads, scheduling, and taints",
      "Networking: CNI, services, ingress, DNS",
      "Storage: PV, PVC, StorageClasses",
      "Security: RBAC, service accounts, network policies",
      "Troubleshooting clusters, nodes, and pods",
      "Timed exam simulations",
    ],
    theme: "steel",
  },
  {
    slug: "ckad",
    title: "CKAD",
    cert: "Certified Kubernetes Application Developer",
    category: "devops",
    duration: "5 weeks",
    format: "Live online + lab cluster",
    level: "Intermediate",
    outcome:
      "Build, deploy, and debug cloud-native applications on Kubernetes — and pass the CKAD hands-on exam.",
    modules: [
      "Pods, Deployments, and Jobs",
      "ConfigMaps, Secrets, and resource limits",
      "Multi-container patterns (sidecar, adapter)",
      "Probes, init containers, and lifecycle hooks",
      "Helm charts and Kustomize",
      "Observability and debugging workloads",
      "Timed exam simulations",
    ],
    theme: "sand",
  },
  {
    slug: "docker",
    title: "Docker",
    cert: "Docker Certified / DevOps Fundamentals",
    category: "devops",
    duration: "3 weeks",
    format: "Live online + labs",
    level: "Beginner",
    outcome:
      "Containerize any application, write efficient images, and run Compose-based stacks in development and CI.",
    modules: [
      "Images, layers, and the build cache",
      "Writing lean Dockerfiles (multi-stage)",
      "Volumes, networks, and Compose",
      "Registry workflows and tagging",
      "Docker in CI pipelines",
      "From Compose to Kubernetes — the bridge",
    ],
    theme: "sage",
  },
  {
    slug: "frontend-development",
    title: "Frontend Development",
    cert: "DevStarLabs Frontend Professional",
    category: "development",
    duration: "12 weeks",
    format: "Live online + projects",
    level: "Beginner",
    outcome:
      "Build and deploy production React applications with TypeScript, testing, and modern tooling.",
    modules: [
      "HTML, CSS, and responsive layout systems",
      "JavaScript ES2023 and TypeScript",
      "React: components, hooks, and state",
      "Next.js: routing, data fetching, caching",
      "Tailwind CSS and design systems",
      "Testing with Vitest and Playwright",
      "Capstone: ship a production app",
    ],
    theme: "orange",
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    cert: "DevStarLabs Full Stack Professional",
    category: "development",
    duration: "20 weeks",
    format: "Live online + projects",
    level: "Intermediate",
    outcome:
      "Design, build, and operate complete web products — frontend to database to deployment.",
    modules: [
      "Frontend foundation (React + Next.js)",
      "APIs: REST, tRPC, and GraphQL",
      "Databases: PostgreSQL, Prisma, migrations",
      "Authentication and authorization",
      "Payments and third-party integrations",
      "Testing, CI/CD, and monitoring",
      "Capstone: launch a SaaS product",
    ],
    theme: "steel",
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    cert: "DevStarLabs GenAI Engineer",
    category: "ai-data",
    duration: "10 weeks",
    format: "Live online + labs",
    level: "Intermediate",
    outcome:
      "Build LLM-powered products: RAG pipelines, agents, and evaluations — in production, not just notebooks.",
    modules: [
      "LLM fundamentals: tokens, embeddings, context",
      "Prompt engineering that survives production",
      "RAG: chunking, vector stores, retrieval quality",
      "Agents, tools, and function calling",
      "Fine-tuning vs RAG — decision frameworks",
      "Evals, guardrails, and cost management",
      "Capstone: ship an AI feature",
    ],
    theme: "orange",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    cert: "DevStarLabs Data Engineer",
    category: "ai-data",
    duration: "14 weeks",
    format: "Live online + projects",
    level: "Intermediate",
    outcome:
      "Design reliable pipelines and warehouses that analysts and ML systems trust.",
    modules: [
      "SQL deep-dive and query optimization",
      "Batch pipelines with Airflow / Dagster",
      "Streaming with Kafka fundamentals",
      "Warehouses: BigQuery / Snowflake modeling",
      "dbt: transformation layers and tests",
      "Data quality, lineage, and contracts",
      "Capstone: end-to-end platform build",
    ],
    theme: "sage",
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    cert: "DevStarLabs ML Engineer",
    category: "ai-data",
    duration: "14 weeks",
    format: "Live online + projects",
    level: "Advanced",
    outcome:
      "Train, evaluate, and deploy models with proper experiment tracking and MLOps discipline.",
    modules: [
      "ML math essentials: linear algebra, probability",
      "Classical models and feature engineering",
      "Deep learning with PyTorch",
      "Model evaluation and error analysis",
      "MLOps: tracking, registries, pipelines",
      "Serving: batch vs real-time inference",
      "Capstone: model to production endpoint",
    ],
    theme: "steel",
  },
  {
    slug: "iot",
    title: "IoT Engineering",
    cert: "DevStarLabs IoT Specialist",
    category: "ai-data",
    duration: "10 weeks",
    format: "Live online + hardware kit",
    level: "Intermediate",
    outcome:
      "Build connected devices end to end: firmware, connectivity, cloud backends, and dashboards.",
    modules: [
      "Electronics essentials and microcontrollers",
      "Embedded C++ / MicroPython firmware",
      "Connectivity: MQTT, HTTP, LoRaWAN, BLE",
      "Cloud ingestion and device management",
      "Time-series data and dashboards",
      "OTA updates and fleet security",
      "Capstone: connected product prototype",
    ],
    theme: "sand",
  },
];

/* ------------------------------------------------------------------ */
/* SOCIAL PROOF                                                        */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "DevStarLabs rebuilt our platform on Next.js and cut load times by 70%. The handover docs were so good our team took over in a week.",
    name: "Ananya Rao",
    role: "CTO, Fintech startup",
    flag: "🇮🇳",
  },
  {
    quote:
      "I passed CKA on the first attempt. Their lab clusters feel exactly like the exam environment — timed drills make all the difference.",
    name: "Marcus Lee",
    role: "DevOps Engineer",
    flag: "🇸🇬",
  },
  {
    quote:
      "They shipped our AI support agent in six weeks. Real evals, real guardrails — it actually reduced ticket volume by 40%.",
    name: "Sofia Marin",
    role: "Head of Product, SaaS",
    flag: "🇪🇸",
  },
  {
    quote:
      "The Terraform course was the most practical training I've taken. We rewrote our whole infra as code the month after.",
    name: "David Okafor",
    role: "Platform Lead",
    flag: "🇳🇬",
  },
];

export const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "2,400+", label: "Engineers trained" },
  { value: "94%", label: "Certification pass rate" },
  { value: "14", label: "Countries served" },
];

export const CATEGORY_LABELS: Record<Training["category"], string> = {
  cloud: "Cloud",
  devops: "DevOps",
  development: "Development",
  "ai-data": "AI & Data",
};

/* ------------------------------------------------------------------ */
/* TRAINERS                                                            */
/* ------------------------------------------------------------------ */
/* Placeholder roster — drop real headshots into /public/trainers/
   and fill `photo: "/trainers/who.jpg"` plus name/role/specialty/bio.
   The 3D card scene renders the photo automatically when present.    */

export type Trainer = {
  name: string;
  role: string;
  /** short line printed on the card front */
  specialty: string;
  /** flipped-side copy shown as the card rotates */
  bio: string;
  years: string;
  accent: string;
  photo?: string; // e.g. "/trainers/ananya.jpg"
};

export const TRAINERS: Trainer[] = [
  {
    name: "Trainer One",
    role: "AWS & Cloud",
    specialty: "Solutions Architect · 8× certs",
    bio: "Runs the AWS track. Former cloud lead; has migrated 40+ workloads to AWS.",
    years: "12 yrs",
    accent: "#f4793a",
  },
  {
    name: "Trainer Two",
    role: "Kubernetes · CKA/CKAD",
    specialty: "CKS · Cluster ops",
    bio: "Teaches CKA/CKAD. Maintains the lab clusters students break and fix.",
    years: "10 yrs",
    accent: "#8498ac",
  },
  {
    name: "Trainer Three",
    role: "Terraform · DevOps",
    specialty: "IaC · CI/CD pipelines",
    bio: "Terraform Associate track. Believes every manual step is a future incident.",
    years: "11 yrs",
    accent: "#c5939d",
  },
  {
    name: "Trainer Four",
    role: "Frontend & Full Stack",
    specialty: "React · Next.js · TS",
    bio: "Frontend + full-stack mentor. Ships reviews the way staff engineers do.",
    years: "9 yrs",
    accent: "#8e9487",
  },
  {
    name: "Trainer Five",
    role: "AI & ML",
    specialty: "LLMs · RAG · evals",
    bio: "Generative AI and ML tracks. Obsessed with evals over vibes.",
    years: "8 yrs",
    accent: "#f4793a",
  },
  {
    name: "Trainer Six",
    role: "Data Eng & IoT",
    specialty: "Pipelines · streaming",
    bio: "Data engineering + IoT. From sensor to dashboard, one pipeline at a time.",
    years: "13 yrs",
    accent: "#8498ac",
  },
];
