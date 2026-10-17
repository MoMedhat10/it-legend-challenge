"use client";

import "@videojs/react/video/skin.css";
import type { CSSProperties } from "react";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import { PlayerSync } from "@/components/player/video/PlayerSync";
import type { Chapter } from "@/lib/chapters";

export interface CoursePlayerProps {
  src: string;
  slug: string;
  chapters: Chapter[];
  autoplay?: boolean;
}

const skinTheme = {
  "--media-accent-color": "#237a65",
  "--media-accent-text-color": "#ffffff",
  "--media-font-family": "var(--font-jost), system-ui, sans-serif",
  "--media-border-radius": "0.375rem",
} as CSSProperties;

export default function CoursePlayer({ src, slug, chapters, autoplay = true }: CoursePlayerProps) {
  return (
    <VideoPlayer>
      <VideoSkin className="size-full" style={skinTheme}>
        <YouTubeVideo src={src} playsInline autoplay={autoplay} />
      </VideoSkin>
      <PlayerSync slug={slug} chapters={chapters} />
    </VideoPlayer>
  );
}
