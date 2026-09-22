"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import BackgroundMesh from "./BackgroundMesh";

export default function HeroSection() {
  const scrollToExplore = () => {
    const el = document.getElementById("what-we-are");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden">
      <BackgroundMesh />

      <div className="max-w-4xl mx-auto space-y-8 z-10">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          A Student-Driven Builder Ecosystem
        </div>

        {/* Large Editorial Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-white uppercase font-mono">
            THE GROUND
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 font-light tracking-wide">
            Learn. Build. Lead. Guide. <span className="text-zinc-500">Repeat.</span>
          </p>
        </div>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          A student-driven builder ecosystem for people who want to learn by building real things with real people. No simulated assignments. Genuine proof of work.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/join"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-white text-black font-mono font-medium text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-glow-subtle hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Join The Ground</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={scrollToExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white/[0.04] text-zinc-300 font-mono text-xs uppercase tracking-widest border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.07] transition-all duration-200"
          >
            <span>Explore The Ground</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer" onClick={scrollToExplore}>
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex justify-center pt-1">
          <div className="w-1 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
