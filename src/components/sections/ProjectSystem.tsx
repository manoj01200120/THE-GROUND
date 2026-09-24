import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db/prisma";

interface ProjectDisplay {
  id: string;
  name: string;
  problem: string;
  owner: string;
  team: string[];
  stage: string;
  progress: number;
  blockers: string | null;
  outcome: string | null;
  client?: string | null;
}

export default async function ProjectSystem() {
  const projects = await prisma.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      members: true,
    },
  });

  const projectList: ProjectDisplay[] = projects.map((p) => ({
    id: p.id,
    name: p.name,
    problem: p.problem,
    owner: p.owner,
    team: p.members.map((member) => member.name),
    stage: p.stage,
    progress: p.progress,
    blockers: p.blockers,
    outcome: p.outcome,
    client: p.client,
  }));

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
            07 // The Operating System
          </div>

          <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
            Project Dashboard
          </h2>

          <p className="text-[#071521]/80 text-base leading-relaxed font-sans">
            Every build is monitored with complete transparency: stage
            transitions, blocker resolution, squad ownership, and verified
            outcomes.
          </p>
        </div>

        <Link
          href="/projects"
          className="btn-ground-outline px-4 py-2.5 text-xs font-medium tracking-wider inline-flex items-center gap-1.5 self-start shadow-xs"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mt-12 space-y-4">
        {projectList.map((p) => (
          <div
            key={p.id}
            className="ground-card-dark p-6 md:p-7 space-y-4 shadow-ground-card-dark"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ground-cream/15 pb-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base sm:text-lg font-sans uppercase text-ground-cream font-semibold tracking-wide">
                    {p.name}
                  </h3>

                  {p.client && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-ground-cream/15 text-ground-cream border border-ground-cream/25">
                      Client: {p.client}
                    </span>
                  )}
                </div>

                <p className="text-xs text-ground-cream/70 mt-1 line-clamp-1 font-sans">
                  Problem: {p.problem}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-1 rounded bg-ground-cream/20 border border-ground-cream/35 text-ground-cream text-xs font-mono uppercase font-semibold">
                  {p.stage}
                </span>

                <span className="text-xs font-mono text-ground-cream/80">
                  {p.progress}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="min-w-0">
                <span className="text-ground-cream/50 uppercase text-[10px] block">
                  Blocker Status
                </span>

                {p.blockers ? (
                  <span className="text-amber-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{p.blockers}</span>
                  </span>
                ) : (
                  <span className="text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    No active blockers
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <span className="text-ground-cream/50 uppercase text-[10px] block">
                  Target Outcome
                </span>

                <span className="text-ground-cream/85 line-clamp-1">
                  {p.outcome || "No outcome recorded yet"}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#071521]/60 h-1.5 rounded-full overflow-hidden border border-ground-cream/10">
              <div
                className="bg-ground-cream h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(0, p.progress))}%`,
                }}
              />
            </div>
          </div>
        ))}

        {projectList.length === 0 && (
          <div className="ground-card-dark p-8 text-center">
            <p className="text-ground-cream/70 font-mono text-sm">
              No projects have been added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}