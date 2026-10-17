import type { Course } from "@/lib/types";

export const COMPLETE_RATIO = 0.9;

export interface Chapter {
  id: string;
  title: string;
  start: number;
  end: number;
}

/** Each lesson is a slice of the course video: an explicit startSec, or an even split. */
export function getChapters(course: Course): Chapter[] {
  const lessons = course.weeks.flatMap((week) => week.items.filter((item) => item.type === "lesson"));
  const slice = course.videoDurationSec / lessons.length;
  const starts = lessons.map((lesson, i) => lesson.startSec ?? Math.round(i * slice));
  return lessons.map((lesson, i) => ({
    id: lesson.id,
    title: lesson.title,
    start: starts[i],
    end: starts[i + 1] ?? course.videoDurationSec,
  }));
}

export function isChapterCompleted(chapter: Chapter, watchedSec: number): boolean {
  return watchedSec >= chapter.start + COMPLETE_RATIO * (chapter.end - chapter.start);
}

/** Lessons unlock one by one, so completed lessons are always the first N. */
export function getCompletedCount(chapters: Chapter[], watchedSec: number): number {
  let count = 0;
  while (count < chapters.length && isChapterCompleted(chapters[count], watchedSec)) count++;
  return count;
}

/** Furthest point the student may seek to: the end of the first unfinished lesson. */
export function getMaxAllowedSec(chapters: Chapter[], watchedSec: number): number {
  const completed = getCompletedCount(chapters, watchedSec);
  return chapters[Math.min(completed, chapters.length - 1)]?.end ?? 0;
}

export function getChapterIndexAt(chapters: Chapter[], sec: number): number {
  let index = 0;
  chapters.forEach((chapter, i) => {
    if (sec >= chapter.start) index = i;
  });
  return index;
}
