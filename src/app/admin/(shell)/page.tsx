import type { Metadata } from "next";
import { auth } from "@/auth";
import { db, checkDbConnection } from "@/lib/db";
import DatabaseWarning from "@/components/admin/DatabaseWarning";
import {
  MessageSquare,
  Briefcase,
  Users,
  Star,
  TrendingUp,
  Eye,
  ArrowUpRight,
  Clock,
  Globe,
  Database as DbIcon,
  HardDrive,
  Key,
  Mail,
  BarChart3,
  ServerCrash
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardStats() {
  try {
    const [contactLeads, careerApps, testimonials, jobPostings] = await Promise.all([
      db.contactSubmission.count(),
      db.careerApplication.count(),
      db.testimonial.count(),
      db.jobPosting.count(),
    ]);

    const newLeads = await db.contactSubmission.count({ where: { status: "NEW" } });
    const newApps = await db.careerApplication.count({ where: { status: "NEW" } });

    const recentLeads = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return { contactLeads, careerApps, testimonials, jobPostings, newLeads, newApps, recentLeads };
  } catch {
    // DB not connected yet — return zeros
    return {
      contactLeads: 0,
      careerApps: 0,
      testimonials: 0,
      jobPostings: 0,
      newLeads: 0,
      newApps: 0,
      recentLeads: [],
    };
  }
}

interface StatCardProps {
  title: string;
  value: number;
  badge?: number;
  badgeLabel?: string;
  trend?: string;
  trendLabel?: string;
  icon: import("lucide-react").LucideIcon;
  href: string;
  color: string;
}

function StatCard({ title, value, badge, badgeLabel, trend, trendLabel, icon: Icon, href, color }: StatCardProps) {
  return (
    <Link href={href} className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">View All</span>
        {trend ? (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            {trend} {trendLabel}
          </span>
        ) : badge !== undefined && badge > 0 ? (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {badge} {badgeLabel}
          </div>
        ) : (
          <span className="text-xs text-gray-400">Stable</span>
        )}
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  const session = await auth();
  const dbStatus = await checkDbConnection();
  const stats = await getDashboardStats();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Determine health statuses
  const statusBadges = [
    { name: "Website", status: "Live", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: Globe },
    { 
      name: "Database", 
      status: dbStatus.isConnected ? "Connected" : dbStatus.errorType === "MIGRATION_MISSING" ? "Unsynced" : "Offline", 
      color: dbStatus.isConnected ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100",
      icon: DbIcon 
    },
    { name: "Storage", status: "Active", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: HardDrive },
    { name: "Auth", status: "Secure", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: Key },
    { name: "Email", status: "Relay", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: Mail },
    { name: "Analytics", status: "Active", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: BarChart3 }
  ];

  const totalEntries = stats.contactLeads + stats.careerApps + stats.testimonials + stats.jobPostings;

  return (
    <div className="space-y-8">
      {/* Welcome & Status badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {greeting()}, {session?.user?.name?.split(" ")[0] ?? "Admin"} 👋
          </h2>
          <p className="text-gray-500 mt-1">Here&rsquo;s what&rsquo;s happening with AST Digitally today.</p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          {statusBadges.map((badge) => (
            <div key={badge.name} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${badge.color}`}>
              <badge.icon size={12} />
              <span>{badge.name}: {badge.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Database offline warning if not connected */}
      {!dbStatus.isConnected && (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl flex items-center gap-3 text-sm">
            <ServerCrash className="shrink-0 text-rose-500" />
            <p><strong>Database Offline:</strong> The CMS is currently running in fallback mode. Connect your database to activate full functionality.</p>
          </div>
          <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
        </div>
      )}

      {/* Database is connected but empty suggestion */}
      {dbStatus.isConnected && totalEntries === 0 && (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold">🌱 Your database is empty!</h4>
            <p className="text-sm text-blue-600/90 mt-0.5">Would you like to seed the database with premium default content for your pages?</p>
          </div>
          <Link href="/admin/system" className="btn-primary !py-2 !px-4 text-xs font-bold shrink-0">
            Go to Diagnostics & Seed
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Contact Leads"
          value={stats.contactLeads}
          badge={stats.newLeads}
          badgeLabel="new"
          trend={stats.newLeads > 0 ? `+${stats.newLeads}` : undefined}
          trendLabel="today"
          icon={MessageSquare}
          href="/admin/leads/contact"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Career Applications"
          value={stats.careerApps}
          badge={stats.newApps}
          badgeLabel="unreviewed"
          trend={stats.newApps > 0 ? `+${stats.newApps}` : undefined}
          trendLabel="new"
          icon={Briefcase}
          href="/admin/leads/careers"
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          icon={Star}
          href="/admin/content/testimonials"
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Job Postings"
          value={stats.jobPostings}
          icon={Users}
          href="/admin/content/careers"
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leads */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-900">Recent Contact Leads</h3>
            <Link href="/admin/leads/contact" className="text-xs text-[#3B5BFF] hover:underline">
              View all
            </Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare size={32} className="text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">No leads yet. When visitors submit the contact form, they&rsquo;ll appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-semibold shrink-0">
                    {lead.firstName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.firstName} {lead.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.email} · {lead.subject}</p>
                  </div>
                  {!lead.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#3B5BFF] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-5">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Add Testimonial", href: "/admin/content/testimonials", icon: Star },
              { label: "Edit Homepage", href: "/admin/content/homepage", icon: Eye },
              { label: "View Contact Leads", href: "/admin/leads/contact", icon: MessageSquare },
              { label: "Manage Services", href: "/admin/content/services", icon: TrendingUp },
              { label: "Post a Job", href: "/admin/content/careers", icon: Users },
              { label: "Update SEO", href: "/admin/seo", icon: Clock },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#3B5BFF]/10 flex items-center justify-center text-gray-500 group-hover:text-[#3B5BFF] transition-colors">
                  <action.icon size={15} />
                </div>
                <span className="text-sm text-gray-700 font-medium">{action.label}</span>
                <ArrowUpRight size={13} className="ml-auto text-gray-300 group-hover:text-[#3B5BFF] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

