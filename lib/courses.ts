import { courses } from "@/data/courses";
import type { Course, Lesson } from "@/lib/types";

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getLessons(course: Course): Lesson[] {
  return course.weeks.flatMap((week) => week.lessons);
}

export function getLessonCount(course: Course): number {
  return getLessons(course).length;
}

/** Total watch time: only video lessons count towards a course's duration. */
export function getTotalDurationSec(course: Course): number {
  return getLessons(course).reduce(
    (total, lesson) => (lesson.type === "video" ? total + (lesson.durationSec ?? 0) : total),
    0,
  );
}

export function getThumbnailUrl(course: Course): string {
  // hqdefault exists for every video (maxresdefault does not).
  return course.thumbnail ?? `https://i.ytimg.com/vi/${course.youtubeId}/hqdefault.jpg`;
}
