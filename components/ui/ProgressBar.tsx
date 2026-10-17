export function ProgressBar({
  value,
  label,
  className = "",
}: {
  /** 0–100 */
  value: number;
  /** Accessible name, e.g. "JavaScript Fundamentals progress". */
  label: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-track ${className}`}
    >
      <div
        className="h-full rounded-full bg-brand transition-[width] duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
