"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { iconButtonStyles } from "@/components/player/PlayerActions";
import { Modal } from "@/components/ui/Modal";
import type { LeaderboardEntry } from "@/lib/types";

interface LeaderboardProps {
  courseTitle: string;
  message: { emoji: string; text: string };
  entries: LeaderboardEntry[];
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

/** Icon trigger + static leaderboard modal with the instructor's encouragement message. */
export function Leaderboard({ courseTitle, message, entries }: LeaderboardProps) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Leaderboard"
        title="Leaderboard"
        className={iconButtonStyles}
      >
        <Trophy aria-hidden className="size-4" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Leaderboard" subtitle={courseTitle}>
        <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-6">
          <figure className="flex items-start gap-3 rounded-lg bg-surface p-4">
            <span aria-hidden className="text-3xl leading-none">
              {message.emoji}
            </span>
            <blockquote className="text-sm leading-relaxed text-ink">{message.text}</blockquote>
          </figure>

          <ol className="flex flex-col gap-2 rounded-lg bg-surface p-3">
            {entries.map((entry) => (
              <li
                key={entry.rank}
                aria-current={entry.isYou ? "true" : undefined}
                className={`flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm ${
                  entry.isYou ? "ring-2 ring-brand" : ""
                }`}
              >
                <span className="w-8 shrink-0 text-center font-semibold text-ink">
                  {MEDALS[entry.rank] ? (
                    <>
                      <span aria-hidden>{MEDALS[entry.rank]}</span>
                      <span className="sr-only">Rank {entry.rank}</span>
                    </>
                  ) : (
                    <>
                      <span className="sr-only">Rank </span>
                      {entry.rank}
                    </>
                  )}
                </span>
                <span className={`flex-1 truncate ${entry.isYou ? "font-semibold text-brand-strong" : "text-ink"}`}>
                  {entry.name}
                </span>
                <span className="shrink-0 tabular-nums text-muted">{entry.points} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </Modal>
    </li>
  );
}
