import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { parseJson, readStorage, subscribeStorage, writeStorage, type StorageKind } from "@/lib/storage";

type SetStoredState<T> = (next: T | ((prev: T) => T)) => void;

// The server has no storage: the fallback is rendered there and during
// hydration, then React swaps in the stored value without a mismatch.
const getServerSnapshot = () => null;

/** useState that persists to local/session storage and syncs across components and tabs. */
export function useStoredState<T>(key: string, fallback: T, kind: StorageKind = "local"): [T, SetStoredState<T>] {
  // Keep the first fallback so inline object literals don't change identity every render.
  const [initial] = useState(fallback);

  const raw = useSyncExternalStore(subscribeStorage, () => readStorage(kind, key), getServerSnapshot);
  const value = useMemo(() => parseJson(raw, initial), [raw, initial]);

  const setValue = useCallback<SetStoredState<T>>(
    (next) => {
      const prev = parseJson(readStorage(kind, key), initial);
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
      writeStorage(kind, key, resolved);
    },
    [key, kind, initial],
  );

  return [value, setValue];
}
