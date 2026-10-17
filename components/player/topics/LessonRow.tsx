"use client";

import { CircleCheck, FileText, Lock } from "lucide-react";
import { usePlayerContext } from "@/components/player/PlayerContext";
import { Badge } from "@/components/ui/Badge";
import { useCourseProgress } from "@/hooks/useProgress";
import type { Chapter } from "@/lib/chapters";

export function LessonRow({ slug, chapters, index }: { slug: string; chapters: Chapter[]; index: number }) {
  const chapter = chapters[index];
  const { completed } = useCourseProgress(slug, chapters);
  const { started, currentChapter, playFrom } = usePlayerContext();

  const isCompleted = index < completed;
  const isLocked = index > completed;
  const activeIndex = started && currentChapter !== null ? currentChapter : Math.min(completed, chapters.length - 1);
  const isCurrent = index === activeIndex;
  const minutes = Math.max(1, Math.round((chapter.end - chapter.start) / 60));
  const stateLabel = [isCurrent && "current lesson", isCompleted && "completed", isLocked && "locked"]
    .filter(Boolean)
    .join(", ");

  return (
    <li aria-current={isCurrent ? "step" : undefined}>
      <button
        type="button"
        disabled={isLocked}
        onClick={() => playFrom(chapter.start)}
        className={`flex w-full items-start justify-between gap-3 rounded-md px-3 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong disabled:cursor-not-allowed ${
          isCurrent ? "bg-brand-soft/60" : "enabled:hover:bg-surface"
        }`}
      >
        <span className="flex min-w-0 flex-col gap-2">
          <span
            className={`flex items-start gap-2.5 text-sm ${
              isCurrent ? "font-medium text-ink" : isLocked ? "text-muted" : "text-body"
            }`}
          >
            <FileText aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>{chapter.title}</span>
            {stateLabel && <span className="sr-only">({stateLabel})</span>}
          </span>
          {isCurrent && (
            <span className="flex flex-wrap gap-2 pl-6">
              <Badge tone="brand" className="rounded-sm px-2 py-0.5 text-[0.6875rem]">
                0 questions
              </Badge>
              <Badge tone="danger" className="rounded-sm px-2 py-0.5 text-[0.6875rem]">
                {minutes} minutes
              </Badge>
            </span>
          )}
        </span>
        {isLocked && <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />}
        {isCompleted && <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-strong" />}
      </button>
    </li>
  );
}
