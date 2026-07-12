"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteJobPosting(id: string) {
  try {
    await db.jobPosting.delete({ where: { id } });
    revalidatePath("/admin/content/careers");
    return { success: true };
  } catch {
    return { success: false };
  }
}
