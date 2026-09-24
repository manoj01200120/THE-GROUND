"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function WingsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071521] text-[#F3EBDD] flex items-center justify-center">

      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#F3EBDD 1px, transparent 1px), linear-gradient(90deg, #F3EBDD 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Ambient Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#507694]/30 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Rings */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full border border-[#F3EBDD]/10"
        animate={{
          scale: [1, 1.12, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          scale: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-[#F3EBDD]/15"
        animate={{
          scale: [1, 1.18, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F3EBDD]/20 bg-[#F3EBDD]/5 text-[10px] tracking-[0.3em] uppercase font-mono text-[#F3EBDD]/70">
            THE GROUND / WINGS
          </span>
        </motion.div>

        {/* WINGS */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="text-6xl sm:text-7xl md:text-9xl font-sans font-semibold tracking-[0.12em] uppercase"
        >
          WINGS
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="h-px bg-[#F3EBDD]/50 mx-auto mt-7 mb-8"
        />

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.35em] font-medium">
            COMING SOON
          </h2>

          <motion.p
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-5 text-sm md:text-base text-[#F3EBDD]/60 font-sans"
          >
            Something new is taking shape.
          </motion.p>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.3,
          }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded btn-ground-primary text-xs tracking-[0.15em] uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to The Ground
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#F3EBDD]/20 text-[#F3EBDD]/70 hover:text-[#F3EBDD] hover:border-[#F3EBDD]/40 transition-all text-xs tracking-[0.15em] uppercase"
          >
            Explore Projects
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>

      {/* Bottom Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-0 right-0 text-center"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-mono text-[#F3EBDD]/30">
          BUILDING IN THE GROUND
        </span>
      </motion.div>

    </main>
  );
}