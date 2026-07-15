"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, User, Mail, Building, Layers, DollarSign, MessageSquare } from "lucide-react";
import LocationSelector from "./LocationSelector";
import Logo from "./Logo";

const serviceOptions = [
  "Branding & Identity", "UI/UX Design", "Web Development",
  "Mobile App Development", "Digital Marketing", "Cloud & Maintenance",
  "Strategy Consulting", "Multiple Services",
];

const defaultBudgetOptions = [
  "Under $10K (USD)", "$10K - $25K (USD)", "$25K - $50K (USD)",
  "$50K - $100K (USD)", "$100K+ (USD)", "Not sure yet",
];

type Status = "idle" | "loading" | "success" | "error";
type Errors = { name?: string; email?: string; country?: string; message?: string; general?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [budgetOptions, setBudgetOptions] = useState(defaultBudgetOptions);

  function clearError(field: keyof Errors) {
    setErrors((p) => ({ ...p, [field]: undefined }));
  }

  function validate(form: FormData): boolean {
    const e: Errors = {};
    const name = (form.get("name") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const country = (form.get("country") as string || "").trim();
    const message = (form.get("message") as string || "").trim();
    if (!name) e.name = "Full name is required.";
    if (!email) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!country) e.country = "Please select your country.";
    if (!message) e.message = "Project details are required.";
    else if (message.length < 10) e.message = "Please provide at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validate(formData)) return;

    setStatus("loading");
    setErrors({});
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      budget: formData.get("budget") as string,
      message: `[${formData.get("country") || ""}${formData.get("state") ? " / " + formData.get("state") : ""}${formData.get("city") ? " / " + formData.get("city") : ""}] ${formData.get("message") as string}`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "Something went wrong" });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="text-brand mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-dark-heading mb-2">Message Sent Successfully</h3>
        <p className="text-dark-text mb-6">We&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="text-brand font-semibold hover:underline">Send another message</button>
      </div>
    );
  }

  const inputCls = (field?: string) =>
    `w-full bg-dark border rounded-lg px-4 py-3 text-dark-heading text-sm focus:outline-none transition-colors placeholder:text-dark-text/40 ${
      field && errors[field as keyof Errors] ? "border-red-400 focus:border-red-400" : "border-dark-border focus:border-brand"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {errors.general && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2.5">
          <AlertCircle size={14} className="shrink-0" />{errors.general}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <User size={13} className="text-dark-text" /> Full Name <span className="text-brand">*</span>
          </label>
          <input id="name" name="name" type="text" className={inputCls("name")} placeholder="John Smith"
            onChange={() => clearError("name")} />
          {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Mail size={13} className="text-dark-text" /> Email <span className="text-brand">*</span>
          </label>
          <input id="email" name="email" type="email" className={inputCls("email")} placeholder="john@company.com"
            onChange={() => clearError("email")} />
          {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <Building size={13} className="text-dark-text" /> Company / Organization
        </label>
        <input id="company" name="company" type="text" className={inputCls()} placeholder="Your Company" />
      </div>

      {/* Country / State / City */}
      <LocationSelector
        onBudgetOptionsChange={setBudgetOptions}
        errors={{ country: errors.country }}
        onClearError={(f) => clearError(f as keyof Errors)}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Layers size={13} className="text-dark-text" /> Service Needed
          </label>
          <select id="service" name="service" className={inputCls() + " appearance-none"}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <DollarSign size={13} className="text-dark-text" /> Budget Range
          </label>
          <select id="budget" name="budget" className={inputCls() + " appearance-none"}>
            <option value="">Select budget range</option>
            {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <MessageSquare size={13} className="text-dark-text" /> Project Details <span className="text-brand">*</span>
        </label>
        <textarea id="message" name="message" rows={5} className={inputCls("message") + " resize-none"}
          placeholder="Tell us about your project, goals, and timeline..."
          onChange={() => clearError("message")} />
        {errors.message && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-50 text-dark font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-lg hover:shadow-brand/25">
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" /> Sending...</>
        ) : (
          <>Send Message <Send size={18} /></>
        )}
      </button>
    </form>
  );
}
