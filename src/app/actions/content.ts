"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { Testimonial, FAQ } from "@prisma/client";

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function createTestimonial(data: Partial<Testimonial>) {
  try {
    const item = await db.testimonial.create({
      data: {
        name: data.name ?? "",
        company: data.company ?? null,
        role: data.role ?? null,
        photo: data.photo ?? null,
        rating: data.rating ?? 5,
        review: data.review ?? "",
        isFeatured: data.isFeatured ?? false,
        order: data.order ?? 0,
        isVisible: data.isVisible ?? true,
      },
    });
    revalidatePath("/admin/content/testimonials");
    return { success: true, data: item };
  } catch {
    return { success: false, data: null };
  }
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  try {
    const item = await db.testimonial.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company,
        role: data.role,
        photo: data.photo,
        rating: data.rating,
        review: data.review,
        isFeatured: data.isFeatured,
        order: data.order,
        isVisible: data.isVisible,
      },
    });
    revalidatePath("/admin/content/testimonials");
    return { success: true, data: item };
  } catch {
    return { success: false, data: null };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await db.testimonial.delete({ where: { id } });
    revalidatePath("/admin/content/testimonials");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function createFAQ(data: Partial<FAQ>) {
  try {
    const item = await db.fAQ.create({
      data: {
        question: data.question ?? "",
        answer: data.answer ?? "",
        category: data.category ?? null,
        order: data.order ?? 0,
        isVisible: data.isVisible ?? true,
      },
    });
    revalidatePath("/admin/content/faq");
    return { success: true, data: item };
  } catch {
    return { success: false, data: null };
  }
}

export async function updateFAQ(id: string, data: Partial<FAQ>) {
  try {
    const item = await db.fAQ.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        order: data.order,
        isVisible: data.isVisible,
      },
    });
    revalidatePath("/admin/content/faq");
    return { success: true, data: item };
  } catch {
    return { success: false, data: null };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await db.fAQ.delete({ where: { id } });
    revalidatePath("/admin/content/faq");
    return { success: true };
  } catch {
    return { success: false };
  }
}
