"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BRAND, HERO_KPIS } from "@/constants";
import { logActivity } from "./system";

const FALLBACK_SECTIONS: Record<string, any> = {
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
    stats: [
      { label: "Projects Delivered", value: "500+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Project Support", value: "24/7" },
      { label: "Platform Reliability", value: "99.9%" }
    ]
  },
  cta: {
    badge: "Free Consultation",
    title: "Any questions about growing your business?",
    description: "Feel free to reach out — we'd love to talk strategy.",
    buttonText: "Book a call",
    buttonUrl: "/#contact",
    email: "astdigitally@gmail.com",
    whatsapp: "918084158221"
  }
};

export async function getHomepageSection(sectionKey: string) {
  try {
    const section = await db.homepageSection.findUnique({
      where: { sectionKey },
    });
    if (section) {
      return { success: true, data: typeof section.data === "string" ? JSON.parse(section.data) : section.data };
    }
    return { success: true, data: FALLBACK_SECTIONS[sectionKey] || {} };
  } catch {
    return { success: true, data: FALLBACK_SECTIONS[sectionKey] || {} };
  }
}

export async function updateHomepageSection(sectionKey: string, data: any) {
  try {
    const item = await db.homepageSection.upsert({
      where: { sectionKey },
      update: { data },
      create: { sectionKey, data },
    });
    await logActivity("UPDATE_HOMEPAGE", "HomepageSection", sectionKey, { key: sectionKey });
    revalidatePath("/");
    revalidatePath("/admin/content/homepage");
    return { success: true, data: item.data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save homepage section." };
  }
}
