import { Users, Zap, FolderGit2, Box, Building2, Coins, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityFlywheel() {
  const flywheelNodes = [
    { label: "People", desc: "Hungry, ambitious student builders", icon: Users },
    { label: "Capability", desc: "Rigorous technical & product discipline", icon: Zap },
    { label: "Projects", desc: "Authentic challenges with real constraints", icon: FolderGit2 },
    { label: "Products", desc: "Production software shipped to the wild", icon: Box },
    { label: "Companies", desc: "Spinouts, ventures, and client partners", icon: Building2 },
    { label: "Capital", desc: "Sustainable revenue & community reinvestment", icon: Coins },
  ];

  return (
    <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
          09 // The Long-Term Vision
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
          The Ecosystem Flywheel
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          How THE GROUND compounds capability over generations. Each stage fuels the next in a perpetual, self-sustaining loop.
        </p>
      </div>

      {/* Visual Flywheel Linear/Loop Representation */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {flywheelNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              className="glass-panel rounded-xl p-5 border border-white/[0.07] hover:border-violet-500/30 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-violet-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                </div>

                <div>
                  <h3 className="text-base font-mono uppercase text-white font-medium">
                    {node.label}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Next &rarr;</span>
                <span className="text-zinc-400">
                  {idx === flywheelNodes.length - 1 ? "More People" : flywheelNodes[idx + 1].label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vision Statement Banner */}
      <div className="mt-16 p-10 glass-panel rounded-2xl border border-white/10 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
            Join the Generation of Builders
          </div>
          <h3 className="text-3xl sm:text-4xl font-mono uppercase text-white font-medium">
            Stop waiting for permission. Build on THE GROUND.
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Whether you are a student ready to build real systems or an organization seeking world-class technical execution, you belong here.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-white text-black font-mono font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all"
            >
              Apply as Student Builder
            </Link>
            <Link
              href="/clients"
              className="w-full sm:w-auto px-8 py-3.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-widest transition-all"
            >
              Partner as Client
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
