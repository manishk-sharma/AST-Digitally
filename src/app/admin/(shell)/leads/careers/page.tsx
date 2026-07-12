import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import CareersLeadsClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Career Applications" };

async function getApplications() {
  try {
    return await db.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { job: { select: { title: true } } },
    });
  } catch {
    return [];
  }
}

export default async function CareerApplicationsPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Career Applications</h2>
          <p className="text-sm text-gray-500">View and review job applications submitted through your careers page.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const applications = await getApplications();
  return <CareersLeadsClient applications={applications} />;
}

