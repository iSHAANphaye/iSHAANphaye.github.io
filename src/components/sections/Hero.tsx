"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  FileText,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
} from "lucide-react";
import { KPI_METRICS, PROFILE } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] pt-10 pb-16 sm:pt-14 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top status & meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            {PROFILE.availability}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1">
            <MapPin className="h-3.5 w-3.5 text-gray-500" />
            {PROFILE.location}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
            {PROFILE.degreeBadge}
          </span>
        </div>

        {/* Main display headline + decorative stickers */}
        <div className="relative mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-9"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {PROFILE.firstName.toUpperCase()}{" "}
              <span className="text-blue-600">
                {PROFILE.lastName.toUpperCase()}
              </span>
            </h1>
            <h2 className="mt-3 font-display text-lg font-semibold text-gray-800 sm:text-2xl">
              {PROFILE.roleTitle}{" "}
              <span className="text-gray-400 font-normal">|</span>{" "}
              <span className="text-gray-600 font-medium">
                {PROFILE.roleSubtitle}
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">
              {PROFILE.shortBio}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
              {PROFILE.extendedBio}
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <FileText className="h-4 w-4" />
                <span>View Resume PDF</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-ai-chat"))
                }
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Ask AI Assistant</span>
              </button>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                >
                  <Code2 className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Core stack pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400 mr-1">
                Core Stack:
              </span>
              {PROFILE.coreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Subtle decorative stickers */}
          <div
            aria-hidden="true"
            className="hidden lg:flex lg:col-span-3 flex-col items-end justify-center gap-4 select-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/art/sticker-terminal.svg"
              alt=""
              className="w-36 h-auto -rotate-3 drop-shadow-xs"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/art/sticker-chip.svg"
              alt=""
              className="w-28 h-auto rotate-6 drop-shadow-xs mr-6"
            />
          </div>
        </div>

        {/* 4-Card KPI Strip */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_METRICS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs transition hover:border-blue-300"
            >
              <div className="font-mono text-2xl font-bold text-blue-600 sm:text-3xl">
                {kpi.value}
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-gray-900">
                {kpi.label}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                {kpi.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
