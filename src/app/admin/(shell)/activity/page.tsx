import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import { getActivityLogs } from "@/app/actions/system";
import DatabaseWarning from "@/components/admin/DatabaseWarning";
import ActivityClient from "./_client";

export const metadata: Metadata = { title: "Activity Logs" };

export default async function ActivityLogsPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">System Activity Logs</h2>
          <p className="text-sm text-gray-500">Audit log of system events, logins, database seeding, resets, and content updates.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const logs = await getActivityLogs();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">System Activity Logs</h2>
        <p className="text-sm text-gray-500">Audit log of system events, logins, database seeding, resets, and content updates.</p>
      </div>

      <ActivityClient initialLogs={logs as any[]} />
    </div>
  );
}
