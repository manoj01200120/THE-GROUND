import {
  AlertCircle,
  CheckCircle2,
  Link2,
  Users,
  Target,
  Compass,
  Sparkles,
  Trophy,
} from "lucide-react";

const missingElements = [
  {
    title: "Capable Teams",
    desc: "Isolated individuals cannot build large-scale distributed systems or production products alone.",
    icon: Users,
  },
  {
    title: "Real Problems",
    desc: "Toy classroom assignments and synthetic tutorial exercises fail to prepare students for ambiguous real-world constraints.",
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
    desc: "A trusted, organized framework where ideas transform into shipped software and verified capability.",
    icon: Trophy,
  },
];

export default function WhyWeExist() {
  return (
    <section
      id="why-we-exist"
      className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15"
    >
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
          02 // The Reality Gap
        </div>

        <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
          Why We Exist
        </h2>

        <p className="text-[#071521]/80 text-base md:text-lg leading-relaxed font-sans">
          There is an immense chasm between{" "}
          <span className="text-[#0B1C2D] font-semibold">
            classroom learning
          </span>{" "}
          and{" "}
          <span className="text-[#0B1C2D] font-semibold">
            real-world capability
          </span>
          .
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* What Students Have */}
        <div className="ground-card p-8 relative space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0B1C2D] uppercase tracking-widest border-b border-[#0B1C2D]/10 pb-4">
            <CheckCircle2
              className="w-4 h-4"
              aria-hidden="true"
            />

            <span className="font-semibold">
              What Students Have
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#0B1C2D]/10 border border-[#0B1C2D]/15">
              <div className="text-[#0B1C2D] font-sans font-semibold text-sm uppercase tracking-wide">
                Boundless Ideas
              </div>

              <p className="text-[#071521]/80 text-xs mt-1 leading-relaxed font-sans">
                Students possess fresh perspectives, unconstrained creativity,
                and hunger to solve meaningful challenges.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0B1C2D]/10 border border-[#0B1C2D]/15">
              <div className="text-[#0B1C2D] font-sans font-semibold text-sm uppercase tracking-wide">
                Raw Technical Curiosity
              </div>

              <p className="text-[#071521]/80 text-xs mt-1 leading-relaxed font-sans">
                Aptitude for programming languages, design fundamentals,
                algorithmic problem-solving, and foundational theory.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0B1C2D]/10 border border-[#0B1C2D]/15">
              <div className="text-[#0B1C2D] font-sans font-semibold text-sm uppercase tracking-wide">
                Energy & Agency
              </div>

              <p className="text-[#071521]/80 text-xs mt-1 leading-relaxed font-sans">
                Willingness to dedicate intense focus toward building things
                they genuinely care about with real collaborators.
              </p>
            </div>
          </div>
        </div>

        {/* The Missing Bridge */}
        <div className="ground-card-dark p-8 relative space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono text-ground-cream uppercase tracking-widest border-b border-ground-cream/15 pb-4">
            <AlertCircle
              className="w-4 h-4"
              aria-hidden="true"
            />

            <span className="font-semibold">
              The Missing Bridge THE GROUND Connects
            </span>
          </div>

          <div className="space-y-2.5">
            {missingElements.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-3 rounded-lg bg-[#071521]/60 border border-ground-cream/15 hover:border-ground-cream/35 transition-colors"
                >
                  <div className="p-1.5 rounded bg-ground-cream/15 text-ground-cream mt-0.5 shrink-0">
                    <Icon
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-ground-cream font-sans text-xs uppercase tracking-wider font-semibold">
                      {item.title}
                    </div>

                    <p className="text-ground-cream/75 text-xs mt-0.5 leading-relaxed font-sans">
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
      <div className="mt-8 p-6 rounded-xl border border-[#0B1C2D]/15 bg-[#0B1C2D]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#0B1C2D] text-[#F3EBDD] shrink-0">
            <Link2
              className="w-5 h-5"
              aria-hidden="true"
            />
          </div>

          <div>
            <div className="text-sm font-sans uppercase tracking-wider text-[#0B1C2D] font-semibold">
              THE GROUND connects talent with real problems
            </div>

            <div className="text-xs text-[#071521]/80 font-sans">
              Transforming potential into collective, practical capability.
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[#0B1C2D] uppercase tracking-widest px-3 py-1.5 rounded border border-[#0B1C2D]/25 bg-[#F3EBDD] font-medium shadow-xs">
          Capability &gt; Classroom Theory
        </div>
      </div>
    </section>
  );
}