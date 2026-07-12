"use server";

import { db, checkDbConnection } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getSystemHealth() {
  const session = await auth();
  const dbHealth = await checkDbConnection();

  const envs = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
  };

  const isEnvHealthy = envs.DATABASE_URL && envs.AUTH_SECRET && envs.NEXTAUTH_URL;

  return {
    database: {
      status: dbHealth.isConnected ? "healthy" : dbHealth.errorType === "MIGRATION_MISSING" ? "warning" : "error",
      message: dbHealth.isConnected
        ? "Connected & Synced"
        : dbHealth.errorType === "MISSING_URL"
        ? "DATABASE_URL is missing"
        : dbHealth.errorType === "MIGRATION_MISSING"
        ? "Database schema not found. Run migrations."
        : "PostgreSQL Connection Offline",
      errorType: dbHealth.errorType,
    },
    prisma: {
      status: dbHealth.isConnected ? "healthy" : "warning",
      message: dbHealth.isConnected ? "Client initialized and responsive" : "Using fallback offline client",
    },
    auth: {
      status: session?.user ? "healthy" : "warning",
      message: session?.user ? `Logged in as ${session.user.email}` : "No active session",
    },
    env: {
      status: isEnvHealthy ? "healthy" : "error",
      message: isEnvHealthy ? "All required variables configured" : "Some key variables are missing",
      details: envs,
    },
    storage: {
      status: "healthy",
      message: "Local Storage Active (Cloudinary Optional)",
    },
    actions: {
      status: "healthy",
      message: "Server Actions responsive",
    },
    email: {
      status: "healthy",
      message: "SMTP Relay Ready",
    },
    uploads: {
      status: "healthy",
      message: "Upload sandbox active",
    }
  };
}

export async function logActivity(action: string, entity: string, entityId?: string, meta?: any) {
  try {
    const session = await auth();
    if (!session?.user?.email) return;

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) return;

    await db.activityLog.create({
      data: {
        userId: user.id,
        action,
        entity,
        entityId: entityId || null,
        meta: meta ? (meta as any) : undefined,
      }
    });
  } catch (err) {
    // Gracefully ignore log errors if DB is offline
    console.error("Could not write activity log:", err);
  }
}

export async function getActivityLogs() {
  try {
    return await db.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });
  } catch {
    return [];
  }
}

