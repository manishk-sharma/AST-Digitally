"use client";

import { useState, useEffect, useTransition } from "react";
import { Plus, Edit2, Trash2, CheckCircle, Save, Star, Sparkles, AlertCircle } from "lucide-react";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from "@/app/actions/case-studies";
import { toast } from "sonner";
import type { CaseStudy } from "@prisma/client";

interface CaseStudiesClientProps {
  initialCaseStudies: CaseStudy[];
}

interface MetricItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export default function CaseStudiesClient({ initialCaseStudies }: CaseStudiesClientProps) {
  const [studies, setStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [editingStudy, setEditingStudy] = useState<Partial<CaseStudy> | null>(null);
  const [isPending, startTransition] = useTransition();

  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | null>(null);

  useEffect(() => {
    if (!editingStudy) return;
    setAutosaveStatus("unsaved");

    const timer = setTimeout(() => {
      setAutosaveStatus("saving");
      setTimeout(() => {
        setAutosaveStatus("saved");
      }, 800);
    }, 10000);

    return () => clearTimeout(timer);
  }, [editingStudy]);

  const handleCreateNew = () => {
    setEditingStudy({
      projectName: "",
      slug: "",
      client: "",
      industry: "",
      description: "",
      challenge: "",
      solution: "",
      results: "",
      metrics: [] as any,
      technologies: [""],
      isFeatured: false,
      status: "DRAFT",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudy?.projectName) {
      toast.error("Project name is required");
      return;
    }

    startTransition(async () => {
      const cleanTechs = (editingStudy.technologies || []).filter(t => t.trim() !== "");
      const dataToSave = { ...editingStudy, technologies: cleanTechs };

      if (editingStudy.id) {
        const res = await updateCaseStudy(editingStudy.id, dataToSave as any);
        if (res.success && res.data) {
          setStudies(prev => prev.map(s => s.id === editingStudy.id ? res.data! : s));
          toast.success("Case study updated!");
          setEditingStudy(null);
          setAutosaveStatus(null);
        } else {
          toast.error(res.error || "Failed to update case study");
        }
      } else {
        const res = await createCaseStudy(dataToSave as any);
        if (res.success && res.data) {
          setStudies(prev => [...prev, res.data!]);
          toast.success("Case study created!");
          setEditingStudy(null);
          setAutosaveStatus(null);
        } else {
          toast.error(res.error || "Failed to create case study");
        }
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    startTransition(async () => {
      const res = await deleteCaseStudy(id);
      if (res.success) {
        setStudies(prev => prev.filter(s => s.id !== id));
        toast.success("Case study deleted!");
      } else {
        toast.error(res.error || "Failed to delete case study");
      }
    });
  };

  const handleAddMetric = () => {
    const currentMetrics = (editingStudy?.metrics as any) || [];
    setEditingStudy(prev => ({
      ...prev,
      metrics: [...currentMetrics, { label: "", value: "", prefix: "", suffix: "" }] as any,
    }));
  };

  const handleRemoveMetric = (index: number) => {
    const currentMetrics = (editingStudy?.metrics as any) || [];
    setEditingStudy(prev => ({
      ...prev,
      metrics: currentMetrics.filter((_: any, i: number) => i !== index) as any,
    }));
  };

  const handleAddTech = () => {
    setEditingStudy(prev => ({
      ...prev,
      technologies: [...(prev?.technologies || []), ""],
    }));
  };

  const handleRemoveTech = (index: number) => {
    setEditingStudy(prev => ({
      ...prev,
      technologies: (prev?.technologies || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Case Studies Manager</h2>
          <p className="text-sm text-gray-500">Showcase your portfolio, impact metrics, and client deliverables.</p>
        </div>
        {!editingStudy && (
          <button onClick={handleCreateNew} className="btn-primary flex items-center gap-1.5 !py-2.5 !px-4 text-sm font-semibold">
            <Plus size={16} />
            Create Case Study
          </button>
        )}
      </div>

      {editingStudy ? (
        <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h3 className="font-bold text-gray-900 text-base">
              {editingStudy.id ? "Edit Case Study" : "New Case Study"}
            </h3>
            <div className="flex items-center gap-3">
              {autosaveStatus === "unsaved" && <span className="text-xs text-amber-500">Unsaved Changes</span>}
              {autosaveStatus === "saving" && <span className="text-xs text-blue-500 animate-pulse">Saving Draft...</span>}
              {autosaveStatus === "saved" && <span className="text-xs text-emerald-500">Draft Autosaved</span>}
              <button
                type="button"
                onClick={() => { setEditingStudy(null); setAutosaveStatus(null); }}
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
                {isPending ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Risk Platform"
                  value={editingStudy.projectName || ""}
                  onChange={e => setEditingStudy(p => ({ ...p, projectName: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FinVault Technologies"
                  value={editingStudy.client || ""}
                  onChange={e => setEditingStudy(p => ({ ...p, client: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech"
                    value={editingStudy.industry || ""}
                    onChange={e => setEditingStudy(p => ({ ...p, industry: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. fintech-ai-platform"
                    value={editingStudy.slug || ""}
                    onChange={e => setEditingStudy(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 h-11 mt-6">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={editingStudy.isFeatured || false}
                    onChange={e => setEditingStudy(p => ({ ...p, isFeatured: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#3B5BFF] focus:ring-[#3B5BFF]"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-semibold text-gray-700">Featured Study</label>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Status</label>
                  <select
                    value={editingStudy.status || "DRAFT"}
                    onChange={e => setEditingStudy(p => ({ ...p, status: e.target.value as any }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl h-11 px-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Overview Description</label>
                <textarea
                  rows={4}
                  placeholder="Explain the project summary..."
                  value={editingStudy.description || ""}
                  onChange={e => setEditingStudy(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Project Challenge</label>
                <textarea
                  rows={3}
                  placeholder="What was the challenge?"
                  value={editingStudy.challenge || ""}
                  onChange={e => setEditingStudy(p => ({ ...p, challenge: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">AST Solution</label>
              <textarea
                rows={3}
                placeholder="What was your solution?"
                value={editingStudy.solution || ""}
                onChange={e => setEditingStudy(p => ({ ...p, solution: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Results Delivered</label>
              <textarea
                rows={3}
                placeholder="What were the outcomes?"
                value={editingStudy.results || ""}
                onChange={e => setEditingStudy(p => ({ ...p, results: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#3B5BFF] transition-all resize-none"
              />
            </div>
          </div>

          {/* Metrics Dynamic Grid */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Impact Metrics & KPIs</h4>
              <button
                type="button"
                onClick={handleAddMetric}
                className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-semibold"
              >
                + Add Metric
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {((editingStudy.metrics as any) || []).map((metric: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 border border-gray-100 rounded-xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="absolute top-2 right-2 text-rose-500 hover:bg-rose-50 p-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Prefix</label>
                      <input
                        type="text"
                        placeholder="e.g. $, +"
                        value={metric.prefix || ""}
                        onChange={e => {
                          const copy = [...((editingStudy.metrics as any) || [])];
                          copy[idx].prefix = e.target.value;
                          setEditingStudy(p => ({ ...p, metrics: copy as any }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Value</label>
                      <input
                        type="text"
                        placeholder="e.g. 78, 50x"
                        value={metric.value || ""}
                        onChange={e => {
                          const copy = [...((editingStudy.metrics as any) || [])];
                          copy[idx].value = e.target.value;
                          setEditingStudy(p => ({ ...p, metrics: copy as any }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Suffix</label>
                      <input
                        type="text"
                        placeholder="e.g. %, MRR"
                        value={metric.suffix || ""}
                        onChange={e => {
                          const copy = [...((editingStudy.metrics as any) || [])];
                          copy[idx].suffix = e.target.value;
                          setEditingStudy(p => ({ ...p, metrics: copy as any }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Fraud reduction"
                        value={metric.label || ""}
                        onChange={e => {
                          const copy = [...((editingStudy.metrics as any) || [])];
                          copy[idx].label = e.target.value;
                          setEditingStudy(p => ({ ...p, metrics: copy as any }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg h-9 px-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Dynamic List */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Technologies Used</h4>
              <button
                type="button"
                onClick={handleAddTech}
                className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-semibold"
              >
                + Add Tech
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(editingStudy.technologies || []).map((tech, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1 rounded-xl">
                  <input
                    type="text"
                    placeholder="e.g. OpenAI"
                    value={tech}
                    onChange={e => {
                      const copy = [...(editingStudy.technologies || [])];
                      copy[idx] = e.target.value;
                      setEditingStudy(p => ({ ...p, technologies: copy }));
                    }}
                    className="bg-transparent border-none text-xs focus:ring-0 focus:outline-none w-20"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-rose-500 hover:bg-rose-50 p-0.5 rounded"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
      ) : studies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md mx-auto my-8">
          <Sparkles className="mx-auto text-gray-200 mb-4" size={48} />
          <h3 className="font-bold text-gray-900 text-lg">No Case Studies Yet</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Create a case study to display client success metrics on the site.</p>
          <button onClick={handleCreateNew} className="btn-primary w-full justify-center">
            Create Case Study
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map(study => (
            <div key={study.id} className={`bg-white border rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm transition-all group ${
              study.isFeatured ? "border-[#3B5BFF]/30 shadow-sm" : "border-gray-100"
            }`}>
              {study.isFeatured && (
                <span className="absolute top-3 right-3 text-[9px] font-bold tracking-wider uppercase bg-[#3B5BFF]/10 text-[#3B5BFF] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={8} className="fill-[#3B5BFF]" />
                  Featured
                </span>
              )}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold border px-2 py-0.5 rounded uppercase ${
                    study.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    study.status === "DRAFT" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}>
                    {study.status.toLowerCase()}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                    <button
                      onClick={() => setEditingStudy(study)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(study.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 text-lg">{study.projectName}</h4>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{study.client} · {study.industry}</p>
                <p className="text-sm text-gray-500 mt-4 line-clamp-3">{study.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {study.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="bg-gray-50 border border-gray-100 text-[10px] font-semibold text-gray-500 px-2 py-0.5 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>{((study.metrics as any) || []).length} Metrics</span>
                <span>Slug: /{study.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
