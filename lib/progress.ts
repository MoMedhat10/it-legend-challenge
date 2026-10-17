import type { CourseStatus } from "@/lib/types";

/*
 * Student progress lives in localStorage so it survives reloads and is
 * shared between the courses page and the course player.
 */

export interface StoredCourseProgress {
  completedLessonIds: string[];
  lastLessonId?: string;
}

export type ProgressMap = Record<string, StoredCourseProgress>;

/** What the server knows about a course; enough to resolve progress on the client. */
export interface ProgressSeed {
  slug: string;
  totalLessons: number;
  seedCompletedLessons: number;
}

export interface ResolvedProgress {
  completed: number;
  percent: number;
  status: CourseStatus;
  lastLessonId?: string;
}

const STORAGE_KEY = "course-progress:v1";
const CHANGE_EVENT = "course-progress-change";

export function readProgressRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
}

export function parseProgress(raw: string | null): ProgressMap {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function subscribeToProgress(onChange: () => void): () => void {
  // "storage" fires for other tabs, the custom event for this tab.
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function saveCourseProgress(slug: string, progress: StoredCourseProgress): void {
  const map = parseProgress(readProgressRaw());
  map[slug] = progress;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function markLessonComplete(slug: string, lessonId: string): void {
  const current = parseProgress(readProgressRaw())[slug];
  const ids = new Set(current?.completedLessonIds);
  ids.add(lessonId);
  saveCourseProgress(slug, { completedLessonIds: [...ids], lastLessonId: lessonId });
}

export function getStatus(percent: number): CourseStatus {
  if (percent <= 0) return "not-started";
  if (percent >= 100) return "completed";
  return "in-progress";
}

export function resolveProgress(seed: ProgressSeed, map: ProgressMap): ResolvedProgress {
  const stored = map[seed.slug];
  const rawCompleted = stored ? stored.completedLessonIds.length : seed.seedCompletedLessons;
  const completed = Math.min(rawCompleted, seed.totalLessons);
  const percent = seed.totalLessons === 0 ? 0 : Math.round((completed / seed.totalLessons) * 100);
  return { completed, percent, status: getStatus(percent), lastLessonId: stored?.lastLessonId };
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
