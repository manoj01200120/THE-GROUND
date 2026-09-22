"use client";

import { useState } from "react";
import { Eye, Hammer, Rocket, MessageSquare, RefreshCw, ArrowRight } from "lucide-react";

interface Step {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  action: string;
  icon: typeof Eye;
  badge: string;
}

const steps: Step[] = [
  {
    id: "understand",
    name: "Understand",
    shortDesc: "Deconstruct the core problem before writing a line of code or design.",
    fullDesc: "Builders do not jump blindly into solutions. We interrogate the client or user domain, analyze technical constraints, benchmark existing implementations, and define what actually needs to be true for the project to succeed.",
    action: "Domain mapping, user interviews, architectural blueprints, root cause definition.",
    icon: Eye,
    badge: "Phase 01",
  },
  {
    id: "build",
    name: "Build",
    shortDesc: "Execute with high craft, rigorous standards, and disciplined collaboration.",
    fullDesc: "Theory without execution is dormant. In this phase, multidisciplinary student teams architect data schemas, write production-grade code, craft intuitive interfaces, and conduct peer reviews under real-world version control.",
    action: "System implementation, component design, schema migrations, automated tests.",
    icon: Hammer,
    badge: "Phase 02",
  },
  {
    id: "ship",
    name: "Ship",
    shortDesc: "Deliver real software into the hands of real users or legitimate clients.",
    fullDesc: "A project does not exist until it is deployed in production. We configure CI/CD pipelines, monitor error logs, run load tests, and deliver functional software to clients, open-source communities, or real users.",
    action: "Production deployments, DNS & domain routing, telemetry setup, user onboarding.",
    icon: Rocket,
    badge: "Phase 03",
  },
  {
    id: "communicate",
    name: "Communicate",
    shortDesc: "Articulate engineering decisions, trade-offs, and progress transparently.",
    fullDesc: "Brilliant technical work is useless if isolated. Builders write clear documentation, deliver executive demos to clients, communicate blockers early, and explain complex technical concepts in plain human language.",
    action: "Demo days, technical changelogs, architecture decision records (ADRs), client reports.",
    icon: MessageSquare,
    badge: "Phase 04",
  },
  {
    id: "improve",
    name: "Improve",
    shortDesc: "Measure feedback, benchmark metrics, and refactor for longevity.",
    fullDesc: "Shipping is the beginning of the learning loop. We inspect real user telemetry, analyze system bottlenecks, conduct post-mortems without blame, and refactor for performance, security, and scalability.",
    action: "Telemetry audits, latency reduction, code refactoring, retrospectives.",
    icon: RefreshCw,
    badge: "Phase 05",
  },
];

export default function WhatAreWe() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="what-we-are" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          01 // The Operating Philosophy
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          What is THE GROUND?
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          THE GROUND is a <span className="text-zinc-200 font-medium">student-driven builder ecosystem</span>. We do not run hypothetical classroom exercises or academic simulations. Students learn through a continuous, disciplined five-part cycle:
        </p>
      </div>

      {/* Interactive Step Sequence */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? "bg-white/[0.07] border-white/30 text-white shadow-subtle-card"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                }`}
              >
                <div
                  className={`p-2.5 rounded-md border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                      : "bg-white/5 border-white/10 text-zinc-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm uppercase tracking-wider font-semibold">
                      {step.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">{step.badge}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details Panel */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-3xl pointer-events-none -z-10" />

          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase">
                {steps[activeStep].badge}
              </span>
              <h3 className="text-2xl font-mono uppercase text-white font-medium">
                {steps[activeStep].name}
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">Step {activeStep + 1} of 5</span>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                The Ground Execution Model
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {steps[activeStep].fullDesc}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Tangible Outputs & Evidence
              </div>
              <p className="text-xs text-zinc-300 font-mono">
                {steps[activeStep].action}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="text-xs font-mono uppercase text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                &larr; Previous Phase
              </button>

              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-violet-400 hover:text-violet-300 transition-colors"
              >
                <span>{activeStep === 4 ? "Restart Loop" : "Next Phase"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
