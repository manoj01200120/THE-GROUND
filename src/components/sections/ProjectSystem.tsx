import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertCircle, Layers, Activity } from "lucide-react";

interface ProjectDisplay {
  id: string;
  name: string;
  problem: string;
  owner: string;
  team: string[];
  stage: string;
  progress: number;
  blockers: string | null;
  outcome: string;
  client?: string;
}

const sampleProjects: ProjectDisplay[] = [
  {
    id: "pulse-engine",
    name: "PulseEngine — Autonomous Telemetry Pipeline",
    problem: "Hardware prototypes generate bursty telemetry that overwhelms traditional cloud ingestion without local queuing.",
    owner: "Aarav Sharma",
    team: ["Priya Nair", "David Chen", "Aarav S."],
    stage: "BUILD",
    progress: 68,
    blockers: "Resolving memory compaction on 512MB RAM edge nodes",
    outcome: "50k events/sec sustained ingestion rate verified",
    client: "AeroDynamics Lab",
  },
  {
    id: "veritas",
    name: "Veritas — Distributed Proof of Contribution",
    problem: "Resumes lack verifiable proof of team contributions, leading to inflated credentials and low hiring confidence.",
    owner: "Maya Lin",
    team: ["Maya Lin", "Kavya Patel"],
    stage: "SHIP",
    progress: 92,
    blockers: null,
    outcome: "Shipped v1.0 beta tested with 120 student repositories",
  },
  {
    id: "openscribe",
    name: "OpenScribe — Clinical Note Transcription",
    problem: "Doctors spend 3+ hours daily on documentation; cloud APIs violate privacy protocols for patient charts.",
    owner: "Rohan Varma",
    team: ["Rohan Varma", "Sneha Reddy"],
    stage: "DISCOVERY",
    progress: 25,
    blockers: "Collecting regional accent training dataset for medical jargon",
    outcome: "Expected 60% reduction in clinician documentation hours",
    client: "St. Jude Community Clinic",
  },
];

export default function ProjectSystem() {
  return (
    <section id="projects" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
            07 // The Operating System
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
            Project Dashboard
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Every build is monitored with complete transparency: stage transitions, blocker resolution, squad ownership, and verified outcomes.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all self-start"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Dashboard Table / Cards */}
      <div className="mt-12 space-y-4">
        {sampleProjects.map((p) => (
          <div
            key={p.id}
            className="glass-panel rounded-xl p-6 border border-white/[0.08] hover:border-white/20 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-mono uppercase text-white font-semibold">
                    {p.name}
                  </h3>
                  {p.client && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30">
                      Client: {p.client}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  Problem: {p.problem}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-mono uppercase font-semibold">
                  {p.stage}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {p.progress}%
                </span>
              </div>
            </div>

            {/* Metrics and Detail Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Owner & Lead</span>
                <span className="text-zinc-200">{p.owner}</span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Squad Members</span>
                <span className="text-zinc-300">{p.team.join(", ")}</span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Blockers</span>
                {p.blockers ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {p.blockers}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> No active blockers
                  </span>
                )}
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Target Outcome</span>
                <span className="text-zinc-300 line-clamp-1">{p.outcome}</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
