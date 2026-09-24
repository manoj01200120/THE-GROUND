"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Explore", href: "/#what-we-are" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Projects", href: "/projects" },
    { label: "Community", href: "/#member-journey" },
    { label: "For Clients", href: "/clients" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#507694]/90 backdrop-blur-md border-b border-[#0B1C2D]/15 shadow-sm py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center hover:opacity-90 transition-opacity"
        >
          <Logo iconSize={36} showText={true} showTagline={false} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] uppercase font-sans font-medium tracking-[0.16em] text-[#071521]/80">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#0B1C2D] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0B1C2D] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Controls: CTA */}
        <div className="hidden md:flex items-center gap-3.5">
          <Link
            href="/join"
            className="btn-ground-primary px-4 py-2 text-[11px] font-medium tracking-[0.2em] inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Join The Ground</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link
            href="/join"
            className="btn-ground-primary px-3 py-1 text-[11px] font-medium tracking-wider"
          >
            Join
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-[#0B1C2D] hover:bg-[#0B1C2D]/10 rounded transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#507694]/95 backdrop-blur-xl border-b border-[#0B1C2D]/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-sans text-sm uppercase tracking-[0.16em]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#071521] hover:text-[#0B1C2D] py-2 border-b border-[#0B1C2D]/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/join"
                className="btn-ground-primary flex items-center justify-center gap-2 w-full py-3 text-xs tracking-[0.2em]"
              >
                <span>Join The Ground</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
