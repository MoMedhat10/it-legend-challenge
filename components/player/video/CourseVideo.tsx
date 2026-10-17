"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Play } from "lucide-react";
import type { CoursePlayerProps } from "@/components/player/video/CoursePlayer";

// Video.js + the YouTube embed (~1 MB) load only after the student presses play.
const CoursePlayer = dynamic(() => import("@/components/player/video/CoursePlayer"), { ssr: false });

export function CourseVideo({ title, poster, ...player }: CoursePlayerProps & { title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // The play button disappears on click; keep keyboard focus on the video area.
  useEffect(() => {
    if (playing) containerRef.current?.focus();
  }, [playing]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="group"
      aria-label={`Video: ${title}`}
      className="relative aspect-video w-full overflow-hidden rounded-md bg-ink outline-none"
    >
      {/* Server-rendered poster: paints instantly (LCP) and stays underneath while the player loads. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        fetchPriority="high"
        loading="eager"
        className="object-cover"
      />
      {playing ? (
        <div className="absolute inset-0">
          <CoursePlayer {...player} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/15 focus-visible:outline-none"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-strong shadow-lg transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-white/70">
            <Play aria-hidden className="ml-1 size-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
