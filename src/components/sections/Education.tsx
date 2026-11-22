import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";

export function Education() {
  return (
    <section
      id="education"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
          Academic Foundations
        </span>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
          FORMAL EDUCATION
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Graduate and undergraduate training in computer science, systems
          architecture, and applied machine learning.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {EDUCATION.map((ed) => (
            <div
              key={ed.degree}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs font-medium text-gray-700">
                  {ed.period}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-bold text-gray-900">
                {ed.degree}
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-600">
                {ed.institution}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {ed.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 mt-5">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
                  Academic Standing
                </span>
                <span className="rounded-lg bg-blue-50 px-3 py-1 font-mono text-sm font-bold text-blue-700">
                  CGPA: {ed.cgpa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
