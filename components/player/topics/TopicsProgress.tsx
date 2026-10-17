"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { useCourseProgress } from "@/hooks/useProgress";
import type { Chapter } from "@/lib/chapters";

/** Progress bar with a "You" marker that travels along it (reference: Course Progress). */
export function TopicsProgress({ slug, chapters }: { slug: string; chapters: Chapter[] }) {
  const { percent } = useCourseProgress(slug, chapters);
  // Keep the marker inside the bar at 0% and 100%.
  const left = `clamp(1.25rem, ${percent}%, calc(100% - 1.25rem))`;

  return (
    <div className="relative pb-6 pt-10">
      <span
        aria-hidden
        className="absolute top-0 -translate-x-1/2 rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink shadow-sm transition-[left] duration-500"
        style={{ left }}
      >
        You
        <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-line bg-white" />
      </span>
      <ProgressBar value={percent} label="Course progress" />
      <span
        aria-hidden
        className="absolute bottom-0 -translate-x-1/2 text-xs font-semibold text-ink transition-[left] duration-500"
        style={{ left }}
      >
        {percent}%
      </span>
    </div>
  );
}
