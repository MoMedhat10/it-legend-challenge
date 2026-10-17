"use client";

import "@videojs/react/video/skin.css";
import type { CSSProperties } from "react";
import NextImage from "next/image";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import { WatchTracker } from "@/components/player/video/WatchTracker";
import type { ProgressSeed } from "@/lib/progress";

export interface CoursePlayerProps {
  src: string;
  poster: string;
  seed: ProgressSeed;
}

const skinTheme = {
  "--media-accent-color": "#237a65",
  "--media-accent-text-color": "#ffffff",
  "--media-font-family": "var(--font-jost), system-ui, sans-serif",
  "--media-border-radius": "0.375rem",
} as CSSProperties;

/** Video.js + YouTube. Loaded on the client only (see CourseVideo). */
export default function CoursePlayer({ src, poster, seed }: CoursePlayerProps) {
  return (
    <VideoPlayer poster={poster}>
      <VideoSkin
        className="size-full"
        style={skinTheme}
        renderPoster={(props, { src: posterSrc }) =>
          posterSrc ? <NextImage {...props} src={posterSrc} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" /> : null
        }
      >
        <YouTubeVideo src={src} playsInline />
      </VideoSkin>
      <WatchTracker seed={seed} />
    </VideoPlayer>
  );
}
