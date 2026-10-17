"use client";

import { useState } from "react";
import { CommentItem } from "@/components/player/comments/CommentItem";
import { MessageForm } from "@/components/ui/MessageForm";
import { useStoredState } from "@/hooks/useStoredState";
import type { Comment } from "@/lib/types";

const NO_COMMENTS: Comment[] = [];

/** Seed comments from the data layer, followed by the student's own comments saved in localStorage. */
export function CourseComments({ slug, seedComments }: { slug: string; seedComments: Comment[] }) {
  const [saved, setSaved] = useStoredState<Comment[]>(`comments:${slug}`, NO_COMMENTS);
  const [draft, setDraft] = useState("");

  function addComment(text: string) {
    const comment: Comment = {
      id: crypto.randomUUID(),
      author: "You",
      date: new Date().toISOString().slice(0, 10),
      text,
    };
    setSaved((prev) => [...prev, comment]);
    setDraft("");
  }

  return (
    <section id="comments" aria-labelledby="comments-heading" className="player-anchor mt-6">
      <h2 id="comments-heading" className="mb-6 text-2xl font-semibold text-ink">
        Comments
      </h2>
      <ul className="mb-8">
        {[...seedComments, ...saved].map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      <MessageForm
        label="Write a comment"
        placeholder="Write a comment"
        submitLabel="Submit Review"
        successMessage="Your comment was posted."
        value={draft}
        onChange={setDraft}
        onSubmit={addComment}
      />
    </section>
  );
}
