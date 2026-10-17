import { BookOpen, Clock } from "lucide-react";
import { formatDuration, formatDurationLong, pluralize } from "@/lib/format";

export function CourseMeta({ durationSec, lessonCount }: { durationSec: number; lessonCount: number }) {
  return (
    <dl className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
      <div className="flex items-center gap-1.5">
        <dt>
          <Clock aria-hidden className="size-4" />
          <span className="sr-only">Duration</span>
        </dt>
        <dd>
          <span aria-hidden>{formatDuration(durationSec)}</span>
          <span className="sr-only">{formatDurationLong(durationSec)}</span>
        </dd>
      </div>
      <div className="flex items-center gap-1.5">
        <dt>
          <BookOpen aria-hidden className="size-4" />
          <span className="sr-only">Lessons</span>
        </dt>
        <dd>{pluralize(lessonCount, "lesson")}</dd>
      </div>
    </dl>
  );
}
