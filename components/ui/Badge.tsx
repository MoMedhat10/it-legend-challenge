import type { ReactNode } from "react";

export type BadgeTone = "brand" | "info" | "neutral" | "danger";

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand-soft text-brand-strong",
  info: "bg-info-soft text-info",
  neutral: "bg-neutral-soft text-neutral",
  danger: "bg-danger-soft text-danger",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
