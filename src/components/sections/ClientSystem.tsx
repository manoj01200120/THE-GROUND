import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ClientSystem() {
  const steps = [
    { num: "01", name: "Lead", desc: "Initial problem submission via our client intake portal." },
    { num: "02", name: "Qualification", desc: "Rigorous evaluation of project feasibility and technical scope." },
    { num: "03", name: "Discovery", desc: "Deep architectural alignment sessions with technical stakeholders." },
    { num: "04", name: "Proposal", desc: "Detailed timeline, milestones, sprint plan, and resource allocation." },
    { num: "05", name: "Agreement", desc: "Formal commitment, transparent milestone criteria, and budget escrow." },
    { num: "06", name: "Team Formation", desc: "Handpicked student builder squad matched to system domain." },
    { num: "07", name: "Build", desc: "Rapid sprint execution, continuous integration, weekly staging demos." },
    { num: "08", name: "Review", desc: "Code quality audits, peer review by senior mentors, security scanning." },
    { num: "09", name: "Delivery", desc: "Production release, infrastructure cutover, and comprehensive docs." },
    { num: "10", name: "Acceptance", desc: "Verification against agreed acceptance criteria and sign-off." },
    { num: "11", name: "Support", desc: "Post-launch warranty, bug patches, and operational monitoring." },
    { num: "12", name: "Closure", desc: "Retrospective, transparent financial distribution, long-term options." },
  ];

  return (
    <section id="for-clients" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#0B1C2D]/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono tracking-widest text-[#0B1C2D]/80 uppercase">
            08 // Commercial Partnerships
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-[#071521]">
            Work With THE GROUND
          </h2>
          <p className="text-[#071521]/80 text-base leading-relaxed font-sans">
            We partner with companies, startups, and institutions who need real software engineered with high craft and disciplined accountability.
          </p>
        </div>

        <Link
          href="/clients"
          className="btn-ground-primary px-6 py-3.5 text-xs tracking-widest inline-flex items-center gap-2 self-start shadow-sm"
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
            className="ground-card p-4 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#0B1C2D] font-bold">{st.num}</span>
              <span className="text-[10px] font-mono text-[#0B1C2D]/50 uppercase">Stage</span>
            </div>
            <div className="font-sans text-sm uppercase text-[#0B1C2D] font-semibold">
              {st.name}
            </div>
            <p className="text-xs text-[#071521]/80 leading-relaxed font-sans">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Client Value Proposition */}
      <div className="mt-12 p-8 ground-card-dark flex flex-col md:flex-row items-center justify-between gap-8 border border-ground-cream/20">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ground-cream">
            <ShieldCheck className="w-4 h-4 text-ground-cream" />
            <span className="font-semibold">Genuine Value & Transparent Economics</span>
          </div>
          <h3 className="text-xl font-sans uppercase text-ground-cream font-medium tracking-wide">
            Real Engineering. Transparent Revenue.
          </h3>
          <p className="text-xs text-ground-cream/80 leading-relaxed font-sans">
            Client fees directly compensate the student builders and fund ecosystem infrastructure. We do not inflate administrative overhead; our incentive is shipping flawless software that solves your business bottleneck.
          </p>
        </div>

        <Link
          href="/clients"
          className="btn-ground-outline px-6 py-3 text-xs tracking-widest text-ground-cream border-ground-cream/30 hover:border-ground-cream/60 whitespace-nowrap"
        >
          Submit Client Inquiry &rarr;
        </Link>
      </div>
    </section>
  );
}
