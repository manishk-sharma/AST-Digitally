import type { Metadata } from "next";
import { BarChart3, TrendingUp, Globe, Smartphone } from "lucide-react";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-500">Traffic, leads, and performance insights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Page Views (30d)", value: "—", icon: Globe, color: "bg-blue-50 text-blue-600" },
          { label: "Unique Visitors", value: "—", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
          { label: "Mobile Traffic", value: "—", icon: Smartphone, color: "bg-purple-50 text-purple-600" },
          { label: "Avg. Session", value: "—", icon: BarChart3, color: "bg-amber-50 text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-400">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <BarChart3 size={40} className="text-gray-200 mx-auto mb-4" />
        <p className="text-sm font-semibold text-gray-600">Connect Google Analytics</p>
        <p className="text-xs text-gray-400 mt-1">Add your GA4 credentials to enable live analytics data.</p>
      </div>
    </div>
  );
}
