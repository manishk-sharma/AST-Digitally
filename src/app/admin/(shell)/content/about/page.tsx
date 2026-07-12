import type { Metadata } from "next";
export const metadata: Metadata = { title: "About CMS" };
export default function AboutCMSPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-900">About Page Editor</h2><p className="text-sm text-gray-500">Edit your story, mission, values, and team.</p></div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">Connect your database to enable live editing.</div>
    </div>
  );
}
