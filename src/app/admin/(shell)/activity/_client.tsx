"use client";

import { useState } from "react";
import { Clock, Shield, Search, ArrowRight, Activity, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface LogEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  meta: any;
  createdAt: Date | string;
  user: {
    name: string | null;
    email: string;
  };
}

interface Props {
  initialLogs: LogEntry[];
}

export default function ActivityClient({ initialLogs }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const getActionColor = (action: string) => {
    if (action.includes("CREATE") || action.includes("SEED")) return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (action.includes("UPDATE")) return "bg-blue-50 text-blue-600 border-blue-100";
    if (action.includes("DELETE") || action.includes("RESET")) return "bg-rose-50 text-rose-600 border-rose-100";
    return "bg-gray-50 text-gray-600 border-gray-100";
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase()) ||
      (log.user.name && log.user.name.toLowerCase().includes(search.toLowerCase())) ||
      log.user.email.toLowerCase().includes(search.toLowerCase());

    const matchesAction = 
      actionFilter === "ALL" ||
      (actionFilter === "CREATE" && log.action.includes("CREATE")) ||
      (actionFilter === "UPDATE" && log.action.includes("UPDATE")) ||
      (actionFilter === "DELETE" && log.action.includes("DELETE")) ||
      (actionFilter === "SYSTEM" && (log.action.includes("SEED") || log.action.includes("RESET") || log.action === "SYSTEM"));

    return matchesSearch && matchesAction;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity by actor, action, or entity…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 bg-white focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/10 outline-none transition-all"
          />
        </div>

        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit shrink-0">
          {["ALL", "CREATE", "UPDATE", "DELETE", "SYSTEM"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActionFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                actionFilter === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between min-h-[350px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Actor</th>
                <th className="py-4 px-6">Action</th>
                <th className="py-4 px-6">Entity</th>
                <th className="py-4 px-6">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400">
                    <Shield className="mx-auto mb-2 text-gray-200" size={36} />
                    <p className="text-xs">No activity logs found matching the filters.</p>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-gray-400 flex items-center gap-1.5 mt-2">
                      <Clock size={12} />
                      {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-[10px] font-bold">
                          {(log.user.name || log.user.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900 leading-tight">{log.user.name || "System"}</p>
                          <p className="text-[10px] text-gray-400 leading-tight">{log.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap font-mono text-xs text-gray-500">
                      {log.entity}
                    </td>
                    <td className="py-4 px-6 truncate max-w-xs font-mono text-[10px] text-gray-400">
                      {log.meta ? (typeof log.meta === "object" ? JSON.stringify(log.meta) : String(log.meta)) : "—"}
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
              Page {currentPage} of {totalPages}
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
    </div>
  );
}
