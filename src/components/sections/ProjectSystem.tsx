import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

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
    problem: "Traditional profiles lack verifiable proof of team contributions, leading to low trust and credential inflation.",
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
    problem: "Clinicians spend hours daily on documentation; cloud APIs violate privacy protocols for patient charts.",
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
    <section id="projects" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
            07 // The Operating System
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
            Project Dashboard
          </h2>
          <p className="text-[#071521]/80 text-base leading-relaxed font-sans">
            Every build is monitored with complete transparency: stage transitions, blocker resolution, squad ownership, and verified outcomes.
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

      {/* Dashboard Table / Cards */}
      <div className="mt-12 space-y-4">
        {sampleProjects.map((p) => (
          <div
            key={p.id}
            className="ground-card-dark p-6 md:p-7 space-y-4 shadow-ground-card-dark"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ground-cream/15 pb-4">
              <div>
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

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-ground-cream/20 border border-ground-cream/35 text-ground-cream text-xs font-mono uppercase font-semibold">
                  {p.stage}
                </span>
                <span className="text-xs font-mono text-ground-cream/80">
                  {p.progress}%
                </span>
              </div>
            </div>

            {/* Metrics and Detail Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-ground-cream/50 uppercase text-[10px] block">Blocker Status</span>
                {p.blockers ? (
                  <span className="text-amber-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> {p.blockers}
                  </span>
                ) : (
                  <span className="text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> No active blockers
                  </span>
                )}
              </div>

              <div>
                <span className="text-ground-cream/50 uppercase text-[10px] block">Target Outcome</span>
                <span className="text-ground-cream/85 line-clamp-1">{p.outcome}</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-[#071521]/60 h-1.5 rounded-full overflow-hidden border border-ground-cream/10">
              <div
                className="bg-ground-cream h-full rounded-full transition-all duration-500"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
