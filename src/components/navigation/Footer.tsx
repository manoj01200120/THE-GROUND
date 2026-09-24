import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1C2D]/15 bg-[#4A6E8C] text-[#071521] py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Logo iconSize={42} showText={true} showTagline={true} />
          <p className="text-[#071521]/80 text-sm leading-relaxed max-w-sm font-sans pt-2">
            A student-driven builder ecosystem for people who want to learn by building real things with real people.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#0B1C2D]">
            <Mail className="w-3.5 h-3.5" />
            <a
              href="mailto:contact.theground@gmail.com"
              className="underline hover:text-white transition-colors"
            >
              contact.theground@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">Ecosystem</div>
          <ul className="space-y-2 text-[#071521]/80">
            <li>
              <Link href="/#what-we-are" className="hover:text-[#0B1C2D] transition-colors">
                What We Are
              </Link>
            </li>
            <li>
              <Link href="/#why-we-exist" className="hover:text-[#0B1C2D] transition-colors">
                Why We Exist
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-[#0B1C2D] transition-colors">
                Operating Process
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#0B1C2D] transition-colors">
                Project Dashboard
              </Link>
            </li>
            <li>
              <Link href="/#member-journey" className="hover:text-[#0B1C2D] transition-colors">
                Member Journey
              </Link>
            </li>
          </ul>
        </div>

        {/* Engagement Portals */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">Portals</div>
          <ul className="space-y-2 text-[#071521]/80">
            <li>
              <Link href="/join" className="hover:text-[#0B1C2D] transition-colors flex items-center gap-1">
                Student Application <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/60" />
              </Link>
            </li>
            <li>
              <Link href="/clients" className="hover:text-[#0B1C2D] transition-colors flex items-center gap-1">
                Bring Us a Problem <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/60" />
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="hover:text-[#0B1C2D] text-[#071521]/60 transition-colors flex items-center gap-1"
              >
                Admin Console <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/40" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Foundation & Ethos */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">Foundation</div>
          <p className="text-[#071521]/75 text-[11px] leading-relaxed">
            Responsibility grows through Capability, Reliability, Contribution, and Trust. Where ideas take shape.
          </p>
          <div className="text-[11px] text-[#0B1C2D]/60 pt-2 font-mono">
            &copy; {new Date().getFullYear()} THE GROUND.
          </div>
        </div>
      </div>
    </footer>
  );
}
