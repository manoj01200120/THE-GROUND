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
    fullDesc: "Theory without execution is dormant. In this phase, multidisciplinary teams architect data schemas, write production-grade code, craft intuitive interfaces, and conduct peer reviews under real-world version control.",
    action: "System implementation, component design, schema migrations, automated tests.",
    icon: Hammer,
    badge: "Phase 02",
  },
  {
    id: "ship",
    name: "Ship",
    shortDesc: "Deliver real software into the hands of real users or legitimate clients.",
    fullDesc: "A project does not exist until it is deployed in production. We configure deployment pipelines, monitor error logs, run load tests, and deliver functional software to clients, open-source communities, or real users.",
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
    <section id="what-we-are" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          01 // The Operating Philosophy
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
          What is THE GROUND?
        </h2>
        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed font-sans">
          THE GROUND is a <span className="text-[#0B1C2D] font-semibold">student-driven builder ecosystem</span>. We do not run hypothetical classroom exercises or academic simulations. Students learn through a continuous, disciplined five-part cycle:
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
                    ? "bg-[#0B1C2D] text-[#F3EBDD] border-[#0B1C2D] shadow-md"
                    : "ground-card text-[#071521]/80 hover:text-[#0B1C2D] hover:bg-[#0B1C2D]/15"
                }`}
              >
                <div
                  className={`p-2.5 rounded-md border ${
                    isSelected
                      ? "bg-[#F3EBDD]/15 border-[#F3EBDD]/30 text-[#F3EBDD]"
                      : "bg-[#0B1C2D]/10 border-[#0B1C2D]/15 text-[#0B1C2D]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm uppercase tracking-wider font-semibold">
                      {step.name}
                    </span>
                    <span className={`text-[11px] font-mono ${isSelected ? "text-[#F3EBDD]/70" : "text-[#0B1C2D]/60"}`}>
                      {step.badge}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 line-clamp-2 leading-relaxed font-sans ${isSelected ? "text-[#F3EBDD]/80" : "text-[#071521]/75"}`}>
                    {step.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details Panel */}
        <div className="lg:col-span-7 ground-card-dark p-8 md:p-10 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-ground-cream/15 pb-5">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-ground-cream/15 border border-ground-cream/30 text-ground-cream text-xs font-mono uppercase">
                {steps[activeStep].badge}
              </span>
              <h3 className="text-2xl font-sans uppercase text-ground-cream font-medium">
                {steps[activeStep].name}
              </h3>
            </div>
            <span className="text-xs font-mono text-ground-cream/60">Step {activeStep + 1} of 5</span>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-ground-cream/60 mb-2">
                The Ground Execution Model
              </div>
              <p className="text-ground-cream/90 text-sm md:text-base leading-relaxed font-sans">
                {steps[activeStep].fullDesc}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#071521]/60 border border-ground-cream/15 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ground-cream/70">
                Tangible Outputs & Evidence
              </div>
              <p className="text-xs text-ground-cream font-mono leading-relaxed">
                {steps[activeStep].action}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-ground-cream/10">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="text-xs font-mono uppercase text-ground-cream/60 hover:text-ground-cream disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                &larr; Previous Phase
              </button>

              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-ground-cream hover:underline transition-colors"
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
