import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-display font-bold text-gray-900">
              {PROFILE.name}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-medium text-blue-700">
              Systems &amp; AI
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
