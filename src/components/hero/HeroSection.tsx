"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import BackgroundMesh from "./BackgroundMesh";

export default function HeroSection() {
  const scrollToExplore = () => {
    const element = document.getElementById("what-we-are");

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <BackgroundMesh />

      <div className="relative z-10 max-w-4xl mx-auto space-y-7">
        {/* Brand Header */}
        <div className="space-y-3">
          <h1
            id="hero-title"
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-medium uppercase tracking-[0.28em] text-[#0B1C2D]"
          >
            THE GROUND
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-sans font-light tracking-[0.28em] text-[#071521]/90">
            Where ideas take shape.
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#071521]/80 max-w-2xl mx-auto font-sans leading-relaxed">
          A student-driven builder ecosystem for people who want to learn by
          building real things with real people. Grounded, human, and
          forward-looking.
        </p>

        {/* CTAs */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/join"
            className="w-full sm:w-auto btn-ground-primary px-8 py-3.5 text-xs tracking-[0.2em] inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Join The Ground</span>
            <ArrowUpRight
              className="w-4 h-4"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            onClick={scrollToExplore}
            className="w-full sm:w-auto btn-ground-outline px-7 py-3.5 text-xs tracking-[0.2em] inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Explore The Ground</span>
            <ArrowDown
              className="w-3.5 h-3.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToExplore}
        aria-label="Scroll to explore The Ground"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#0B1C2D]/60 hover:text-[#0B1C2D] transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase">
          Scroll
        </span>

        <div className="w-4 h-7 rounded-full border border-[#0B1C2D]/30 flex justify-center pt-1">
          <div className="w-1 h-1.5 rounded-full bg-[#0B1C2D]/70 animate-bounce" />
        </div>
      </button>
    </section>
  );
}