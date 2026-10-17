import { useStoredState } from "@/hooks/useStoredState";
import { getCompletedCount, type Chapter } from "@/lib/chapters";
import { getStatus, getWatchedSec, PROGRESS_KEY, type ProgressMap } from "@/lib/progress";
import type { CourseStatus } from "@/lib/types";

const EMPTY: ProgressMap = {};

interface CourseProgress {
  watchedSec: number;
  completed: number;
  percent: number;
  status: CourseStatus;
}

export function useCourseProgress(slug: string, chapters: Chapter[]): CourseProgress {
  const [map] = useStoredState<ProgressMap>(PROGRESS_KEY, EMPTY);
  const watchedSec = getWatchedSec(map, slug);
  const completed = getCompletedCount(chapters, watchedSec);
  const percent = chapters.length === 0 ? 0 : Math.round((completed / chapters.length) * 100);
  return { watchedSec, completed, percent, status: getStatus(percent) };
}
