"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalSize = "md" | "lg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: ModalSize;
  hideHeader?: boolean;
  headerActions?: ReactNode;
  children: ReactNode;
}

const sizes: Record<ModalSize, string> = {
  md: "m-auto w-[min(34rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] rounded-xl",
  lg: "m-auto h-[min(85dvh,56rem)] w-[min(60rem,calc(100%-2rem))] max-h-none rounded-xl",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  hideHeader = false,
  headerActions,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock page scroll behind the modal and give focus back to the trigger on close
  // (the browser's own focus return is lost when the focused content unmounts).
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={hideHeader ? undefined : titleId}
      aria-label={hideHeader ? title : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`overflow-hidden bg-white p-0 text-body shadow-2xl backdrop:bg-ink/60 open:flex open:flex-col ${sizes[size]}`}
    >
      {open && (
        <>
          {!hideHeader && (
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                {subtitle && <p className="truncate text-sm text-muted">{subtitle}</p>}
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                  {title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {headerActions}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-strong"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
            </div>
          )}
          {children}
        </>
      )}
    </dialog>
  );
}
