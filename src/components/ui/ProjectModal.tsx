"use client";

import { useEffect } from "react";
import { ExternalLink, Github, Sparkles, X } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-blue-700">
                {project.category}
              </span>
              {project.flagship && (
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-700">
                  ★ Flagship
                </span>
              )}
            </div>
            <h3
              id="modal-title"
              className="mt-2 font-display text-2xl font-bold text-gray-900"
            >
              {project.title}
            </h3>
            <p className="text-sm text-gray-600">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {project.architectureDiagram && (
          <div className="mt-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-500">
              System Architecture
            </h4>
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.architectureDiagram}
                alt={`${project.title} architecture diagram`}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-500">
            Key Engineering Decisions
          </h4>
          <ul className="mt-2.5 space-y-2 text-sm text-gray-700">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-500">
            Verified Benchmarks
          </h4>
          <div className="mt-2.5 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 font-mono text-xs text-gray-600">
                <tr>
                  <th className="px-4 py-2.5">Metric</th>
                  <th className="px-4 py-2.5">Result</th>
                  <th className="px-4 py-2.5">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {project.benchmarks.map((b, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      {b.metric}
                    </td>
                    <td className="px-4 py-2.5 font-mono font-semibold text-blue-700">
                      {b.result}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{b.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.dispatchEvent(
                  new CustomEvent("open-ai-chat", {
                    detail: {
                      prompt: `How did Ishaan build ${project.title} and what are its key architectural highlights?`,
                    },
                  })
                );
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI</span>
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
