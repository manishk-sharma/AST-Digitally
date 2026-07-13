import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import UnifiedLeadsClient from "../_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Contact Leads" };

async function getLeads() {
  try {
    return await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ContactLeadsPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact Leads</h2>
          <p className="text-sm text-gray-500">View and manage contact submissions from your website.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const leads = await getLeads();
  return <UnifiedLeadsClient leads={leads} />;
}
