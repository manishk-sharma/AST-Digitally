"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Search,
  MessageSquare,
  Briefcase,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Home,
  Star,
  HelpCircle,
  Navigation,
  Footprints,
  Code,
  DollarSign,
  BookOpen,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Content",
    icon: Layers,
    children: [
      { label: "Homepage", href: "/admin/content/homepage", icon: Home },
      { label: "Services", href: "/admin/content/services", icon: Code },
      { label: "About", href: "/admin/content/about", icon: BookOpen },
      { label: "Case Studies", href: "/admin/content/case-studies", icon: Briefcase },
      { label: "Careers", href: "/admin/content/careers", icon: Users },
      { label: "Testimonials", href: "/admin/content/testimonials", icon: Star },
      { label: "FAQ", href: "/admin/content/faq", icon: HelpCircle },
      { label: "Navigation", href: "/admin/content/navigation", icon: Navigation },
      { label: "Footer", href: "/admin/content/footer", icon: Footprints },
    ],
  },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "SEO", href: "/admin/seo", icon: Search },
  {
    label: "Leads",
    icon: MessageSquare,
    children: [
      { label: "Contact Leads", href: "/admin/leads", icon: MessageSquare },
      { label: "Career Applications", href: "/admin/leads/careers", icon: FileText },
    ],
  },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface NavItemComponentProps {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}

function NavItemComponent({ item, collapsed, depth = 0 }: NavItemComponentProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (item.children) {
      return item.children.some((child) => child.href && pathname.startsWith(child.href));
    }
    return false;
  });

  const isActive = item.href ? (
    item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
  ) : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
            "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <item.icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </div>
          {!collapsed && (
            <ChevronDown
              size={14}
              className={cn(
                "shrink-0 text-gray-400 transition-transform",
                open && "rotate-180"
              )}
            />
          )}
        </button>
        {!collapsed && open && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-100 pl-3">
            {item.children.map((child) => (
              <NavItemComponent key={child.label} item={child} collapsed={false} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
        collapsed ? "justify-center" : "",
        isActive
          ? "bg-[#3B5BFF]/10 text-[#3B5BFF] font-semibold"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      )}
      title={collapsed ? item.label : undefined}
    >
      <item.icon size={18} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {isActive && !collapsed && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B5BFF]" />
      )}
    </Link>
  );
}

export default function AdminSidebar({ user, onClose }: { user: SidebarUser; onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 shrink-0",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "relative flex items-center gap-3 px-4 py-5 border-b border-gray-100",
        collapsed ? "justify-center" : "justify-between",
        onClose && "pr-14"
      )}>
        <Link href="/admin" className="flex items-center gap-3 min-w-0">
          <div className="relative h-8 overflow-hidden shrink-0 flex items-center" style={{ width: collapsed ? '32px' : 'auto' }}>
            <img
              src="/AST Logo.png"
              alt="AST Digitally"
              className="h-8 object-contain object-left shrink-0"
              style={{ maxWidth: collapsed ? 'none' : '100%', width: collapsed ? '120px' : 'auto' }}
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs text-gray-400 truncate">Admin CMS</p>
            </div>
          )}
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 border border-gray-100 bg-white shadow-sm z-50 cursor-pointer lg:hidden shrink-0"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItemComponent key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-[#3B5BFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name?.charAt(0) ?? user.email?.charAt(0) ?? "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-900 truncate">{user.name ?? "Admin"}</p>
              <p className="text-xs text-gray-400 truncate">{user.role?.replace("_", " ")}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
            "text-red-500 hover:bg-red-50 hover:text-red-600",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute bottom-24 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full hidden lg:flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        style={{ position: "absolute", bottom: "90px", right: "-12px" }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
