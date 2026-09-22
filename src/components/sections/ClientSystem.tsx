import Link from "next/link";
import { ArrowUpRight, CheckCircle, ShieldCheck } from "lucide-react";

export default function ClientSystem() {
  const steps = [
    { num: "01", name: "Lead", desc: "Initial problem submission via our client intake portal." },
    { num: "02", name: "Qualification", desc: "Rigorous evaluation of project feasibility and technical scope." },
    { num: "03", name: "Discovery", desc: "Deep architectural alignment sessions with technical stakeholders." },
    { num: "04", name: "Proposal", desc: "Detailed timeline, milestones, sprint plan, and resource allocation." },
    { num: "05", name: "Agreement", desc: "Formal commitment, transparent budget escrow, and milestone criteria." },
    { num: "06", name: "Team Formation", desc: "Handpicked student builder squad matched to system domain." },
    { num: "07", name: "Build", desc: "Rapid sprint execution, continuous integration, weekly staging demos." },
    { num: "08", name: "Review", desc: "Code quality audits, peer review by senior mentors, security scanning." },
    { num: "09", name: "Delivery", desc: "Production release, infrastructure cutover, and comprehensive docs." },
    { num: "10", name: "Acceptance", desc: "Verification against agreed acceptance criteria and sign-off." },
    { num: "11", name: "Support", desc: "Post-launch warranty, bug patches, and operational monitoring." },
    { num: "12", name: "Closure", desc: "Retrospective, transparent financial distribution, long-term options." },
  ];

  return (
    <section id="for-clients" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-violet-400 uppercase">
            08 // Commercial Partnerships
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-mono uppercase">
            Work With THE GROUND
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            We partner with companies, startups, and institutions who need real software engineered with high craft and disciplined accountability.
          </p>
        </div>

        <Link
          href="/clients"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-glow-subtle self-start"
        >
          <span>Bring Us a Problem</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 12-Step Client Process Grid */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {steps.map((st) => (
          <div
            key={st.num}
            className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-violet-400 font-bold">{st.num}</span>
              <span className="text-[10px] font-mono text-zinc-600 uppercase">Stage</span>
            </div>
            <div className="font-mono text-sm uppercase text-white font-medium">
              {st.name}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Client Value Proposition */}
      <div className="mt-12 p-8 glass-panel rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Value & Transparent Economics</span>
          </div>
          <h3 className="text-xl font-mono uppercase text-white font-semibold">
            Real Engineering. Transparent Revenue.
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Client fees directly compensate the student builders and fund ecosystem infrastructure. We do not inflate administrative overhead; our incentive is shipping flawless software that solves your business bottleneck.
          </p>
        </div>

        <Link
          href="/clients"
          className="px-6 py-3 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-white transition-colors whitespace-nowrap"
        >
          Submit Client Inquiry &rarr;
        </Link>
      </div>
    </section>
  );
}
