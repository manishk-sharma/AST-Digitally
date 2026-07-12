"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logActivity } from "./system";

const DEFAULT_FOOTER = {
  copyright: "AST Digitally. All rights reserved.",
  facebook: "https://facebook.com/astdigitally",
  instagram: "https://instagram.com/astdigitally",
  linkedin: "https://linkedin.com/company/astdigitally",
  twitter: "https://twitter.com/astdigitally",
  youtube: "https://youtube.com/@astdigitally"
};

export async function getFooterData() {
  try {
    const item = await db.siteSettings.findUnique({
      where: { key: "footer_page_content" },
    });
    if (item) {
      return { success: true, data: typeof item.value === "string" ? JSON.parse(item.value) : item.value };
    }
    return { success: true, data: DEFAULT_FOOTER };
  } catch {
    return { success: true, data: DEFAULT_FOOTER };
  }
}

export async function updateFooterData(data: any) {
  try {
    const item = await db.siteSettings.upsert({
      where: { key: "footer_page_content" },
      update: { value: data },
      create: { key: "footer_page_content", value: data },
    });
    await logActivity("UPDATE_FOOTER", "SiteSettings", "footer_page_content");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/admin/content/footer");
    return { success: true, data: item.value };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update footer settings." };
  }
}
