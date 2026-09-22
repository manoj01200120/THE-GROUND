"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientInquirySchema, ClientInquiryInput } from "@/lib/validation/client.schema";
import { submitClientInquiry } from "@/lib/actions/client.actions";
import { CheckCircle2, AlertCircle, Loader2, Send, Building, DollarSign, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";

const budgetOptions = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $35,000",
  "$35,000 - $75,000",
  "$75,000+",
];

const timelineOptions = [
  "Urgent (2 - 4 weeks)",
  "Standard (1 - 2 months)",
  "Quarterly (3 - 4 months)",
  "Long-term / Retainer",
];

export default function ClientInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientInquiryInput>({
    resolver: zodResolver(clientInquirySchema),
    mode: "onBlur",
  });

  const selectedBudget = watch("budget");
  const selectedTimeline = watch("timeline");

  const onSubmit = async (data: ClientInquiryInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await submitClientInquiry(data);
      if (res.success && res.inquiryId) {
        setSubmitSuccess(true);
        setInquiryId(res.inquiryId);
      } else {
        setServerError(res.error || "Failed to submit inquiry. Please check your inputs.");
      }
    } catch {
      setServerError("A network error occurred while submitting your inquiry.");
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
            Inquiry Logged
          </span>
          <h2 className="text-3xl font-mono uppercase text-white font-medium">
            Your request has been received.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Our ecosystem leadership will review your technical problem, assess squad availability, and contact you within 24 to 48 business hours to schedule a Discovery session.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-left font-mono text-xs space-y-1">
          <div className="text-zinc-500 uppercase text-[10px]">Inquiry Reference</div>
          <div className="text-zinc-200 select-all font-semibold">{inquiryId}</div>
          <div className="text-zinc-500 text-[11px] pt-1">
            Status: <span className="text-cyan-400 font-semibold">NEW // IN REVIEW</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white text-black font-mono font-medium text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Return to THE GROUND
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-10 border border-white/10 max-w-3xl mx-auto">
      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Full Name *</label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Elena Rostova"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 font-mono">{errors.name.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Company / Organization *</label>
            <input
              type="text"
              {...register("company")}
              placeholder="e.g. Apex Dynamics Ltd."
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            {errors.company && (
              <p className="text-[11px] text-red-400 font-mono">{errors.company.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Work Email Address *</label>
            <input
              type="email"
              {...register("email")}
              placeholder="elena@apexdynamics.com"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 font-mono">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Phone Number *</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="+1 555 019 2831"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            {errors.phone && (
              <p className="text-[11px] text-red-400 font-mono">{errors.phone.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-mono text-zinc-300">Your Role / Title *</label>
            <input
              type="text"
              {...register("role")}
              placeholder="e.g. VP of Engineering / Product Director / Founder"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            {errors.role && (
              <p className="text-[11px] text-red-400 font-mono">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-zinc-300">
            The Problem / Requirement *
          </label>
          <textarea
            rows={4}
            {...register("problem")}
            placeholder="Describe the operational, technical, or product challenge you need solved. What is currently breaking or holding you back?"
            className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
          {errors.problem && (
            <p className="text-[11px] text-red-400 font-mono">{errors.problem.message}</p>
          )}
        </div>

        {/* Expected Outcome */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-zinc-300">
            Expected Outcome & Deliverables *
          </label>
          <textarea
            rows={2}
            {...register("expectedOutcome")}
            placeholder="What does a successful project look like? (e.g. deployed web dashboard, benchmark report, Rust microservice)"
            className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
          {errors.expectedOutcome && (
            <p className="text-[11px] text-red-400 font-mono">{errors.expectedOutcome.message}</p>
          )}
        </div>

        {/* Budget Brackets */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Estimated Budget Range *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {budgetOptions.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setValue("budget", b, { shouldValidate: true })}
                className={`p-2.5 rounded border text-xs font-mono text-center transition-all ${
                  selectedBudget === b
                    ? "bg-emerald-500/20 border-emerald-500 text-white font-semibold"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {errors.budget && (
            <p className="text-[11px] text-red-400 font-mono">{errors.budget.message}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Expected Timeline *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timelineOptions.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setValue("timeline", t, { shouldValidate: true })}
                className={`p-2.5 rounded border text-xs font-mono text-center transition-all ${
                  selectedTimeline === t
                    ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.timeline && (
            <p className="text-[11px] text-red-400 font-mono">{errors.timeline.message}</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-zinc-300">
            Additional Context or Links (Optional)
          </label>
          <input
            type="text"
            {...register("additionalInfo")}
            placeholder="Links to existing designs, API docs, or repos"
            className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-white text-black font-mono font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-glow-subtle disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Client Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
