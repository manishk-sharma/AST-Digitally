import { db, checkDbConnection } from "./db";
import { 
  BRAND, 
  NAV_LINKS, 
  HERO_KPIS, 
  SERVICES, 
  CASE_STUDIES, 
  TESTIMONIALS, 
  FAQS 
} from "@/constants";

// Fallback pricing plan data matching default layout
const FALLBACK_PRICING = [
  { id: "1", title: "Starter", subtitle: "For startups & small businesses", price: 15000, features: ["5 Pages Custom Website", "Basic SEO Optimization", "Social Media Account Setup", "Email Support"], isPopular: false, badge: "Startup", buttonText: "Get Started" },
  { id: "2", title: "Growth", subtitle: "For scaling companies", price: 35000, features: ["10 Pages Custom Website", "Advanced Technical SEO", "Google & Meta Ads Setup", "Priority Support", "AI Automation Audit"], isPopular: true, badge: "Popular", buttonText: "Get Started" },
  { id: "3", title: "Enterprise", subtitle: "For large organizations", price: 75000, features: ["Custom Web Application", "Enterprise ORM & Branding", "Full AI Automated Workflows", "Dedicated Support 24/7", "Analytics Dashboards"], isPopular: false, badge: "Custom", buttonText: "Get Started" }
];

export async function getNavbarLinks() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return NAV_LINKS;

    const links = await db.navLink.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" }
    });
    if (links.length > 0) {
      return links.map(l => ({ label: l.label, href: l.href }));
    }
    return NAV_LINKS;
  } catch {
    return NAV_LINKS;
  }
}

export async function getFooterData() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) {
      return {
        copyright: "AST Digitally. All rights reserved.",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        twitter: "https://x.com",
        facebook: "https://facebook.com"
      };
    }

    const item = await db.siteSettings.findUnique({
      where: { key: "footer_page_content" },
    });
    if (item) {
      const parsed = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
      return parsed;
    }
  } catch {}

  return {
    copyright: "AST Digitally. All rights reserved.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    facebook: "https://facebook.com"
  };
}

export async function getContactInfo() {
  try {
    const dbStatus = await checkDbConnection();
    if (dbStatus.isConnected) {
      const item = await db.siteSettings.findUnique({
        where: { key: "contact_info" },
      });
      if (item) {
        return typeof item.value === "string" ? JSON.parse(item.value) : item.value;
      }
    }
  } catch {}

  return {
    email: BRAND.email,
    phone: BRAND.phone,
    address: BRAND.address,
    businessHours: BRAND.address // Map address/hours appropriately
  };
}

export async function getHomepageData() {
  const fallbacks = {
    hero: {
      badge: "Digital Growth Partner",
      title: "Transform Your Business with Digital Marketing & Smart Technology",
      description: "We design, market, automate, and scale businesses with creative strategies and custom digital solutions that deliver real results.",
      ctaPrimaryText: "Book Free Consultation",
      ctaPrimaryUrl: "/#contact",
      ctaSecondaryText: "Explore Services",
      ctaSecondaryUrl: "/services"
    },
    statistics: {
      stats: HERO_KPIS.map(k => ({ label: k.label, value: k.value }))
    },
    cta: {
      badge: "Free Consultation",
      title: "Any questions about growing your business?",
      description: "Feel free to reach out — we'd love to talk strategy.",
      buttonText: "Book a call",
      buttonUrl: "/#contact",
      email: BRAND.email,
      whatsapp: "918084158221"
    }
  };

  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return fallbacks;

    const sections = await db.homepageSection.findMany();
    const data: Record<string, any> = { ...fallbacks };

    sections.forEach(sec => {
      const parsed = typeof sec.data === "string" ? JSON.parse(sec.data) : sec.data;
      data[sec.sectionKey] = parsed;
    });

    return data;
  } catch {
    return fallbacks;
  }
}

export async function getServicesFull() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return SERVICES;

    const dbServices = await db.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" }
    });

    if (dbServices.length > 0) {
      return dbServices.map(s => ({
        id: s.slug,
        title: s.title,
        description: s.description,
        icon: s.icon || "Monitor",
        features: s.features,
        benefits: s.benefits,
        gradient: "from-black to-neutral-600"
      }));
    }
  } catch {}

  return SERVICES;
}

export async function getPricingPlans() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return FALLBACK_PRICING;

    const dbPlans = await db.pricingPlan.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" }
    });

    if (dbPlans.length > 0) {
      return dbPlans.map(p => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle || "",
        price: p.price,
        yearlyPrice: p.yearlyPrice,
        currency: p.currency,
        badge: p.badge || "",
        isPopular: p.isPopular,
        features: p.features,
        buttonText: p.buttonText,
        buttonUrl: p.buttonUrl || "/#contact",
        isVisible: p.isVisible
      }));
    }
  } catch {}

  return FALLBACK_PRICING;
}

export async function getCaseStudies() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return CASE_STUDIES;

    const dbStudies = await db.caseStudy.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { isFeatured: "desc" }
    });

    if (dbStudies.length > 0) {
      return dbStudies.map(s => {
        const metrics = typeof s.metrics === "string" ? JSON.parse(s.metrics) : s.metrics;
        return {
          id: s.slug,
          title: s.projectName,
          client: s.client,
          industry: s.industry,
          description: s.description,
          metrics: Array.isArray(metrics) ? metrics : [],
          tags: s.technologies,
          gradient: "from-black to-neutral-600"
        };
      });
    }
  } catch {}

  return CASE_STUDIES;
}

export async function getTestimonials() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return TESTIMONIALS;

    const dbTestimonials = await db.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" }
    });

    if (dbTestimonials.length > 0) {
      return dbTestimonials.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role || "",
        company: t.company || "",
        content: t.review,
        rating: t.rating,
        avatar: t.photo || t.name.charAt(0)
      }));
    }
  } catch {}

  return TESTIMONIALS;
}

export async function getFAQs() {
  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return FAQS;

    const dbFAQs = await db.fAQ.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" }
    });

    if (dbFAQs.length > 0) {
      return dbFAQs.map(f => ({
        question: f.question,
        answer: f.answer
      }));
    }
  } catch {}

  return FAQS;
}

export async function getAboutData() {
  const fallback = {
    storyBadge: "Our Story",
    storyTitle: "Born from a passion for digital excellence",
    storyP1: "AST Digitally was founded with a simple belief: every business deserves access to world-class digital services — not just the ones with enterprise-sized budgets.",
    storyP2: "We started as a small team of designers and developers, and grew into a full-service agency covering everything from SEO and paid ads to AI automation and custom web applications.",
    storyP3: "Today, we've delivered 500+ projects and maintained a 98% client satisfaction rate — built on transparency, creativity, and an obsession with results.",
    valuesBadge: "Our Values",
    valuesTitle: "What We Stand For",
    valuesDescription: "These principles guide every project, every decision, and every client relationship."
  };

  try {
    const dbStatus = await checkDbConnection();
    if (!dbStatus.isConnected) return fallback;

    const item = await db.siteSettings.findUnique({
      where: { key: "about_page_content" },
    });
    if (item) {
      const parsed = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
      return { ...fallback, ...parsed };
    }
  } catch {}

  return fallback;
}
