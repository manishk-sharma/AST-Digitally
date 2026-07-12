"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { logActivity } from "./system";

// ─── Settings Helper Actions ──────────────────────────────────────────────────

export async function getSettingByKey(key: string) {
  try {
    const item = await db.siteSettings.findUnique({ where: { key } });
    return item ? item.value : null;
  } catch {
    return null;
  }
}

export async function saveSettingByKey(key: string, value: any) {
  try {
    const item = await db.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    
    // Log setting changes
    const session = await auth();
    if (session?.user?.id) {
      await logActivity("UPDATE_SETTINGS", "SiteSettings", key, { key });
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save setting." };
  }
}

// ─── User Profile & Password Change Actions ───────────────────────────────────

export async function updateAdminCredentials(data: {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authorized." };
    }

    const userId = session.user.id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, error: "User not found." };
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
    };

    // If changing password, validate and hash
    if (data.newPassword) {
      if (!data.currentPassword) {
        return { success: false, error: "Current password is required to change password." };
      }

      // Check current password
      const isMatch = await bcrypt.compare(data.currentPassword, user.password || "");
      if (!isMatch) {
        return { success: false, error: "Incorrect current password." };
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(data.newPassword, 12);
      updateData.password = hashedPassword;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Log the security change
    await logActivity("UPDATE_SECURITY", "User", userId, { name: updatedUser.name, email: updatedUser.email, passwordChanged: !!data.newPassword });

    return { success: true, data: updatedUser, requiresLogout: !!data.newPassword };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update credentials." };
  }
}
