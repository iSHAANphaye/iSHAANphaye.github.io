export type ProjectCategory = "All" | "AI / ML" | "Systems" | "Full-Stack" | "Edge";

export interface KpiMetric {
  value: string;
  label: string;
  sublabel: string;
}

export interface ProjectBenchmark {
  metric: string;
  result: string;
  context: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "All">;
  flagship: boolean;
  metricHighlight: string;
  summary: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  architectureDiagram?: string;
  highlights: string[];
  benchmarks: ProjectBenchmark[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "Work" | "Milestone";
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  shortName: string;
  period: string;
  location: string;
  cgpa: string;
  highlights: string[];
}

export interface HonorItem {
  title: string;
  metric: string;
  detail: string;
}
