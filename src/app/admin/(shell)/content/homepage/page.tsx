import type { Metadata } from "next";
import { Home, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Homepage Editor" };

export default function HomepageCMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Homepage Editor</h2>
        <p className="text-sm text-gray-500">Edit each section of your homepage independently.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Database connection required</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Connect your database in <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">.env.local</code> and run{" "}
            <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">npx prisma migrate dev</code> to activate the CMS editor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Hero Section", "Statistics / KPIs", "Services Preview", "Case Studies", "Testimonials", "FAQ", "CTA Section", "Contact Form"].map((section) => (
          <div key={section} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 group hover:border-[#3B5BFF]/30 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#3B5BFF]/10 flex items-center justify-center transition-colors">
              <Home size={18} className="text-gray-400 group-hover:text-[#3B5BFF] transition-colors" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{section}</p>
              <p className="text-xs text-gray-400">Click to edit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
