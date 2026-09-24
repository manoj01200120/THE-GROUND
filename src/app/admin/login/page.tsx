"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/actions/auth.actions";
import { Lock, Mail, Loader2, AlertCircle, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await adminLogin(formData);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Invalid credentials.");
      }
    } catch {
      setError("An unexpected error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="ground-card-dark rounded-2xl p-8 md:p-10 border border-[#F3EBDD]/15 max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
          </div>
          <div>
            <h1 className="text-xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.2em]">
              Admin Console
            </h1>
            <p className="text-xs text-[#9DB9D0] mt-1 font-heading tracking-wider">
              Where ideas take shape.
            </p>
          </div>
          <p className="text-xs text-[#9DB9D0]/80">
            Enter authorized credentials to access THE GROUND administrative console.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#F3EBDD] font-heading font-medium tracking-wider uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#9DB9D0]" />
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="contact.theground@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071521]/70 border border-[#F3EBDD]/20 text-[#F3EBDD] text-xs font-heading placeholder:text-[#9DB9D0]/50 focus:outline-none focus:border-[#9DB9D0] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#F3EBDD] font-heading font-medium tracking-wider uppercase flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#9DB9D0]" />
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071521]/70 border border-[#F3EBDD]/20 text-[#F3EBDD] text-xs font-heading placeholder:text-[#9DB9D0]/50 focus:outline-none focus:border-[#9DB9D0] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-[#F3EBDD] text-[#071521] font-heading font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#F3EBDD]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5" />
                <span>Authorize & Enter</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-[#F3EBDD]/10 text-center">
          <Link
            href="/"
            className="text-xs text-[#9DB9D0] hover:text-[#F3EBDD] transition-colors font-heading tracking-wider"
          >
            &larr; Return to Public Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
