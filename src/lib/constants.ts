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
  tagline: "Transform Your Business with Digital Marketing & Smart Technology Solutions",
  description:
    "AST Digitally is a full-service digital marketing and technology agency founded by Asif Siddique. We help startups, SMEs, and enterprises grow through digital marketing, websites, branding, automation, custom dashboards, app deployment, and business applications.",
  email: "astdigitally@gmail.com",
  phone: "+91 80841 58221",
  address: "Monday – Saturday, 9:00 AM – 6:00 PM IST",
  founder: "Asif Siddique",
} as const;

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Industries", href: "#industries" },
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
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Performance marketing campaigns across Google, Meta, and other platforms to generate measurable business growth.",
    icon: "📈",
    features: [
      "Google & Meta Ads",
      "Social Media Marketing",
      "Lead Generation",
      "Conversion Optimization",
    ],
    gradient: "from-black to-neutral-600 dark:from-white dark:to-neutral-400",
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
      "Content Strategy",
    ],
    gradient: "from-neutral-800 to-black dark:from-neutral-300 dark:to-white",
  },
  {
    id: "website-development",
    title: "Website Design & Development",
    description:
      "Modern, responsive, SEO-friendly websites and e-commerce solutions built for speed, scalability, and conversions.",
    icon: "🌐",
    features: [
      "Custom Website Design",
      "E-Commerce Development",
      "Business Web Applications",
      "Website Maintenance",
    ],
    gradient: "from-black to-neutral-600 dark:from-white dark:to-neutral-400",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Brand identities, marketing creatives, and visual assets that leave lasting impressions.",
    icon: "🎨",
    features: [
      "Brand Identity Design",
      "Marketing Creatives",
      "UI/UX Design",
      "Custom Graphics",
    ],
    gradient: "from-neutral-800 to-black dark:from-neutral-300 dark:to-white",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Professional promotional videos, reels, product showcases, and motion graphics.",
    icon: "🎥",
    features: [
      "Promotional Ad Videos",
      "Reels & Short Content",
      "Corporate Highlights",
      "Motion Graphics",
    ],
    gradient: "from-black to-neutral-600 dark:from-white dark:to-neutral-400",
  },
  {
    id: "app-deployment",
    title: "App Deployment & Automation",
    description:
      "End-to-end app deployment, custom dashboard design, and business automation solutions.",
    icon: "⚙️",
    features: [
      "App Deployment",
      "Custom Dashboards",
      "Business Automation",
      "ORM Services",
    ],
    gradient: "from-neutral-800 to-black dark:from-neutral-300 dark:to-white",
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
    color: "#000000",

    orbitRadius: 3,
    orbitSpeed: 0.3,
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "Scalable infrastructure for global reach",
    useCases: ["Auto-Scaling", "Global CDN", "Serverless Computing"],
    technologies: ["AWS", "GCP", "Azure", "Vercel"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.25,
  },
  {
    id: "web",
    label: "Web",
    description: "Modern web applications & immersive experiences",
    useCases: ["SPAs", "3D Experiences", "PWAs", "E-Commerce"],
    technologies: ["Next.js", "React", "Three.js", "TypeScript"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.35,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Data-driven digital marketing at scale",
    useCases: ["Campaign Automation", "A/B Testing", "Audience Segmentation"],
    technologies: ["HubSpot", "Google Ads", "Meta Ads", "Marketo"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.2,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Search engine dominance through intelligence",
    useCases: ["Technical SEO", "Content Optimization", "Link Building"],
    technologies: ["Ahrefs", "Semrush", "Screaming Frog", "Surfer SEO"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.28,
  },
  {
    id: "automation",
    label: "Automation",
    description: "Intelligent process automation",
    useCases: ["Workflow Automation", "RPA", "API Integration"],
    technologies: ["Zapier", "n8n", "UiPath", "Custom Bots"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.32,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Real-time insights for smarter decisions",
    useCases: ["Dashboards", "Reporting", "Data Pipelines"],
    technologies: ["Tableau", "Power BI", "BigQuery", "Snowflake"],
    color: "#000000",
    orbitRadius: 3,
    orbitSpeed: 0.22,
  },
];

// ─── Growth Framework ───────────────────────────────────────────────────────

export const GROWTH_STEPS: GrowthStep[] = [
  {
    id: "consultation",
    step: 1,
    title: "Consultation",
    description:
      "We start by understanding your business goals, challenges, and vision through a detailed consultation to identify the best strategy for your growth.",
    icon: "💡",
    stats: [
      { label: "Client Meetings", value: "2-3" },
      { label: "Requirements", value: "100%" },
    ],
    color: "#000000",

  },
  {
    id: "planning",
    step: 2,
    title: "Planning",
    description:
      "We create a comprehensive project roadmap with clear milestones, timelines, and deliverables tailored to your specific needs and budget.",
    icon: "📋",
    stats: [
      { label: "Project Plan", value: "100%" },
      { label: "Milestones", value: "5-10" },
    ],
    color: "#000000",
  },
  {
    id: "design",
    step: 3,
    title: "Design",
    description:
      "Our creative team crafts stunning UI/UX designs that align with your brand identity and deliver an exceptional user experience.",
    icon: "🎨",
    stats: [
      { label: "Design Concepts", value: "3+" },
      { label: "Revisions", value: "Unlimited" },
    ],
    color: "#000000",
  },
  {
    id: "development",
    step: 4,
    title: "Development",
    description:
      "We build your website or application using modern technologies, ensuring performance, scalability, and a seamless user experience.",
    icon: "💻",
    stats: [
      { label: "Sprint Cycles", value: "2-6" },
      { label: "Quality Check", value: "100%" },
    ],
    color: "#000000",
  },
  {
    id: "testing",
    step: 5,
    title: "Testing",
    description:
      "Rigorous testing across devices, browsers, and scenarios to ensure everything works flawlessly before launch.",
    icon: "🧪",
    stats: [
      { label: "Test Cases", value: "100+" },
      { label: "Bug Fix Rate", value: "99%" },
    ],
    color: "#000000",
  },
  {
    id: "launch",
    step: 6,
    title: "Launch",
    description:
      "We deploy your project with precision, ensuring zero downtime, proper configuration, and a smooth go-live experience.",
    icon: "🚀",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Launch Success", value: "100%" },
    ],
    color: "#000000",
  },
  {
    id: "support",
    step: 7,
    title: "Support",
    description:
      "Post-launch support and maintenance to keep your website running smoothly, with ongoing updates and performance monitoring.",
    icon: "🛠️",
    stats: [
      { label: "Support Hours", value: "24/7" },
      { label: "Response Time", value: "< 2hrs" },
    ],
    color: "#000000",
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
    gradient: "from-black to-neutral-600 dark:from-white dark:to-neutral-400",
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
    gradient: "from-neutral-800 to-black dark:from-neutral-300 dark:to-white",
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
    gradient: "from-black to-neutral-600 dark:from-white dark:to-neutral-400",
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
      "We offer Digital Marketing, SEO, Google & Meta Ads, Social Media Marketing, Website Design & Development, E-commerce Development, Graphic Design, Video Editing, Custom Dashboard Designing, Business Web Applications, App Deployment, Online Reputation Management (ORM), and Website Maintenance & Support.",
  },
  {
    question: "Do you redesign existing websites?",
    answer:
      "Yes, we redesign and revamp existing websites to improve performance, user experience, and conversion rates while retaining your brand identity.",
  },
  {
    question: "Do you provide SEO services?",
    answer:
      "Yes, we provide comprehensive SEO services including technical audits, on-page optimization, local SEO, and content strategy to improve your search rankings and organic traffic.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we offer long-term maintenance contracts, continuous performance monitoring, regular updates, and dedicated support to ensure your website and applications run smoothly.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing based on project scope and requirements. Each proposal clearly outlines deliverables, timelines, and costs with no hidden charges.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary based on complexity. A standard website takes 2-4 weeks, while more complex projects with custom dashboards or e-commerce functionality may take 6-12 weeks.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve Healthcare, Education, Fashion, Real Estate, Travel, BPO/KPO, E-commerce, Finance, Manufacturing, and Startups & SMEs across various sectors.",
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
