"use client";

import { useState, useTransition } from "react";
import { Search, Plus, Edit2, Key, Trash2, Shield, X, AlertTriangle, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  createUser, 
  updateUser, 
  deleteUser, 
  resetUserPassword 
} from "@/app/actions/users";
import type { Role } from "@prisma/client";

interface Props {
  initialUsers: any[];
  currentUser: {
    id: string;
    role: string;
  };
}

export default function UsersClient({ initialUsers, currentUser }: Props) {
  const [users, setUsers] = useState<any[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const [modalOpen, setModalOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [resetUser, setResetUser] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("EDITOR");
  const [password, setPassword] = useState("");
  const [resetPasswordVal, setResetPasswordVal] = useState("");

  const itemsPerPage = 8;

  const isSuperAdmin = currentUser.role === "SUPER_ADMIN";

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedUsers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreate = () => {
    if (!isSuperAdmin) {
      toast.error("Permission denied. Only Super Admins can manage users.");
      return;
    }
    setEditingUser(null);
    setName("");
    setEmail("");
    setRole("EDITOR");
    setPassword("");
    setModalOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    if (!isSuperAdmin) {
      toast.error("Permission denied. Only Super Admins can manage users.");
      return;
    }
    setEditingUser(user);
    setName(user.name || "");
    setEmail(user.email);
    setRole(user.role);
    setModalOpen(true);
  };

  const handleOpenReset = (user: any) => {
    if (!isSuperAdmin) {
      toast.error("Permission denied. Only Super Admins can reset passwords.");
      return;
    }
    setResetUser(user);
    setResetPasswordVal("");
    setResetOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (editingUser) {
        // Edit User
        const res = await updateUser(editingUser.id, { name, email, role });
        if (res.success) {
          setUsers(prev => prev.map(u => u.id === editingUser.id ? res.data : u));
          toast.success("User updated successfully.");
          setModalOpen(false);
        } else {
          toast.error(res.error || "Failed to update user.");
        }
      } else {
        // Create User
        const res = await createUser({ name, email, role, password: password || undefined });
        if (res.success) {
          setUsers(prev => [res.data, ...prev]);
          toast.success("User account created.");
          setModalOpen(false);
        } else {
          toast.error(res.error || "Failed to create user account.");
        }
      }
    });
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordVal || resetPasswordVal.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    startTransition(async () => {
      const res = await resetUserPassword(resetUser.id, resetPasswordVal);
      if (res.success) {
        toast.success(`Password reset successful for ${resetUser.name || resetUser.email}.`);
        setResetOpen(false);
      } else {
        toast.error(res.error || "Failed to reset password.");
      }
    });
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (!isSuperAdmin) {
      toast.error("Permission denied. Only Super Admins can manage users.");
      return;
    }
    if (currentUser.id === id) {
      toast.error("You cannot delete your own account.");
      return;
    }
    if (!confirm(`Are you sure you want to permanently delete the account for ${name}?`)) return;

    startTransition(async () => {
      const res = await deleteUser(id);
      if (res.success) {
        setUsers(prev => prev.filter(u => u.id !== id));
        toast.success("User account deleted.");
      } else {
        toast.error(res.error || "Failed to delete user.");
      }
    });
  };

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: "bg-red-50 text-red-700 border-red-100",
    ADMIN: "bg-blue-50 text-blue-700 border-blue-100",
    EDITOR: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">User Management</h2>
          <p className="text-sm text-gray-500">{users.length} registered administrators</p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            Create User
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-xs text-amber-800">
          <AlertTriangle className="shrink-0 text-amber-500" size={16} />
          <p>
            <strong>Permissions Warning:</strong> You are currently logged in as a non-super administrator. You can view users, but creating, editing, and deleting users is disabled.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search user by name or email…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 bg-white focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/10 outline-none transition-all"
        />
      </div>

      {/* Grid Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">User Details</th>
                <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Role</th>
                <th className="text-left text-xs font-bold text-gray-400 px-6 py-3.5">Date Added</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    <UserCheck size={32} className="mx-auto mb-2 text-gray-200" />
                    <p className="text-xs">No administrators found.</p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3B5BFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.image ? (
                            <img src={user.image} alt={user.name ?? ""} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            user.name?.charAt(0) ?? user.email.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">
                            {user.name || "Unnamed User"} {currentUser.id === user.id ? "(You)" : ""}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${roleColors[user.role]}`}>
                        {user.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isSuperAdmin && (
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-gray-400 hover:text-[#3B5BFF] hover:bg-blue-50 rounded-lg cursor-pointer"
                            title="Edit User"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleOpenReset(user)}
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                            title="Reset Password"
                          >
                            <Key size={13} />
                          </button>
                          {currentUser.id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name || user.email)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      )}
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

      {/* Create / Edit User Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">{editingUser ? "Edit User Details" : "Create User Account"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="e.g. Manish Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email / Username</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="e.g. manish@admin.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Permission Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full px-2 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                >
                  <option value="SUPER_ADMIN">Super Admin (full control)</option>
                  <option value="ADMIN">Admin (control content, settings)</option>
                  <option value="EDITOR">Editor (manage content only)</option>
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Initial Password (optional)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                    placeholder="Defaults to: admin@123"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-gray-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3B5BFF] hover:bg-[#2d4cef] rounded-xl cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Dialog */}
      {resetOpen && resetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Reset User Password</h3>
              <button onClick={() => setResetOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleResetPasswordSubmit} className="p-5 space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 text-xs text-amber-800">
                <AlertTriangle className="shrink-0 text-amber-500" size={14} />
                <p>
                  You are resetting the password for <strong>{resetUser.name || resetUser.email}</strong>. This cannot be undone.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">New Secure Password</label>
                <input
                  type="password"
                  required
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="pt-3 border-t border-gray-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResetOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isPending ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
