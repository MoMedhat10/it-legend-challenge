import { useStoredState } from "@/hooks/useStoredState";
import { getCoursePercent, getStatus, PROGRESS_KEY, type ProgressMap } from "@/lib/progress";
import type { CourseStatus } from "@/lib/types";

const EMPTY: ProgressMap = {};

export function useCourseProgress(slug: string): { percent: number; status: CourseStatus } {
  const [map] = useStoredState<ProgressMap>(PROGRESS_KEY, EMPTY);
  const percent = getCoursePercent(map, slug);
  return { percent, status: getStatus(percent) };
}
