"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/actions/auth.actions";
import { Shield, Lock, Mail, Loader2, AlertCircle, KeyRound } from "lucide-react";
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
      setError("An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="glass-panel rounded-2xl p-8 md:p-10 border border-white/10 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-mono uppercase text-white font-semibold">
            Admin Authentication
          </h1>
          <p className="text-xs text-zinc-400">
            Enter authorized credentials to access THE GROUND management console.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 font-mono">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@theground.build"
              placeholder="admin@theground.build"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              defaultValue="ground_admin_secure_2026!"
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-white text-black font-mono font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5" />
                <span>Authorize & Enter</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            &larr; Return to Public Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
