"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { logActivity } from "./system";
import type { Role } from "@prisma/client";

export async function getUsers() {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, data: [] };

    const list = await db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: list as any[] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function createUser(data: {
  name: string;
  email: string;
  role: Role;
  password?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { success: false, error: "Only Super Admins can create users." };
    }

    const exists = await db.user.findUnique({
      where: { email: data.email },
    });
    if (exists) {
      return { success: false, error: "Email already registered." };
    }

    // Default password if not provided
    const passwordToHash = data.password || "admin@123";
    const hashedPassword = await bcrypt.hash(passwordToHash, 12);

    const item = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        password: hashedPassword,
      },
    });

    await logActivity("CREATE_USER", "User", item.id, { email: item.email, role: item.role });

    revalidatePath("/admin/users");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create user." };
  }
}

export async function updateUser(id: string, data: {
  name: string;
  email: string;
  role: Role;
}) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { success: false, error: "Only Super Admins can edit users." };
    }

    const item = await db.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });

    await logActivity("UPDATE_USER", "User", id, { email: item.email, role: item.role });

    revalidatePath("/admin/users");
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update user." };
  }
}

export async function deleteUser(id: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { success: false, error: "Only Super Admins can delete users." };
    }

    // Check if trying to delete oneself
    if (session.user.id === id) {
      return { success: false, error: "You cannot delete your own account." };
    }

    const userToDelete = await db.user.findUnique({ where: { id } });
    if (!userToDelete) {
      return { success: false, error: "User not found." };
    }

    await db.user.delete({ where: { id } });

    await logActivity("DELETE_USER", "User", id, { email: userToDelete.email });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete user." };
  }
}

export async function resetUserPassword(id: string, newPasswordToSet: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { success: false, error: "Only Super Admins can reset passwords." };
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, error: "User not found." };
    }

    const hashedPassword = await bcrypt.hash(newPasswordToSet, 12);
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    await logActivity("RESET_USER_PASSWORD", "User", id, { email: user.email });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reset password." };
  }
}
