"use client";

import "@videojs/react/video/skin.css";
import type { CSSProperties } from "react";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import { WatchTracker } from "@/components/player/video/WatchTracker";

export interface CoursePlayerProps {
  src: string;
  slug: string;
}

const skinTheme = {
  "--media-accent-color": "#237a65",
  "--media-accent-text-color": "#ffffff",
  "--media-font-family": "var(--font-jost), system-ui, sans-serif",
  "--media-border-radius": "0.375rem",
} as CSSProperties;

/** Video.js + YouTube. Mounted by CourseVideo after the play button is pressed, so it autoplays. */
export default function CoursePlayer({ src, slug }: CoursePlayerProps) {
  return (
    <VideoPlayer>
      <VideoSkin className="size-full" style={skinTheme}>
        <YouTubeVideo src={src} playsInline autoplay />
      </VideoSkin>
      <WatchTracker slug={slug} />
    </VideoPlayer>
  );
}
