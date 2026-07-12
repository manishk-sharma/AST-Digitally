"use client";

import { useState, useEffect, useTransition } from "react";
import { Save, HelpCircle, Sparkles, RefreshCw } from "lucide-react";
import { getAboutData, updateAboutData } from "@/app/actions/about";
import { toast } from "sonner";

export default function AboutClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);

  const loadData = async () => {
    try {
      const res = await getAboutData();
      if (res.success) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to load about settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!data || loading) return;
    setAutosaveStatus("unsaved");

    const timer = setTimeout(() => {
      setAutosaveStatus("saving");
      startTransition(async () => {
        const res = await updateAboutData(data);
        if (res.success) {
          setAutosaveStatus("saved");
        } else {
          setAutosaveStatus(null);
        }
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateAboutData(data);
      if (res.success) {
        toast.success("About page contents updated successfully!");
        setAutosaveStatus("saved");
      } else {
        toast.error(res.error || "Failed to update about contents");
      }
    });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm">
        <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-gray-300" />
        Loading about settings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">About Page Editor</h2>
          <p className="text-sm text-gray-500">Edit company story details, founder biography summaries, and corporate values.</p>
        </div>
        <div className="flex items-center gap-3">
          {autosaveStatus === "unsaved" && <span className="text-xs text-amber-500 font-semibold">Unsaved Changes</span>}
          {autosaveStatus === "saving" && <span className="text-xs text-blue-500 animate-pulse font-semibold">Saving Draft...</span>}
          {autosaveStatus === "saved" && <span className="text-xs text-emerald-500 font-semibold">Draft Autosaved</span>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {data && (
          <div className="space-y-6">
            {/* Story section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-50">Our Story Settings</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Story Badge</label>
                  <input
                    type="text"
                    value={data.storyBadge || ""}
                    onChange={e => setData((p: any) => ({ ...p, storyBadge: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Story Heading</label>
                  <input
                    type="text"
                    value={data.storyTitle || ""}
                    onChange={e => setData((p: any) => ({ ...p, storyTitle: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Story Paragraph 1</label>
                <textarea
                  rows={3}
                  value={data.storyP1 || ""}
                  onChange={e => setData((p: any) => ({ ...p, storyP1: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Story Paragraph 2</label>
                <textarea
                  rows={3}
                  value={data.storyP2 || ""}
                  onChange={e => setData((p: any) => ({ ...p, storyP2: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Story Paragraph 3</label>
                <textarea
                  rows={3}
                  value={data.storyP3 || ""}
                  onChange={e => setData((p: any) => ({ ...p, storyP3: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm resize-none"
                />
              </div>
            </div>

            {/* Values section */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-50">Our Values Section</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Values Badge</label>
                  <input
                    type="text"
                    value={data.valuesBadge || ""}
                    onChange={e => setData((p: any) => ({ ...p, valuesBadge: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Values Title</label>
                  <input
                    type="text"
                    value={data.valuesTitle || ""}
                    onChange={e => setData((p: any) => ({ ...p, valuesTitle: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Values Subdescription</label>
                <input
                  type="text"
                  value={data.valuesDescription || ""}
                  onChange={e => setData((p: any) => ({ ...p, valuesDescription: e.target.value }))}
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
            {isPending ? "Saving..." : "Save About Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
