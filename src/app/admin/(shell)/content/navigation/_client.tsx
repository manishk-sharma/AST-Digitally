"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Save, MoveUp, MoveDown } from "lucide-react";
import { updateNavLinks } from "@/app/actions/navigation";
import { toast } from "sonner";

interface LinkItem {
  id?: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isVisible?: boolean;
}

export default function NavigationClient({ initialLinks }: { initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [isPending, startTransition] = useTransition();

  const handleAddLink = () => {
    setLinks(prev => [...prev, { label: "", href: "", isExternal: false, isVisible: true }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === links.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const copy = [...links];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    setLinks(copy);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (links.some(l => !l.label || !l.href)) {
      toast.error("All links must have a valid label and URL");
      return;
    }

    startTransition(async () => {
      const res = await updateNavLinks(links);
      if (res.success) {
        toast.success("Navigation links saved successfully!");
      } else {
        toast.error(res.error || "Failed to save navigation links");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Header Navigation Editor</h2>
          <p className="text-sm text-gray-500">Edit the menu items displayed in your website header.</p>
        </div>
        <button onClick={handleAddLink} className="btn-secondary !py-2 !px-4 text-xs font-semibold">
          + Add Link
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
        <div className="space-y-3">
          {links.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  <MoveUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === links.length - 1}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  <MoveDown size={12} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-1">
                <input
                  type="text"
                  required
                  placeholder="Link Label"
                  value={link.label}
                  onChange={e => {
                    const copy = [...links];
                    copy[idx].label = e.target.value;
                    setLinks(copy);
                  }}
                  className="bg-white border border-gray-200 rounded-lg h-10 px-3 text-sm focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
                <input
                  type="text"
                  required
                  placeholder="Href URL (e.g. /services, /#contact)"
                  value={link.href}
                  onChange={e => {
                    const copy = [...links];
                    copy[idx].href = e.target.value;
                    setLinks(copy);
                  }}
                  className="bg-white border border-gray-200 rounded-lg h-10 px-3 text-sm focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div className="flex items-center gap-4 px-2">
                <label className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={link.isExternal || false}
                    onChange={e => {
                      const copy = [...links];
                      copy[idx].isExternal = e.target.checked;
                      setLinks(copy);
                    }}
                    className="rounded text-[#3B5BFF]"
                  />
                  External
                </label>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveLink(idx)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending || links.length === 0}
            className="btn-primary !px-6 !py-3 flex items-center gap-1.5 font-semibold text-sm"
          >
            <Save size={16} />
            {isPending ? "Saving..." : "Save Navigation Links"}
          </button>
        </div>
      </form>
    </div>
  );
}
