import type { Metadata } from "next";
export const metadata: Metadata = { title: "Footer Manager" };
export default function FooterPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-900">Footer Manager</h2><p className="text-sm text-gray-500">Edit company info, social links, and footer columns.</p></div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">Connect your database to enable footer editing.</div>
    </div>
  );
}
