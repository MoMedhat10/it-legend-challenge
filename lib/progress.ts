import { parseJson, readStorage, writeStorage } from "@/lib/storage";
import type { CourseStatus } from "@/lib/types";

/** Progress = the furthest point reached in the course video (by playing or seeking), 0–100. */
export const PROGRESS_KEY = "course-progress:v4";

export type ProgressMap = Record<string, number>;

export function getStatus(percent: number): CourseStatus {
  if (percent <= 0) return "not-started";
  if (percent >= 100) return "completed";
  return "in-progress";
}

export function getCoursePercent(map: ProgressMap, slug: string): number {
  const value = map[slug];
  return typeof value === "number" ? Math.min(100, Math.max(0, Math.round(value))) : 0;
}

/** Only ever moves forward: rewatching an earlier part keeps the furthest point. */
export function saveCoursePercent(slug: string, percent: number): void {
  const map = parseJson<ProgressMap>(readStorage(PROGRESS_KEY), {});
  if (percent <= getCoursePercent(map, slug)) return;
  writeStorage(PROGRESS_KEY, { ...map, [slug]: percent });
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
