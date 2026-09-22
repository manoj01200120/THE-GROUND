"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/actions/auth.actions";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  LogOut,
  Shield,
  ExternalLink,
} from "lucide-react";
import { ReactNode } from "react";

export default function AdminLayoutWrapper({
  children,
  adminEmail,
}: {
  children: ReactNode;
  adminEmail?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Student Applications", href: "/admin/applications", icon: Users },
    { label: "Client Inquiries", href: "/admin/clients", icon: Briefcase },
    { label: "Projects", href: "/admin/projects", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-[#09090e] p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Brand & Admin Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-mono tracking-widest text-sm font-semibold uppercase">
              <div className="w-4 h-4 rounded-[2px] bg-violet-500" />
              THE GROUND
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono uppercase text-violet-300">
              <Shield className="w-3 h-3" />
              Admin Console
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-all ${
                    isActive
                      ? "bg-white/10 text-white font-semibold border border-white/10 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-violet-400" : "text-zinc-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
          <div className="text-zinc-400 truncate">
            <span className="text-zinc-600 block text-[10px] uppercase">Logged In As</span>
            <span className="text-zinc-300 text-[11px]">{adminEmail || "Lead Admin"}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/"
              target="_blank"
              className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1 text-[11px]"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1.5 text-[11px] py-1 px-2 rounded hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
