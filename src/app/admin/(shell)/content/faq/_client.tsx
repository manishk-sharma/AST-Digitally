"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { createFAQ, updateFAQ, deleteFAQ } from "@/app/actions/content";
import type { FAQ } from "@prisma/client";

interface Props { faqs: FAQ[] }

const EMPTY: Omit<FAQ, "id" | "createdAt" | "updatedAt"> = {
  question: "",
  answer: "",
  category: null,
  order: 0,
  isVisible: true,
};

export default function FAQClient({ faqs: init }: Props) {
  const [items, setItems] = useState(init);
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    if (!editing) return;
    startTransition(async () => {
      if (editing.id) {
        const res = await updateFAQ(editing.id, editing);
        if (res.success && res.data) {
          setItems((prev) => prev.map((f) => (f.id === editing.id ? res.data! : f)));
          toast.success("Updated.");
        } else toast.error("Failed.");
      } else {
        const res = await createFAQ(editing);
        if (res.success && res.data) {
          setItems((prev) => [...prev, res.data!]);
          toast.success("Created.");
        } else toast.error("Failed.");
      }
      setEditing(null);
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    startTransition(async () => {
      const res = await deleteFAQ(id);
      if (res.success) {
        setItems((prev) => prev.filter((f) => f.id !== id));
        toast.success("Deleted.");
      } else toast.error("Failed.");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">FAQ Manager</h2>
          <p className="text-sm text-gray-500">{items.length} questions</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF] text-white text-sm font-medium rounded-xl hover:bg-[#2d4cef] transition-colors"
        >
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-sm text-gray-400">No FAQs yet. Add your first question above.</p>
          </div>
        ) : (
          items.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4">
                <button
                  onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  <span className="flex-1 text-sm font-semibold text-gray-900">{faq.question}</span>
                  {expanded === faq.id ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditing({ ...faq })} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {expanded === faq.id && (
                <div className="px-5 pb-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                  {faq.category && (
                    <span className="mt-2 inline-block text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{faq.category}</span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold">{editing.id ? "Edit FAQ" : "New FAQ"}</h3>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Question *</label>
              <input
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                value={editing.question ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p, question: e.target.value }))}
                placeholder="What is your pricing model?"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Answer *</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none resize-none"
                value={editing.answer ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p, answer: e.target.value }))}
                placeholder="We offer flexible pricing…"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Category (optional)</label>
              <input
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                value={editing.category ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))}
                placeholder="Pricing"
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={editing.isVisible ?? true}
                onChange={(e) => setEditing((p) => ({ ...p, isVisible: e.target.checked }))}
                className="w-4 h-4 accent-[#3B5BFF]" />
              Visible on website
            </label>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={isPending} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] disabled:opacity-60">
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
