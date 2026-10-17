"use client";

import { useEffect } from "react";
import { usePlayer } from "@videojs/react/video";
import { saveCoursePercent } from "@/lib/progress";

/** Saves the furthest point reached in the video (playing or seeking forward). */
export function WatchTracker({ slug }: { slug: string }) {
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);

  useEffect(() => {
    if (!duration || currentTime <= 0) return;
    // Treat the last second as the end so rounding gaps still complete the course.
    const percent = currentTime >= duration - 1 ? 100 : Math.floor((currentTime / duration) * 100);
    if (percent > 0) saveCoursePercent(slug, percent);
  }, [currentTime, duration, slug]);

  return null;
}
