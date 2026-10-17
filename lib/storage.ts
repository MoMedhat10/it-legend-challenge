export type StorageKind = "local" | "session";

const CHANGE_EVENT = "app-storage-change";

function getStorage(kind: StorageKind): Storage {
  return kind === "local" ? window.localStorage : window.sessionStorage;
}

export function readStorage(kind: StorageKind, key: string): string | null {
  try {
    return getStorage(kind).getItem(key);
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
}

export function writeStorage(kind: StorageKind, key: string, value: unknown): void {
  try {
    if (value === undefined) getStorage(kind).removeItem(key);
    else getStorage(kind).setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** "storage" fires for other tabs, the custom event for this tab. */
export function subscribeStorage(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function parseJson<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
