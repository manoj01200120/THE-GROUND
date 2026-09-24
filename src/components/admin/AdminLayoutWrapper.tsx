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
import Logo from "@/components/ui/Logo";

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
    { label: "Applications", href: "/admin/applications", icon: Users },
    { label: "Client Inquiries", href: "/admin/clients", icon: Briefcase },
    { label: "Projects", href: "/admin/projects", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#071521] text-[#F3EBDD] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-[#F3EBDD]/10 bg-[#0B1C2D] p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Brand & Admin Badge */}
          <div className="space-y-3">
            <Link href="/" className="block">
              <Logo iconSize={28} showText={true} lightText={true} />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6288A6]/20 border border-[#9DB9D0]/30 text-[11px] font-heading uppercase tracking-wider text-[#F3EBDD]">
              <Shield className="w-3 h-3 text-[#9DB9D0]" />
              Console Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 font-heading text-xs uppercase tracking-wider">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#6288A6]/30 text-[#F3EBDD] font-semibold border border-[#9DB9D0]/40 shadow-sm"
                      : "text-[#9DB9D0] hover:text-[#F3EBDD] hover:bg-[#19334B]/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F3EBDD]" : "text-[#9DB9D0]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session & Logout */}
        <div className="pt-6 border-t border-[#F3EBDD]/10 space-y-3 font-heading text-xs">
          <div className="truncate">
            <span className="text-[#9DB9D0]/70 block text-[10px] uppercase tracking-wider">Session Active</span>
            <span className="text-[#F3EBDD] text-[11px] tracking-wide font-medium">{adminEmail || "Lead Admin"}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/"
              target="_blank"
              className="text-[#9DB9D0] hover:text-[#F3EBDD] flex items-center gap-1 text-[11px] transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-300 hover:text-red-200 flex items-center gap-1.5 text-[11px] py-1 px-2.5 rounded-md hover:bg-red-500/15 transition-colors cursor-pointer"
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
