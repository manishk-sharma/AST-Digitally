"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logActivity } from "./system";

const FALLBACK_ABOUT = {
  storyBadge: "Our Story",
  storyTitle: "Born from a passion for digital excellence",
  storyP1: "AST Digitally was founded with a simple belief: every business deserves access to world-class digital services — not just the ones with enterprise-sized budgets.",
  storyP2: "We started as a small team of designers and developers, and grew into a full-service agency covering everything from SEO and paid ads to AI automation and custom web applications.",
  storyP3: "Today, we've delivered 500+ projects and maintained a 98% client satisfaction rate — built on transparency, creativity, and an obsession with results.",
  valuesBadge: "Our Values",
  valuesTitle: "What We Stand For",
  valuesDescription: "These principles guide every project, every decision, and every client relationship."
};

export async function getAboutData() {
  try {
    const item = await db.siteSettings.findUnique({
      where: { key: "about_page_content" },
    });
    if (item) {
      return { success: true, data: typeof item.value === "string" ? JSON.parse(item.value) : item.value };
    }
    return { success: true, data: FALLBACK_ABOUT };
  } catch {
    return { success: true, data: FALLBACK_ABOUT };
  }
}

export async function updateAboutData(data: any) {
  try {
    const item = await db.siteSettings.upsert({
      where: { key: "about_page_content" },
      update: { value: data },
      create: { key: "about_page_content", value: data },
    });
    await logActivity("UPDATE_ABOUT", "SiteSettings", "about_page_content");
    revalidatePath("/about");
    revalidatePath("/admin/content/about");
    return { success: true, data: item.value };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update about data." };
  }
}
