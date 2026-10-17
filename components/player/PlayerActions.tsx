"use client";

import type { ReactNode } from "react";
import { ListVideo, Maximize2, MessageSquare, Minimize2 } from "lucide-react";
import { useWideMode } from "@/components/player/WideMode";

export const iconButtonStyles =
  "inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong aria-pressed:border-brand aria-pressed:bg-brand-soft aria-pressed:text-brand-strong";

/** Icon row under the video. `children` adds modal triggers (ask a question, leaderboard). */
export function PlayerActions({ children }: { children?: ReactNode }) {
  const { wide, toggleWide } = useWideMode();

  return (
    <ul aria-label="Course actions" className="flex items-center gap-3">
      <li className="lg:hidden">
        <a href="#curriculum" aria-label="Curriculum" title="Curriculum" className={iconButtonStyles}>
          <ListVideo aria-hidden className="size-4" />
        </a>
      </li>
      <li>
        <a href="#comments" aria-label="Comments" title="Comments" className={iconButtonStyles}>
          <MessageSquare aria-hidden className="size-4" />
        </a>
      </li>
      {children}
      <li className="ml-auto hidden lg:block">
        <button
          type="button"
          onClick={toggleWide}
          aria-pressed={wide}
          aria-label="Wide mode"
          title={wide ? "Exit wide mode" : "Wide mode"}
          className={iconButtonStyles}
        >
          {wide ? <Minimize2 aria-hidden className="size-4" /> : <Maximize2 aria-hidden className="size-4" />}
        </button>
      </li>
    </ul>
  );
}
