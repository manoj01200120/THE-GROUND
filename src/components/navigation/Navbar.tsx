"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
    { label: "Wings", href: "/wings" },
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
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center hover:opacity-90 transition-opacity"
        >
          <span className="font-sans font-medium text-[15px] uppercase tracking-[0.28em] leading-tight text-[#0B1C2D]">
            THE GROUND
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="btn-ground-primary px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase inline-flex items-center justify-center whitespace-nowrap shadow-sm transition-all duration-200 hover:opacity-90"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/join"
            className="btn-ground-primary px-4 py-2 text-[11px] font-medium tracking-[0.2em] inline-flex items-center gap-1.5 shadow-sm transition-all duration-200 hover:opacity-90"
          >
            <span>Join The Ground</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Controls */}
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
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                className="btn-ground-primary px-4 py-2 text-[11px] font-medium tracking-[0.16em] inline-flex items-center transition-all duration-200"
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