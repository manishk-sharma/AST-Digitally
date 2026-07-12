"use client";

import { useState, useTransition } from "react";
import { deleteJobPosting } from "@/app/actions/careers";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import type { JobPosting } from "@prisma/client";

interface Props { jobs: JobPosting[] }

const EMPTY: Partial<JobPosting> = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full-time",
  description: "",
  responsibilities: [],
  requirements: [],
  benefits: [],
  status: "DRAFT",
  order: 0,
};

export default function CareersClient({ jobs: init }: Props) {
  const [jobs, setJobs] = useState(init);
  const [editing, setEditing] = useState<Partial<JobPosting> | null>(null);
  const [isPending, startTransition] = useTransition();

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-600",
    OPEN: "bg-green-100 text-green-700",
    CLOSED: "bg-red-100 text-red-600",
    PAUSED: "bg-amber-100 text-amber-700",
  };

  function handleDelete(id: string) {
    if (!confirm("Delete this job posting?")) return;
    startTransition(async () => {
      try {
        const res = await deleteJobPosting(id);
        if (res.success) {
          setJobs((prev) => prev.filter((j) => j.id !== id));
          toast.success("Deleted.");
        } else {
          toast.error("Failed to delete.");
        }
      } catch {
        toast.error("Failed to delete.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Job Postings</h2>
          <p className="text-sm text-gray-500">{jobs.length} positions</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF] text-white text-sm font-medium rounded-xl hover:bg-[#2d4cef] transition-colors"
        >
          <Plus size={15} /> Post a Job
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No job postings yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Location</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-gray-600">{job.department}</td>
                  <td className="px-6 py-4 text-gray-600">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setEditing({ ...job })} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(job.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
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

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-4 my-4">
            <h3 className="text-lg font-bold">{editing.id ? "Edit Job" : "New Job Posting"}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Title *</label>
                <input className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.title ?? ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))} placeholder="Frontend Developer" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Department</label>
                <input className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.department ?? ""} onChange={(e) => setEditing((p) => ({ ...p, department: e.target.value }))} placeholder="Engineering" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Location</label>
                <input className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  value={editing.location ?? ""} onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))} placeholder="Remote / Mumbai" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                <select className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none bg-white"
                  value={editing.employmentType ?? "Full-time"} onChange={(e) => setEditing((p) => ({ ...p, employmentType: e.target.value }))}>
                  <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Status</label>
                <select className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none bg-white"
                  value={editing.status ?? "DRAFT"} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value as typeof editing.status }))}>
                  <option value="DRAFT">Draft</option><option value="OPEN">Open</option><option value="PAUSED">Paused</option><option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Description *</label>
                <textarea rows={4} className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none resize-none"
                  value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the role…" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
              <button disabled={isPending} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] disabled:opacity-60">
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
