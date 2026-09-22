import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050507] text-zinc-400 py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-white font-mono tracking-widest text-sm font-semibold uppercase">
            <div className="w-4 h-4 rounded-[2px] bg-zinc-200" />
            THE GROUND
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            A student-driven builder ecosystem for people who want to learn by building real things with real people.
          </p>
          <div className="pt-2 font-mono text-xs text-zinc-500">
            Learn. Build. Lead. Guide. Repeat.
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-zinc-200 uppercase tracking-wider font-semibold">Ecosystem</div>
          <ul className="space-y-2">
            <li>
              <Link href="/#what-we-are" className="hover:text-white transition-colors">
                What We Are
              </Link>
            </li>
            <li>
              <Link href="/#why-we-exist" className="hover:text-white transition-colors">
                Why We Exist
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-white transition-colors">
                The 10-Stage Process
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition-colors">
                Project Dashboard
              </Link>
            </li>
            <li>
              <Link href="/#member-journey" className="hover:text-white transition-colors">
                Member Journey
              </Link>
            </li>
          </ul>
        </div>

        {/* Engagement */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-zinc-200 uppercase tracking-wider font-semibold">Portals</div>
          <ul className="space-y-2">
            <li>
              <Link href="/join" className="hover:text-white transition-colors flex items-center gap-1">
                Student Application <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </Link>
            </li>
            <li>
              <Link href="/clients" className="hover:text-white transition-colors flex items-center gap-1">
                Bring Us a Problem <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-zinc-300 text-zinc-500 transition-colors">
                Admin Console
              </Link>
            </li>
          </ul>
        </div>

        {/* Principles */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-zinc-200 uppercase tracking-wider font-semibold">Foundation</div>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            Responsibility grows through Capability, Reliability, Contribution, and Trust. No artificial credentials, no false job guarantees. Pure proof of work.
          </p>
          <div className="text-[11px] text-zinc-600 pt-2">
            &copy; {new Date().getFullYear()} THE GROUND. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
