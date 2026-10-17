"use client";

import { useEffect } from "react";
import { AlarmClock, Check, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
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

const navButton =
  "inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-quiz hover:bg-quiz-soft disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-quiz";

/** Full-screen exam (reference: indigo screen, yellow timer, numbered steps, white question card). */
export function QuizModal({ open, onClose, title, quiz, storageKey }: QuizModalProps) {
  const [state, setState] = useStoredState<QuizState>(storageKey, freshState(quiz));
  const { answers, current, remainingSec, submitted } = state;
  const question = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;

  // Countdown only while the quiz is open and not yet submitted; time is up = auto-submit.
  useEffect(() => {
    if (!open || submitted) return;
    const timer = window.setInterval(() => {
      setState((prev) =>
        prev.remainingSec <= 1
          ? { ...prev, remainingSec: 0, submitted: true }
          : { ...prev, remainingSec: prev.remainingSec - 1 },
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
    <Modal open={open} onClose={onClose} title={title} size="fullscreen" hideHeader>
      <div className="flex flex-1 flex-col overflow-y-auto bg-quiz text-white">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          <header className="relative flex min-h-16 items-center justify-center px-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${title}`}
              className="absolute left-2 top-3 inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft aria-hidden className="size-6" />
            </button>
            {!submitted && (
              <p
                className="inline-flex items-center gap-1.5 rounded-sm bg-timer px-4 py-1.5 text-sm font-medium tabular-nums text-ink shadow-[0_4px_14px_rgb(249_217_73/0.45)]"
                aria-label={`Time left: ${Math.floor(remainingSec / 60)} minutes ${remainingSec % 60} seconds`}
              >
                <AlarmClock aria-hidden className="size-4" />
                {formatClock(remainingSec)}
              </p>
            )}
          </header>

          {submitted ? (
            <QuizResult quiz={quiz} answers={answers} onRetry={retry} onClose={onClose} />
          ) : (
            <>
              <nav aria-label="Questions" className="flex flex-wrap justify-center gap-2.5 px-4 py-6">
                {quiz.questions.map((q, index) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to question ${index + 1}${answers[index] !== null ? " (answered)" : ""}`}
                    aria-current={index === current ? "step" : undefined}
                    className={`inline-flex size-10 items-center justify-center rounded-full border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      index === current
                        ? "border-white bg-white font-semibold text-quiz"
                        : answers[index] !== null
                          ? "border-white bg-white/20"
                          : "border-white/70 hover:border-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>

              {/* White question card framed by the indigo screen, as in the reference. */}
              <div className="mx-2 mb-2 flex flex-1 flex-col rounded-2xl bg-white p-5 text-body sm:mx-4 sm:mb-6 sm:p-7">
                <fieldset key={question.id} className="flex flex-col gap-4">
                  <legend className="mb-5 text-ink">
                    <span className="block text-sm font-semibold">{current + 1}.</span>
                    <span className="mt-1 block text-base font-semibold leading-relaxed">{question.text}</span>
                  </legend>
                  {question.options.map((option, index) => {
                    const selected = answers[current] === index;
                    return (
                      <label
                        key={option}
                        className={`flex min-h-12 cursor-pointer items-stretch overflow-hidden rounded-md text-sm shadow-[0_4px_16px_rgb(16_24_40/0.08)] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-quiz ${
                          selected ? "bg-quiz-accent text-white" : "bg-white text-ink hover:bg-quiz-soft/60"
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
                          className={`flex w-12 shrink-0 items-center justify-center border-r ${
                            selected ? "border-white/30" : "border-line"
                          }`}
                        >
                          <span
                            className={`flex size-4 items-center justify-center rounded-[3px] border ${
                              selected ? "border-white" : "border-quiz/50"
                            }`}
                          >
                            {selected && <span className="size-1.5 rounded-[1px] bg-white" />}
                          </span>
                        </span>
                        <span className="flex items-center px-4 py-3">{option}</span>
                      </label>
                    );
                  })}
                </fieldset>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} className={navButton}>
                    <ChevronLeft aria-hidden className="size-4" /> Previous
                  </button>
                  <span className="text-sm text-muted">
                    {current + 1} of {quiz.questions.length}
                  </span>
                  {isLast ? (
                    <button
                      type="button"
                      onClick={submit}
                      className="inline-flex min-h-11 items-center rounded-md bg-quiz px-4 text-sm font-medium text-white hover:bg-quiz/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quiz"
                    >
                      Submit
                    </button>
                  ) : (
                    <button type="button" onClick={() => goTo(current + 1)} className={navButton}>
                      Next <ChevronRight aria-hidden className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
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
    <div className="mx-2 mb-2 mt-6 flex flex-1 flex-col items-center gap-5 rounded-2xl bg-white p-6 text-center text-body sm:mx-4 sm:mb-6 sm:p-8">
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

      <div className="mt-auto flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
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
  );
}
