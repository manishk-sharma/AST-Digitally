import type { Metadata } from "next";
export const metadata: Metadata = { title: "Case Studies CMS" };
export default function CaseStudiesCMSPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-900">Case Studies Manager</h2><p className="text-sm text-gray-500">Create and manage project case studies.</p></div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">Connect your database to enable live case study management.</div>
    </div>
  );
}
