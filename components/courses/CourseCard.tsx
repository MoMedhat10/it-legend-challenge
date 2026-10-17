import Image from "next/image";
import { Play } from "lucide-react";
import { CourseMeta } from "@/components/courses/CourseMeta";
import { CourseProgress } from "@/components/courses/CourseProgress";
import {
  getLessonCount,
  getProgressSeed,
  getThumbnailUrl,
  getTotalDurationSec,
} from "@/lib/courses";
import type { Course } from "@/lib/types";

const THUMBNAIL_SIZES = "(min-width: 1280px) 296px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function CourseCard({
  course,
  eager = false,
  highPriority = false,
}: {
  course: Course;
  /** Above the fold: skip lazy loading. */
  eager?: boolean;
  /** The LCP image: fetch before other images. */
  highPriority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition duration-200 focus-within:shadow-card-hover hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-video overflow-hidden bg-surface">
        <Image
          src={getThumbnailUrl(course)}
          alt={`Preview of ${course.title}`}
          fill
          sizes={THUMBNAIL_SIZES}
          loading={eager || highPriority ? "eager" : "lazy"}
          fetchPriority={highPriority ? "high" : "auto"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full scale-90 bg-white/95 text-brand-strong opacity-0 shadow-md transition duration-200 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
        >
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
        <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-2 py-1 text-xs font-medium text-white">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-strong">{course.level}</p>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-ink">
            {course.title}
          </h3>
          <p className="text-sm text-muted">By {course.instructor}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed">{course.description}</p>
        <CourseMeta durationSec={getTotalDurationSec(course)} lessonCount={getLessonCount(course)} />
        <div className="mt-auto border-t border-line pt-4">
          <CourseProgress seed={getProgressSeed(course)} title={course.title} />
        </div>
      </div>
    </article>
  );
}
