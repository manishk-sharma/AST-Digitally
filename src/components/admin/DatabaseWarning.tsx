"use client";

import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface DatabaseWarningProps {
  errorType: "MISSING_URL" | "CONNECTION_FAILED" | "MIGRATION_MISSING" | "UNKNOWN";
  errorMessage?: string;
}

export default function DatabaseWarning({ errorType, errorMessage }: DatabaseWarningProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(async () => {
      router.refresh();
    });
  };

  const getDetails = () => {
    switch (errorType) {
      case "MISSING_URL":
        return {
          title: "DATABASE_URL is missing",
          description: "The database connection URL is not configured. Please add DATABASE_URL to your .env.local file.",
          fix: [
            "Create or edit '.env.local' in the project root.",
            "Add: DATABASE_URL=\"postgresql://your-username:your-password@your-host:5432/your-db\"",
            "Restart your Next.js development server (npm run dev)."
          ]
        };
      case "CONNECTION_FAILED":
        return {
          title: "Unable to connect to PostgreSQL",
          description: "Prisma could not connect to the database server. Please ensure PostgreSQL is running and reachable.",
          fix: [
            "Verify your database host is active (e.g. Neon, Local Postgres).",
            "Double-check your credentials in '.env.local'.",
            "Verify your network allows outbound database connections."
          ]
        };
      case "MIGRATION_MISSING":
        return {
          title: "Database schema not found",
          description: "The database is reachable, but the schema tables have not been created yet.",
          fix: [
            "Open your terminal in the project directory.",
            "Run: npx prisma migrate dev",
            "If that fails, run: npx prisma db push"
          ]
        };
      default:
        return {
          title: "Database Connection Required",
          description: errorMessage || "The CMS cannot load content because the database is unavailable.",
          fix: [
            "Configure .env.local",
            "Run: npx prisma migrate dev",
            "Restart the server"
          ]
        };
    }
  };

  const details = getDetails();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto my-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <AlertCircle size={24} />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{details.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{details.description}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Quick Fix Instructions</h4>
            <ol className="list-decimal pl-4 space-y-1.5 text-sm text-gray-600">
              {details.fix.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRetry}
              disabled={isPending}
              className="btn-primary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
              {isPending ? "Retrying..." : "Retry Connection"}
            </button>
            <span className="text-xs text-gray-400">Prisma Client ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
