"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { Service } from "@prisma/client";
import { logActivity } from "./system";

export async function getServices() {
  try {
    return await db.service.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function createService(data: Partial<Service>) {
  try {
    const item = await db.service.create({
      data: {
        slug: data.slug || `service-${Date.now()}`,
        title: data.title || "Untitled Service",
        icon: data.icon || "Monitor",
        description: data.description || "",
        features: data.features || [],
        benefits: data.benefits || [],
        status: data.status || "DRAFT",
        order: data.order ?? 0,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
      },
    });
    await logActivity("CREATE_SERVICE", "Service", item.id, { title: item.title });
    revalidatePath("/admin/content/services");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create service." };
  }
}

export async function updateService(id: string, data: Partial<Service>) {
  try {
    const item = await db.service.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        icon: data.icon,
        description: data.description,
        features: data.features,
        benefits: data.benefits,
        status: data.status,
        order: data.order,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
      },
    });
    await logActivity("UPDATE_SERVICE", "Service", item.id, { title: item.title });
    revalidatePath("/admin/content/services");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update service." };
  }
}

export async function deleteService(id: string) {
  try {
    const item = await db.service.delete({ where: { id } });
    await logActivity("DELETE_SERVICE", "Service", id, { title: item.title });
    revalidatePath("/admin/content/services");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete service." };
  }
}
