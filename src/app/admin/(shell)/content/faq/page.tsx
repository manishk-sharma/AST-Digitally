import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import FAQClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "FAQ Manager" };

async function getFAQs() {
  try {
    return await db.fAQ.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function FAQPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">FAQ Manager</h2>
          <p className="text-sm text-gray-500">Manage frequently asked questions.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const faqs = await getFAQs();
  return <FAQClient faqs={faqs} />;
}

