import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { User, Mail, Shield, Calendar, Phone, Clock, Key } from "lucide-react";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-heading">My Profile</h2>
        <p className="text-sm text-gray-500">Manage your administrator account details and password.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Profile header cover */}
        <div className="h-32 bg-gradient-to-r from-[#3B5BFF] to-[#607cff] relative" />
        
        {/* Profile info block */}
        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-[#3B5BFF] text-white flex items-center justify-center font-bold text-3xl shadow-md z-10 overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt={user.name ?? "User"} className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0) ?? user.email.charAt(0)
                )}
              </div>
              <div className="text-center sm:text-left z-10">
                <h3 className="text-xl font-bold text-gray-900">{user.name ?? "Administrator"}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                  <Shield size={12} /> {user.role.replace("_", " ")}
                </span>
              </div>
            </div>

            <Link 
              href="/admin/settings?tab=security"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#3B5BFF] text-white text-xs font-bold rounded-xl hover:bg-[#2d4cef] transition-colors shadow-sm self-center sm:self-end"
            >
              <Key size={13} />
              Change Password
            </Link>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Name</p>
                  <p className="text-sm font-medium text-gray-900">{user.name ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">+91 80841 58221</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Account Role</p>
                  <p className="text-sm font-medium text-gray-900">{user.role.replace("_", " ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(user.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Last login</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(), "MMMM d, yyyy h:mm a")} (Current Session)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
