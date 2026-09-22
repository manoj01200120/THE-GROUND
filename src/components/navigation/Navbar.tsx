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

  // Close mobile menu on route change
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
          ? "bg-[#08080c]/80 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white tracking-wider font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 rounded border border-white/20 bg-white/5 flex items-center justify-center transition-colors group-hover:border-violet-500/60 group-hover:bg-violet-500/10">
            <div className="w-2 h-2 rounded-[1px] bg-white group-hover:bg-violet-400 transition-colors" />
          </div>
          <span className="text-[15px] uppercase tracking-[0.2em] font-mono text-zinc-200">
            The Ground
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-zinc-400">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-zinc-100 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-zinc-300 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/join"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-mono font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-violet-400/50 rounded-md transition-all duration-200 hover:shadow-glow-violet"
          >
            <span>Join The Ground</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/join"
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-white bg-white/10 border border-white/20 rounded"
          >
            Join
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-mono text-sm tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-300 hover:text-white py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/join"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded"
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
