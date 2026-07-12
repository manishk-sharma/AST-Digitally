"use client";

import { useState, useEffect, useTransition } from "react";
import { Save, RefreshCw } from "lucide-react";
import { getFooterData, updateFooterData } from "@/app/actions/footer";
import { toast } from "sonner";

export default function FooterClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);

  const loadData = async () => {
    try {
      const res = await getFooterData();
      if (res.success) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to load footer settings");
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
        const res = await updateFooterData(data);
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
      const res = await updateFooterData(data);
      if (res.success) {
        toast.success("Footer settings saved successfully!");
        setAutosaveStatus("saved");
      } else {
        toast.error(res.error || "Failed to save footer settings");
      }
    });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm">
        <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-gray-300" />
        Loading footer settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Footer Settings</h2>
          <p className="text-sm text-gray-500">Edit copyright statements, terms of service, and official social media handles.</p>
        </div>
        <div className="flex items-center gap-3">
          {autosaveStatus === "unsaved" && <span className="text-xs text-amber-500 font-semibold">Unsaved Changes</span>}
          {autosaveStatus === "saving" && <span className="text-xs text-blue-500 animate-pulse font-semibold">Saving Draft...</span>}
          {autosaveStatus === "saved" && <span className="text-xs text-emerald-500 font-semibold">Draft Autosaved</span>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {data && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Copyright Footer Line</label>
              <input
                type="text"
                required
                value={data.copyright || ""}
                onChange={e => setData((p: any) => ({ ...p, copyright: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Social Media Handles</h4>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={data.linkedin || ""}
                    onChange={e => setData((p: any) => ({ ...p, linkedin: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg h-10 px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">Instagram Profile</label>
                  <input
                    type="text"
                    value={data.instagram || ""}
                    onChange={e => setData((p: any) => ({ ...p, instagram: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg h-10 px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">Twitter / X Profile</label>
                  <input
                    type="text"
                    value={data.twitter || ""}
                    onChange={e => setData((p: any) => ({ ...p, twitter: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg h-10 px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">Facebook Page</label>
                  <input
                    type="text"
                    value={data.facebook || ""}
                    onChange={e => setData((p: any) => ({ ...p, facebook: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg h-10 px-3 text-xs"
                  />
                </div>
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
            {isPending ? "Saving..." : "Save Footer Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
