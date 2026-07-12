import type { Metadata } from "next";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UsersClient from "./_client";

export const metadata: Metadata = { title: "Users" };

async function getAdminUsers() {
  try {
    return await db.user.findMany({ 
      orderBy: { createdAt: "desc" } 
    });
  } catch {
    return [];
  }
}

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  const users = await getAdminUsers();
  const currentUser = {
    id: session.user.id,
    role: session.user.role || "EDITOR",
  };

  return (
    <UsersClient 
      initialUsers={users} 
      currentUser={currentUser} 
    />
  );
}
