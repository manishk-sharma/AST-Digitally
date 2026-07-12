import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import { getCaseStudies } from "@/app/actions/case-studies";
import CaseStudiesClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Case Studies CMS" };

export default async function CaseStudiesCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Case Studies Manager</h2>
          <p className="text-sm text-gray-500">Manage case studies, client success stories, and metrics.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const studies = await getCaseStudies();

  return <CaseStudiesClient initialCaseStudies={studies} />;
}

