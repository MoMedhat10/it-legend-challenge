"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Play } from "lucide-react";
import { usePlayerContext, VIDEO_ELEMENT_ID } from "@/components/player/PlayerContext";
import type { CoursePlayerProps } from "@/components/player/video/CoursePlayer";
import { usePreloadOnTouch } from "@/hooks/usePreloadOnTouch";
import { usePseudoFullscreen } from "@/hooks/usePseudoFullscreen";
import { useCourseProgress } from "@/hooks/useProgress";

const CoursePlayer = dynamic(() => import("@/components/player/video/CoursePlayer"), { ssr: false });

export function CourseVideo({ title, poster, ...player }: CoursePlayerProps & { title: string; poster: string }) {
  const { started, playFrom } = usePlayerContext();
  const { watchedSec, completed } = useCourseProgress(player.slug, player.chapters);
  const resumeSec = completed === player.chapters.length ? 0 : watchedSec;
  const containerRef = useRef<HTMLDivElement>(null);
  const preloaded = usePreloadOnTouch(!started);
  const pseudoFullscreen = usePseudoFullscreen(containerRef);

  useEffect(() => {
    if (started) containerRef.current?.focus();
  }, [started]);

  return (
    <div
      ref={containerRef}
      id={VIDEO_ELEMENT_ID}
      tabIndex={-1}
      role="group"
      aria-label={`Video: ${title}`}
      data-pseudo-fullscreen={pseudoFullscreen || undefined}
      className={
        pseudoFullscreen
          ? "fixed inset-0 z-50 bg-black outline-none"
          : "relative aspect-video w-full overflow-hidden rounded-md bg-ink outline-none"
      }
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        fetchPriority="high"
        loading="eager"
        className={`object-cover ${started ? "" : "z-10"}`}
      />
      {(started || preloaded) && (
        <div className="absolute inset-0">
          <CoursePlayer {...player} autoplay={!preloaded} />
        </div>
      )}
      {!started && (
        <button
          type="button"
          onClick={() => playFrom(resumeSec)}
          aria-label={`${resumeSec > 0 ? "Resume" : "Play"} video: ${title}`}
          className="group absolute inset-0 z-20 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/15 focus-visible:outline-none"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-strong shadow-lg transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-white/70">
            <Play aria-hidden className="ml-1 size-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
