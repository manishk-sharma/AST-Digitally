"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileText, Eye } from "lucide-react";
import type { CareerApplication, JobPosting } from "@prisma/client";

type ApplicationWithJob = CareerApplication & { job: Pick<JobPosting, "title"> | null };

interface Props { applications: ApplicationWithJob[] }

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  REVIEWING: "bg-amber-100 text-amber-700",
  SHORTLISTED: "bg-purple-100 text-purple-700",
  REJECTED: "bg-red-100 text-red-600",
  HIRED: "bg-green-100 text-green-700",
};

export default function CareersLeadsClient({ applications }: Props) {
  const [selected, setSelected] = useState<ApplicationWithJob | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Career Applications</h2>
        <p className="text-sm text-gray-500">{applications.length} total applications</p>
      </div>

      <div className="flex gap-6 min-h-[500px]">
        <div className="w-80 shrink-0 space-y-2 overflow-y-auto max-h-[600px] pr-1">
          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <FileText size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No applications yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <button key={app.id} onClick={() => setSelected(app)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === app.id ? "border-[#3B5BFF] bg-[#3B5BFF]/5" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                <p className="text-xs text-gray-400 truncate">{app.email}</p>
                <p className="text-xs text-gray-500 mt-1">{app.job?.title ?? "General Application"}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[app.status]}`}>{app.status}</span>
                  <span className="text-xs text-gray-400">{format(new Date(app.createdAt), "MMM d")}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
          {selected ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
              <a href={`mailto:${selected.email}`} className="text-sm text-[#3B5BFF] hover:underline block">{selected.email}</a>
              {selected.phone && <p className="text-sm text-gray-600">{selected.phone}</p>}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Applied for</p>
                  <p className="text-sm font-semibold text-gray-900">{selected.job?.title ?? "General Application"}</p>
                </div>
                {selected.coverLetter && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Cover Letter</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{selected.coverLetter}</p>
                  </div>
                )}
                {selected.resumeUrl && (
                  <a href={selected.resumeUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#3B5BFF] hover:underline">
                    <FileText size={14} /> View Resume
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <Eye size={36} className="mb-3 text-gray-200" />
              <p className="text-sm">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
