import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getAdminOverviewStats } from "@/lib/actions/auth.actions";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Layers,
  Briefcase,
  Activity,
  ArrowUpRight,
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
      color: "text-[#9DB9D0]",
    },
    {
      label: "Accepted / Shortlisted",
      value: `${stats.acceptedApplications} / ${stats.shortlistedApplications}`,
      sub: "Active builder pool",
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
      color: "text-sky-300",
    },
    {
      label: "Client Inquiries",
      value: stats.totalInquiries,
      sub: `${stats.newInquiries} New Unreviewed`,
      icon: Briefcase,
      href: "/admin/clients",
      color: "text-amber-300",
    },
  ];

  return (
    <AdminLayoutWrapper adminEmail={session.email}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3EBDD]/10 pb-6">
          <div>
            <div className="text-xs font-heading uppercase tracking-widest text-[#9DB9D0]">
              Ecosystem Control
            </div>
            <h1 className="text-2xl md:text-3xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.1em]">
              Overview
            </h1>
          </div>
          <div className="text-xs font-heading text-[#9DB9D0]/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Database Connected // System Active</span>
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
                className="ground-card-dark rounded-xl p-5 border border-[#F3EBDD]/15 hover:border-[#9DB9D0]/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading text-[#9DB9D0] uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div className={`p-2 rounded-lg bg-[#071521]/60 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-heading uppercase text-[#F3EBDD] font-medium tracking-wide">
                  {card.value}
                </div>
                <div className="flex items-center justify-between text-[11px] font-heading text-[#9DB9D0]/80">
                  <span>{card.sub}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#9DB9D0]" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity Log */}
        <div className="ground-card-dark rounded-xl p-6 border border-[#F3EBDD]/15 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F3EBDD]/10 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#9DB9D0]" />
              <h2 className="text-sm font-heading uppercase text-[#F3EBDD] font-medium tracking-wider">
                Live Audit Trail & Events
              </h2>
            </div>
            <span className="text-[11px] font-heading text-[#9DB9D0]/70">Latest Activity</span>
          </div>

          <div className="space-y-2 font-heading text-xs">
            {stats.recentLogs.length === 0 ? (
              <div className="text-[#9DB9D0]/60 py-6 text-center">No system events recorded yet.</div>
            ) : (
              stats.recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-[#071521]/50 border border-[#F3EBDD]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="px-2 py-0.5 rounded bg-[#6288A6]/20 border border-[#9DB9D0]/30 text-[10px] text-[#F3EBDD] font-medium mr-2 uppercase tracking-wider">
                      {log.action}
                    </span>
                    <span className="text-[#F3EBDD]/90 text-xs">{log.details}</span>
                  </div>
                  <div className="text-[11px] text-[#9DB9D0]/70 flex-shrink-0">
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
