"use client";

import { useState } from "react";
import { ProjectData, ProjectStage } from "@/types";
import { Search, AlertCircle, CheckCircle2, Users, Layers, ExternalLink, Calendar } from "lucide-react";

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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-panel rounded-xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects, problems, leads..."
            className="w-full pl-9 pr-3.5 py-2 rounded bg-black/40 border border-white/10 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {allStages.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase whitespace-nowrap transition-all ${
                selectedStage === st
                  ? "bg-white text-black font-semibold shadow-glow-subtle"
                  : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-xl p-12 text-center border border-white/10 space-y-2">
          <Layers className="w-8 h-8 text-zinc-500 mx-auto" />
          <div className="text-zinc-300 font-mono text-sm uppercase">No Projects Found</div>
          <p className="text-xs text-zinc-500">
            No projects matched your current filters. Try changing your search query or stage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-panel rounded-xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-xl md:text-2xl font-mono uppercase text-white font-semibold">
                      {p.name}
                    </h2>
                    {p.client && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30">
                        Client: {p.client}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="px-3 py-1 rounded bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-mono uppercase font-semibold">
                    {p.stage}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {p.progress}% Complete
                  </span>
                </div>
              </div>

              {/* Problem Framing */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Problem Framing
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {p.problem}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>Progress to Deployment</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Squad & Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-2">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Project Owner</span>
                  <span className="text-zinc-200">{p.owner}</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Squad Members</span>
                  <div className="text-zinc-300 flex flex-wrap gap-1 mt-0.5">
                    {p.members && p.members.length > 0
                      ? p.members.map((m) => (
                          <span
                            key={m.name}
                            className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]"
                          >
                            {m.name} ({m.role})
                          </span>
                        ))
                      : "Unassigned"}
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Blocker Status</span>
                  {p.blockers ? (
                    <span className="text-amber-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{p.blockers}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      Clean execution
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Outcome / Delivery</span>
                  <span className="text-zinc-300 line-clamp-1 mt-0.5">
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
