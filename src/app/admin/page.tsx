import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getAdminOverviewStats } from "@/lib/actions/auth.actions";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  Layers,
  Briefcase,
  Activity,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getAdminOverviewStats();

  const statCards = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      sub: `${stats.pendingApplications} Pending Reviews`,
      icon: Users,
      href: "/admin/applications",
      color: "text-violet-400",
    },
    {
      label: "Accepted / Shortlisted",
      value: `${stats.acceptedApplications} / ${stats.shortlistedApplications}`,
      sub: "Builder pipeline",
      icon: CheckCircle2,
      href: "/admin/applications",
      color: "text-emerald-400",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      sub: `${stats.totalProjects} Total Registered`,
      icon: Layers,
      href: "/admin/projects",
      color: "text-cyan-400",
    },
    {
      label: "Client Inquiries",
      value: stats.totalInquiries,
      sub: `${stats.newInquiries} New Unreviewed`,
      icon: Briefcase,
      href: "/admin/clients",
      color: "text-amber-400",
    },
  ];

  return (
    <AdminLayoutWrapper adminEmail={session.email}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
              System Control
            </div>
            <h1 className="text-2xl md:text-3xl font-mono uppercase text-white font-semibold">
              Ecosystem Overview
            </h1>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            Node: PostgreSQL Connected // Active
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="glass-panel rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                    {card.label}
                  </span>
                  <div className={`p-1.5 rounded bg-white/5 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-mono uppercase text-white font-semibold">
                  {card.value}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{card.sub}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity Log */}
        <div className="glass-panel rounded-xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-mono uppercase text-white font-semibold">
                Live Audit Trail & Activity
              </h2>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">Last 8 Events</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {stats.recentLogs.length === 0 ? (
              <div className="text-zinc-500 py-4 text-center">No activity recorded yet.</div>
            ) : (
              stats.recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-semibold mr-2">
                      {log.action}
                    </span>
                    <span className="text-zinc-300 font-sans text-xs">{log.details}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 flex-shrink-0">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
