"use client";

import { useState } from "react";
import {
  Code,
  Palette,
  Search,
  Box,
  TrendingUp,
  FileText,
  Sliders,
  Award,
  Layers,
} from "lucide-react";

interface Category {
  title: string;
  desc: string;
  examples: string[];
}

const categories: Record<string, Category> = {
  "Technical Projects": {
    title: "Technical Projects & Infrastructure",
    desc: "Low-latency systems, distributed databases, developer toolchains, CLI engines, and edge computing software.",
    examples: ["Custom memory allocators", "High-throughput message brokers", "Embedded sensor firmware"],
  },
  "Products": {
    title: "End-to-End Consumer & Enterprise Products",
    desc: "Polished web applications, collaborative canvases, productivity software, and spatial interfaces with extraordinary craft.",
    examples: ["Collaborative research workspaces", "Local-first note ecosystems", "Interactive analytics suites"],
  },
  "Research": {
    title: "Applied Research & Technical Papers",
    desc: "Rigorous investigations into machine learning efficiency, cryptography, systems performance, and human-computer interaction.",
    examples: ["Whisper model quantization for low-power edge", "Consensus protocol benchmarking", "Accessibility audit automation"],
  },
  "Social Impact": {
    title: "Civic & Healthcare Technology",
    desc: "Software engineered to address real challenges for non-profits, public health clinics, education, and civic infrastructure.",
    examples: ["Open clinic medical records parser", "Decentralized disaster relief logistics", "Accessible education readers"],
  },
  "Client Projects": {
    title: "Commercial Industry Engagements",
    desc: "High-stakes production deliverables for corporate partners, venture-backed startups, and research institutes.",
    examples: ["Fleet telemetry telemetry dashboards", "Regulatory compliance parsers", "Fullstack enterprise platforms"],
  },
  "Member Ideas": {
    title: "Student-Originated Moonshots",
    desc: "Autonomous initiatives pitched and driven by students themselves with ecosystem backing and mentorship.",
    examples: ["Alternative browser engine experiments", "Spatial audio synthesizer", "Peer micro-grants contract"],
  },
};

const roles = [
  { name: "Engineering", icon: Code, desc: "Backend, frontend, systems, distributed, embedded, and DevOps architecture." },
  { name: "Design", icon: Palette, desc: "UI/UX, visual identity, design systems, interaction design, and 3D modeling." },
  { name: "Research", icon: Search, desc: "Domain analysis, academic paper reviews, benchmarking, and feasibility audits." },
  { name: "Product", icon: Box, desc: "Spec writing, roadmap prioritization, user journey mapping, and feature scoping." },
  { name: "Marketing", icon: TrendingUp, desc: "Technical distribution, developer relations, launch strategies, and storytelling." },
  { name: "Content", icon: FileText, desc: "Technical writing, documentation, tutorials, case studies, and code walkthroughs." },
  { name: "Operations", icon: Sliders, desc: "Sprint cadence, resource coordination, tooling management, and milestone tracking." },
  { name: "Leadership", icon: Award, desc: "Project stewardship, peer mentoring, dispute resolution, and cross-team alignment." },
];

export default function WhatStudentsDo() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Technical Projects");
  const cat = categories[selectedCategory];

  return (
    <section id="what-students-do" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          04 // Multidisciplinary Execution
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          What Students Actually Do
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          <span className="text-zinc-200 font-medium">Building is never limited to coding.</span> Real products require diverse minds operating in unison.
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="mt-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {Object.keys(categories).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === name
                  ? "bg-white text-black font-semibold shadow-glow-subtle"
                  : "bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Selected Category Feature Card */}
        <div className="mt-6 glass-panel rounded-xl p-8 border border-white/10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase text-violet-400 tracking-wider">
              Category Focus
            </span>
            <h3 className="text-2xl font-mono uppercase text-white font-medium">
              {cat.title}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {cat.desc}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <div className="text-xs font-mono uppercase text-zinc-500 mb-3">
              Representative Initiatives
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.examples.map((ex) => (
                <span
                  key={ex}
                  className="px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                >
                  &rarr; {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multidisciplinary Contribution Matrix */}
      <div className="mt-16 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <Layers className="w-4 h-4 text-violet-400" />
          <span>Every Role Matters in THE GROUND</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.name}
                className="p-5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors space-y-2 group"
              >
                <div className="flex items-center gap-2.5 text-white">
                  <div className="p-1.5 rounded bg-white/5 border border-white/10 group-hover:border-violet-500/40 text-violet-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-sm uppercase tracking-wide font-medium">
                    {r.name}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
