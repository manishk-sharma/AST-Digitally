"use client";

import { useState, useEffect, useTransition } from "react";
import { Save, HelpCircle, FileText, Sparkles, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { getHomepageSection, updateHomepageSection } from "@/app/actions/homepage";
import { toast } from "sonner";

export default function HomepageClient() {
  const [activeTab, setActiveTab] = useState<"hero" | "statistics" | "cta">("hero");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);

  const loadSection = async (key: string) => {
    setLoading(true);
    try {
      const res = await getHomepageSection(key);
      if (res.success) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to load section data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSection(activeTab);
    setAutosaveStatus(null);
  }, [activeTab]);

  // Trigger autosave every 30 seconds
  useEffect(() => {
    if (!data || loading) return;
    setAutosaveStatus("unsaved");

    const timer = setTimeout(() => {
      setAutosaveStatus("saving");
      startTransition(async () => {
        const res = await updateHomepageSection(activeTab, data);
        if (res.success) {
          setAutosaveStatus("saved");
        } else {
          setAutosaveStatus(null);
        }
      });
    }, 10000); // 10s visual indicator for editing feedback

    return () => clearTimeout(timer);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateHomepageSection(activeTab, data);
      if (res.success) {
        toast.success(`${activeTab.toUpperCase()} section saved successfully!`);
        setAutosaveStatus("saved");
      } else {
        toast.error(res.error || "Failed to save section");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Homepage Sections</h2>
          <p className="text-sm text-gray-500">Edit and update homepage components independently.</p>
        </div>
        <div className="flex items-center gap-3">
          {autosaveStatus === "unsaved" && <span className="text-xs text-amber-500 font-semibold">Unsaved Changes</span>}
          {autosaveStatus === "saving" && <span className="text-xs text-blue-500 animate-pulse font-semibold">Saving Draft...</span>}
          {autosaveStatus === "saved" && <span className="text-xs text-emerald-500 font-semibold">Draft Autosaved</span>}
        </div>
      </div>

      {/* Tabs Nav */}
      <div className="flex border-b border-gray-100 gap-6">
        {[
          { key: "hero", label: "Hero Section" },
          { key: "statistics", label: "KPI Statistics" },
          { key: "cta", label: "CTA Section" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#3B5BFF] text-[#3B5BFF]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 text-sm">
          <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-gray-300" />
          Loading form configuration...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          {activeTab === "hero" && data && (
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={data.badge || ""}
                    onChange={e => setData((p: any) => ({ ...p, badge: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Heading Title</label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={e => setData((p: any) => ({ ...p, title: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Description Paragraph</label>
                <textarea
                  rows={4}
                  value={data.description || ""}
                  onChange={e => setData((p: any) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-gray-50">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={data.ctaPrimaryText || ""}
                    onChange={e => setData((p: any) => ({ ...p, ctaPrimaryText: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Primary Button Link</label>
                  <input
                    type="text"
                    value={data.ctaPrimaryUrl || ""}
                    onChange={e => setData((p: any) => ({ ...p, ctaPrimaryUrl: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "statistics" && data && (
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Homepage Counter Metrics</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {(data.stats || []).map((stat: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Metric Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => {
                          const copy = [...data.stats];
                          copy[idx].value = e.target.value;
                          setData((p: any) => ({ ...p, stats: copy }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Metric Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => {
                          const copy = [...data.stats];
                          copy[idx].label = e.target.value;
                          setData((p: any) => ({ ...p, stats: copy }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "cta" && data && (
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ""}
                    onChange={e => setData((p: any) => ({ ...p, badge: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Title</label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={e => setData((p: any) => ({ ...p, title: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={data.description || ""}
                  onChange={e => setData((p: any) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3 pt-4 border-t border-gray-50">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={data.email || ""}
                    onChange={e => setData((p: any) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={data.whatsapp || ""}
                    onChange={e => setData((p: any) => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Consultation Button Text</label>
                  <input
                    type="text"
                    value={data.buttonText || ""}
                    onChange={e => setData((p: any) => ({ ...p, buttonText: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary !px-6 !py-3 flex items-center gap-1.5 font-semibold text-sm"
            >
              <Save size={16} />
              {isPending ? "Saving changes..." : "Save Config Section"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
