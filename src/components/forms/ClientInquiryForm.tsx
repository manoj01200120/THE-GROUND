"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientInquirySchema, ClientInquiryInput } from "@/lib/validation/client.schema";
import { submitClientInquiry } from "@/lib/actions/client.actions";
import { useCurrency } from "@/lib/utils/currency";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Building,
  User,
  Mail,
  Phone,
  Clock,
  Coins,
} from "lucide-react";
import Link from "next/link";

const inrBudgetBrackets = [
  "Under ₹2,00,000",
  "₹2,00,000 - ₹5,00,000",
  "₹5,00,000 - ₹15,00,000",
  "₹15,00,000 - ₹35,00,000",
  "₹35,00,000+",
];

const usdBudgetBrackets = [
  "Under $2,500",
  "$2,500 - $6,000",
  "$6,000 - $18,000",
  "$18,00,000 - $40,000",
  "$40,000+",
];

const timelineOptions = [
  "Urgent (2 - 4 weeks)",
  "Standard (1 - 2 months)",
  "Quarterly (3 - 4 months)",
  "Long-term Partnership",
];

export default function ClientInquiryForm() {
  const { currency, setCurrency, usdRate } = useCurrency();
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
    defaultValues: {
      currency: currency,
    },
  });

  const selectedBudget = watch("budget");
  const selectedTimeline = watch("timeline");

  const currentBudgetBrackets = currency === "INR" ? inrBudgetBrackets : usdBudgetBrackets;

  const handleCurrencySwitch = (c: "INR" | "USD") => {
    setCurrency(c);
    setValue("currency", c, { shouldValidate: true });
    // Reset budget selection to prevent mismatched symbol
    setValue("budget", "", { shouldValidate: false });
  };

  const onSubmit = async (data: ClientInquiryInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await submitClientInquiry(data);
      if (res.success && res.inquiryId) {
        setSubmitSuccess(true);
        setInquiryId(res.inquiryId);
      } else {
        setServerError(res.error || "Failed to submit inquiry. Please review your entries.");
      }
    } catch {
      setServerError("A network error occurred while submitting your inquiry. Please try again shortly.");
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
            Inquiry Registered
          </span>
          <h2 className="text-2xl md:text-3xl font-sans uppercase text-ground-cream font-medium">
            Your request has been received
          </h2>
          <p className="text-ground-cream/80 text-sm leading-relaxed font-sans">
            Our ecosystem leads will review your problem scope and contact you within 24 to 48 business hours to schedule a Discovery alignment call.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#0B1C2D]/60 border border-ground-cream/15 text-left font-mono text-xs space-y-1">
          <div className="text-ground-cream/60 uppercase text-[10px]">Reference Code</div>
          <div className="text-ground-cream select-all font-semibold">{inquiryId}</div>
          <div className="text-ground-cream/60 text-[11px] pt-1">
            Status: <span className="text-[#F3EBDD] font-semibold">NEW // IN REVIEW</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded btn-ground-primary text-xs tracking-wider"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ground-card-dark p-6 md:p-10 max-w-3xl mx-auto border border-ground-cream/20 shadow-ground-card-dark">
      <div className="mb-8 space-y-2 border-b border-ground-cream/15 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-sans uppercase text-ground-cream font-medium tracking-wide">
              Bring Us a Problem
            </h2>
            <p className="text-xs text-ground-cream/70 font-sans mt-0.5">
              Submit your technical, product, or organizational challenge to be built by verified student squads.
            </p>
          </div>

          {/* Centralized Currency Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-md bg-[#071521] border border-ground-cream/25 self-start">
            <span className="text-[10px] font-mono text-ground-cream/60 px-1.5 uppercase">Currency:</span>
            <button
              type="button"
              onClick={() => handleCurrencySwitch("INR")}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                currency === "INR"
                  ? "bg-ground-cream text-ground-dark font-semibold shadow-sm"
                  : "text-ground-cream/70 hover:text-ground-cream"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => handleCurrencySwitch("USD")}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                currency === "USD"
                  ? "bg-ground-cream text-ground-dark font-semibold shadow-sm"
                  : "text-ground-cream/70 hover:text-ground-cream"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-3 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-ground-cream/70" />
              Contact Name *
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Elena Rostova"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
            {errors.name && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-ground-cream/70" />
              Company / Organization *
            </label>
            <input
              type="text"
              {...register("companyOrOrganization")}
              placeholder="e.g. Apex Dynamics Ltd."
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
            {errors.companyOrOrganization && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">
                {errors.companyOrOrganization.message}
              </p>
            )}
          </div>
        </div>

        {/* Email, Phone & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-ground-cream/70" />
              Work Email *
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="elena@apexdynamics.com"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
            {errors.email && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-ground-cream/70" />
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="+1 555 019 2831"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
            {errors.phone && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
              Role / Title *
            </label>
            <input
              type="text"
              {...register("role")}
              placeholder="e.g. VP Engineering"
              className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
            />
            {errors.role && (
              <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
            The Problem / Requirement *
          </label>
          <textarea
            rows={4}
            {...register("problem")}
            placeholder="Describe the problem, technical bottleneck, or system challenge you want solved."
            className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
          />
          {errors.problem && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.problem.message}</p>
          )}
        </div>

        {/* Desired Outcome */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
            Desired Outcome & Deliverables *
          </label>
          <textarea
            rows={2}
            {...register("desiredOutcome")}
            placeholder="What does success look like? (e.g. deployed analytics dashboard, load-tested Rust microservice, design system)"
            className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
          />
          {errors.desiredOutcome && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">
              {errors.desiredOutcome.message}
            </p>
          )}
        </div>

        {/* Budget Brackets with Currency indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-ground-cream/70" />
              Estimated Budget ({currency === "INR" ? "₹ INR" : "$ USD"}) *
            </label>
            {currency === "USD" && (
              <span className="text-[10px] font-mono text-ground-cream/60">
                1 USD ≈ ₹{usdRate} INR (converted equivalent)
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {currentBudgetBrackets.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setValue("budget", b, { shouldValidate: true })}
                className={`p-2.5 rounded border text-xs font-mono text-center transition-all ${
                  selectedBudget === b
                    ? "bg-ground-cream text-ground-dark font-semibold border-ground-cream shadow-sm"
                    : "bg-[#071521]/40 border-ground-cream/20 text-ground-cream/70 hover:bg-[#071521]/70 hover:text-ground-cream"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {errors.budget && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.budget.message}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-ground-cream/70" />
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
                    ? "bg-ground-cream text-ground-dark font-semibold border-ground-cream shadow-sm"
                    : "bg-[#071521]/40 border-ground-cream/20 text-ground-cream/70 hover:bg-[#071521]/70 hover:text-ground-cream"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.timeline && (
            <p className="text-[11px] text-red-300 font-mono mt-0.5">{errors.timeline.message}</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-ground-cream/90 uppercase tracking-wider">
            Additional Information / Repository or Doc Links (Optional)
          </label>
          <input
            type="text"
            {...register("additionalInformation")}
            placeholder="Links to existing architecture docs, APIs, or Figma designs"
            className="w-full px-3.5 py-2.5 rounded bg-[#071521]/60 border border-ground-cream/20 text-ground-cream text-sm focus:outline-none focus:border-ground-cream transition-colors placeholder:text-ground-cream/30"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-ground-cream/15 flex items-center justify-between">
          <span className="text-[11px] text-ground-cream/60 font-mono">
            Directly reviewed by ecosystem leads.
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-ground-primary px-8 py-3 text-xs tracking-widest inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
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
