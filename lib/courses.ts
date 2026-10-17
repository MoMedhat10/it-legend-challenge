import { courses } from "@/data/courses";
import type { ProgressSeed } from "@/lib/progress";
import type { Course } from "@/lib/types";

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getLessonCount(course: Course): number {
  return course.weeks.reduce(
    (total, week) => total + week.items.filter((item) => item.type === "lesson").length,
    0,
  );
}

export function getProgressSeed(course: Course): ProgressSeed {
  return { slug: course.slug, seedWatchedPercent: course.seedWatchedPercent };
}

export function getThumbnailUrl(course: Course): string {
  // hqdefault exists for every video (maxresdefault does not).
  return course.thumbnail ?? `https://i.ytimg.com/vi/${course.youtubeId}/hqdefault.jpg`;
}
