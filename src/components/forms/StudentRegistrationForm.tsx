"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  studentApplicationSchema,
  StudentApplicationInput,
} from "@/lib/validation/student.schema";

import { submitStudentApplication } from "@/lib/actions/student.actions";

import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  GraduationCap,
  Briefcase,
  Layers,
  Send,
} from "lucide-react";

import Link from "next/link";

export default function StudentRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentApplicationInput>({
    resolver: zodResolver(studentApplicationSchema),
    mode: "onBlur",
    defaultValues: {
      currentStatus: "Student",
      courseOrRole: "",
      yearOrSemester: "",
    },
  });

  const currentStatus = watch("currentStatus");

  const onSubmit = async (data: StudentApplicationInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await submitStudentApplication(data);

      if (res.success && res.applicationId) {
        setSubmitSuccess(true);
        setApplicationId(res.applicationId);
      } else {
        setServerError(
          res.error ||
            "Failed to submit application. Please check your inputs."
        );
      }
    } catch {
      setServerError(
        "A network issue occurred while submitting. Please try again or email contact.theground@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="ground-card-dark p-8 md:p-12 text-center space-y-6 max-w-xl mx-auto border border-ground-cream/30">
        <div className="w-16 h-16 rounded-full bg-ground-cream/15 border border-ground-cream/30 text-ground-cream flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-ground-cream/80">
            Application Received
          </span>

          <h2 className="text-2xl md:text-3xl font-sans uppercase text-ground-cream font-medium">
            Welcome to THE GROUND
          </h2>

          <p className="text-ground-cream/80 text-sm leading-relaxed font-sans">
            Your application has been registered. Our ecosystem curators
            review applications continuously and will reach out with
            onboarding details.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#0B1C2D]/60 border border-ground-cream/15 text-left font-mono text-xs space-y-1">
          <div className="text-ground-cream/60 uppercase text-[10px]">
            Reference Number
          </div>

          <div className="text-ground-cream select-all font-semibold">
            {applicationId}
          </div>

          <div className="text-ground-cream/60 text-[11px] pt-1">
            Status:{" "}
            <span className="text-[#F3EBDD] font-semibold">
              PENDING REVIEW
            </span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded btn-ground-primary text-xs tracking-wider"
          >
            Explore Projects
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded btn-ground-outline text-xs tracking-wider text-ground-cream hover:text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ground-card-dark p-6 md:p-10 max-w-2xl mx-auto border border-ground-cream/20 shadow-ground-card-dark">
      <div className="mb-8 space-y-2 border-b border-ground-cream/15 pb-5">
        <h2 className="text-xl md:text-2xl font-sans uppercase text-ground-cream font-medium tracking-wide">
          Join THE GROUND
        </h2>

        <p className="text-xs text-ground-cream/70 font-sans leading-relaxed">
          Fill out your details to join our student-driven builder community.
          No portfolios, resumes, or mandatory project links required.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-3 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-ground-cream/70" />
            Full Name *
          </label>

          <input
            type="text"
            {...register("fullName")}
            placeholder="e.g. Alex Morgan"
            className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
          />

          {errors.fullName && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
              Email Address *
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="alex@example.edu"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />

            {errors.email && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
              Phone Number *
            </label>

            <input
              type="tel"
              {...register("phone")}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />

            {errors.phone && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Current Status Selector */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider block">
            Current Status *
          </label>

          {/* Mobile-safe 3-column layout */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
            {(["Student", "Professional", "Other"] as const).map((status) => {
              const isSelected = currentStatus === status;

              return (
                <button
                  type="button"
                  key={status}
                  onClick={() =>
                    setValue("currentStatus", status, {
                      shouldValidate: true,
                    })
                  }
                  className={`w-full min-w-0 py-2.5 px-1.5 sm:px-3 rounded text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap overflow-hidden text-ellipsis ${
                    isSelected
                      ? "bg-ground-cream text-ground-dark font-semibold border-ground-cream shadow-sm"
                      : "bg-[#071521]/40 border-ground-cream/20 text-ground-cream/70 hover:bg-[#071521]/70 hover:text-ground-cream"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {errors.currentStatus && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">
              {errors.currentStatus.message}
            </p>
          )}
        </div>

        {/* College or Organization */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
            {currentStatus === "Student"
              ? "College / University Name *"
              : currentStatus === "Professional"
              ? "Organization / Company *"
              : "Affiliation / Organization *"}
          </label>

          <input
            type="text"
            {...register("collegeOrOrganization")}
            placeholder={
              currentStatus === "Student"
                ? "e.g. Indian Institute of Technology / Stanford"
                : "e.g. Acme Tech / Freelance"
            }
            className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
          />

          {errors.collegeOrOrganization && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">
              {errors.collegeOrOrganization.message}
            </p>
          )}
        </div>

        {/* Dynamic Context Fields based on Status */}
        {currentStatus === "Student" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 animate-in fade-in duration-200">
            <div className="space-y-1">
              <label className="text-xs font-mono text-ground-cream/80 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Course / Degree (Optional)
              </label>

              <input
                type="text"
                {...register("courseOrRole")}
                placeholder="e.g. B.Tech Computer Science"
                className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-ground-cream/80 uppercase tracking-wider">
                Year / Semester (Optional)
              </label>

              <input
                type="text"
                {...register("yearOrSemester")}
                placeholder="e.g. 3rd Year / 6th Sem"
                className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
              />
            </div>
          </div>
        )}

        {currentStatus === "Professional" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 animate-in fade-in duration-200">
            <div className="space-y-1">
              <label className="text-xs font-mono text-ground-cream/80 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Job Role / Discipline (Optional)
              </label>

              <input
                type="text"
                {...register("courseOrRole")}
                placeholder="e.g. Software Engineer / Product Designer"
                className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-ground-cream/80 uppercase tracking-wider">
                Experience / Team (Optional)
              </label>

              <input
                type="text"
                {...register("yearOrSemester")}
                placeholder="e.g. 3 years / Core Systems Team"
                className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
              />
            </div>
          </div>
        )}

        {currentStatus === "Other" && (
          <div className="space-y-1 pt-1 animate-in fade-in duration-200">
            <label className="text-xs font-mono text-ground-cream/80 uppercase tracking-wider">
              Background / Focus (Optional)
            </label>

            <input
              type="text"
              {...register("courseOrRole")}
              placeholder="Tell us briefly about your focus or background"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-ground-cream/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-[11px] text-ground-cream/60 font-mono">
            Accessible entry for all builders.
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-ground-primary px-8 py-3 text-xs tracking-widest inline-flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}