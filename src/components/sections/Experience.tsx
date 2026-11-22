import { Award, Briefcase } from "lucide-react";
import { EXPERIENCE, HONORS } from "@/data/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
          Experience &amp; Milestones
        </span>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
          WORK EXPERIENCE &amp; HONORS
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Production machine learning engineering and national competitive
          programming achievements.
        </p>

        {/* Work Timeline */}
        <div className="mt-8 space-y-6">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {exp.organization} • {exp.location}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs font-semibold text-gray-700">
                  {exp.period}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Honors & Achievements */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HONORS.map((honor) => (
            <div
              key={honor.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-700">
                  {honor.metric}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-gray-900">
                {honor.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                {honor.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
