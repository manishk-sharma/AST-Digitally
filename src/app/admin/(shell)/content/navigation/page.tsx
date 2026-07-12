import type { Metadata } from "next";
export const metadata: Metadata = { title: "Navigation Manager" };
export default function NavigationPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-900">Navigation Manager</h2><p className="text-sm text-gray-500">Edit header and footer navigation links.</p></div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">Connect your database to enable drag-and-drop navigation editing.</div>
    </div>
  );
}
