import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services CMS" };

export default function ServicesCMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Services Manager</h2>
        <p className="text-sm text-gray-500">Manage your service offerings, features, and details.</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">
        Connect your database and run <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">npx prisma migrate dev</code> to enable live service editing.
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-sm text-gray-500">Services are currently served from <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">constants/index.ts</code>. After DB migration, they will be fully editable here.</p>
      </div>
    </div>
  );
}
