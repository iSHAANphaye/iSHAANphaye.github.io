import { PROFILE } from "@/data/portfolio";

export function Marquee() {
  const items = [...PROFILE.marqueeItems, ...PROFILE.marqueeItems];

  return (
    <div
      aria-label="Skill Highlights Marquee"
      role="region"
      className="overflow-hidden border-b border-[var(--border-subtle)] bg-gray-900 py-3 text-white"
    >
      <div className="animate-marquee flex items-center gap-8">
        {items.map((text, idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center gap-8 font-mono text-xs font-medium tracking-wider text-gray-200"
          >
            <span>{text}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
