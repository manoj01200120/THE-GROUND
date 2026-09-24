import StudentRegistrationForm from "@/components/forms/StudentRegistrationForm";

export const metadata = {
  title: "Join THE GROUND — Builder Registration",
  description:
    "Register as a builder in THE GROUND ecosystem. Learn by building real things with real people.",
};

export default function JoinPage() {
  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0B1C2D]/20 bg-[#0B1C2D]/10 text-[11px] font-mono tracking-widest text-[#0B1C2D] uppercase">
          Builder Onboarding
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-[0.2em] text-[#0B1C2D]">
          Join THE GROUND
        </h1>
        <p className="text-[#071521]/80 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
          We welcome students, professionals, and curious builders ready to learn by building real things with real collaborators.
        </p>
      </div>

      <StudentRegistrationForm />
    </div>
  );
}
