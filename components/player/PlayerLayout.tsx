"use client";

import type { ReactNode } from "react";
import { PlayerProvider } from "@/components/player/PlayerContext";
import { useWideMode, WideModeProvider } from "@/components/player/WideMode";

interface PlayerLayoutProps {
  video: ReactNode;
  actions: ReactNode;
  materials: ReactNode;
  topics: ReactNode;
  comments: ReactNode;
}

export function PlayerLayout(props: PlayerLayoutProps) {
  return (
    <WideModeProvider>
      <PlayerProvider>
        <LayoutGrid {...props} />
      </PlayerProvider>
    </WideModeProvider>
  );
}

function LayoutGrid({ video, actions, materials, topics, comments }: PlayerLayoutProps) {
  const { wide } = useWideMode();
  return (
    <div className="player-layout" data-wide={wide}>
      {/* On mobile the white band covers the page gutters while content scrolls under the sticky video. */}
      <div className="player-layout__video -mx-4 bg-white px-4 py-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:p-0">{video}</div>
      <div className="player-layout__actions">{actions}</div>
      <div className="player-layout__materials">{materials}</div>
      <div className="player-layout__topics">{topics}</div>
      <div className="player-layout__comments">{comments}</div>
    </div>
  );
}
