import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Configure your site settings and preferences.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {[
          { label: "Site Title", desc: "The name shown in browser tabs", placeholder: "AST Digitally" },
          { label: "Contact Email", desc: "Where leads are forwarded to", placeholder: "astdigitally@gmail.com" },
          { label: "Contact Phone", desc: "Displayed in the footer", placeholder: "+91 80841 58221" },
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between gap-6 p-5">
            <div>
              <p className="text-sm font-semibold text-gray-900">{setting.label}</p>
              <p className="text-xs text-gray-400">{setting.desc}</p>
            </div>
            <input
              className="w-64 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
              placeholder={setting.placeholder}
            />
          </div>
        ))}
      </div>
      <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors">
        Save Settings
      </button>
    </div>
  );
}
