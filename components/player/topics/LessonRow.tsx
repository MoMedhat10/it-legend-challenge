import { FileText, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { pluralize } from "@/lib/format";
import type { TopicItem } from "@/lib/types";

type Lesson = Extract<TopicItem, { type: "lesson" }>;

/** Static lesson row: current lesson is highlighted, the rest are locked. */
export function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <li
      aria-current={lesson.current ? "step" : undefined}
      className={`flex items-start justify-between gap-3 px-3 py-3.5 ${lesson.current ? "rounded-md bg-brand-soft/60" : ""}`}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <span className={`flex items-start gap-2.5 text-sm ${lesson.current ? "font-medium text-ink" : "text-body"}`}>
          <FileText aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>{lesson.title}</span>
          {lesson.current && <span className="sr-only">(current lesson)</span>}
          {lesson.locked && <span className="sr-only">(locked)</span>}
        </span>
        {(lesson.questionCount !== undefined || lesson.durationMin !== undefined) && (
          <span className="flex flex-wrap gap-2 pl-6">
            {lesson.questionCount !== undefined && (
              <Badge tone="brand" className="rounded-sm px-2 py-0.5 text-[0.6875rem]">
                {pluralize(lesson.questionCount, "question")}
              </Badge>
            )}
            {lesson.durationMin !== undefined && (
              <Badge tone="danger" className="rounded-sm px-2 py-0.5 text-[0.6875rem]">
                {lesson.durationMin} minutes
              </Badge>
            )}
          </span>
        )}
      </div>
      {lesson.locked && <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />}
    </li>
  );
}
