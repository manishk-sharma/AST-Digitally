import type { Metadata } from "next";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Users as UsersIcon, Shield } from "lucide-react";
import { format } from "date-fns";

export const metadata: Metadata = { title: "Users" };

async function getUsers() {
  try {
    return await db.user.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function UsersPage() {
  const session = await auth();
  const users = await getUsers();

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: "bg-red-100 text-red-700",
    ADMIN: "bg-blue-100 text-blue-700",
    EDITOR: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500">{users.length} admin users</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <UsersIcon size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No users found. Run the seed script to create the first admin.</p>
            <code className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg mt-3 inline-block">
              npx ts-node prisma/seed.ts
            </code>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">User</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Role</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3B5BFF] flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0) ?? user.email.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[user.role]}`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
