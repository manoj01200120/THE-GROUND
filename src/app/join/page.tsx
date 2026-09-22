import StudentRegistrationForm from "@/components/forms/StudentRegistrationForm";

export const metadata = {
  title: "Join THE GROUND — Student Builder Application",
  description:
    "Apply to become a student builder in THE GROUND ecosystem. Build real things with real people.",
};

export default function JoinPage() {
  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[11px] font-mono tracking-widest text-violet-300 uppercase">
          Application Engine
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white font-mono uppercase">
          Join THE GROUND
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          We are looking for students who want to learn by building real things with real people. Fill out the application with candor and specifics.
        </p>
      </div>

      <StudentRegistrationForm />
    </div>
  );
}
