"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, data: [] };

    const list = await db.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20
    });
    return { success: true, data: list as any[] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function markNotificationRead(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false };

    await db.notification.update({
      where: { id, userId: session.user.id },
      data: { isRead: true }
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function markAllNotificationsRead() {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false };

    await db.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true }
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteNotification(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false };

    await db.notification.delete({
      where: { id, userId: session.user.id }
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function createNotification(userId: string, message: string, type = "info", link?: string) {
  try {
    const item = await db.notification.create({
      data: {
        userId,
        message,
        type,
        link,
        isRead: false
      }
    });
    return { success: true, data: item };
  } catch {
    return { success: false };
  }
}
