import {
  CheckCircle,
  Briefcase,
  Layers,
  Award,
  Users,
  Compass,
  Building,
  DollarSign,
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
      desc: "Master asynchronous communication, version control discipline, architectural trade-offs, and high-pressure system debugging.",
      icon: Layers,
    },
    {
      title: "Verifiable Accomplishments",
      desc: "A tangible track record of real commits, deployed URLs, and peer-reviewed contributions that clearly demonstrate competence.",
      icon: Award,
    },
    {
      title: "Team Collaboration",
      desc: "Learn to build seamlessly with engineers, designers, product managers, and researchers in an autonomous, high-trust environment.",
      icon: Users,
    },
    {
      title: "Senior Mentorship",
      desc: "Direct architectural reviews, code critiques, and one-on-one guidance from experienced builders and senior industry practitioners.",
      icon: Compass,
    },
    {
      title: "Direct Client Exposure",
      desc: "Participate in stakeholder discovery sessions, scope system requirements, and deliver working product demos to real companies.",
      icon: Building,
    },
    {
      title: "Leadership Opportunities",
      desc: "Earn the opportunity to lead project squads, architect system modules, mentor newer members, and direct product roadmap.",
      icon: CheckCircle,
    },
    {
      title: "Legitimate Client Earnings",
      desc: "Direct financial compensation on contracted commercial engagements. When clients pay for genuine value, builders earn.",
      icon: DollarSign,
    },
  ];

  return (
    <section id="what-students-get" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-ground-dark/15">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          05 // True Value Creation
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#071521] uppercase font-sans">
          What Students Get
        </h2>
        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed">
          Tangible capability and authentic experience. What you earn in THE GROUND is direct, verifiable leverage.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="ground-card p-6 space-y-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0B1C2D]/15 border border-[#0B1C2D]/20 flex items-center justify-center text-[#0B1C2D]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-sm uppercase tracking-wide text-[#0B1C2D] font-semibold">
                {b.title}
              </h3>
              <p className="text-xs text-[#071521]/80 leading-relaxed font-sans">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
