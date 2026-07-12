"use client";

import { useState, useTransition } from "react";
import { Search, Mail, MailOpen, Trash2, Download, Archive, Eye } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { markLeadRead, deleteContactLead } from "@/app/actions/contact";
import type { ContactSubmission } from "@prisma/client";

interface Props {
  leads: ContactSubmission[];
}

export default function ContactLeadsClient({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<ContactSubmission | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = leads.filter(
    (l) =>
      l.firstName.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.subject.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = leads.filter((l) => !l.isRead).length;

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteContactLead(id);
      if (result.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        toast.success("Lead deleted.");
      } else {
        toast.error("Failed to delete.");
      }
    });
  }

  function handleMarkRead(id: string) {
    startTransition(async () => {
      await markLeadRead(id);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, isRead: true } : l))
      );
    });
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Subject", "Message", "Date"];
    const rows = filtered.map((l) => [
      `${l.firstName} ${l.lastName ?? ""}`.trim(),
      l.email,
      l.subject,
      l.message.replace(/,/g, ";"),
      format(new Date(l.createdAt), "yyyy-MM-dd"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    READ: "bg-gray-100 text-gray-600",
    REPLIED: "bg-green-100 text-green-700",
    ARCHIVED: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact Leads</h2>
          <p className="text-sm text-gray-500">{leads.length} total · {unreadCount} unread</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/10 outline-none transition-all"
        />
      </div>

      <div className="flex gap-6 min-h-[500px]">
        {/* List */}
        <div className="w-full sm:w-80 lg:w-96 shrink-0 space-y-2 overflow-y-auto max-h-[600px] pr-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <Mail size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No leads found.</p>
            </div>
          ) : (
            filtered.map((lead) => (
              <button
                key={lead.id}
                onClick={() => {
                  setSelectedLead(lead);
                  if (!lead.isRead) handleMarkRead(lead.id);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedLead?.id === lead.id
                    ? "border-[#3B5BFF] bg-[#3B5BFF]/5"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${!lead.isRead ? "text-gray-900" : "text-gray-600"}`}>
                      {lead.firstName} {lead.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{lead.email}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{lead.subject}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                    {!lead.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {format(new Date(lead.createdAt), "MMM d, yyyy")}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
          {selectedLead ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h3>
                  <a href={`mailto:${selectedLead.email}`} className="text-sm text-[#3B5BFF] hover:underline">
                    {selectedLead.email}
                  </a>
                  {selectedLead.phone && (
                    <p className="text-sm text-gray-500">{selectedLead.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(selectedLead.id)}
                    disabled={isPending}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Subject</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedLead.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Message</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Received</p>
                  <p className="text-sm text-gray-600">{format(new Date(selectedLead.createdAt), "PPPp")}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <a
                  href={`mailto:${selectedLead.email}?subject=Re: ${selectedLead.subject}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF] text-white text-sm font-medium rounded-xl hover:bg-[#2d4cef] transition-colors"
                >
                  <Mail size={14} />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <Eye size={36} className="mb-3 text-gray-200" />
              <p className="text-sm">Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
