"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { PdfModal } from "@/components/modals/PdfModal";

export const rowButtonStyles =
  "inline-flex min-h-8 shrink-0 items-center rounded-sm border px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong";

export function PdfRow({ title, file, courseTitle }: { title: string; file: string; courseTitle: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex items-center justify-between gap-3 px-3 py-3">
      <span className="flex items-start gap-2.5 text-sm font-medium text-ink">
        <FileText aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-strong" />
        {title}
      </span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${rowButtonStyles} border-line text-ink hover:border-brand hover:text-brand-strong`}
      >
        View PDF
      </button>
      <PdfModal open={open} onClose={() => setOpen(false)} title={title} courseTitle={courseTitle} file={file} />
    </li>
  );
}
