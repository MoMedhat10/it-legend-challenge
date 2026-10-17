"use client";

import { useEffect } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, RotateCcw, Timer, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useStoredState } from "@/hooks/useStoredState";
import type { Quiz } from "@/lib/types";

const PASS_PERCENT = 60;

interface QuizState {
  answers: (number | null)[];
  current: number;
  remainingSec: number;
  submitted: boolean;
}

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  quiz: Quiz;
  /** localStorage key; answers, position and time left survive closing the modal. */
  storageKey: string;
}

const freshState = (quiz: Quiz): QuizState => ({
  answers: quiz.questions.map(() => null),
  current: 0,
  remainingSec: quiz.timeLimitSec,
  submitted: false,
});

function formatClock(totalSec: number): string {
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
}

export function QuizModal({ open, onClose, title, quiz, storageKey }: QuizModalProps) {
  const [state, setState] = useStoredState<QuizState>(storageKey, freshState(quiz));
  const { answers, current, remainingSec, submitted } = state;
  const question = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;
  const answeredCount = answers.filter((answer) => answer !== null).length;

  // Countdown only while the quiz is open and not yet submitted; time is up = auto-submit.
  useEffect(() => {
    if (!open || submitted) return;
    const timer = window.setInterval(() => {
      setState((prev) =>
        prev.remainingSec <= 1 ? { ...prev, remainingSec: 0, submitted: true } : { ...prev, remainingSec: prev.remainingSec - 1 },
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [open, submitted, setState]);

  const goTo = (index: number) => setState((prev) => ({ ...prev, current: index }));
  const choose = (option: number) =>
    setState((prev) => ({ ...prev, answers: prev.answers.map((a, i) => (i === prev.current ? option : a)) }));
  const submit = () => setState((prev) => ({ ...prev, submitted: true }));
  const retry = () => setState(freshState(quiz));

  return (
    <Modal open={open} onClose={onClose} title={title} size="fullscreen" hideHeader className="bg-quiz text-white">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to course"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          {!submitted && (
            <p
              className="inline-flex items-center gap-2 rounded-md bg-timer px-4 py-1.5 text-sm font-semibold tabular-nums text-ink"
              aria-label={`Time left: ${Math.floor(remainingSec / 60)} minutes ${remainingSec % 60} seconds`}
            >
              <Timer aria-hidden className="size-4" />
              {formatClock(remainingSec)}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        <h2 className="mx-auto mt-2 w-full max-w-2xl px-4 text-center text-base font-medium text-quiz-soft">{title}</h2>

        {submitted ? (
          <QuizResult quiz={quiz} answers={answers} onRetry={retry} onClose={onClose} />
        ) : (
          <>
            <nav aria-label="Questions" className="mx-auto mt-5 flex w-full max-w-2xl flex-wrap justify-center gap-2.5 px-4">
              {quiz.questions.map((q, index) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to question ${index + 1}${answers[index] !== null ? " (answered)" : ""}`}
                  aria-current={index === current ? "step" : undefined}
                  className={`inline-flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    index === current
                      ? "border-white bg-white text-quiz"
                      : answers[index] !== null
                        ? "border-white bg-white/20"
                        : "border-white/60 hover:border-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>

            <div className="mx-auto mt-6 w-full max-w-2xl flex-1 px-4 pb-6">
              <div className="flex min-h-full flex-col rounded-t-3xl bg-white p-5 text-body sm:rounded-3xl sm:p-8">
                <fieldset key={question.id} className="flex flex-col gap-3">
                  <legend className="mb-4 flex gap-2 text-lg font-medium text-ink">
                    <span>{current + 1}.</span>
                    <span>{question.text}</span>
                  </legend>
                  {question.options.map((option, index) => {
                    const selected = answers[current] === index;
                    return (
                      <label
                        key={option}
                        className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-quiz ${
                          selected ? "border-quiz bg-quiz text-white" : "border-line hover:border-quiz"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          checked={selected}
                          onChange={() => choose(index)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                            selected ? "border-white bg-white text-quiz" : "border-muted"
                          }`}
                        >
                          {selected && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        {option}
                      </label>
                    );
                  })}
                </fieldset>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-quiz hover:bg-quiz-soft disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-quiz"
                  >
                    <ChevronLeft aria-hidden className="size-4" /> Previous
                  </button>
                  <span className="text-sm text-muted">
                    {current + 1} of {quiz.questions.length}
                  </span>
                  {isLast ? (
                    <button
                      type="button"
                      onClick={submit}
                      className="inline-flex min-h-11 items-center gap-1 rounded-md bg-quiz px-4 text-sm font-medium text-white hover:bg-quiz/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quiz"
                    >
                      Submit ({answeredCount}/{quiz.questions.length})
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goTo(current + 1)}
                      className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-quiz hover:bg-quiz-soft focus-visible:outline-2 focus-visible:outline-quiz"
                    >
                      Next <ChevronRight aria-hidden className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function QuizResult({
  quiz,
  answers,
  onRetry,
  onClose,
}: {
  quiz: Quiz;
  answers: (number | null)[];
  onRetry: () => void;
  onClose: () => void;
}) {
  const correct = quiz.questions.filter((q, i) => answers[i] === q.answerIndex).length;
  const percent = Math.round((correct / quiz.questions.length) * 100);
  const passed = percent >= PASS_PERCENT;

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl flex-1 px-4 pb-6">
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-6 text-center text-body sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">Your score</p>
        <p className="text-5xl font-semibold text-ink">{percent}%</p>
        <p role="status">
          You answered {correct} of {quiz.questions.length} questions correctly.{" "}
          <span className={`font-semibold ${passed ? "text-brand-strong" : "text-danger"}`}>
            {passed ? "Passed!" : `You need ${PASS_PERCENT}% to pass.`}
          </span>
        </p>

        <ol className="w-full divide-y divide-line rounded-lg border border-line text-left text-sm">
          {quiz.questions.map((q, i) => {
            const isCorrect = answers[i] === q.answerIndex;
            return (
              <li key={q.id} className="flex items-start gap-3 px-4 py-3">
                <span
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                    isCorrect ? "bg-brand-soft text-brand-strong" : "bg-danger-soft text-danger"
                  }`}
                >
                  {isCorrect ? <Check aria-hidden className="size-3.5" /> : <X aria-hidden className="size-3.5" />}
                  <span className="sr-only">{isCorrect ? "Correct" : "Incorrect"}:</span>
                </span>
                <span>
                  <span className="text-ink">{q.text}</span>
                  {!isCorrect && <span className="block text-muted">Answer: {q.options[q.answerIndex]}</span>}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-quiz px-5 text-sm font-medium text-quiz hover:bg-quiz-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quiz"
          >
            <RotateCcw aria-hidden className="size-4" /> Retry quiz
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-quiz px-5 text-sm font-medium text-white hover:bg-quiz/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quiz"
          >
            Back to course
          </button>
        </div>
      </div>
    </div>
  );
}
