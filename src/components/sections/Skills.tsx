import { SKILLS } from "@/data/portfolio";

export function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              Technical Capabilities
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
              SKILLS &amp; CORE COMPETENCIES
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Verified across production internships, custom storage engines,
              and applied LLM systems.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/sticker-branch.svg"
            alt=""
            aria-hidden="true"
            className="hidden sm:block w-16 h-16"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
            >
              <h3 className="font-display text-base font-bold text-gray-900">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs font-medium text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
