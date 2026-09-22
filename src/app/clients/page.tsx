import ClientInquiryForm from "@/components/forms/ClientInquiryForm";
import ClientSystem from "@/components/sections/ClientSystem";

export const metadata = {
  title: "Work With THE GROUND — Bring Us a Problem",
  description:
    "Partner with student builder squads on real-world engineering, design, and product initiatives.",
};

export default function ClientsPage() {
  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto space-y-20">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono tracking-widest text-emerald-300 uppercase">
          Client Portal
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white font-mono uppercase">
          Bring Us a Problem
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          We engineer high-craft software for startups, institutions, and enterprise teams. Tell us what you need solved.
        </p>
      </div>

      <ClientInquiryForm />

      <div className="pt-12">
        <ClientSystem />
      </div>
    </div>
  );
}
