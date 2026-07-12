"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markLeadRead(id: string) {
  try {
    await db.contactSubmission.update({
      where: { id },
      data: { isRead: true, status: "READ" },
    });
    revalidatePath("/admin/leads/contact");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteContactLead(id: string) {
  try {
    await db.contactSubmission.delete({ where: { id } });
    revalidatePath("/admin/leads/contact");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function archiveContactLead(id: string) {
  try {
    await db.contactSubmission.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });
    revalidatePath("/admin/leads/contact");
    return { success: true };
  } catch {
    return { success: false };
  }
}
