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
    <section id="member-journey" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          06 // Progression & Growth
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          The Member Journey
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          Responsibility is never handed out by title or seniority. It is earned through an unceasing flywheel of contribution and trust.
        </p>
      </div>

      {/* 4 Trust Pillars */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-violet-300 font-semibold">
              + {p.title}
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Cinematic Journey Timeline */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journeyStages.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.name + idx}
              className="glass-panel rounded-xl p-6 border border-white/[0.07] hover:border-violet-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded bg-white/5 border border-white/10 text-white group-hover:text-violet-300 group-hover:border-violet-500/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{st.phase}</span>
              </div>

              <div>
                <h3 className="text-lg font-mono uppercase text-white font-medium">
                  {st.name}
                </h3>
                <div className="text-xs font-mono text-violet-400 italic">
                  {st.tagline}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
