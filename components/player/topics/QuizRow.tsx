"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { QuizModal } from "@/components/player/modals/QuizModal";
import { rowButtonStyles } from "@/components/player/topics/PdfRow";
import { useStoredState } from "@/hooks/useStoredState";
import type { Quiz } from "@/lib/types";

interface StoredQuiz {
  answers: (number | null)[];
  submitted: boolean;
}

export function QuizRow({ title, quiz, storageKey }: { title: string; quiz: Quiz; storageKey: string }) {
  const [open, setOpen] = useState(false);
  // Read-only peek at the saved quiz to label the button.
  const [saved] = useStoredState<StoredQuiz | null>(storageKey, null);
  const count = quiz.questions.length;

  const label = saved?.submitted
    ? "View Result"
    : saved?.answers.some((answer) => answer !== null)
      ? "Continue Quiz"
      : `Start Quiz (${count}Q)`;

  return (
    <li className="flex items-center justify-between gap-3 px-3 py-3">
      <span className="flex items-start gap-2.5 text-sm font-medium text-ink">
        <CircleHelp aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-strong" />
        {title}
      </span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${label}: ${title}`}
        className={`${rowButtonStyles} border-brand bg-brand-soft text-brand-strong hover:bg-brand hover:text-white`}
      >
        {label}
      </button>
      <QuizModal open={open} onClose={() => setOpen(false)} title={title} quiz={quiz} storageKey={storageKey} />
    </li>
  );
}
