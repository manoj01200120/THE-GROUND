import {
  CheckCircle,
  Briefcase,
  Layers,
  Award,
  Users,
  Compass,
  Building,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function WhatStudentsGet() {
  const benefits = [
    {
      title: "Real Project Experience",
      desc: "Work on live systems with production databases, automated deployment pipelines, and active users instead of artificial toy problems.",
      icon: Briefcase,
    },
    {
      title: "Practical Capability",
      desc: "Master asynchronous communication, git workflows, architectural trade-offs, testing discipline, and high-pressure debugging.",
      icon: Layers,
    },
    {
      title: "Verifiable Proof of Work",
      desc: "A public, tamper-proof track record of actual commits, deployed URLs, and peer-reviewed contributions that speak louder than any resume.",
      icon: Award,
    },
    {
      title: "Team Collaboration",
      desc: "Learn to build seamlessly with engineers, designers, product managers, and researchers in an autonomous, high-trust environment.",
      icon: Users,
    },
    {
      title: "Senior Mentorship",
      desc: "Direct feedback, architectural reviews, and 1-on-1 guidance from experienced builders and senior industry engineers.",
      icon: Compass,
    },
    {
      title: "Direct Client Exposure",
      desc: "Participate in stakeholder meetings, requirements gathering, discovery sessions, and deliver product demos to real companies.",
      icon: Building,
    },
    {
      title: "Leadership Opportunities",
      desc: "Earn the right to lead project squads, architect system modules, mentor newer members, and direct product strategy.",
      icon: CheckCircle,
    },
    {
      title: "Legitimate Client Earnings",
      desc: "Direct financial compensation on contracted commercial engagements. When clients pay for value, the student builders earn.",
      icon: DollarSign,
    },
  ];

  return (
    <section id="what-students-get" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          05 // True Value Creation
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          What Students Get
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          Tangible capability and authentic proof of work. What you earn in THE GROUND is direct, verifiable leverage.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="glass-panel rounded-xl p-6 border border-white/[0.07] hover:border-white/20 transition-all space-y-3"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-300">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-mono text-sm uppercase tracking-wide text-white font-semibold">
                {b.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Explicit No False Promises Disclaimer */}
      <div className="mt-10 p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
            Our Integrity Standard — No Artificial Promises
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            THE GROUND does not guarantee jobs, internships, or placements. We do not sell credential shortcuts. We provide the ecosystem, the challenges, the teams, and the mentorship. Your reputation and your outcomes are created solely by the quality and reliability of what you build.
          </p>
        </div>
      </div>
    </section>
  );
}
