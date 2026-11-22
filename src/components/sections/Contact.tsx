"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot
  });

  async function copyEmail() {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to send message.");
      } else {
        toast.success("Message sent! Ishaan will get back to you soon.");
        setForm({ name: "", email: "", message: "", website: "" });
      }
    } catch {
      toast.error("Network error. Please email directly instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              Direct Inquiries
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
              GET IN TOUCH
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Hiring for SDE, ML, or AI Systems roles in India or Global Remote?
              Send a direct message or grab the resume.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/sticker-shield.svg"
            alt=""
            aria-hidden="true"
            className="hidden sm:block w-16 h-16"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left column: Channels */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs lg:col-span-5">
            <h3 className="font-display text-lg font-bold text-gray-900">
              Contact Channels
            </h3>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                <div className="truncate">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="truncate font-mono text-sm font-medium text-gray-900">
                    {PROFILE.email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email"
                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:text-gray-900"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
              <div>
                <div className="text-xs text-gray-500">Location &amp; Mobility</div>
                <div className="text-sm font-medium text-gray-900">
                  {PROFILE.location}
                </div>
                <div className="text-xs text-gray-500">
                  Immediate • India &amp; Global Remote
                </div>
              </div>
            </div>

            <a
              href={PROFILE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <FileText className="h-4 w-4" />
              <span>Download Resume PDF</span>
            </a>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right column: Validated Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs lg:col-span-7"
          >
            <h3 className="font-display text-lg font-bold text-gray-900">
              Send a Direct Message
            </h3>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role, team, or project..."
                className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
