"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { cn } from "@/lib/utils";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI / ML",
  "Systems",
  "Full-Stack",
  "Edge",
];

export function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              Engineering Showcase
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
              PROJECTS &amp; CASE STUDIES
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Production RAG platforms, custom C++ storage engines, PyTorch
              transformers, and quantized edge pipelines.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/sticker-chart.svg"
            alt=""
            aria-hidden="true"
            className="hidden sm:block w-16 h-16"
          />
        </div>

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition",
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => {
            const visibleStack = project.techStack.slice(0, 5);
            const overflow = project.techStack.length - visibleStack.length;

            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs transition hover:border-blue-300 hover:shadow-md"
              >
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative cursor-pointer overflow-hidden border-b border-gray-100 bg-gray-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-full bg-white/95 px-2.5 py-0.5 font-mono text-xs font-semibold text-gray-800 shadow-xs">
                      {project.category}
                    </span>
                    {project.flagship && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-800 shadow-xs">
                        ★ Flagship
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50/70 px-5 py-2 font-mono text-xs font-semibold text-blue-800 border-b border-blue-100">
                  {project.metricHighlight}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {visibleStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {overflow > 0 && (
                      <span
                        title={project.techStack.slice(5).join(", ")}
                        className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-500"
                      >
                        +{overflow}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 mt-5">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                      <span>Inspect Architecture &amp; Benchmarks</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live Demo`}
                          className="rounded-lg border border-gray-200 p-1.5 text-gray-600 transition hover:border-blue-600 hover:text-blue-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
