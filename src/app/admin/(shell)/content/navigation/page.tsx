import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import { getNavLinks } from "@/app/actions/navigation";
import NavigationClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Navigation Editor" };

export default async function NavigationCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Header Navigation Editor</h2>
          <p className="text-sm text-gray-500">Edit the menu items displayed in your website header.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const linksRes = await getNavLinks();
  const links = linksRes.success ? linksRes.data : [];

  return <NavigationClient initialLinks={links} />;
}
