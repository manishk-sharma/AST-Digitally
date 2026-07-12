import type { Metadata } from "next";

export const metadata: Metadata = { title: "SEO Manager" };

const PAGES = [
  "Homepage",
  "Services",
  "Pricing",
  "About",
  "Case Studies",
  "Careers",
  "Contact",
];

export default function SEOPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">SEO Manager</h2>
        <p className="text-sm text-gray-500">Control meta tags, Open Graph, and structured data per page.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Page</th>
              <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Meta Title</th>
              <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PAGES.map((page) => (
              <tr key={page} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{page}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">Not configured</td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Default</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-xs text-[#3B5BFF] hover:underline">Edit SEO</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
