"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface SeekRequest {
  sec: number;
  id: number;
}

interface PlayerContextValue {
  started: boolean;
  currentChapter: number | null;
  seekRequest: SeekRequest | null;
  playFrom: (sec: number) => void;
  setCurrentChapter: (index: number) => void;
  clearSeekRequest: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export const VIDEO_ELEMENT_ID = "course-video";

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [seekRequest, setSeekRequest] = useState<SeekRequest | null>(null);

  const playFrom = useCallback((sec: number) => {
    setStarted(true);
    setSeekRequest({ sec, id: Date.now() });
    document.getElementById(VIDEO_ELEMENT_ID)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  const clearSeekRequest = useCallback(() => setSeekRequest(null), []);

  const value = useMemo(
    () => ({ started, currentChapter, seekRequest, playFrom, setCurrentChapter, clearSeekRequest }),
    [started, currentChapter, seekRequest, playFrom, clearSeekRequest],
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
}

export function usePlayerContext(): PlayerContextValue {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayerContext must be used inside <PlayerProvider>");
  return value;
}
