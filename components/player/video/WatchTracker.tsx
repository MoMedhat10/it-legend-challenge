"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@videojs/react/video";
import { addWatchedSegments, SEGMENTS, type ProgressSeed } from "@/lib/progress";

/** Longest gap between two time updates that still counts as continuous playback. */
const MAX_PLAYBACK_STEP_SEC = 3;

/**
 * Marks video segments as watched while the video plays continuously.
 * Seeks (jumps bigger than a normal playback step) are ignored, so skipping
 * to the end does not complete the course.
 */
export function WatchTracker({ seed }: { seed: ProgressSeed }) {
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);
  const paused = usePlayer((s) => s.paused);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    if (paused || !duration) {
      lastTime.current = null;
      return;
    }
    const previous = lastTime.current;
    lastTime.current = currentTime;
    if (previous === null) return;

    const step = currentTime - previous;
    if (step <= 0 || step > MAX_PLAYBACK_STEP_SEC) return;

    const from = Math.floor((previous / duration) * SEGMENTS);
    const to = Math.floor((currentTime / duration) * SEGMENTS);
    const finished: number[] = [];
    for (let segment = from; segment < to; segment++) finished.push(segment);
    if (currentTime >= duration - 1) finished.push(SEGMENTS - 1);
    if (finished.length > 0) addWatchedSegments(seed, finished);
  }, [currentTime, duration, paused, seed]);

  return null;
}
