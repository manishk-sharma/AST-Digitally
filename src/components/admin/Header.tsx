"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, ExternalLink, Menu, LogOut, User, Settings, Shield, Clock, Mail, Trash2, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { 
  getNotifications, 
  markNotificationRead, 
  markAllNotificationsRead, 
  deleteNotification 
} from "@/app/actions/notifications";

interface HeaderUser {
  name?: string | null;
  email?: string | null;
  role?: string;
  image?: string | null;
}

const BREADCRUMBS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content/homepage": "Homepage",
  "/admin/content/services": "Services",
  "/admin/content/about": "About",
  "/admin/content/case-studies": "Case Studies",
  "/admin/content/careers": "Careers",
  "/admin/content/testimonials": "Testimonials",
  "/admin/content/faq": "FAQ",
  "/admin/content/navigation": "Navigation",
  "/admin/content/footer": "Footer",
  "/admin/media": "Media Library",
  "/admin/seo": "SEO Manager",
  "/admin/leads/contact": "Contact Leads",
  "/admin/leads/careers": "Career Applications",
  "/admin/leads": "Contact Leads",
  "/admin/analytics": "Analytics",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
  "/admin/profile": "Profile",
  "/admin/activity": "Activity Logs",
};

export default function AdminHeader({
  user,
  onMenuToggle,
}: {
  user: HeaderUser;
  onMenuToggle?: () => void;
}) {
  const pathname = usePathname();
  const pageTitle = BREADCRUMBS[pathname] ?? "Admin";

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Fetch notifications
  const loadNotifications = async () => {
    const res = await getNotifications();
    if (res.success) {
      setNotifications(res.data);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Poll notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = async (id: string) => {
    const res = await markNotificationRead(id);
    if (res.success) {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    }
  };

  const handleMarkAllRead = async () => {
    const res = await markAllNotificationsRead();
    if (res.success) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const res = await deleteNotification(id);
    if (res.success) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-100 shrink-0">
      {/* Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden shrink-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{pageTitle}</h1>
          <p className="text-[10px] sm:text-xs text-gray-400 truncate">
            Admin CMS &rsaquo; {pageTitle}
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* View site link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink size={12} />
          View Site
        </Link>

        {/* Notification bell dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Bell size={16} className="text-gray-500" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#3B5BFF] rounded-full text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown list */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden py-1 z-50">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-900">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-[#3B5BFF] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                  >
                    <Check size={10} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <AlertCircle size={20} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">No notifications yet.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-3.5 flex items-start gap-3 transition-colors ${!notif.isRead ? "bg-blue-50/40" : ""}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs text-gray-700 leading-normal ${!notif.isRead ? "font-semibold" : ""}`}>
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(notif.createdAt))} ago
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {!notif.isRead && (
                          <button 
                            onClick={() => handleMarkRead(notif.id)}
                            className="p-1 text-gray-400 hover:text-[#3B5BFF] rounded cursor-pointer"
                            title="Mark as read"
                          >
                            <Check size={12} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteNotification(notif.id)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#3B5BFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name?.charAt(0) ?? user.email?.charAt(0) ?? "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-tight">{user.name ?? "Admin"}</p>
              <p className="text-xs text-gray-400 leading-tight">{user.role?.replace("_", " ")}</p>
            </div>
          </button>

          {/* User profile dropdown list */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50">
                <p className="text-xs font-semibold text-gray-900 truncate">{user.name ?? "Admin"}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <Link 
                  href="/admin/profile" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={13} className="text-gray-400" />
                  My Profile
                </Link>
                <Link 
                  href="/admin/settings" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={13} className="text-gray-400" />
                  Account Settings
                </Link>
                <Link 
                  href="/admin/settings?tab=security" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Shield size={13} className="text-gray-400" />
                  Change Password
                </Link>
                <Link 
                  href="/admin/activity" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Clock size={13} className="text-gray-400" />
                  Activity Log
                </Link>
              </div>

              <div className="border-t border-gray-50 pt-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
