import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import AboutClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "About Content CMS" };

export default async function AboutCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">About Page Editor</h2>
          <p className="text-sm text-gray-500">Edit company story details, founder biography summaries, and corporate values.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  return <AboutClient />;
}
