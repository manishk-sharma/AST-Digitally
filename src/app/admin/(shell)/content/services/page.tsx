import type { Metadata } from "next";
import { checkDbConnection } from "@/lib/db";
import { getServices } from "@/app/actions/services";
import ServicesClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";

export const metadata: Metadata = { title: "Services CMS" };

export default async function ServicesCMSPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Services Manager</h2>
          <p className="text-sm text-gray-500">Manage your service offerings, features, and details.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const services = await getServices();

  return <ServicesClient initialServices={services} />;
}

