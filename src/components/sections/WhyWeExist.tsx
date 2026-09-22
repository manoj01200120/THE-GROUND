import { AlertCircle, CheckCircle2, Link2, Users, Target, Compass, Sparkles, Trophy } from "lucide-react";

export default function WhyWeExist() {
  const missingElements = [
    {
      title: "Capable Teams",
      desc: "Isolated individuals cannot build large-scale distributed systems or production products alone.",
      icon: Users,
    },
    {
      title: "Real Problems",
      desc: "Toy classroom assignments and synthetic tutorial code fail to prepare students for ambiguous real-world constraints.",
      icon: Target,
    },
    {
      title: "Active Mentors",
      desc: "Senior practitioners and experienced peer architects who review code, critique design, and guide decisions.",
      icon: Compass,
    },
    {
      title: "Real-World Exposure",
      desc: "Actual clients, production deployments, user feedback loops, and accountability for uptime.",
      icon: Sparkles,
    },
    {
      title: "Opportunities to Build",
      desc: "A trusted, organized framework where ideas transform into shipped software and verified proof of work.",
      icon: Trophy,
    },
  ];

  return (
    <section id="why-we-exist" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          02 // The Reality Gap
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          Why We Exist
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          There is an immense chasm between <span className="text-zinc-200">classroom learning</span> and <span className="text-zinc-200">real-world capability</span>.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Card: What students have */}
        <div className="glass-panel rounded-xl p-8 border border-white/[0.08] relative">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>What Students Have</span>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="text-white font-mono font-medium text-base">Boundless Ideas</div>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Students possess fresh perspectives, unconstrained creativity, and hunger to solve meaningful societal and technical challenges.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="text-white font-mono font-medium text-base">Raw Technical Skills</div>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Proficiency in programming languages, design fundamentals, algorithmic problem-solving, and foundational theory.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="text-white font-mono font-medium text-base">High Energy & Agency</div>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Willingness to dedicate long nights and intense focus toward building things they genuinely care about.
              </p>
            </div>
          </div>
        </div>

        {/* Right Card: What students lack & what THE GROUND provides */}
        <div className="glass-panel rounded-xl p-8 border border-violet-500/20 bg-gradient-to-b from-violet-950/10 to-transparent relative">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-300 uppercase tracking-widest mb-6">
            <AlertCircle className="w-4 h-4 text-violet-400" />
            <span>The Missing Bridge That THE GROUND Connects</span>
          </div>

          <div className="space-y-3">
            {missingElements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
                >
                  <div className="p-1.5 rounded bg-violet-500/10 text-violet-300 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-white font-mono text-xs uppercase tracking-wider font-semibold">
                      {item.title}
                    </div>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Synthesis Banner */}
      <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 text-white">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-mono uppercase tracking-wider text-white font-medium">
              THE GROUND connects talent with real problems
            </div>
            <div className="text-xs text-zinc-400">
              Transforming individual potential into collective, verifiable capability.
            </div>
          </div>
        </div>
        <div className="text-xs font-mono text-violet-400 uppercase tracking-widest px-3 py-1.5 rounded border border-violet-500/30 bg-violet-500/10">
          Proof of Work &gt; Resumes
        </div>
      </div>
    </section>
  );
}
