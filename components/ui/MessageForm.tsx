"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

interface MessageFormProps {
  label: string;
  placeholder: string;
  submitLabel: string;
  successMessage: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (text: string) => void;
  minLength?: number;
  maxLength?: number;
}

export function MessageForm({
  label,
  placeholder,
  submitLabel,
  successMessage,
  value,
  onChange,
  onSubmit,
  minLength = 3,
  maxLength = 500,
}: MessageFormProps) {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = value.trim();
    if (text.length < minLength) {
      setError(`Please write at least ${minLength} characters.`);
      setStatus("");
      textareaRef.current?.focus();
      return;
    }
    onSubmit(text);
    setError("");
    setStatus(successMessage);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={`${id}-text`} className="sr-only">
        {label}
      </label>
      <textarea
        ref={textareaRef}
        id={`${id}-text`}
        rows={6}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          if (error) setError("");
          if (status) setStatus("");
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        className="w-full resize-y rounded-md border border-line bg-white p-4 text-sm text-ink shadow-card placeholder:text-muted focus:border-brand focus:outline-2 focus:outline-brand/40 aria-invalid:border-danger"
      />
      <div className="flex items-start justify-between gap-4 text-xs">
        <p id={`${id}-error`} role="alert" className="text-danger">
          {error}
        </p>
        <p id={`${id}-hint`} className="shrink-0 tabular-nums text-muted">
          {value.length}/{maxLength}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={buttonStyles("primary", "self-start")}>
          {submitLabel}
          <ArrowRight aria-hidden className="size-4" />
        </button>
        <p role="status" className="text-sm text-brand-strong">
          {status}
        </p>
      </div>
    </form>
  );
}
