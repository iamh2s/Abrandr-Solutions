"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Link2, Briefcase, BarChart3, FileText } from "lucide-react";
import LocationSelector from "./LocationSelector";

const positionOptions = [
  "Senior UI/UX Designer", "Full-Stack Developer (React/Node)",
  "Mobile Developer (React Native)", "Brand Strategist",
  "Digital Marketing Lead", "DevOps Engineer",
  "Project Manager", "Content Strategist", "Open Application",
];

const experienceOptions = [
  "0-2 years (Hungry Rookie)", "2-5 years (Rising Star)",
  "5-8 years (Battle-Tested)", "8+ years (Seasoned Veteran)",
];

type Status = "idle" | "loading" | "success" | "error";
type Errors = { name?: string; email?: string; position?: string; country?: string; coverLetter?: string; general?: string };

export default function CareerApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function clearError(field: keyof Errors) {
    setErrors((p) => ({ ...p, [field]: undefined }));
  }

  function validate(form: FormData): boolean {
    const e: Errors = {};
    const name = (form.get("name") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const position = (form.get("position") as string || "").trim();
    const country = (form.get("country") as string || "").trim();
    const coverLetter = (form.get("coverLetter") as string || "").trim();
    if (!name) e.name = "Full name is required.";
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!position) e.position = "Please select a position.";
    if (!country) e.country = "Please select your country.";
    if (!coverLetter) e.coverLetter = "Cover letter is required.";
    else if (coverLetter.length < 20) e.coverLetter = "Please write at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validate(formData)) return;

    setStatus("loading");
    setErrors({});
    const location = [formData.get("country"), formData.get("state"), formData.get("city")].filter(Boolean).join(" / ");
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      portfolio: formData.get("portfolio") as string,
      coverLetter: `[Location: ${location}] ${formData.get("coverLetter") as string}`,
    };

    try {
      const res = await fetch("/api/careers", {
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
        <h3 className="text-xl font-semibold text-dark-heading mb-2">Application Received</h3>
        <p className="text-dark-text mb-6">Our talent team will reach out within 3 business days.</p>
        <button onClick={() => setStatus("idle")} className="text-brand font-semibold hover:underline">Apply for another role</button>
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
          <label htmlFor="career-name" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <User size={13} className="text-dark-text" /> Full Name <span className="text-brand">*</span>
          </label>
          <input id="career-name" name="name" type="text" className={inputCls("name")} placeholder="Your full name"
            onChange={() => clearError("name")} />
          {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="career-email" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Mail size={13} className="text-dark-text" /> Email <span className="text-brand">*</span>
          </label>
          <input id="career-email" name="email" type="email" className={inputCls("email")} placeholder="you@email.com"
            onChange={() => clearError("email")} />
          {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="career-phone" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Phone size={13} className="text-dark-text" /> Phone
          </label>
          <input id="career-phone" name="phone" type="tel" className={inputCls()} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div>
          <label htmlFor="career-portfolio" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Link2 size={13} className="text-dark-text" /> Portfolio / LinkedIn
          </label>
          <input id="career-portfolio" name="portfolio" type="url" className={inputCls()} placeholder="https://yourportfolio.com" />
        </div>
      </div>

      {/* Country / State / City */}
      <LocationSelector
        errors={{ country: errors.country }}
        onClearError={(f) => clearError(f as keyof Errors)}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="career-position" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <Briefcase size={13} className="text-dark-text" /> Position <span className="text-brand">*</span>
          </label>
          <select id="career-position" name="position" className={inputCls("position") + " appearance-none"}
            onChange={() => clearError("position")}>
            <option value="">Select a role</option>
            {positionOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.position && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.position}</p>}
        </div>
        <div>
          <label htmlFor="career-experience" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
            <BarChart3 size={13} className="text-dark-text" /> Experience Level
          </label>
          <select id="career-experience" name="experience" className={inputCls() + " appearance-none"}>
            <option value="">Select your level</option>
            {experienceOptions.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="career-cover" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <FileText size={13} className="text-dark-text" /> Cover Letter <span className="text-brand">*</span>
        </label>
        <textarea id="career-cover" name="coverLetter" rows={5} className={inputCls("coverLetter") + " resize-none"}
          placeholder="Tell us what drives you, what you've built, and why you'd thrive at aBrandr..."
          onChange={() => clearError("coverLetter")} />
        {errors.coverLetter && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.coverLetter}</p>}
      </div>

      <button type="submit" disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-50 text-dark font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-lg hover:shadow-brand/25">
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" /> Sending...</>
        ) : (
          <>Submit Application <Send size={18} /></>
        )}
      </button>
    </form>
  );
}
