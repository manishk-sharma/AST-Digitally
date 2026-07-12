"use client";

import { Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderUser {
  name?: string | null;
  email?: string | null;
  role?: string;
}

const BREADCRUMBS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content/homepage": "Homepage",
  "/admin/content/services": "Services",
  "/admin/content/pricing": "Pricing",
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
  "/admin/analytics": "Analytics",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

export default function AdminHeader({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const pageTitle = BREADCRUMBS[pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shrink-0">
      {/* Title & Breadcrumb */}
      <div>
        <h1 className="text-base font-semibold text-gray-900">{pageTitle}</h1>
        <p className="text-xs text-gray-400">
          Admin CMS &rsaquo; {pageTitle}
        </p>
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

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
          <Bell size={16} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3B5BFF] rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#3B5BFF] flex items-center justify-center text-white text-xs font-bold">
            {user.name?.charAt(0) ?? user.email?.charAt(0) ?? "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 leading-tight">{user.name ?? "Admin"}</p>
            <p className="text-xs text-gray-400 leading-tight">{user.role?.replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
