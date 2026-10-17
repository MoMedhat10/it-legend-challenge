"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { iconButtonStyles } from "@/components/player/PlayerActions";
import { MessageForm } from "@/components/ui/MessageForm";
import { Modal } from "@/components/ui/Modal";
import { useStoredState } from "@/hooks/useStoredState";

/** Icon trigger + modal. The draft lives in sessionStorage, so closing by mistake keeps the text for this session. */
export function AskQuestion({ slug, courseTitle }: { slug: string; courseTitle: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useStoredState(`ask-question-draft:${slug}`, "", "session");

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Ask a question"
        title="Ask a question"
        className={iconButtonStyles}
      >
        <CircleHelp aria-hidden className="size-4" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Ask a Question" subtitle={courseTitle}>
        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          <p className="mb-4 text-sm">Stuck on something? Ask the instructor and they will get back to you.</p>
          <MessageForm
            label="Your question"
            placeholder="Write your question"
            submitLabel="Send Question"
            successMessage="Your question was sent to the instructor."
            value={draft}
            onChange={setDraft}
            onSubmit={() => setDraft("")}
          />
        </div>
      </Modal>
    </li>
  );
}
