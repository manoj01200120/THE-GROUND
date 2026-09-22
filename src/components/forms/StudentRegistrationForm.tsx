"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fullStudentApplicationSchema,
  StudentApplicationInput,
} from "@/lib/validation/student.schema";
import { submitStudentApplication } from "@/lib/actions/student.actions";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  FileText,
  User,
  Lightbulb,
  Cpu,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const skillOptions = [
  "Engineering",
  "Design",
  "Research",
  "Product",
  "Marketing",
  "Content",
  "Operations",
  "Other",
];

const experienceLevels = [
  "Beginner (Learning syntax & foundations)",
  "Intermediate (Built a few personal projects)",
  "Advanced (Production code / Open Source contributor)",
  "Expert (Led systems or shipped commercial software)",
];

const availabilityOptions = [
  "10 - 15 hours / week",
  "15 - 20 hours / week",
  "20 - 30 hours / week",
  "30+ hours / week (Full immersion)",
];

const projectTypeOptions = [
  "Technical Infrastructure & Systems",
  "End-to-End Web / Mobile Products",
  "Applied Machine Learning & Research",
  "Client / Industry Commercial Builds",
  "Civic & Social Impact Technology",
  "Hardware & Embedded Systems",
];

export default function StudentRegistrationForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentApplicationInput>({
    resolver: zodResolver(fullStudentApplicationSchema),
    mode: "onBlur",
    defaultValues: {
      secondarySkills: [],
      projectTypes: [],
      consent: false,
    },
  });

  const selectedPrimarySkill = watch("primarySkill");
  const selectedSecondarySkills = watch("secondarySkills") || [];
  const selectedProjectTypes = watch("projectTypes") || [];

  const handleNext = async () => {
    let fieldsToValidate: (keyof StudentApplicationInput)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["name", "email", "phone", "college", "course", "year", "city"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["whatToBuild", "projects", "learningGoals", "interests"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["primarySkill", "secondarySkills", "experienceLevel"];
    } else if (currentStep === 4) {
      fieldsToValidate = ["whyJoin", "availability", "projectTypes"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setServerError("");
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    setServerError("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: StudentApplicationInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await submitStudentApplication(data);
      if (res.success && res.applicationId) {
        setSubmitSuccess(true);
        setApplicationId(res.applicationId);
      } else {
        setServerError(res.error || "Failed to submit application. Please verify your details.");
      }
    } catch {
      setServerError("A network error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="glass-panel rounded-2xl p-8 md:p-12 border border-emerald-500/30 text-center space-y-6 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Application Received
          </span>
          <h2 className="text-3xl font-mono uppercase text-white font-medium">
            Welcome to the Review Queue
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Your application has been logged into THE GROUND PostgreSQL database. Our peer review committee evaluates applications based on genuine interest, prior curiosity, and reliability.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-left font-mono text-xs space-y-1">
          <div className="text-zinc-500 uppercase text-[10px]">Reference ID</div>
          <div className="text-zinc-200 select-all font-semibold">{applicationId}</div>
          <div className="text-zinc-500 text-[11px] pt-1">
            Status: <span className="text-amber-400 font-semibold">PENDING REVIEW</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded bg-white text-black font-mono font-medium text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Explore Active Projects
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded border border-white/15 bg-white/5 text-zinc-300 font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-10 border border-white/10 max-w-3xl mx-auto relative overflow-hidden">
      {/* Step Progress Bar */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-violet-400 uppercase tracking-widest">
            Step 0{currentStep} of 05
          </span>
          <span className="text-zinc-500">
            {currentStep === 1 && "Personal & Academic"}
            {currentStep === 2 && "Curiosity & Prior Work"}
            {currentStep === 3 && "Skills & Capability"}
            {currentStep === 4 && "Commitment & Focus"}
            {currentStep === 5 && "Proof of Work & Final"}
          </span>
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* STEP 1: BASIC */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-mono uppercase text-white font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" />
                Step 1: Basic Information
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Tell us who you are and where you are currently studying.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Full Name *</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.name && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Email Address *</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="e.g. alex@institution.edu"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.email && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Phone Number *</label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">City / Location *</label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="e.g. Bengaluru, India"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.city && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-zinc-300">College / Institution *</label>
                <input
                  type="text"
                  {...register("college")}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.college && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.college.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Course / Major *</label>
                <input
                  type="text"
                  {...register("course")}
                  placeholder="e.g. B.Tech Computer Science"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.course && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.course.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Academic Year *</label>
                <select
                  {...register("year")}
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master&apos;s</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                </select>
                {errors.year && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.year.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ABOUT YOU */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-mono uppercase text-white font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-violet-400" />
                Step 2: About You & Your Curiosity
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                We value what excites you and what you have attempted to create.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">
                  What have you built before? (Projects, scripts, prototypes, designs) *
                </label>
                <textarea
                  rows={3}
                  {...register("projects")}
                  placeholder="Describe anything you have built, whether complete or incomplete. What was difficult about it?"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.projects && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.projects.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">
                  What do you want to build in THE GROUND? *
                </label>
                <textarea
                  rows={3}
                  {...register("whatToBuild")}
                  placeholder="Is there a problem, product, tool, or system you are itching to bring into the world?"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.whatToBuild && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.whatToBuild.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">
                  What do you want to learn? *
                </label>
                <textarea
                  rows={2}
                  {...register("learningGoals")}
                  placeholder="Which skills, architectures, or disciplines do you want to master?"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.learningGoals && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.learningGoals.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">
                  What are you deeply interested in right now? *
                </label>
                <textarea
                  rows={2}
                  {...register("interests")}
                  placeholder="e.g. Distributed consensus, zero-knowledge proofs, spatial design, compiler internals, edge AI..."
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.interests && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.interests.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CAPABILITY */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-mono uppercase text-white font-medium flex items-center gap-2">
                <Cpu className="w-4 h-4 text-violet-400" />
                Step 3: Capability & Skills
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select your core discipline and complementary skills.
              </p>
            </div>

            {/* Primary Skill */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300">
                Primary Skill Domain *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {skillOptions.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => setValue("primarySkill", skill, { shouldValidate: true })}
                    className={`p-3 rounded-lg border text-xs font-mono uppercase text-left transition-all ${
                      selectedPrimarySkill === skill
                        ? "bg-violet-500/20 border-violet-500 text-white font-semibold shadow-glow-violet"
                        : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {errors.primarySkill && (
                <p className="text-[11px] text-red-400 font-mono">{errors.primarySkill.message}</p>
              )}
            </div>

            {/* Secondary Skills */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300">
                Secondary Skills (Select all that apply) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {skillOptions.map((skill) => {
                  const isChecked = selectedSecondarySkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={"sec-" + skill}
                      onClick={() => {
                        const updated = isChecked
                          ? selectedSecondarySkills.filter((s) => s !== skill)
                          : [...selectedSecondarySkills, skill];
                        setValue("secondarySkills", updated, { shouldValidate: true });
                      }}
                      className={`p-2.5 rounded border text-xs font-mono uppercase text-left transition-all ${
                        isChecked
                          ? "bg-white/10 border-white/40 text-white"
                          : "bg-white/[0.01] border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {skill}
                    </button>
                  );
                })}
              </div>
              {errors.secondarySkills && (
                <p className="text-[11px] text-red-400 font-mono">{errors.secondarySkills.message}</p>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono text-zinc-300">
                Experience Level *
              </label>
              <select
                {...register("experienceLevel")}
                className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
              >
                <option value="">Select your self-assessed experience</option>
                {experienceLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              {errors.experienceLevel && (
                <p className="text-[11px] text-red-400 font-mono">{errors.experienceLevel.message}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: COMMITMENT */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-mono uppercase text-white font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                Step 4: Commitment & Alignment
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                We operate as high-trust teams. Transparency regarding your time is essential.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">
                  Why do you want to join THE GROUND? *
                </label>
                <textarea
                  rows={3}
                  {...register("whyJoin")}
                  placeholder="What makes THE GROUND different for you compared to typical clubs or internships?"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.whyJoin && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.whyJoin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300">
                  Weekly Time Contribution *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availabilityOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setValue("availability", opt, { shouldValidate: true })}
                      className={`p-3 rounded border text-xs font-mono text-left transition-all ${
                        watch("availability") === opt
                          ? "bg-violet-500/20 border-violet-500 text-white font-semibold"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.availability && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.availability.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300">
                  What type of projects interest you most? (Select multiple) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {projectTypeOptions.map((type) => {
                    const isChecked = selectedProjectTypes.includes(type);
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          const updated = isChecked
                            ? selectedProjectTypes.filter((t) => t !== type)
                            : [...selectedProjectTypes, type];
                          setValue("projectTypes", updated, { shouldValidate: true });
                        }}
                        className={`p-2.5 rounded border text-xs font-mono text-left transition-all ${
                          isChecked
                            ? "bg-white/10 border-white/40 text-white"
                            : "bg-white/[0.01] border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {isChecked ? "✓ " : "+ "}
                        {type}
                      </button>
                    );
                  })}
                </div>
                {errors.projectTypes && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.projectTypes.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-mono uppercase text-white font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                Step 5: Proof of Work & Links
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Share links to your code, designs, or online footprint.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">GitHub Profile URL</label>
                <input
                  type="url"
                  {...register("github")}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.github && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.github.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Portfolio / Personal Website</label>
                <input
                  type="url"
                  {...register("portfolio")}
                  placeholder="https://yourname.dev"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.portfolio && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.portfolio.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">LinkedIn Profile URL</label>
                <input
                  type="url"
                  {...register("linkedin")}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.linkedin && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.linkedin.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Resume / CV Link</label>
                <input
                  type="url"
                  {...register("resumeUrl")}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                {errors.resumeUrl && (
                  <p className="text-[11px] text-red-400 font-mono">{errors.resumeUrl.message}</p>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-zinc-300">Additional Links (Figma, Substack, etc.)</label>
                <input
                  type="text"
                  {...register("additionalLinks")}
                  placeholder="Any other URLs you would like us to review"
                  className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-black/40 text-violet-500 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-zinc-400 leading-relaxed font-sans">
                  I certify that all information provided is accurate and representational of my own work. I understand that THE GROUND is a meritocratic ecosystem governed by Capability, Reliability, Contribution, and Trust.
                </span>
              </label>
              {errors.consent && (
                <p className="text-[11px] text-red-400 font-mono mt-1">{errors.consent.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded border border-white/10 bg-white/[0.02] text-xs font-mono uppercase text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded bg-white text-black font-mono font-medium text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-glow-subtle"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded bg-violet-600 hover:bg-violet-500 text-white font-mono font-semibold text-xs uppercase tracking-widest transition-all shadow-glow-violet disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting to Database...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
