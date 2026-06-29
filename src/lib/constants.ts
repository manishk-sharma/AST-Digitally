import type {
  Service,
  TechNode,
  GrowthStep,
  CaseStudy,
  Testimonial,
  FAQ,
  KPI,
} from "@/types";

// ─── Brand ──────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "AST Digitally",
  tagline: "AI-Powered Digital Growth Partner",
  description:
    "From AI-powered automation and SEO to high-converting websites, branding, video production, and digital marketing, AST Digitally helps businesses attract more customers, increase conversions, and scale with confidence.",
  email: "hr@astdigitally.com",
  phone: "+91 80841 58221",
  address: "Monday – Saturday, 9:00 AM – 6:00 PM IST",
} as const;

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Hero KPIs ──────────────────────────────────────────────────────────────

export const HERO_KPIS: KPI[] = [
  { label: "Projects Delivered", value: "500+", icon: "🚀", delay: 0 },
  { label: "Client Satisfaction", value: "98%", icon: "🤝", delay: 0.1 },
  { label: "Project Support", value: "24/7", icon: "📞", delay: 0.2 },
  { label: "Platform Reliability", value: "99.9%", icon: "⚡", delay: 0.3 },
];

// ─── Services ───────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description:
      "Intelligent chatbots, AI automation, copilots, and custom AI integrations that streamline operations and improve customer experiences.",
    icon: "🧠",
    features: [
      "AI Chatbots & Assistants",
      "Process Automation",
      "Custom AI Integrations",
      "Workflow Copilots",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "website-development",
    title: "Website Design & Development",
    description:
      "Modern, responsive, SEO-friendly websites and web applications built for speed, scalability, and conversions.",
    icon: "🌐",
    features: [
      "Custom Website Design",
      "Next.js & React Apps",
      "E-Commerce & Shopify",
      "WordPress Solutions",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Performance marketing campaigns across Google, Meta, LinkedIn, and other platforms to generate measurable business growth.",
    icon: "📈",
    features: [
      "Meta & Google Ads",
      "Social Media Marketing",
      "Lead Generation Tracks",
      "Conversion Optimization",
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "seo-services",
    title: "SEO Services",
    description:
      "Technical SEO, local SEO, content optimization, and long-term organic growth strategies.",
    icon: "🔍",
    features: [
      "Technical SEO Audits",
      "On-Page Optimization",
      "Local SEO Rankings",
      "Content Strategy Guides",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Brand identities, marketing creatives, presentations, and visual assets that leave lasting impressions.",
    icon: "🎨",
    features: [
      "Brand Identity Design",
      "Marketing Visual Assets",
      "Presentation Decks",
      "Custom Vector Assets",
    ],
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Professional promotional videos, reels, product showcases, corporate content, and motion graphics.",
    icon: "🎥",
    features: [
      "Promotional Ad Videos",
      "Reels & Short Content",
      "Corporate Highlights",
      "Motion Graphics Animations",
    ],
    gradient: "from-indigo-500 to-violet-500",
  },
];

// ─── Technology Orbit ───────────────────────────────────────────────────────

export const TECH_NODES: TechNode[] = [
  {
    id: "ai",
    label: "AI",
    description: "Artificial Intelligence powering every solution",
    useCases: ["Predictive Analytics", "Natural Language Processing", "Computer Vision"],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"],
    color: "#3b82f6",
    orbitRadius: 3,
    orbitSpeed: 0.3,
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "Scalable infrastructure for global reach",
    useCases: ["Auto-Scaling", "Global CDN", "Serverless Computing"],
    technologies: ["AWS", "GCP", "Azure", "Vercel"],
    color: "#06b6d4",
    orbitRadius: 3,
    orbitSpeed: 0.25,
  },
  {
    id: "web",
    label: "Web",
    description: "Modern web applications & immersive experiences",
    useCases: ["SPAs", "3D Experiences", "PWAs", "E-Commerce"],
    technologies: ["Next.js", "React", "Three.js", "TypeScript"],
    color: "#8b5cf6",
    orbitRadius: 3,
    orbitSpeed: 0.35,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Data-driven digital marketing at scale",
    useCases: ["Campaign Automation", "A/B Testing", "Audience Segmentation"],
    technologies: ["HubSpot", "Google Ads", "Meta Ads", "Marketo"],
    color: "#f59e0b",
    orbitRadius: 3,
    orbitSpeed: 0.2,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Search engine dominance through intelligence",
    useCases: ["Technical SEO", "Content Optimization", "Link Building"],
    technologies: ["Ahrefs", "Semrush", "Screaming Frog", "Surfer SEO"],
    color: "#10b981",
    orbitRadius: 3,
    orbitSpeed: 0.28,
  },
  {
    id: "automation",
    label: "Automation",
    description: "Intelligent process automation",
    useCases: ["Workflow Automation", "RPA", "API Integration"],
    technologies: ["Zapier", "n8n", "UiPath", "Custom Bots"],
    color: "#ec4899",
    orbitRadius: 3,
    orbitSpeed: 0.32,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Real-time insights for smarter decisions",
    useCases: ["Dashboards", "Reporting", "Data Pipelines"],
    technologies: ["Tableau", "Power BI", "BigQuery", "Snowflake"],
    color: "#ef4444",
    orbitRadius: 3,
    orbitSpeed: 0.22,
  },
];

// ─── Growth Framework ───────────────────────────────────────────────────────

export const GROWTH_STEPS: GrowthStep[] = [
  {
    id: "discovery",
    step: 1,
    title: "Discovery",
    description:
      "Deep-dive into your business objectives, current infrastructure, and growth opportunities through stakeholder interviews and data analysis.",
    icon: "🔍",
    stats: [
      { label: "Stakeholder Interviews", value: "15+" },
      { label: "Data Points Analyzed", value: "10K+" },
    ],
    color: "#3b82f6",
  },
  {
    id: "strategy",
    step: 2,
    title: "Strategy",
    description:
      "Craft a comprehensive roadmap aligned with your business goals, leveraging AI-driven insights to identify the highest-impact opportunities.",
    icon: "🎯",
    stats: [
      { label: "Strategic Initiatives", value: "5-10" },
      { label: "Expected ROI", value: "300%+" },
    ],
    color: "#8b5cf6",
  },
  {
    id: "design",
    step: 3,
    title: "Design",
    description:
      "Create stunning, user-centric interfaces and experiences backed by research, prototyping, and iterative refinement.",
    icon: "🎨",
    stats: [
      { label: "Design Iterations", value: "3-5" },
      { label: "Usability Score", value: "95+" },
    ],
    color: "#ec4899",
  },
  {
    id: "build",
    step: 4,
    title: "Build",
    description:
      "Engineer robust, scalable solutions using cutting-edge technologies with agile sprints, continuous integration, and thorough testing.",
    icon: "🔨",
    stats: [
      { label: "Sprint Cycles", value: "4-8" },
      { label: "Test Coverage", value: "95%+" },
    ],
    color: "#10b981",
  },
  {
    id: "growth",
    step: 5,
    title: "Growth",
    description:
      "Launch with precision and accelerate growth through data-driven marketing, conversion optimization, and strategic scaling.",
    icon: "🚀",
    stats: [
      { label: "Growth Rate", value: "40%+" },
      { label: "Channels Activated", value: "8+" },
    ],
    color: "#f59e0b",
  },
  {
    id: "optimization",
    step: 6,
    title: "Optimization",
    description:
      "Continuously refine performance through AI-powered analytics, A/B testing, and iterative improvements that compound over time.",
    icon: "♻️",
    stats: [
      { label: "Performance Gain", value: "60%+" },
      { label: "Cost Reduction", value: "35%+" },
    ],
    color: "#06b6d4",
  },
];

// ─── Case Studies ───────────────────────────────────────────────────────────

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fintech-ai",
    title: "AI-Powered Risk Assessment Platform",
    client: "FinVault Technologies",
    industry: "Fintech",
    description:
      "Built a real-time risk scoring engine using machine learning that reduced fraud losses by 78% and accelerated loan approvals from days to minutes.",
    metrics: [
      { label: "Fraud Reduction", value: "78", suffix: "%" },
      { label: "Processing Speed", value: "50", suffix: "x faster" },
      { label: "Revenue Impact", value: "12", prefix: "$", suffix: "M" },
      { label: "Accuracy Rate", value: "99.2", suffix: "%" },
    ],
    tags: ["AI/ML", "Fintech", "Real-Time Processing"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "ecommerce-3d",
    title: "Immersive 3D Shopping Experience",
    client: "LuxeSpace Interiors",
    industry: "E-Commerce",
    description:
      "Created an interactive 3D product visualization platform that increased average order value by 45% and reduced return rates by 60%.",
    metrics: [
      { label: "AOV Increase", value: "45", suffix: "%" },
      { label: "Return Reduction", value: "60", suffix: "%" },
      { label: "Conversion Rate", value: "3.2", suffix: "x" },
      { label: "Session Duration", value: "4.5", suffix: "min" },
    ],
    tags: ["3D/WebGL", "E-Commerce", "UX Design"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "saas-growth",
    title: "SaaS Growth Engine & Analytics",
    client: "CloudMetrics Pro",
    industry: "SaaS",
    description:
      "Designed and implemented a full-funnel growth engine with AI-driven lead scoring, automated nurture campaigns, and real-time analytics dashboards.",
    metrics: [
      { label: "Lead Quality", value: "200", suffix: "% ↑" },
      { label: "MRR Growth", value: "85", suffix: "%" },
      { label: "CAC Reduction", value: "40", suffix: "%" },
      { label: "Pipeline Value", value: "8", prefix: "$", suffix: "M" },
    ],
    tags: ["Marketing Automation", "Analytics", "Growth"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

// ─── Testimonials ───────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO",
    company: "FinVault Technologies",
    content:
      "AST Digitally transformed our entire risk assessment pipeline. Their AI expertise is world-class, and the results speak for themselves — 78% fraud reduction in just 3 months.",
    rating: 5,
    avatar: "SC",
  },
  {
    id: "t2",
    name: "Marcus Rivera",
    role: "CEO",
    company: "LuxeSpace Interiors",
    content:
      "The 3D shopping experience they built is unlike anything in our industry. Our customers love it, and our conversion rates have never been higher.",
    rating: 5,
    avatar: "MR",
  },
  {
    id: "t3",
    name: "Emily Okafor",
    role: "VP Marketing",
    company: "CloudMetrics Pro",
    content:
      "The growth engine AST built for us is a game-changer. AI-driven lead scoring alone increased our qualified pipeline by 200%. Incredible team to work with.",
    rating: 5,
    avatar: "EO",
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const FAQS: FAQ[] = [
  {
    question: "What services does AST Digitally offer?",
    answer:
      "We provide custom AI Solutions, Website Design & Development, Digital Marketing, Technical SEO Services, Graphic Design, Video Editing, and Business Automation to accelerate customer conversions and scale operations.",
  },
  {
    question: "How long does a website development project take?",
    answer:
      "A typical Next.js/React website or e-commerce solution takes between 6 to 12 weeks, following our structured growth framework: from discover and roadmap design to launch and scale operations.",
  },
  {
    question: "How does AST Digitally implement AI automation?",
    answer:
      "We build intelligent chatbots, workflow copilots, and custom data processing models. We integrate these tools directly into your active CRM, Slack, and database systems to reduce manual actions.",
  },
  {
    question: "What is your search engine optimization (SEO) strategy?",
    answer:
      "We build a solid SEO foundation with technical speed audits, clear heading hierarchies, semantic HTML schemas, local SEO listings, and continuous content authority scaling.",
  },
  {
    question: "What is your pricing model for campaigns and designs?",
    answer:
      "We offer flexible billing based on the project scope and monthly campaign support retainers. Each proposal clearly outlines project deliverables, timelines, and projected growth outcomes.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we provide long-term maintenance contracts, continuous performance logs monitoring, regular A/B testing adjustments, and continuous AI optimizations to ensure high-performance operations.",
  },
];

// ─── ROI Calculator Defaults ────────────────────────────────────────────────

export const ROI_DEFAULTS = {
  monthlyRevenue: 100000,
  marketingSpend: 20000,
  teamSize: 10,
  conversionRate: 2,
} as const;

// ─── Animation Constants ────────────────────────────────────────────────────

export const ANIMATION = {
  stagger: 0.08,
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2,
  },
  ease: {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    out: [0, 0, 0.2, 1] as const,
  },
} as const;
