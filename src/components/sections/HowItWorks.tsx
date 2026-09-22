"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  CheckSquare,
  Users2,
  Cpu,
  ShieldCheck,
  Send,
  Wrench,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

interface Stage {
  id: string;
  number: string;
  name: string;
  tagline: string;
  icon: typeof HelpCircle;
  input: string;
  execution: string;
  deliverable: string;
  mindset: string;
}

const stages: Stage[] = [
  {
    id: "problem",
    number: "01",
    name: "Problem",
    tagline: "Pinpoint authentic friction, not manufactured solutions.",
    icon: HelpCircle,
    input: "Client inquiry, community pain point, or member thesis.",
    execution: "Sift through ambiguity. Strip away preconceived answers to uncover the root bottleneck.",
    deliverable: "One-page Problem Statement with defined constraints and failure modes.",
    mindset: "Fall in love with the problem, not your initial hunch.",
  },
  {
    id: "discovery",
    number: "02",
    name: "Discovery",
    tagline: "Interrogate domain reality and technical viability.",
    icon: Search,
    input: "Validated problem statement and stakeholder access.",
    execution: "User interviews, systems architecture reconnaissance, performance benchmarks, and regulatory reviews.",
    deliverable: "Discovery Synthesis Document + Feasibility Matrix.",
    mindset: "Assume nothing. Verify every assumption against actual data.",
  },
  {
    id: "decision",
    number: "03",
    name: "Decision",
    tagline: "Commit to building or kill the idea early.",
    icon: CheckSquare,
    input: "Feasibility matrix and resource estimates.",
    execution: "Review by senior builder peers. Assess team readiness, timeline, and value creation.",
    deliverable: "Formal Go/No-Go Decision + Architecture Decision Record (ADR).",
    mindset: "Discipline means saying 'no' to 90% of ideas so the chosen 10% succeed.",
  },
  {
    id: "team",
    number: "04",
    name: "Team",
    tagline: "Assemble complementary builders with clear ownership.",
    icon: Users2,
    input: "Project brief and technical requirements.",
    execution: "Match lead engineers, designers, and product operators based on verified capabilities.",
    deliverable: "Team Charter with explicit roles, communication cadence, and code ownership.",
    mindset: "High alignment, high autonomy. Small teams move mountains.",
  },
  {
    id: "build",
    number: "05",
    name: "Build",
    tagline: "Relentless execution with disciplined craft.",
    icon: Cpu,
    input: "Architecture blueprint, component specifications, and sprint goals.",
    execution: "Test-driven development, schema migrations, semantic components, continuous integration.",
    deliverable: "Working functional software with automated test coverage.",
    mindset: "Craft is not an afterthought; it is visible in every commit.",
  },
  {
    id: "validate",
    number: "06",
    name: "Validate",
    tagline: "Stress-test under adversarial and edge-case conditions.",
    icon: ShieldCheck,
    input: "Functional builds and staging environments.",
    execution: "Load testing, security auditing, accessibility evaluation, and real user test sessions.",
    deliverable: "Validation Report and remediation of critical regressions.",
    mindset: "Break your own system before real-world users break it.",
  },
  {
    id: "ship",
    number: "07",
    name: "Ship",
    tagline: "Deploy to production. Put software into the wild.",
    icon: Send,
    input: "Validated release candidate and staging sign-off.",
    execution: "Zero-downtime production deployment, telemetry initialization, DNS cutover, release announcement.",
    deliverable: "Live production URL, telemetry dashboards, user documentation.",
    mindset: "Shipping is where real software begins.",
  },
  {
    id: "maintain",
    number: "08",
    name: "Maintain",
    tagline: "Honor operational responsibility and system health.",
    icon: Wrench,
    input: "Production telemetry, error logs, and client support requests.",
    execution: "Monitor uptime, patch vulnerabilities, optimize database queries, resolve user support tickets.",
    deliverable: "SLA compliance reports and ongoing maintenance logs.",
    mindset: "True builders do not abandon what they birth.",
  },
  {
    id: "learn",
    number: "09",
    name: "Learn",
    tagline: "Codify knowledge and compound collective capability.",
    icon: GraduationCap,
    input: "Post-deployment performance data and team retrospectives.",
    execution: "Blameless post-mortem, knowledge base documentation, open-source library extraction.",
    deliverable: "Engineering Retrospective & Reusable Component Library.",
    mindset: "Every project must leave the ecosystem stronger than it found it.",
  },
];

export default function HowItWorks() {
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const current = stages[selectedStage];
  const Icon = current.icon;

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          03 // The Operating Lifecycle
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          How THE GROUND Works
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          Every initiative within THE GROUND follows an uncompromising, structured sequence from initial problem framing to ecosystem compounding.
        </p>
      </div>

      {/* Horizontal Interactive Stage Scroller */}
      <div className="mt-12 flex items-center gap-2 overflow-x-auto pb-4 pt-2 scrollbar-none">
        {stages.map((st, idx) => {
          const isCurrent = selectedStage === idx;
          const StageIcon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedStage(idx)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono uppercase transition-all duration-200 ${
                isCurrent
                  ? "bg-white/10 border-violet-500/60 text-white shadow-glow-violet"
                  : "bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              <StageIcon className={`w-3.5 h-3.5 ${isCurrent ? "text-violet-300" : "text-zinc-500"}`} />
              <span className="font-semibold">{st.number}</span>
              <span>{st.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <div className="mt-8 glass-panel rounded-xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-300">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-500">Stage {current.number}</div>
              <h3 className="text-3xl font-mono uppercase text-white font-medium">
                {current.name}
              </h3>
            </div>
          </div>
          <div className="text-sm font-mono text-zinc-400 italic max-w-md">
            &ldquo;{current.tagline}&rdquo;
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              01 // Required Input
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {current.input}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              02 // Execution Protocol
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {current.execution}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
              03 // Deliverable
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {current.deliverable}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-violet-500/[0.04] border border-violet-500/20 space-y-2">
            <div className="text-[11px] font-mono uppercase text-violet-400 tracking-wider">
              04 // Builder Mindset
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {current.mindset}
            </p>
          </div>
        </div>

        {/* Next Stage Controller */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <button
            disabled={selectedStage === 0}
            onClick={() => setSelectedStage((prev) => Math.max(0, prev - 1))}
            className="text-xs font-mono uppercase text-zinc-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            &larr; Previous Stage
          </button>
          <button
            onClick={() => setSelectedStage((prev) => (prev + 1) % stages.length)}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>Next Stage: {stages[(selectedStage + 1) % stages.length].name}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
