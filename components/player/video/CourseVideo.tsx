"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { CoursePlayerProps } from "@/components/player/video/CoursePlayer";

// Video.js and the YouTube engine are browser-only and heavy: keep them out
// of the server render and in their own chunk.
const CoursePlayer = dynamic(() => import("@/components/player/video/CoursePlayer"), { ssr: false });

export function CourseVideo({ title, ...player }: CoursePlayerProps & { title: string }) {
  return (
    <div
      role="group"
      aria-label={`Video: ${title}`}
      className="relative aspect-video w-full overflow-hidden rounded-md bg-ink"
    >
      {/* Server-rendered poster: paints instantly (LCP) and holds the space until the player mounts on top. */}
      <Image
        src={player.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        fetchPriority="high"
        loading="eager"
        className="object-cover"
      />
      <div className="absolute inset-0">
        <CoursePlayer {...player} />
      </div>
    </div>
  );
}
