import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import HomepageClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Homepage Editor" };

export default async function HomepageCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Homepage Editor</h2>
          <p className="text-sm text-gray-500">Edit each section of your homepage independently.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  return <HomepageClient />;
}

