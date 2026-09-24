import { Compass, Hammer, Shield, Sparkles, Flame, RefreshCw } from "lucide-react";

interface JourneyStage {
  name: string;
  phase: string;
  tagline: string;
  desc: string;
  icon: typeof Compass;
}

const journeyStages: JourneyStage[] = [
  {
    name: "Explore",
    phase: "Stage 01",
    tagline: "Observe, inspect, and absorb.",
    desc: "Join sessions, review active repositories, engage in discussions, and understand how the ecosystem operates.",
    icon: Compass,
  },
  {
    name: "Build",
    phase: "Stage 02",
    tagline: "Contribute code, design, or research.",
    desc: "Join an active squad. Pick up tasks, submit pull requests, receive peer critiques, and ship your first functional contributions.",
    icon: Hammer,
  },
  {
    name: "Carry",
    phase: "Stage 03",
    tagline: "Own core systems and team outcomes.",
    desc: "Take ownership of major system modules, unblock peers, communicate with clients, and ensure deadlines are met with zero excuses.",
    icon: Shield,
  },
  {
    name: "Guide",
    phase: "Stage 04",
    tagline: "Architect projects and mentor newer builders.",
    desc: "Conduct architectural reviews, onboard new contributors, resolve team bottlenecks, and uphold engineering standards.",
    icon: Sparkles,
  },
  {
    name: "Inspire",
    phase: "Stage 05",
    tagline: "Initiate moonshots and seed new ventures.",
    desc: "Formulate new problem domains, spin out real products, connect external industry partners, and invest back into the ecosystem.",
    icon: Flame,
  },
  {
    name: "Explore",
    phase: "Stage 06",
    tagline: "Return to curiosity at a higher frontier.",
    desc: "The cycle does not terminate. Veteran builders return to explore new paradigms, technologies, and uncharted challenges.",
    icon: RefreshCw,
  },
];

export default function MemberJourney() {
  const pillars = [
    { title: "Capability", desc: "Demonstrated technical, design, or leadership competence." },
    { title: "Reliability", desc: "Showing up consistently, hitting milestones, and keeping commitments." },
    { title: "Contribution", desc: "Tangible output that advances projects and lifts peer builders." },
    { title: "Trust", desc: "Earned autonomy to make high-stakes architectural and client decisions." },
  ];

  return (
    <section id="member-journey" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          06 // Progression & Growth
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
          The Member Journey
        </h2>
        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed font-sans">
          Responsibility is never handed out by title or seniority. It is earned through an unceasing flywheel of contribution and trust.
        </p>
      </div>

      {/* 4 Trust Pillars */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="ground-card p-4 space-y-1"
          >
            <div className="text-xs font-sans uppercase tracking-wider text-[#0B1C2D] font-semibold">
              + {p.title}
            </div>
            <p className="text-xs text-[#071521]/80 font-sans leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Cinematic Journey Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journeyStages.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.name + idx}
              className="ground-card-dark p-6 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded bg-ground-cream/10 border border-ground-cream/20 text-ground-cream group-hover:border-ground-cream/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-ground-cream/60">{st.phase}</span>
              </div>

              <div>
                <h3 className="text-lg font-sans uppercase text-ground-cream font-medium">
                  {st.name}
                </h3>
                <div className="text-xs font-sans text-ground-cream/75 italic">
                  {st.tagline}
                </div>
              </div>

              <p className="text-xs text-ground-cream/80 leading-relaxed font-sans">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
