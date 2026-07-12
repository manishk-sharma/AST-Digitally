"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logActivity } from "./system";

const DEFAULT_LINKS = [
  { label: "Home", href: "/", order: 0, isExternal: false, isVisible: true },
  { label: "Services", href: "/services", order: 1, isExternal: false, isVisible: true },
  { label: "Case Studies", href: "/#case-studies", order: 2, isExternal: false, isVisible: true },
  { label: "About", href: "/about", order: 3, isExternal: false, isVisible: true },
  { label: "Contact", href: "/#contact", order: 4, isExternal: false, isVisible: true }
];

export async function getNavLinks() {
  try {
    const dbLinks = await db.navLink.findMany({
      orderBy: { order: "asc" }
    });
    if (dbLinks.length > 0) {
      return { success: true, data: dbLinks };
    }
    return { success: true, data: DEFAULT_LINKS };
  } catch {
    return { success: true, data: DEFAULT_LINKS };
  }
}

export async function updateNavLinks(links: any[]) {
  try {
    // Delete existing links to recreate in order
    await db.navLink.deleteMany({});
    
    // Insert new links
    for (let i = 0; i < links.length; i++) {
      await db.navLink.create({
        data: {
          label: links[i].label,
          href: links[i].href,
          order: i,
          isExternal: links[i].isExternal || false,
          isVisible: links[i].isVisible !== false
        }
      });
    }

    await logActivity("UPDATE_NAVIGATION", "NavLink", "ALL");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/admin/content/navigation");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update navigation links." };
  }
}
