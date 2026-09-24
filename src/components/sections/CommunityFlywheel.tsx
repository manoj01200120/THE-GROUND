import { Users, Zap, FolderGit2, Box, Building2, Coins } from "lucide-react";
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
    <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          09 // The Long-Term Vision
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
          The Ecosystem Flywheel
        </h2>
        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed font-sans">
          How THE GROUND compounds capability over generations. Each stage fuels the next in a perpetual, self-sustaining loop.
        </p>
      </div>

      {/* Visual Flywheel Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {flywheelNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              className="ground-card p-5 flex flex-col justify-between space-y-3 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-[#0B1C2D]/10 border border-[#0B1C2D]/15 text-[#0B1C2D]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#0B1C2D]/60">0{idx + 1}</span>
                </div>

                <div>
                  <h3 className="text-base font-sans uppercase text-[#0B1C2D] font-semibold">
                    {node.label}
                  </h3>
                  <p className="text-xs text-[#071521]/80 mt-1 leading-relaxed font-sans">
                    {node.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#0B1C2D]/10 flex items-center justify-between text-[11px] font-mono text-[#0B1C2D]/60">
                <span>Next &rarr;</span>
                <span className="text-[#0B1C2D] font-medium">
                  {idx === flywheelNodes.length - 1 ? "More People" : flywheelNodes[idx + 1].label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vision Statement Banner */}
      <div className="mt-16 p-10 ground-card-dark text-center relative overflow-hidden border border-ground-cream/20">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-ground-cream/70">
            Join the Generation of Builders
          </div>
          <h3 className="text-3xl sm:text-4xl font-sans uppercase text-ground-cream font-medium tracking-wide">
            Where Ideas Take Shape.
          </h3>
          <p className="text-ground-cream/80 text-sm leading-relaxed font-sans">
            Whether you are a student ready to build real systems or an organization seeking world-class technical execution, you belong here.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="w-full sm:w-auto btn-ground-primary px-8 py-3.5 text-xs tracking-widest shadow-sm"
            >
              Apply as Builder
            </Link>
            <Link
              href="/clients"
              className="w-full sm:w-auto btn-ground-outline px-8 py-3.5 text-xs tracking-widest text-ground-cream border-ground-cream/30 hover:border-ground-cream/60"
            >
              Bring Us a Problem
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
