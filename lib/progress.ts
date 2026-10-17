import { parseJson, readStorage, writeStorage } from "@/lib/storage";
import type { CourseStatus } from "@/lib/types";

export const PROGRESS_KEY = "course-progress:v5";

/** slug → furthest second reached in the course video */
export type ProgressMap = Record<string, number>;

export function getStatus(percent: number): CourseStatus {
  if (percent <= 0) return "not-started";
  if (percent >= 100) return "completed";
  return "in-progress";
}

export function getWatchedSec(map: ProgressMap, slug: string): number {
  const value = map[slug];
  return typeof value === "number" && value > 0 ? value : 0;
}

export function saveWatchedSec(slug: string, sec: number): void {
  const map = parseJson<ProgressMap>(readStorage(PROGRESS_KEY), {});
  if (sec <= getWatchedSec(map, slug)) return;
  writeStorage(PROGRESS_KEY, { ...map, [slug]: sec });
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
