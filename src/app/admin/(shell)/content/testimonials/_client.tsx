"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/actions/content";
import type { Testimonial } from "@prisma/client";

interface Props {
  testimonials: Testimonial[];
}

const EMPTY: Omit<Testimonial, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  company: null,
  role: null,
  photo: null,
  rating: 5,
  review: "",
  isFeatured: false,
  order: 0,
  isVisible: true,
};

export default function TestimonialsClient({ testimonials: init }: Props) {
  const [items, setItems] = useState(init);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  function openNew() {
    setEditing({ ...EMPTY });
  }

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      openNew();
      // Remove action=new from URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete("action");
      window.history.replaceState({}, "", url.pathname);
    }
  }, [searchParams]);

  function openEdit(t: Testimonial) {
    setEditing({ ...t });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    startTransition(async () => {
      const res = await deleteTestimonial(id);
      if (res.success) {
        setItems((prev) => prev.filter((t) => t.id !== id));
        toast.success("Deleted.");
      } else {
        toast.error("Failed to delete.");
      }
    });
  }

  function handleSave() {
    if (!editing) return;
    startTransition(async () => {
      if (editing.id) {
        const res = await updateTestimonial(editing.id, editing);
        if (res.success && res.data) {
          setItems((prev) => prev.map((t) => (t.id === editing.id ? res.data! : t)));
          toast.success("Updated.");
        } else {
          toast.error("Failed.");
        }
      } else {
        const res = await createTestimonial(editing);
        if (res.success && res.data) {
          setItems((prev) => [res.data!, ...prev]);
          toast.success("Created.");
        } else {
          toast.error("Failed.");
        }
      }
      setEditing(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-sm text-gray-500">{items.length} total</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF] text-white text-sm font-medium rounded-xl hover:bg-[#2d4cef] transition-colors"
        >
          <Plus size={15} />
          Add Testimonial
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Star size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No testimonials yet. Add your first one above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Person</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Company</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Rating</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Visible</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Featured</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{t.company ?? "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {t.isVisible ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <Eye size={10} /> Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        <EyeOff size={10} /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {t.isFeatured && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editing.id ? "Edit Testimonial" : "New Testimonial"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Name *</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.name ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Sarah Chen"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Company</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.company ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, company: e.target.value }))}
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Role</label>
                <input
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.role ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p, role: e.target.value }))}
                  placeholder="CTO"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Rating (1-5)</label>
                <input
                  type="number" min="1" max="5"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.rating ?? 5}
                  onChange={(e) => setEditing((p) => ({ ...p, rating: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Review *</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none resize-none"
                value={editing.review ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p, review: e.target.value }))}
                placeholder="What did they say about your work?"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.isFeatured ?? false}
                  onChange={(e) => setEditing((p) => ({ ...p, isFeatured: e.target.checked }))}
                  className="w-4 h-4 accent-[#3B5BFF]"
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.isVisible ?? true}
                  onChange={(e) => setEditing((p) => ({ ...p, isVisible: e.target.checked }))}
                  className="w-4 h-4 accent-[#3B5BFF]"
                />
                Visible
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] disabled:opacity-60"
              >
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
