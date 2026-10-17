"use client";

import { useEffect } from "react";
import { usePlayer } from "@videojs/react/video";
import { addWatchedSegments, SEGMENTS, type ProgressSeed } from "@/lib/progress";

/**
 * Progress follows the furthest point reached in the video: playing or
 * seeking forward fills every segment up to the playhead.
 */
export function WatchTracker({ seed }: { seed: ProgressSeed }) {
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);

  useEffect(() => {
    if (!duration || currentTime <= 0) return;
    // Treat the last second as the end so short rounding gaps still complete the course.
    const reached = currentTime >= duration - 1 ? SEGMENTS : Math.floor((currentTime / duration) * SEGMENTS);
    if (reached > 0) addWatchedSegments(seed, Array.from({ length: reached }, (_, i) => i));
  }, [currentTime, duration, seed]);

  return null;
}
