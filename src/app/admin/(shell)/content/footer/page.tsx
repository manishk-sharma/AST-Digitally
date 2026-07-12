import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import FooterClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Footer Settings Editor" };

export default async function FooterCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Footer Settings</h2>
          <p className="text-sm text-gray-500">Edit copyright statements, terms of service, and official social media handles.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  return <FooterClient />;
}
