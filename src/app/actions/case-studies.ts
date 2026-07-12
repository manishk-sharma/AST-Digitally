"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { CaseStudy } from "@prisma/client";
import { logActivity } from "./system";

export async function getCaseStudies() {
  try {
    return await db.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function createCaseStudy(data: Partial<CaseStudy>) {
  try {
    const item = await db.caseStudy.create({
      data: {
        slug: data.slug || `case-${Date.now()}`,
        projectName: data.projectName || "Untitled Project",
        industry: data.industry || "General",
        client: data.client || "Self",
        description: data.description || "",
        challenge: data.challenge || null,
        solution: data.solution || null,
        results: data.results || null,
        metrics: data.metrics || [],
        gallery: data.gallery || [],
        technologies: data.technologies || [],
        isFeatured: data.isFeatured ?? false,
        status: data.status || "DRAFT",
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
      },
    });
    await logActivity("CREATE_CASE_STUDY", "CaseStudy", item.id, { projectName: item.projectName });
    revalidatePath("/admin/content/case-studies");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create case study." };
  }
}

export async function updateCaseStudy(id: string, data: Partial<CaseStudy>) {
  try {
    const item = await db.caseStudy.update({
      where: { id },
      data: {
        slug: data.slug,
        projectName: data.projectName,
        industry: data.industry,
        client: data.client,
        description: data.description,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        metrics: data.metrics || undefined,
        gallery: data.gallery,
        technologies: data.technologies,
        isFeatured: data.isFeatured,
        status: data.status,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
      },
    });
    await logActivity("UPDATE_CASE_STUDY", "CaseStudy", item.id, { projectName: item.projectName });
    revalidatePath("/admin/content/case-studies");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update case study." };
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    const item = await db.caseStudy.delete({ where: { id } });
    await logActivity("DELETE_CASE_STUDY", "CaseStudy", id, { projectName: item.projectName });
    revalidatePath("/admin/content/case-studies");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete case study." };
  }
}
