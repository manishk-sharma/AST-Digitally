"use client";

import { useState, useRef } from "react";

export default function ApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
        setFileName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6">Apply Now</h2>

      {status === "success" ? (
        <div className="text-center py-10">
          <div className="text-3xl mb-3">&#10003;</div>
          <p className="font-bold text-lg mb-1">Application Submitted!</p>
          <p className="text-sm text-muted-foreground">We&apos;ll review your application and get back to you soon.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-semibold mb-1">Position</label>
            <input
              id="position"
              name="position"
              type="text"
              placeholder="e.g. Web Developer, Digital Marketer"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1">Cover Letter</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-y"
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-semibold mb-1">Resume *</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground hover:border-foreground/40 transition-colors">
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{fileName || "Click to upload resume (PDF, DOC, DOCX)"}</span>
            </label>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}
