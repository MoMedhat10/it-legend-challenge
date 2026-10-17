"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgressMap } from "@/hooks/useProgress";
import { resolveProgress, type ProgressSeed } from "@/lib/progress";

export function ProgressSummary({ seeds }: { seeds: ProgressSeed[] }) {
  const map = useProgressMap();
  const resolved = seeds.map((seed) => resolveProgress(seed, map));

  const inProgress = resolved.filter((p) => p.status === "in-progress").length;
  const completed = resolved.filter((p) => p.status === "completed").length;
  const totalLessons = seeds.reduce((sum, seed) => sum + seed.totalLessons, 0);
  const doneLessons = resolved.reduce((sum, p) => sum + p.completed, 0);
  const overall = totalLessons === 0 ? 0 : Math.round((doneLessons / totalLessons) * 100);

  const stats = [
    { label: "In progress", value: inProgress },
    { label: "Completed", value: completed },
    { label: "Overall", value: `${overall}%` },
  ];

  return (
    <section
      aria-labelledby="progress-summary-heading"
      className="w-full rounded-xl border border-line bg-white p-5 shadow-card lg:max-w-sm"
    >
      <h2 id="progress-summary-heading" className="text-base font-semibold text-ink">
        Your learning
      </h2>
      <dl className="mt-4 grid grid-cols-3 divide-x divide-line">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse items-center gap-0.5 px-2 text-center">
            <dt className="text-xs text-muted">{stat.label}</dt>
            <dd className="text-2xl font-semibold text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <ProgressBar value={overall} label="Overall progress across all courses" className="mt-4" />
    </section>
  );
}
