import type { Metadata } from "next";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./_client";

export const metadata: Metadata = { title: "Settings" };

async function getSettings() {
  try {
    const keys = ["general_settings", "business_info", "contact_info", "smtp_config", "analytics_config"];
    const items = await db.siteSettings.findMany({
      where: { key: { in: keys } },
    });

    const settings: Record<string, any> = {};
    items.forEach((item) => {
      // Map keys to simpler property names
      if (item.key === "general_settings") settings.general = item.value;
      if (item.key === "business_info") settings.business = item.value;
      if (item.key === "contact_info") settings.contact = item.value;
      if (item.key === "smtp_config") settings.smtp = item.value;
      if (item.key === "analytics_config") settings.analytics = item.value;
    });

    return settings;
  } catch {
    return {};
  }
}

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const initialSettings = await getSettings();
  const currentUser = {
    name: session.user.name || "Admin",
    email: session.user.email,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Configure global site settings, contacts, and security credentials.</p>
      </div>

      <SettingsClient 
        initialSettings={initialSettings} 
        currentUser={currentUser} 
      />
    </div>
  );
}
