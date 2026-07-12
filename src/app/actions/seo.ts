"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "./system";

export async function getSeoConfigs() {
  try {
    return await db.seoConfig.findMany();
  } catch {
    return [];
  }
}

export async function getSeoConfigByPage(page: string) {
  try {
    return await db.seoConfig.findUnique({
      where: { page },
    });
  } catch {
    return null;
  }
}

export async function updateSeoConfig(page: string, data: {
  metaTitle?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  keywords?: string[];
  ogImage?: string | null;
  schema?: any;
}) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Not authorized." };
    }

    const item = await db.seoConfig.upsert({
      where: { page },
      update: {
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        canonical: data.canonical,
        keywords: data.keywords,
        ogImage: data.ogImage,
        schema: data.schema,
      },
      create: {
        page,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        canonical: data.canonical,
        keywords: data.keywords || [],
        ogImage: data.ogImage,
        schema: data.schema || {},
      },
    });

    await logActivity("UPDATE_SEO", "SeoConfig", page, { page });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/careers");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update SEO." };
  }
}
