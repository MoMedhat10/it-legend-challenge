"use client";

import { useEffect } from "react";
import { usePlayer } from "@videojs/react/video";
import { usePlayerContext } from "@/components/player/PlayerContext";
import { useCourseProgress } from "@/hooks/useProgress";
import { getChapterIndexAt, getMaxAllowedSec, type Chapter } from "@/lib/chapters";
import { saveWatchedSec } from "@/lib/progress";

/** Bridges Video.js and the page: lesson jumps, current chapter, locking and saved progress. */
export function PlayerSync({ slug, chapters }: { slug: string; chapters: Chapter[] }) {
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);
  const seek = usePlayer((s) => s.seek);
  const play = usePlayer((s) => s.play);
  const { watchedSec } = useCourseProgress(slug, chapters);
  const { seekRequest, clearSeekRequest, setCurrentChapter } = usePlayerContext();

  useEffect(() => {
    if (!seekRequest || !duration) return;
    seek(seekRequest.sec);
    play();
    clearSeekRequest();
  }, [seekRequest, duration, seek, play, clearSeekRequest]);

  useEffect(() => {
    if (!duration || currentTime <= 0) return;
    const maxAllowed = getMaxAllowedSec(chapters, watchedSec);
    if (currentTime > maxAllowed + 1) {
      seek(maxAllowed);
      return;
    }
    setCurrentChapter(getChapterIndexAt(chapters, currentTime));
    saveWatchedSec(slug, Math.floor(currentTime));
  }, [currentTime, duration, chapters, watchedSec, slug, seek, setCurrentChapter]);

  return null;
}
