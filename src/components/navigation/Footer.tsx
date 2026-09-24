import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1C2D]/15 bg-[#4A6E8C] text-[#071521] py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">

          {/* Brand - No Logo */}
          <div>
            <div className="text-[#0B1C2D] text-lg font-medium uppercase tracking-[0.28em]">
              THE GROUND
            </div>

            <div className="text-[#071521]/60 text-[10px] tracking-[0.25em] mt-1">
              Where ideas take shape.
            </div>
          </div>

          <p className="text-[#071521]/80 text-sm leading-relaxed max-w-sm font-sans pt-2">
            A student-driven builder ecosystem for people who want to learn by
            building real things with real people.
          </p>

          {/* Contact Section */}
          <div className="pt-2 space-y-2.5">

            {/* Email */}
            <a
              href="mailto:contact.theground@gmail.com"
              className="flex items-center gap-2.5 w-fit px-3 py-2 rounded-md border border-[#0B1C2D]/25 bg-[#F3EBDD]/10 text-[#0B1C2D] text-xs font-mono transition-all duration-200 hover:bg-[#F3EBDD]/25 hover:border-[#0B1C2D]/50 hover:shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span>contact.theground@gmail.com</span>
            </a>

            {/* Bala WhatsApp */}
            <a
              href="https://wa.me/918095838211"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-fit px-3 py-2 rounded-md border border-[#0B1C2D]/25 bg-[#F3EBDD]/10 text-[#0B1C2D] text-xs font-mono transition-all duration-200 hover:bg-[#F3EBDD]/25 hover:border-[#0B1C2D]/50 hover:shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Balasubrahmanya: +91 80958 38211</span>
            </a>

            {/* Manoj WhatsApp */}
            <a
              href="https://wa.me/918147385332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-fit px-3 py-2 rounded-md border border-[#0B1C2D]/25 bg-[#F3EBDD]/10 text-[#0B1C2D] text-xs font-mono transition-all duration-200 hover:bg-[#F3EBDD]/25 hover:border-[#0B1C2D]/50 hover:shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Manoj: +91 81473 85332</span>
            </a>

          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">
            Ecosystem
          </div>

          <ul className="space-y-2 text-[#071521]/80">
            <li>
              <Link
                href="/#what-we-are"
                className="hover:text-[#0B1C2D] transition-colors"
              >
                What We Are
              </Link>
            </li>

            <li>
              <Link
                href="/#why-we-exist"
                className="hover:text-[#0B1C2D] transition-colors"
              >
                Why We Exist
              </Link>
            </li>

            <li>
              <Link
                href="/#how-it-works"
                className="hover:text-[#0B1C2D] transition-colors"
              >
                Operating Process
              </Link>
            </li>

            <li>
              <Link
                href="/projects"
                className="hover:text-[#0B1C2D] transition-colors"
              >
                Project Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/#member-journey"
                className="hover:text-[#0B1C2D] transition-colors"
              >
                Member Journey
              </Link>
            </li>
          </ul>
        </div>

        {/* Engagement Portals */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">
            Portals
          </div>

          <ul className="space-y-2 text-[#071521]/80">
            <li>
              <Link
                href="/join"
                className="hover:text-[#0B1C2D] transition-colors flex items-center gap-1"
              >
                Student Application
                <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/60" />
              </Link>
            </li>

            <li>
              <Link
                href="/clients"
                className="hover:text-[#0B1C2D] transition-colors flex items-center gap-1"
              >
                Bring Us a Problem
                <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/60" />
              </Link>
            </li>

            <li>
              <Link
                href="/admin/login"
                className="hover:text-[#0B1C2D] text-[#071521]/60 transition-colors flex items-center gap-1"
              >
                Admin Console
                <ArrowUpRight className="w-3 h-3 text-[#0B1C2D]/40" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Foundation & Ethos */}
        <div className="space-y-3 font-sans text-xs">
          <div className="text-[#0B1C2D] uppercase tracking-[0.2em] font-semibold">
            Foundation
          </div>

          <p className="text-[#071521]/75 text-[11px] leading-relaxed">
            Responsibility grows through Capability, Reliability, Contribution,
            and Trust. Where ideas take shape.
          </p>

          <div className="text-[11px] text-[#0B1C2D]/60 pt-2 font-mono">
            &copy; {new Date().getFullYear()} THE GROUND.
          </div>
        </div>

      </div>
    </footer>
  );
}