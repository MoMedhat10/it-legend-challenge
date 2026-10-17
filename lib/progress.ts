import { parseJson, readStorage, writeStorage } from "@/lib/storage";
import type { CourseStatus } from "@/lib/types";

/*
 * Progress = how much of the course video was actually watched.
 * The video is split into SEGMENTS equal parts; a part counts once it has
 * been played through, so seeking to the end does not complete a course.
 */

export const PROGRESS_KEY = "course-progress:v2";
export const SEGMENTS = 100;

export interface StoredCourseProgress {
  watchedSegments: number[];
}

export type ProgressMap = Record<string, StoredCourseProgress>;

export interface ProgressSeed {
  slug: string;
  seedWatchedPercent: number;
}

export interface ResolvedProgress {
  percent: number;
  status: CourseStatus;
}

export function getStatus(percent: number): CourseStatus {
  if (percent <= 0) return "not-started";
  if (percent >= 100) return "completed";
  return "in-progress";
}

export function resolveProgress(seed: ProgressSeed, map: ProgressMap): ResolvedProgress {
  const stored = map[seed.slug];
  const percent = stored
    ? Math.round((stored.watchedSegments.length / SEGMENTS) * 100)
    : seed.seedWatchedPercent;
  return { percent, status: getStatus(percent) };
}

/** Demo progress becomes real watched segments on the first save, so the bar never jumps back. */
function seedSegments(seed: ProgressSeed): number[] {
  const count = Math.round((seed.seedWatchedPercent / 100) * SEGMENTS);
  return Array.from({ length: count }, (_, i) => i);
}

export function addWatchedSegments(seed: ProgressSeed, segments: number[]): void {
  const map = parseJson<ProgressMap>(readStorage("local", PROGRESS_KEY), {});
  const watched = new Set(map[seed.slug]?.watchedSegments ?? seedSegments(seed));
  const before = watched.size;
  for (const segment of segments) {
    if (segment >= 0 && segment < SEGMENTS) watched.add(segment);
  }
  if (watched.size === before && map[seed.slug]) return;
  map[seed.slug] = { watchedSegments: [...watched].sort((a, b) => a - b) };
  writeStorage("local", PROGRESS_KEY, map);
}

export const STATUS_LABEL: Record<CourseStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

export const CTA_LABEL: Record<CourseStatus, string> = {
  "not-started": "Start course",
  "in-progress": "Continue",
  completed: "Review course",
};
