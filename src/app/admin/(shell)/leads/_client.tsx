"use client";

import { useState, useTransition } from "react";
import { Search, Mail, Trash2, Download, Archive, Eye, Check, ChevronLeft, ChevronRight, X, Phone, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { markLeadRead, deleteContactLead, archiveContactLead } from "@/app/actions/contact";
import type { ContactSubmission } from "@prisma/client";

interface Props {
  leads: ContactSubmission[];
}

export default function UnifiedLeadsClient({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState<ContactSubmission[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<ContactSubmission | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 10;

  // Filter
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
      (lead.lastName && lead.lastName.toLowerCase().includes(search.toLowerCase())) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.subject.toLowerCase().includes(search.toLowerCase()) ||
      (lead.message && lead.message.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = 
      statusFilter === "ALL" || 
      (statusFilter === "NEW" && lead.status === "NEW") ||
      (statusFilter === "READ" && lead.status === "READ") ||
      (statusFilter === "ARCHIVED" && lead.status === "ARCHIVED");

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = leads.filter((l) => l.status === "NEW").length;

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    startTransition(async () => {
      const result = await deleteContactLead(id);
      if (result.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        toast.success("Lead deleted successfully.");
      } else {
        toast.error("Failed to delete lead.");
      }
    });
  };

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      const result = await markLeadRead(id);
      if (result.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, isRead: true, status: "READ" } : l))
        );
        // Sync selected lead state if open
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => prev ? { ...prev, isRead: true, status: "READ" } : null);
        }
        toast.success("Lead marked as read.");
      } else {
        toast.error("Failed to update status.");
      }
    });
  };

  const handleArchive = (id: string) => {
    startTransition(async () => {
      const result = await archiveContactLead(id);
      if (result.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: "ARCHIVED" } : l))
        );
        // Sync selected lead state if open
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => prev ? { ...prev, status: "ARCHIVED" } : null);
        }
        toast.success("Lead archived.");
      } else {
        toast.error("Failed to archive lead.");
      }
    });
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Subject", "Message", "Status", "Date"];
    const rows = filteredLeads.map((l) => [
      `${l.firstName} ${l.lastName ?? ""}`.trim(),
      l.email,
      l.phone || "",
      l.subject.replace(/"/g, '""'),
      l.message.replace(/"/g, '""').replace(/\n/g, " "),
      l.status,
      format(new Date(l.createdAt), "yyyy-MM-dd HH:mm"),
    ]);
    const csvContent = [headers, ...rows]
      .map((r) => r.map((field) => `"${field}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ast-contact-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV export complete.");
  };

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    READ: "bg-gray-50 text-gray-500 border-gray-200",
    REPLIED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    ARCHIVED: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Contact Leads</h2>
          <p className="text-sm text-gray-500">{leads.length} total · {unreadCount} new</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, subject, message..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 bg-white focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/10 outline-none transition-all"
          />
        </div>

        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl w-fit shrink-0">
          {["ALL", "NEW", "READ", "ARCHIVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatusFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-[450px]">
        {/* Table List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between h-fit">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Name</th>
                  <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Subject</th>
                  <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Date</th>
                  <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <Mail size={32} className="mx-auto mb-2 text-gray-200" />
                      <p className="text-xs">No contact leads found.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                        lead.status === "NEW" ? "bg-blue-50/10 font-medium" : ""
                      }`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {lead.status === "NEW" && (
                            <span className="w-2 h-2 bg-[#3B5BFF] rounded-full shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {lead.firstName} {lead.lastName || ""}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-700 truncate max-w-xs">{lead.subject}</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-xs">{lead.message}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                        {format(new Date(lead.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                            title="View Detail"
                          >
                            <Eye size={14} />
                          </button>
                          {lead.status === "NEW" && (
                            <button
                              onClick={() => handleMarkRead(lead.id)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                              title="Mark Read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          {lead.status !== "ARCHIVED" && (
                            <button
                              onClick={() => handleArchive(lead.id)}
                              className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                              title="Archive"
                            >
                              <Archive size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50/50">
              <span className="text-[10px] text-gray-400">
                Page {currentPage} of {totalPages} ({(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft size={13} />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lead Detail Panel Drawer */}
        {selectedLead && (
          <div className="w-full lg:w-96 shrink-0 bg-white rounded-2xl border border-gray-100 p-5 shadow-lg space-y-5 h-fit">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div>
                <h3 className="font-bold text-gray-950">Lead Details</h3>
                <span className={`text-[9px] px-2 py-0.5 mt-1 inline-block rounded-full font-bold border ${statusColors[selectedLead.status]}`}>
                  {selectedLead.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Contact Info</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{selectedLead.firstName} {selectedLead.lastName || ""}</p>
                <a href={`mailto:${selectedLead.email}`} className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 mt-1 font-medium">
                  <Mail size={11} /> {selectedLead.email}
                </a>
                {selectedLead.phone && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1.5">
                    <Phone size={11} /> {selectedLead.phone}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Received Date</p>
                <p className="text-xs text-gray-700 mt-1 flex items-center gap-1">
                  <Calendar size={11} />
                  {format(new Date(selectedLead.createdAt), "PPPp")}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Message Subject</p>
                <p className="text-xs font-bold text-gray-900 mt-1">{selectedLead.subject}</p>
              </div>

              <div className="pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Message Content</p>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mt-1">
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
              <a
                href={`mailto:${selectedLead.email}?subject=Re: ${selectedLead.subject}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#3B5BFF] text-white text-xs font-bold rounded-xl hover:bg-[#2d4cef] transition-colors shadow-sm cursor-pointer"
              >
                Reply <Mail size={12} />
              </a>

              {selectedLead.status === "NEW" && (
                <button
                  onClick={() => handleMarkRead(selectedLead.id)}
                  className="px-3.5 py-2 text-xs font-semibold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                >
                  Mark Read
                </button>
              )}

              {selectedLead.status !== "ARCHIVED" && (
                <button
                  onClick={() => handleArchive(selectedLead.id)}
                  className="px-3.5 py-2 text-xs font-semibold border border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                >
                  Archive
                </button>
              )}

              <button
                onClick={() => handleDelete(selectedLead.id)}
                className="ml-auto p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Delete Lead"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
