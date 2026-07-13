import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import CareersClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Careers Manager" };

async function getJobs() {
  try {
    return await db.jobPosting.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Careers Manager</h2>
          <p className="text-sm text-gray-500">Post open positions and manage listings.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const jobs = await getJobs();
  return (
    <Suspense fallback={<div className="text-xs text-gray-400">Loading...</div>}>
      <CareersClient jobs={jobs} />
    </Suspense>
  );
}

