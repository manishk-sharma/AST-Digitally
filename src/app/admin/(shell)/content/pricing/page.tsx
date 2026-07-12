import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing CMS" };

export default function PricingCMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Pricing Manager</h2>
        <p className="text-sm text-gray-500">Create and manage pricing plans.</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">
        Connect your database and run <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">npx prisma migrate dev</code> to enable pricing management.
      </div>
    </div>
  );
}
