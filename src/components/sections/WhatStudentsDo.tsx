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
    desc: "Polished web applications, collaborative canvases, productivity software, and spatial interfaces with high craft.",
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
    examples: ["Fleet telemetry dashboards", "Regulatory compliance parsers", "Fullstack enterprise platforms"],
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
    <section id="what-students-do" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          04 // Multidisciplinary Execution
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
          What Students Actually Do
        </h2>
        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed font-sans">
          <span className="text-[#0B1C2D] font-semibold">Building is never limited to coding.</span> Real systems require diverse minds operating in unison.
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="mt-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {Object.keys(categories).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-4 py-2 rounded-md text-xs font-sans uppercase tracking-wider transition-all whitespace-nowrap border ${
                selectedCategory === name
                  ? "bg-[#0B1C2D] text-[#F3EBDD] font-semibold border-[#0B1C2D] shadow-sm"
                  : "ground-card text-[#071521]/80 hover:text-[#0B1C2D]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Selected Category Feature Card */}
        <div className="mt-4 ground-card-dark p-8 md:p-10">
          <div className="max-w-2xl space-y-2.5">
            <span className="text-xs font-mono uppercase text-ground-cream/70 tracking-wider">
              Category Focus
            </span>
            <h3 className="text-2xl font-sans uppercase text-ground-cream font-medium">
              {cat.title}
            </h3>
            <p className="text-ground-cream/85 text-sm leading-relaxed font-sans">
              {cat.desc}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-ground-cream/15">
            <div className="text-xs font-mono uppercase text-ground-cream/60 mb-3">
              Representative Initiatives
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.examples.map((ex) => (
                <span
                  key={ex}
                  className="px-3 py-1.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-xs font-mono text-ground-cream"
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
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0B1C2D]">
          <Layers className="w-4 h-4 text-[#0B1C2D]" />
          <span className="font-semibold">Every Role Matters in THE GROUND</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.name}
                className="ground-card p-5 space-y-2 group"
              >
                <div className="flex items-center gap-2.5 text-[#0B1C2D]">
                  <div className="p-1.5 rounded bg-[#0B1C2D]/10 border border-[#0B1C2D]/15 text-[#0B1C2D]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-sm uppercase tracking-wide font-semibold">
                    {r.name}
                  </span>
                </div>
                <p className="text-xs text-[#071521]/80 leading-relaxed font-sans">
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
