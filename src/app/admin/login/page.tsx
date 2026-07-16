"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, AlertCircle, ArrowLeft, Mail, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 4) e.password = "Password must be at least 4 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid credentials.");
      // Use window.location for hard redirect so cookies are picked up
      window.location.href = "/admin";
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "Login failed. Please try again." });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="mb-6">
          <Link href="/" className="text-dark-text hover:text-brand text-sm inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={14} />
            Back to site
          </Link>
        </div>

        <div className="text-center mb-8">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
            <span className="text-dark-heading">a</span><span className="text-brand">Brand</span><span className="text-dark-heading">r</span>
          </span>
          <p className="text-dark-text mt-2 text-sm">Admin Panel</p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h1 className="text-lg sm:text-xl font-bold text-dark-heading font-display mb-6">Sign In</h1>

          {errors.general && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={14} className="shrink-0" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="adm-email" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
                <Mail size={13} className="text-dark-text" /> Email
              </label>
              <input
                id="adm-email" type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                autoComplete="email"
                className={`w-full bg-dark border rounded-lg px-4 py-3 text-dark-heading text-sm focus:outline-none transition-colors placeholder:text-dark-text/40 ${
                  errors.email ? "border-red-400 focus:border-red-400" : "border-dark-border focus:border-brand"
                }`}
                placeholder="admin@abrandr.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="adm-pass" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
                <KeyRound size={13} className="text-dark-text" /> Password
              </label>
              <input
                id="adm-pass" type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                autoComplete="current-password"
                className={`w-full bg-dark border rounded-lg px-4 py-3 text-dark-heading text-sm focus:outline-none transition-colors placeholder:text-dark-text/40 ${
                  errors.password ? "border-red-400 focus:border-red-400" : "border-dark-border focus:border-brand"
                }`}
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-dark-text/50 text-xs mt-4">
          Default: admin@abrandr.com / Admin@2025
        </p>
      </div>
    </div>
  );
}
