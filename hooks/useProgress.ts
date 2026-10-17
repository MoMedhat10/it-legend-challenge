import { useMemo, useSyncExternalStore } from "react";
import {
  parseProgress,
  readProgressRaw,
  resolveProgress,
  subscribeToProgress,
  type ProgressMap,
  type ProgressSeed,
  type ResolvedProgress,
} from "@/lib/progress";

// The server has no localStorage: render the seeded values there and during
// hydration, then React swaps in the stored values without a mismatch.
const getServerSnapshot = () => null;

export function useProgressMap(): ProgressMap {
  const raw = useSyncExternalStore(subscribeToProgress, readProgressRaw, getServerSnapshot);
  return useMemo(() => parseProgress(raw), [raw]);
}

export function useCourseProgress(seed: ProgressSeed): ResolvedProgress {
  const map = useProgressMap();
  return resolveProgress(seed, map);
}
