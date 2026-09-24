"use client";

import { useState } from "react";
import { ProjectData, ProjectStage } from "@/types";
import { Search, AlertCircle, CheckCircle2, Layers } from "lucide-react";

const allStages: (ProjectStage | "ALL")[] = [
  "ALL",
  "DISCOVERY",
  "DECISION",
  "TEAM",
  "BUILD",
  "VALIDATE",
  "SHIP",
  "MAINTAIN",
  "LEARN",
];

export default function ProjectsView({ initialProjects }: { initialProjects: ProjectData[] }) {
  const [selectedStage, setSelectedStage] = useState<ProjectStage | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProjects = initialProjects.filter((p) => {
    const matchesStage = selectedStage === "ALL" || p.stage === selectedStage;
    const matchesSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Stage Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 ground-card">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#0B1C2D]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects, problems, squads..."
            className="w-full pl-9 pr-3.5 py-2 rounded bg-[#0B1C2D]/10 border border-[#0B1C2D]/20 text-xs font-mono text-[#0B1C2D] placeholder:text-[#0B1C2D]/50 focus:outline-none focus:border-[#0B1C2D] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {allStages.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase whitespace-nowrap transition-all border ${
                selectedStage === st
                  ? "bg-[#0B1C2D] text-[#F3EBDD] font-semibold border-[#0B1C2D] shadow-sm"
                  : "bg-transparent border-[#0B1C2D]/15 text-[#071521]/70 hover:text-[#0B1C2D] hover:bg-[#0B1C2D]/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="ground-card-dark p-12 text-center space-y-2">
          <Layers className="w-8 h-8 text-ground-cream/60 mx-auto" />
          <div className="text-ground-cream font-sans uppercase text-sm font-medium">No Projects Found</div>
          <p className="text-xs text-ground-cream/70 font-sans">
            No projects matched your current filters. Try changing your search query or stage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="ground-card-dark p-6 md:p-8 space-y-6 shadow-ground-card-dark"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-ground-cream/15 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-lg md:text-xl font-sans uppercase text-ground-cream font-semibold tracking-wide">
                      {p.name}
                    </h2>
                    {p.client && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-ground-cream/15 text-ground-cream border border-ground-cream/25">
                        Client: {p.client}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ground-cream/75 max-w-3xl leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="px-3 py-1 rounded bg-ground-cream/20 border border-ground-cream/35 text-ground-cream text-xs font-mono uppercase font-semibold">
                    {p.stage}
                  </span>
                  <span className="text-xs font-mono text-ground-cream/80">
                    {p.progress}% Complete
                  </span>
                </div>
              </div>

              {/* Problem Framing */}
              <div className="p-4 rounded-lg bg-[#071521]/60 border border-ground-cream/15 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-ground-cream/60">
                  Problem Framing
                </div>
                <p className="text-xs text-ground-cream/90 leading-relaxed font-sans">
                  {p.problem}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-ground-cream/60">
                  <span>Milestone Progression</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full bg-[#071521]/60 h-1.5 rounded-full overflow-hidden border border-ground-cream/10">
                  <div
                    className="bg-ground-cream h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div>
                  <span className="text-ground-cream/50 uppercase text-[10px] block">Blocker Status</span>
                  {p.blockers ? (
                    <span className="text-amber-300 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{p.blockers}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-300 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      Clean execution
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-ground-cream/50 uppercase text-[10px] block">Outcome / Delivery</span>
                  <span className="text-ground-cream/85 line-clamp-1 mt-0.5">
                    {p.outcome || "Pending milestone validation"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
