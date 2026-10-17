import { UserRound } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Comment } from "@/lib/types";

const AVATAR_TONES = ["bg-brand-soft text-brand-strong", "bg-[#fde7f3] text-[#a3236a]", "bg-danger-soft text-danger"];

/** Stable avatar colour per author name. */
function avatarTone(name: string): string {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-b-0">
      <span
        aria-hidden
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${avatarTone(comment.author)}`}
      >
        <UserRound className="size-5" />
      </span>
      <article className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-ink">{comment.author}</h3>
        <time dateTime={comment.date} className="text-xs text-muted">
          {formatDate(comment.date)}
        </time>
        <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed">{comment.text}</p>
      </article>
    </li>
  );
}
