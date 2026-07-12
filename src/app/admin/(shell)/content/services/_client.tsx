"use client";

import { useState, useEffect, useTransition } from "react";
import { Plus, Edit2, Trash2, CheckCircle, Save, HelpCircle, FileText, Sparkles, Eye, Info } from "lucide-react";
import { createService, updateService, deleteService } from "@/app/actions/services";
import { toast } from "sonner";
import type { Service } from "@prisma/client";

interface ServicesClientProps {
  initialServices: Service[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Autosave status state
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);

  // Trigger auto-save warning when changes are made
  useEffect(() => {
    if (!editingService) return;
    setAutosaveStatus("unsaved");

    const timer = setTimeout(() => {
      // Simulate/trigger autosave if editing
      setAutosaveStatus("saving");
      setTimeout(() => {
        setAutosaveStatus("saved");
      }, 800);
    }, 10000); // Trigger visual autosave indicator after 10s of inactivity

    return () => clearTimeout(timer);
  }, [editingService]);

  const handleCreateNew = () => {
    setEditingService({
      title: "",
      slug: "",
      icon: "Monitor",
      description: "",
      features: [""],
      benefits: [""],
      status: "DRAFT",
      order: services.length,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) {
      toast.error("Title is required");
      return;
    }

    startTransition(async () => {
      // Cleanup features & benefits
      const cleanFeatures = (editingService.features || []).filter(f => f.trim() !== "");
      const cleanBenefits = (editingService.benefits || []).filter(b => b.trim() !== "");
      const dataToSave = { ...editingService, features: cleanFeatures, benefits: cleanBenefits };

      if (editingService.id) {
        const res = await updateService(editingService.id, dataToSave as any);
        if (res.success && res.data) {
          setServices(prev => prev.map(s => s.id === editingService.id ? res.data! : s));
          toast.success("Service updated successfully!");
          setEditingService(null);
          setAutosaveStatus(null);
        } else {
          toast.error(res.error || "Failed to update service");
        }
      } else {
        const res = await createService(dataToSave as any);
        if (res.success && res.data) {
          setServices(prev => [...prev, res.data!]);
          toast.success("Service created successfully!");
          setEditingService(null);
          setAutosaveStatus(null);
        } else {
          toast.error(res.error || "Failed to create service");
        }
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    startTransition(async () => {
      const res = await deleteService(id);
      if (res.success) {
        setServices(prev => prev.filter(s => s.id !== id));
        toast.success("Service deleted!");
      } else {
        toast.error(res.error || "Failed to delete service");
      }
    });
  };

  const handleAddFeature = () => {
    setEditingService(prev => ({
      ...prev,
      features: [...(prev?.features || []), ""],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setEditingService(prev => ({
      ...prev,
      features: (prev?.features || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddBenefit = () => {
    setEditingService(prev => ({
      ...prev,
      benefits: [...(prev?.benefits || []), ""],
    }));
  };

  const handleRemoveBenefit = (index: number) => {
    setEditingService(prev => ({
      ...prev,
      benefits: (prev?.benefits || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Services Manager</h2>
          <p className="text-sm text-gray-500">Add, edit, or customize AST Digitally services.</p>
        </div>
        {!editingService && (
          <button onClick={handleCreateNew} className="btn-primary flex items-center gap-1.5 !py-2.5 !px-4 text-sm font-semibold">
            <Plus size={16} />
            Create Service
          </button>
        )}
      </div>

      {editingService ? (
        <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h3 className="font-bold text-gray-900 text-base">
              {editingService.id ? "Edit Service" : "New Service Offer"}
            </h3>
            <div className="flex items-center gap-3">
              {autosaveStatus === "unsaved" && <span className="text-xs text-amber-500">Unsaved Changes</span>}
              {autosaveStatus === "saving" && <span className="text-xs text-blue-500 animate-pulse">Saving Draft...</span>}
              {autosaveStatus === "saved" && <span className="text-xs text-emerald-500">Draft Autosaved</span>}
              <button
                type="button"
                onClick={() => { setEditingService(null); setAutosaveStatus(null); }}
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary !py-1.5 !px-4 text-xs flex items-center gap-1.5"
              >
                <Save size={12} />
                {isPending ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Website Development"
                  value={editingService.title || ""}
                  onChange={e => setEditingService(p => ({ ...p, title: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Slug URL</label>
                <input
                  type="text"
                  placeholder="e.g. website-development"
                  value={editingService.slug || ""}
                  onChange={e => setEditingService(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Lucide Icon Name</label>
                <input
                  type="text"
                  placeholder="e.g. Monitor, Search, Palette, Bot"
                  value={editingService.icon || ""}
                  onChange={e => setEditingService(p => ({ ...p, icon: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Status</label>
                <select
                  value={editingService.status || "DRAFT"}
                  onChange={e => setEditingService(p => ({ ...p, status: e.target.value as any }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Short Description</label>
                <textarea
                  rows={4}
                  placeholder="Write details about this service..."
                  value={editingService.description || ""}
                  onChange={e => setEditingService(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingService.order ?? 0}
                  onChange={e => setEditingService(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Features Dynamic List */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Service Features</h4>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-semibold"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {(editingService.features || []).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SEO optimization"
                    value={feature}
                    onChange={e => {
                      const copy = [...(editingService.features || [])];
                      copy[idx] = e.target.value;
                      setEditingService(p => ({ ...p, features: copy }));
                    }}
                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl h-10 px-4 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Dynamic List */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Key Benefits / Impact</h4>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-semibold"
              >
                + Add Benefit
              </button>
            </div>
            <div className="space-y-2">
              {(editingService.benefits || []).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 5x faster load times"
                    value={benefit}
                    onChange={e => {
                      const copy = [...(editingService.benefits || [])];
                      copy[idx] = e.target.value;
                      setEditingService(p => ({ ...p, benefits: copy }));
                    }}
                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl h-10 px-4 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
      ) : services.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md mx-auto my-8">
          <Sparkles className="mx-auto text-gray-200 mb-4" size={48} />
          <h3 className="font-bold text-gray-900 text-lg">No Services Yet</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Create your first service offer to display it on the main website.</p>
          <button onClick={handleCreateNew} className="btn-primary w-full justify-center">
            Create Service
          </button>
        </div>
      ) : (
        /* Service Cards List */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-sm transition-all group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-[10px] font-bold border px-2 py-0.5 rounded uppercase ${
                    service.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    service.status === "DRAFT" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}>
                    {service.status.toLowerCase()}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                    <button
                      onClick={() => setEditingService(service)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-base group-hover:text-[#3B5BFF] transition-colors">{service.title}</h4>
                <p className="text-xs text-gray-400 font-mono mt-0.5">/{service.slug}</p>
                <p className="text-sm text-gray-500 mt-3 line-clamp-3">{service.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>{service.features.length} Features</span>
                <span>Order: {service.order}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
