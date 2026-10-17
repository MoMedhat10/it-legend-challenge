"use client";

import { ArrowRight } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useCourseProgress } from "@/hooks/useProgress";
import { CTA_LABEL, STATUS_LABEL, type ProgressSeed } from "@/lib/progress";
import type { CourseStatus } from "@/lib/types";

const STATUS_TONE: Record<CourseStatus, BadgeTone> = {
  "not-started": "neutral",
  "in-progress": "info",
  completed: "brand",
};

export function CourseProgress({ seed, title }: { seed: ProgressSeed; title: string }) {
  const { percent, status } = useCourseProgress(seed);
  const cta = CTA_LABEL[status];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
        <span className="text-sm font-semibold text-ink">{percent}%</span>
      </div>
      <ProgressBar value={percent} label={`${title} progress`} />
      {/* The ::after overlay stretches this link over the whole card, so the
          card is clickable while keeping a single link per course. */}
      <ButtonLink
        href={`/courses/${seed.slug}`}
        variant={status === "completed" ? "outline" : "primary"}
        aria-label={`${cta}: ${title}`}
        className="mt-1 w-full after:absolute after:inset-0 after:content-['']"
      >
        {cta}
        <ArrowRight aria-hidden className="size-4" />
      </ButtonLink>
    </div>
  );
}