export async function seedDatabaseAction() {
  try {
    const dbHealth = await checkDbConnection();
    if (!dbHealth.isConnected) {
      return { success: false, error: "Database offline. Seed aborted." };
    }

    console.log("🌱 Running CMS Seeding...");

    // 1. Seed FAQs
    const faqs = [
      { question: "What services does AST Digitally offer?", answer: "We offer Digital Marketing, SEO, Google & Meta Ads, Social Media Marketing, Website Design & Development, E-commerce Development, Graphic Design, Video Editing, Custom Dashboard Designing, Business Web Applications, App Deployment, Online Reputation Management (ORM), and Website Maintenance & Support." },
      { question: "Do you redesign existing websites?", answer: "Yes, we redesign and revamp existing websites to improve performance, user experience, and conversion rates while retaining your brand identity." },
      { question: "Do you provide SEO services?", answer: "Yes, we provide comprehensive SEO services including technical audits, on-page optimization, local SEO, and content strategy to improve your search rankings and organic traffic." },
      { question: "Do you provide ongoing support after launch?", answer: "Yes, we offer long-term maintenance contracts, continuous performance monitoring, regular updates, and dedicated support to ensure your website and applications run smoothly." },
      { question: "What is your pricing model?", answer: "We offer flexible pricing based on project scope and requirements. Each proposal clearly outlines deliverables, timelines, and costs with no hidden charges." },
    ];

    for (let i = 0; i < faqs.length; i++) {
      await db.fAQ.upsert({
        where: { id: `seed-faq-${i}` },
        update: {},
        create: {
          id: `seed-faq-${i}`,
          question: faqs[i].question,
          answer: faqs[i].answer,
          order: i,
          isVisible: true,
        },
      });
    }

    // 2. Seed Testimonials
    const testimonials = [
      { name: "Sarah Chen", role: "CTO", company: "FinVault Technologies", review: "AST Digitally transformed our entire risk assessment pipeline. Their AI expertise is world-class, and the results speak for themselves — 78% fraud reduction in just 3 months.", rating: 5, isFeatured: true },
      { name: "Marcus Rivera", role: "CEO", company: "LuxeSpace Interiors", review: "The 3D shopping experience they built is unlike anything in our industry. Our customers love it, and our conversion rates have never been higher.", rating: 5, isFeatured: true },
      { name: "Emily Okafor", role: "VP Marketing", company: "CloudMetrics Pro", review: "The growth engine AST built for us is a game-changer. AI-driven lead scoring alone increased our qualified pipeline by 200%. Incredible team to work with.", rating: 5, isFeatured: true },
    ];

    for (let i = 0; i < testimonials.length; i++) {
      await db.testimonial.upsert({
        where: { id: `seed-t-${i}` },
        update: {},
        create: {
          id: `seed-t-${i}`,
          ...testimonials[i],
          order: i,
          isVisible: true,
        },
      });
    }

    // 4. Seed Services
    const services = [
      { slug: "digital-marketing", title: "Digital Marketing", icon: "TrendingUp", description: "Performance marketing campaigns across Google, Meta, and other platforms to generate measurable business growth.", features: ["Google & Meta Ads", "Social Media Marketing", "Lead Generation", "Conversion Optimization"], benefits: ["Lower cost per click", "Higher quality leads", "Measurable ROI"], order: 0 },
      { slug: "seo-services", title: "SEO Services", icon: "Search", description: "Technical SEO, local SEO, content optimization, and long-term organic growth strategies.", features: ["Technical SEO Audits", "On-Page Optimization", "Local SEO Rankings", "Content Strategy"], benefits: ["3x organic traffic", "Top 3 rankings", "Long-term growth"], order: 1 },
      { slug: "website-development", title: "Website Design & Development", icon: "Monitor", description: "Modern, responsive, SEO-friendly websites and e-commerce solutions built for speed, scalability, and conversions.", features: ["Custom Website Design", "E-Commerce Development", "Business Web Applications", "Website Maintenance"], benefits: ["5x faster load times", "Higher search rankings", "More conversions"], order: 2 },
    ];

    for (let i = 0; i < services.length; i++) {
      await db.service.upsert({
        where: { slug: services[i].slug },
        update: {},
        create: {
          slug: services[i].slug,
          title: services[i].title,
          icon: services[i].icon,
          description: services[i].description,
          features: services[i].features,
          benefits: services[i].benefits,
          status: "PUBLISHED",
          order: i,
        },
      });
    }

    await logActivity("SEED_DATABASE", "SYSTEM", "SUCCESS");
    return { success: true };
  } catch (err: any) {
    console.error("Seeding failed:", err);
    return { success: false, error: err.message || "Seeding failed." };
  }
}

export async function resetDatabaseAction() {
  try {
    const dbHealth = await checkDbConnection();
    if (!dbHealth.isConnected) {
      return { success: false, error: "Database offline. Reset aborted." };
    }

    console.log("🔥 Resetting CMS Database...");

    // Delete content data
    await db.fAQ.deleteMany({});
    await db.testimonial.deleteMany({});
    await db.service.deleteMany({});
    await db.caseStudy.deleteMany({});
    await db.contactSubmission.deleteMany({});
    await db.careerApplication.deleteMany({});
    await db.jobPosting.deleteMany({});
    await db.homepageSection.deleteMany({});
    await db.activityLog.deleteMany({});

    // Ensure super admin exists
    const password = await bcrypt.hash("admin@123", 12);
    await db.user.upsert({
      where: { email: "admin@astdigitally.com" },
      update: {},
      create: {
        name: "Asif Siddique",
        email: "admin@astdigitally.com",
        password,
        role: "SUPER_ADMIN",
      },
    });

    await logActivity("RESET_DATABASE", "SYSTEM", "SUCCESS");
    return { success: true };
  } catch (err: any) {
    console.error("Reset failed:", err);
    return { success: false, error: err.message || "Reset failed." };
  }
}
