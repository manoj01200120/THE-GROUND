import ClientInquiryForm from "@/components/forms/ClientInquiryForm";
import ClientSystem from "@/components/sections/ClientSystem";

export const metadata = {
  title: "Work With THE GROUND — Bring Us a Problem",
  description:
    "Partner with verified student builder squads on real-world engineering, design, and software systems.",
};

export default function ClientsPage() {
  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto space-y-20">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0B1C2D]/20 bg-[#0B1C2D]/10 text-[11px] font-mono tracking-widest text-[#0B1C2D] uppercase">
          Client Intake Portal
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-[0.2em] text-[#0B1C2D]">
          Bring Us a Problem
        </h1>
        <p className="text-[#071521]/80 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
          We engineer high-craft software for startups, institutions, and enterprise teams. Tell us what you need solved.
        </p>
      </div>

      <ClientInquiryForm />

      <div className="pt-6">
        <ClientSystem />
      </div>
    </div>
  );
}
