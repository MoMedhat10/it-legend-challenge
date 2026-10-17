"use client";

import { ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  courseTitle: string;
  file: string;
}

export function PdfModal({ open, onClose, title, courseTitle, file }: PdfModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={courseTitle}
      size="fullscreen"
      headerActions={
        // Some mobile browsers only render the first page inline; offer the native viewer.
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-brand-strong hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand-strong"
        >
          <ExternalLink aria-hidden className="size-4" />
          <span className="max-sm:sr-only">Open in new tab</span>
        </a>
      }
    >
      <iframe src={file} title={`${title} document`} className="w-full flex-1 bg-surface" />
    </Modal>
  );
}
