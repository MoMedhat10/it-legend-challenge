import { useStoredState } from "@/hooks/useStoredState";
import {
  PROGRESS_KEY,
  resolveProgress,
  type ProgressMap,
  type ProgressSeed,
  type ResolvedProgress,
} from "@/lib/progress";

const EMPTY: ProgressMap = {};

export function useCourseProgress(seed: ProgressSeed): ResolvedProgress {
  const [map] = useStoredState<ProgressMap>(PROGRESS_KEY, EMPTY);
  return resolveProgress(seed, map);
}
