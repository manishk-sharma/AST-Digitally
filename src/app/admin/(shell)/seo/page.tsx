import type { Metadata } from "next";
import { getSeoConfigs } from "@/app/actions/seo";
import SEOClient from "./_client";

export const metadata: Metadata = { title: "SEO Manager" };

export default async function SEOPage() {
  const configs = await getSeoConfigs();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">SEO Manager</h2>
        <p className="text-sm text-gray-500">Control meta tags, Open Graph, and structured data per page.</p>
      </div>

      <SEOClient initialConfigs={configs} />
    </div>
  );
}
