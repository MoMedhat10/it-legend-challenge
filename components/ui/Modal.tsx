"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalSize = "md" | "fullscreen";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small line above the title, e.g. the course name. */
  subtitle?: string;
  size?: ModalSize;
  /** Render your own header (the title is still used as the accessible name). */
  hideHeader?: boolean;
  /** Extra actions shown next to the close button. */
  headerActions?: ReactNode;
  className?: string;
  children: ReactNode;
}

const sizes: Record<ModalSize, string> = {
  md: "m-auto w-[min(34rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] rounded-xl",
  fullscreen: "m-0 h-dvh max-h-none w-screen max-w-none",
};

/**
 * Native <dialog> modal: focus trap, Esc to close and focus return come from
 * the browser. Content is only mounted while open.
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  hideHeader = false,
  headerActions,
  className = "",
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
        event.preventDefault(); // keep React state the source of truth
        onClose();
      }}
      onClick={(event) => {
        // Click on the backdrop (the dialog element itself) closes small modals.
        if (size === "md" && event.target === event.currentTarget) onClose();
      }}
      className={`overflow-hidden bg-white p-0 text-body shadow-2xl backdrop:bg-ink/60 open:flex open:flex-col ${sizes[size]} ${className}`}
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
