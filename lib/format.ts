/** 5400 → "1h 30m", 2700 → "45m", 30 → "1m" */
export function formatDuration(totalSec: number): string {
  const totalMin = Math.max(1, Math.round(totalSec / 60));
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  if (hours === 0) return `${minutes}m`;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC", // same output on server and client
});

/** "2026-10-10" → "Oct 10, 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
