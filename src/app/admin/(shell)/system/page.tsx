"use client";

import { useState, useEffect, useTransition } from "react";
import { 
  Database, Shield, Key, HardDrive, Cpu, 
  Mail, Image as ImageIcon, CheckCircle2, AlertTriangle, 
  XCircle, RefreshCw, DatabaseBackup, Trash2 
} from "lucide-react";
import { getSystemHealth, seedDatabaseAction, resetDatabaseAction } from "@/app/actions/system";
import { toast } from "sonner";

interface HealthStatus {
  status: "healthy" | "warning" | "error";
  message: string;
  details?: any;
}

interface SystemHealthData {
  database: HealthStatus;
  prisma: HealthStatus;
  auth: HealthStatus;
  env: HealthStatus;
  storage: HealthStatus;
  actions: HealthStatus;
  email: HealthStatus;
  uploads: HealthStatus;
}

export default function SystemHealthPage() {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const fetchHealth = async () => {
    try {
      const data = await getSystemHealth();
      setHealth(data as any);
    } catch (err) {
      toast.error("Failed to fetch system diagnostics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleSeed = () => {
    if (!confirm("Are you sure you want to seed the database with demo content? This will insert default services, pricing, testimonials, and FAQs.")) return;
    startTransition(async () => {
      const res = await seedDatabaseAction();
      if (res.success) {
        toast.success("Database seeded successfully with demo content!");
        fetchHealth();
      } else {
        toast.error(res.error || "Failed to seed database");
      }
    });
  };

  const handleReset = () => {
    if (!confirm("⚠️ WARNING: This will permanently delete all Services, Pricing, FAQs, Testimonials, Case Studies, Leads, and Activity Logs. The super admin account will be preserved. Do you want to proceed?")) return;
    startTransition(async () => {
      const res = await resetDatabaseAction();
      if (res.success) {
        toast.success("Database reset to empty state successfully.");
        fetchHealth();
      } else {
        toast.error(res.error || "Failed to reset database");
      }
    });
  };

  const getStatusBadge = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 size={12} />
            Healthy
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
            <AlertTriangle size={12} />
            Warning
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold animate-pulse">
            <XCircle size={12} />
            Error
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <RefreshCw className="animate-spin mb-3 text-gray-400" size={32} />
        <p className="text-sm">Running diagnostic suite...</p>
      </div>
    );
  }

  const items = [
    { key: "database", name: "Database Connection", icon: Database, details: health?.database },
    { key: "prisma", name: "Prisma Client ORM", icon: Shield, details: health?.prisma },
    { key: "auth", name: "Authentication Middleware", icon: Key, details: health?.auth },
    { key: "env", name: "Environment Configuration", icon: Cpu, details: health?.env },
    { key: "storage", name: "Media Assets Storage", icon: HardDrive, details: health?.storage },
    { key: "email", name: "Email Notifications (SMTP)", icon: Mail, details: health?.email },
    { key: "uploads", name: "File Upload Provider", icon: ImageIcon, details: health?.uploads },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Diagnostics</h2>
        <p className="text-gray-500 mt-1">Real-time health status, database maintenance, and seed automation actions.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Seed Database Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
              <DatabaseBackup size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Populate Default Content</h3>
            <p className="text-sm text-gray-500 mb-6">If your database is empty, seed demo data for Services, Pricing, FAQs, and Testimonials instantly.</p>
          </div>
          <button
            onClick={handleSeed}
            disabled={isPending || health?.database.status === "error"}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Seed Database"}
          </button>
        </div>

        {/* Reset Database Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
              <Trash2 size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Reset CMS Content</h3>
            <p className="text-sm text-gray-500 mb-6">Delete all client-side content (leads, services, plans, logs). This restores the default blank canvas.</p>
          </div>
          <button
            onClick={handleReset}
            disabled={isPending || health?.database.status === "error"}
            className="btn-secondary w-full justify-center text-rose-600 border-rose-200 hover:border-rose-300 hover:text-rose-700 disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Reset Demo Data"}
          </button>
        </div>
      </div>

      {/* Diagnostic list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">Services Diagnostics</h3>
          <button
            onClick={fetchHealth}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.details?.status === "healthy" ? "bg-emerald-50 text-emerald-500" :
                    item.details?.status === "warning" ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-950">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.details?.message}</p>
                  </div>
                </div>
                <div>
                  {item.details && getStatusBadge(item.details.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
